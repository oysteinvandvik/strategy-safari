<!-- src/lib/components/PSOverview.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { PSItem } from '$lib/types';

  let psItems: PSItem[] = [];
  let loading = true;
  let error: string | null = null;
  let cardsVisible = false;

  onMount(async () => {
    try {
      const res = await fetch('/data/ps.json');
      if (!res.ok) {
        throw new Error(`Failed to fetch PS data: ${res.status} ${res.statusText}`);
      }
      psItems = await res.json();
      
      // Trigger animations after data loads
      setTimeout(() => cardsVisible = true, 100);
    } catch (err) {
      console.error('Error loading PS data:', err);
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center py-20">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
      <p class="text-muted-foreground text-lg">Loading the 5 P's of Strategy...</p>
    </div>
  </div>
{:else if error}
  <div class="max-w-2xl mx-auto">
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
      <div class="flex items-center gap-4 mb-4">
        <div class="text-red-600 dark:text-red-400 text-2xl">⚠️</div>
        <div>
          <h3 class="font-bold text-red-800 dark:text-red-200 text-lg">Error Loading Data</h3>
          <p class="text-red-600 dark:text-red-400 mt-1">{error}</p>
        </div>
      </div>
      <p class="text-sm text-red-600 dark:text-red-400 mt-4">
        Please check that the <code class="bg-red-100 dark:bg-red-800/50 px-1 rounded">static/data/ps.json</code> file exists and is properly formatted.
      </p>
    </div>
  </div>
{:else if psItems.length === 0}
  <div class="text-center py-20">
    <div class="text-6xl mb-4">🤔</div>
    <p class="text-muted-foreground text-lg">No strategy P's data available.</p>
  </div>
{:else}
  <div class="space-y-16">
    <!-- Header Section -->
    <div class="text-center max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
        The Five P's of Strategy
      </h2>
      <p class="text-xl text-muted-foreground leading-relaxed mb-4">
        Explore Henry Mintzberg's comprehensive framework for understanding strategy 
        through five distinct but interconnected perspectives.
      </p>
      <p class="text-lg text-muted-foreground/80">
        Each P represents a different lens through which we can view strategic thinking and formation within organizations.
      </p>
    </div>

    <!-- P's Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each psItems as ps, index (ps.id)}
        <div class="group transition-all duration-700 transform hover:scale-105"
             class:translate-y-0={cardsVisible}
             class:opacity-100={cardsVisible}
             class:translate-y-12={!cardsVisible}
             class:opacity-0={!cardsVisible}
             style="transition-delay: {index * 100}ms;">
          
          <div class="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                 style="background: radial-gradient(circle, {ps.color} 0%, transparent 70%);">
            </div>
            
            <!-- Header with color indicator -->
            <div class="flex items-center gap-4 mb-6 relative z-10">
              <div class="flex-shrink-0">
                <div 
                  class="w-6 h-6 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300" 
                  style="background-color: {ps.color};"
                  aria-label="Color indicator for {ps.label}"
                ></div>
              </div>
              <h3 class="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                {ps.label}
              </h3>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground leading-relaxed text-base mb-6 relative z-10">
              {ps.description}
            </p>
            
            <!-- Visual accent bar -->
            <div class="relative z-10">
              <div 
                class="h-1 rounded-full group-hover:h-2 transition-all duration-300" 
                style="background: linear-gradient(90deg, {ps.color}, {ps.color}80);"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Framework Information -->
    <div class="bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-2xl p-8 md:p-12 border border-border">
      <div class="max-w-5xl mx-auto">
        <h3 class="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
          <span class="text-3xl">📚</span>
          About the Framework
        </h3>
        <div class="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
          <div class="space-y-4">
            <p>
              Henry Mintzberg's "5 P's of Strategy" framework, introduced in his seminal work 
              <em class="text-foreground">"Strategy Safari,"</em> provides a multifaceted view of what strategy means in practice.
            </p>
            <p>
              Rather than limiting strategy to a single definition, this framework acknowledges 
              that strategy can be understood through multiple complementary lenses, each offering 
              unique insights into organizational behavior.
            </p>
          </div>
          <div class="space-y-4">
            <p>
              Each "P" represents a different dimension of strategic thinking, from the deliberate 
              planning processes to the emergent patterns that arise from organizational actions.
            </p>
            <p>
              Understanding all five perspectives helps create a more complete and nuanced 
              approach to strategic management, enabling leaders to adapt their thinking to different 
              contexts and challenges.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Elements -->
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
        <h4 class="text-xl font-bold text-card-foreground mb-4 flex items-center gap-3">
          <span class="text-2xl">🎯</span>
          Strategic Applications
        </h4>
        <ul class="space-y-3 text-muted-foreground">
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">•</span>
            <span>Use different P's for different strategic challenges and contexts</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">•</span>
            <span>Combine multiple perspectives for comprehensive strategic analysis</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">•</span>
            <span>Recognize when to shift between strategic approaches as situations evolve</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">•</span>
            <span>Balance deliberate planning with emergent strategic learning</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
        <h4 class="text-xl font-bold text-card-foreground mb-4 flex items-center gap-3">
          <span class="text-2xl">🔗</span>
          Explore Further
        </h4>
        <div class="space-y-4">
          <a 
            href="/radar" 
            class="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
          >
            <span class="text-xl">📊</span>
            <span class="group-hover:translate-x-1 transition-transform duration-200">
              View strategy schools in interactive radar visualization
            </span>
          </a>
          <a 
            href="/schools" 
            class="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
          >
            <span class="text-xl">🏫</span>
            <span class="group-hover:translate-x-1 transition-transform duration-200">
              Explore the ten schools of strategy formation
            </span>
          </a>
          <a 
            href="/about" 
            class="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
          >
            <span class="text-xl">ℹ️</span>
            <span class="group-hover:translate-x-1 transition-transform duration-200">
              Learn about this project's methodology and inspiration
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-12 border border-border">
      <h3 class="text-2xl md:text-3xl font-bold mb-4 text-foreground">
        Ready to See Strategy in Action?
      </h3>
      <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Explore how different strategy schools emphasize these five P's through our interactive radar visualization.
      </p>
      <a href="/radar" 
         class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
        <span class="text-xl">🚀</span>
        Explore Interactive Radar
      </a>
    </div>
  </div>
{/if}