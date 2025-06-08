<!-- src/lib/components/PSOverview.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';

  let psData: any = null;
  let loading = true;
  let error: string | null = null;
  let cardsVisible = false;

  onMount(async () => {
    try {
      const res = await fetch('/data/ps.json');
      if (!res.ok) throw new Error('Failed to load P data');
      psData = await res.json();
      
      // Trigger staggered animations
      setTimeout(() => cardsVisible = true, 100);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });

  function navigateToP(pId: string) {
    goto(`/ps/${pId}`);
  }

  function getColorClasses(color: string) {
    const colorMap: Record<string, string> = {
      '#3366cc': 'text-blue-600 border-blue-200 bg-blue-50/50',
      '#dc3545': 'text-red-600 border-red-200 bg-red-50/50', 
      '#28a745': 'text-green-600 border-green-200 bg-green-50/50',
      '#ffc107': 'text-amber-600 border-amber-200 bg-amber-50/50',
      '#6f42c1': 'text-purple-600 border-purple-200 bg-purple-50/50'
    };
    return colorMap[color] || 'text-gray-600 border-gray-200 bg-gray-50/50';
  }
</script>

<svelte:head>
  <title>The 5 P's of Strategy - Strategy Safari</title>
  <meta name="description" content="Explore Henry Mintzberg's Five P's of Strategy framework through interactive examples and detailed explanations." />
</svelte:head>

{#if loading}
  <div class="max-w-7xl mx-auto px-4 py-16 text-center">
    <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
    <p class="mt-4 text-muted-foreground">Loading framework data...</p>
  </div>

{:else if error}
  <div class="max-w-7xl mx-auto px-4 py-16">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
      <p class="text-red-600">{error}</p>
      <p class="text-sm text-red-500 mt-2">Please check that the <code>static/data/ps.json</code> file exists and is properly formatted.</p>
    </div>
  </div>

{:else if psData}
  <div class="max-w-7xl mx-auto px-4 py-8 md:py-16">
    <!-- Hero Section -->
    <div class="text-center mb-16" 
         in:fly={{ y: 30, duration: 800, easing: quintOut }}>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Voices of Strategy
      </h1>
      <p class="text-xl md:text-2xl text-muted-foreground mb-4">
        The Five P's Framework
      </p>
      <p class="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-4">
        {psData.framework.description}
      </p>
      <p class="text-muted-foreground">
        Each voice represents a different lens through which we can hear and understand strategic thinking within organizations.
      </p>
    </div>

    <!-- P Cards Grid -->
    {#if cardsVisible}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {#each psData.ps as p, index (p.id)}
          <div 
            class="group cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 {getColorClasses(p.color)}"
            in:scale={{ duration: 600, delay: index * 100, easing: quintOut }}
            on:click={() => navigateToP(p.id)}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && navigateToP(p.id)}
          >
            <!-- P Header -->
            <div class="flex items-center gap-3 mb-4">
              <div class="text-3xl">{p.icon}</div>
              <h3 class="text-xl font-bold">{p.label}</h3>
            </div>
            
            <!-- P Description -->
            <p class="text-sm text-muted-foreground leading-relaxed mb-4">
              {p.shortDescription}
            </p>
            
            <!-- Colored accent bar -->
            <div class="w-full h-1 rounded-full" style="background-color: {p.color}"></div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- About the Framework Section -->
    <div class="grid lg:grid-cols-2 gap-12 mb-16"
         in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
      
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">🗣️</span>
          <h2 class="text-2xl font-bold">About the Voices</h2>
        </div>
        
        <p class="text-muted-foreground mb-4">
          Henry Mintzberg's "5 P's of Strategy" framework gives voice to different perspectives on what strategy means in practice. These aren't competing definitions, but rather different "voices" that can be heard in strategic conversations.
        </p>
        
        <p class="text-muted-foreground mb-4">
          Rather than limiting strategy to a single voice, this framework acknowledges that strategy speaks through multiple complementary perspectives, each offering unique insights into organizational behavior.
        </p>
      </div>

      <div>
        <p class="text-muted-foreground mb-4">
          Each voice represents a different dimension of strategic thinking, from the deliberate planning conversations to the emergent patterns that arise from organizational actions.
        </p>
        
        <p class="text-muted-foreground">
          Understanding all five voices helps create a more complete and nuanced approach to strategic management, enabling leaders to hear different perspectives and adapt their thinking to different contexts and challenges.
        </p>
      </div>
    </div>

    <!-- Strategic Applications and Explore Further -->
    <div class="grid lg:grid-cols-2 gap-12 mb-16">
      
      <!-- Strategic Applications -->
      <div in:fly={{ x: -30, duration: 800, delay: 400, easing: quintOut }}>
        <div class="flex items-center gap-2 mb-6">
          <span class="text-2xl">🎯</span>
          <h2 class="text-2xl font-bold">Strategic Applications</h2>
        </div>
        
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span class="text-muted-foreground">Use different P's for different strategic challenges and contexts</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span class="text-muted-foreground">Combine multiple perspectives for comprehensive strategic analysis</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span class="text-muted-foreground">Recognize when to shift between strategic approaches as situations evolve</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <span class="text-muted-foreground">Balance deliberate planning with emergent strategic learning</span>
          </li>
        </ul>
      </div>

      <!-- Explore Further -->
      <div in:fly={{ x: 30, duration: 800, delay: 500, easing: quintOut }}>
        <div class="flex items-center gap-2 mb-6">
          <span class="text-2xl">🔗</span>
          <h2 class="text-2xl font-bold">Explore Further</h2>
        </div>
        
        <div class="space-y-4">
          <a href="/radar" 
             class="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors group">
            <span class="text-lg">📊</span>
            <div>
              <div class="font-medium group-hover:text-primary transition-colors">View strategy schools in interactive radar visualization</div>
            </div>
          </a>
          
          <a href="/schools" 
             class="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors group">
            <span class="text-lg">🏫</span>
            <div>
              <div class="font-medium group-hover:text-primary transition-colors">Explore the ten schools of strategy formation</div>
            </div>
          </a>
          
          <a href="/about" 
             class="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors group">
            <span class="text-lg">ℹ️</span>
            <div>
              <div class="font-medium group-hover:text-primary transition-colors">Learn about this project's methodology and inspiration</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center"
         in:scale={{ duration: 800, delay: 600, easing: quintOut }}>
      <h2 class="text-3xl font-bold mb-4">Ready to See Strategy in Action?</h2>
      <p class="text-lg text-muted-foreground mb-8">
        Explore how different strategy schools emphasize these five P's through our interactive radar visualization.
      </p>
      
      <a href="/radar" 
         class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
        <span class="text-lg">📊</span>
        Explore Interactive Radar
      </a>
    </div>
  </div>
{/if}