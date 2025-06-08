<!-- src/routes/landscapes/profile/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { goto } from '$app/navigation';
    import type { StrategicParadox } from '$lib/types';
  
    let paradoxes: StrategicParadox[] = [];
    let userPositions: Record<string, number> = {};
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;
  
    onMount(async () => {
      try {
        const res = await fetch('/data/landscapes.json');
        if (!res.ok) throw new Error('Failed to load paradoxes data');
        paradoxes = await res.json();
        
        // Load user positions
        const saved = localStorage.getItem('landscape-positions');
        if (saved) {
          userPositions = JSON.parse(saved);
        }
        
        setTimeout(() => sectionsVisible = true, 100);
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading = false;
      }
    });
  
    $: exploredParadoxes = paradoxes.filter(p => userPositions[p.id] !== undefined);
    $: unexploredParadoxes = paradoxes.filter(p => userPositions[p.id] === undefined);
  
    function getPositionDescription(pos: number, paradox: StrategicParadox) {
      if (pos < 20) return `Strongly ${paradox.left_label}`;
      if (pos < 40) return `Moderately ${paradox.left_label}`;
      if (pos > 80) return `Strongly ${paradox.right_label}`;
      if (pos > 60) return `Moderately ${paradox.right_label}`;
      return 'Balanced Approach';
    }
  
    function getGroupColor(group: string) {
      switch (group) {
        case 'Process': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        case 'Content': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        case 'Context': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      }
    }
  
    function exportProfile() {
      const profile = {
        exploredParadoxes: exploredParadoxes.length,
        totalParadoxes: paradoxes.length,
        positions: exploredParadoxes.map(p => ({
          name: p.name,
          group: p.group,
          position: userPositions[p.id],
          description: getPositionDescription(userPositions[p.id], p)
        })),
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'strategic-landscape-profile.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  
    function clearAll() {
      if (confirm('Are you sure you want to clear all your positions? This cannot be undone.')) {
        localStorage.removeItem('landscape-positions');
        userPositions = {};
      }
    }
  </script>
  
  <svelte:head>
    <title>My Strategic Profile - Landscapes</title>
    <meta name="description" content="View your personal strategic landscape profile showing your positions across all strategic paradoxes." />
  </svelte:head>
  
  <div class="max-w-5xl mx-auto px-4 py-8">
    {#if loading}
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p class="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    {:else if error}
      <div class="text-center py-12">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-semibold mb-2">Failed to Load Profile</h2>
        <p class="text-muted-foreground">{error}</p>
      </div>
    {:else}
      <!-- Header -->
      {#if sectionsVisible}
        <section 
          in:fly={{ y: 30, duration: 600, easing: quintOut }}
          class="text-center mb-12"
        >
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Your Strategic Profile
          </h1>
          <p class="text-xl text-muted-foreground mb-6">
            A visual representation of your strategic landscape positions
          </p>
          
          <!-- Stats -->
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>{exploredParadoxes.length} Explored</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
              <span>{unexploredParadoxes.length} Remaining</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-primary rounded-full"></span>
              <span>{Math.round((exploredParadoxes.length / paradoxes.length) * 100)}% Complete</span>
            </div>
          </div>
        </section>
      {/if}
  
      {#if exploredParadoxes.length === 0}
        <!-- Empty state -->
        {#if sectionsVisible}
          <div 
            in:scale={{ duration: 500, delay: 200, easing: quintOut }}
            class="text-center py-16 bg-card rounded-lg border"
          >
            <div class="text-6xl mb-4">🗻</div>
            <h2 class="text-2xl font-semibold mb-4">Your Journey Awaits</h2>
            <p class="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't explored any strategic paradoxes yet. Start your journey to understand where you stand on fundamental strategic tensions.
            </p>
            <button
              class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              on:click={() => goto('/landscapes')}
            >
              Start Exploring
            </button>
          </div>
        {/if}
      {:else}
        <!-- Profile Actions -->
        {#if sectionsVisible}
          <div 
            in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
            class="flex flex-wrap justify-between items-center gap-4 mb-8"
          >
            <div class="flex gap-3">
              <button
                class="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
                on:click={exportProfile}
              >
                📥 Export Profile
              </button>
              <button
                class="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-colors text-sm"
                on:click={clearAll}
              >
                🗑️ Clear All
              </button>
            </div>
            <div class="text-sm text-muted-foreground">
              {exploredParadoxes.length} of {paradoxes.length} paradoxes explored
            </div>
          </div>
        {/if}
  
        <!-- Explored Paradoxes -->
        {#if sectionsVisible}
          <section 
            in:fly={{ y: 30, duration: 500, delay: 400, easing: quintOut }}
            class="mb-12"
          >
            <h2 class="text-2xl font-semibold mb-6">Your Positions</h2>
            
            <div class="grid gap-6">
              {#each exploredParadoxes as paradox, index}
                {@const position = userPositions[paradox.id]}
                <div 
                  in:fly={{ x: -20, duration: 400, delay: index * 100 }}
                  class="bg-card border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
                  on:click={() => goto(`/landscapes/${paradox.id}`)}
                  on:keydown={(e) => e.key === 'Enter' && goto(`/landscapes/${paradox.id}`)}
                  role="button"
                  tabindex="0"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <h3 class="font-semibold text-lg">{paradox.name}</h3>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getGroupColor(paradox.group)}">
                          {paradox.group}
                        </span>
                      </div>
                      <p class="text-sm text-muted-foreground mb-4">
                        {paradox.description}
                      </p>
                    </div>
                    <div class="text-muted-foreground hover:text-primary transition-colors">
                      →
                    </div>
                  </div>
  
                  <!-- Position visualization -->
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-sm font-medium">
                      <span class="text-orange-600 dark:text-orange-400">{paradox.left_label}</span>
                      <span class="text-blue-600 dark:text-blue-400">{paradox.right_label}</span>
                    </div>
                    
                    <div class="relative">
                      <div class="w-full h-3 bg-gradient-to-r from-orange-200 to-blue-200 dark:from-orange-900/30 dark:to-blue-900/30 rounded-full">
                        <div 
                          class="absolute top-0 left-0 h-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"
                          style="width: {position}%"
                        ></div>
                        <div 
                          class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"
                          style="left: calc({position}% - 8px)"
                        ></div>
                      </div>
                    </div>
                    
                    <div class="text-center">
                      <div class="text-sm font-medium">
                        {getPositionDescription(position, paradox)}
                      </div>
                      <div class="text-xs text-muted-foreground">
                        {Math.round(position)}% towards {position > 50 ? paradox.right_label : paradox.left_label}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/if}
  
        <!-- Unexplored -->
        {#if unexploredParadoxes.length > 0 && sectionsVisible}
          <section 
            in:fly={{ y: 30, duration: 500, delay: 600, easing: quintOut }}
          >
            <h2 class="text-2xl font-semibold mb-6">Continue Your Journey</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each unexploredParadoxes as paradox, index}
                <div 
                  in:scale={{ duration: 300, delay: index * 50 }}
                  class="bg-card border border-dashed rounded-lg p-4 hover:border-solid hover:shadow-md transition-all cursor-pointer opacity-60 hover:opacity-100"
                  on:click={() => goto(`/landscapes/${paradox.id}`)}
                  on:keydown={(e) => e.key === 'Enter' && goto(`/landscapes/${paradox.id}`)}
                  role="button"
                  tabindex="0"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="font-medium text-sm">{paradox.name}</h3>
                    <span class="text-xs px-2 py-1 bg-secondary rounded-full">
                      {paradox.group}
                    </span>
                  </div>
                  <p class="text-xs text-muted-foreground">
                    {paradox.description.substring(0, 80)}...
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      {/if}
    {/if}
  </div>