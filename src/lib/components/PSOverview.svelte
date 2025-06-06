<!-- src/lib/components/PSOverview.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import type { PSItem } from '$lib/types';
  
    let psItems: PSItem[] = [];
    let loading = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const res = await fetch('/data/ps.json');
        if (!res.ok) {
          throw new Error(`Failed to fetch PS data: ${res.status} ${res.statusText}`);
        }
        psItems = await res.json();
      } catch (err) {
        console.error('Error loading PS data:', err);
        error = err instanceof Error ? err.message : 'Unknown error occurred';
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-muted-foreground">Loading the 5 P's of Strategy...</p>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <div class="flex items-center gap-3">
        <div class="text-red-600 dark:text-red-400">⚠️</div>
        <div>
          <h3 class="font-semibold text-red-800 dark:text-red-200">Error Loading Data</h3>
          <p class="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  {:else if psItems.length === 0}
    <div class="text-center py-12">
      <p class="text-muted-foreground">No strategy P's data available.</p>
    </div>
  {:else}
    <div class="space-y-8">
      <!-- Header Section -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-foreground mb-3">The Five P's of Strategy</h2>
        <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore Henry Mintzberg's comprehensive framework for understanding strategy 
          through five distinct but interconnected perspectives.
        </p>
      </div>
  
      <!-- P's Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each psItems as ps (ps.id)}
          <div class="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
            <!-- Header with color indicator -->
            <div class="flex items-center gap-3 mb-4">
              <div 
                class="w-4 h-4 rounded-full shadow-sm" 
                style="background-color: {ps.color};"
                aria-label="Color indicator for {ps.label}"
              ></div>
              <h3 class="text-xl font-bold text-card-foreground">{ps.label}</h3>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground leading-relaxed text-sm">
              {ps.description}
            </p>
            
            <!-- Visual accent -->
            <div 
              class="mt-4 h-1 rounded-full opacity-20" 
              style="background-color: {ps.color};"
            ></div>
          </div>
        {/each}
      </div>
  
      <!-- Framework Information -->
      <div class="bg-muted/50 rounded-xl p-6 border border-border">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <span>📚</span>
            About the Framework
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <p class="mb-3">
                Henry Mintzberg's "5 P's of Strategy" framework, introduced in his seminal work 
                "Strategy Safari," provides a multifaceted view of what strategy means in practice.
              </p>
              <p>
                Rather than limiting strategy to a single definition, this framework acknowledges 
                that strategy can be understood through multiple complementary lenses.
              </p>
            </div>
            <div>
              <p class="mb-3">
                Each "P" represents a different dimension of strategic thinking, from the deliberate 
                planning processes to the emergent patterns that arise from organizational actions.
              </p>
              <p>
                Understanding all five perspectives helps create a more complete and nuanced 
                approach to strategic management.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Interactive Elements -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-card border border-border rounded-lg p-6">
          <h4 class="font-semibold text-card-foreground mb-3">🎯 Strategic Applications</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Use different P's for different strategic challenges</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Combine perspectives for comprehensive analysis</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Recognize when to shift between strategic approaches</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-card border border-border rounded-lg p-6">
          <h4 class="font-semibold text-card-foreground mb-3">🔗 Explore Further</h4>
          <div class="space-y-3">
            <a 
              href="/radar" 
              class="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>📊</span>
              <span>View strategy schools in radar visualization</span>
            </a>
            <a 
              href="/schools" 
              class="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>🏫</span>
              <span>Explore the ten schools of strategy</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}