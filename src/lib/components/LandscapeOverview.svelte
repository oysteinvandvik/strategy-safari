<!-- src/lib/components/LandscapeOverview.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import ParadoxCard from '$lib/components/ParadoxCard.svelte';
    import type { StrategicParadox, ParadoxPosition } from '$lib/types';
  
    let paradoxes: StrategicParadox[] = [];
    let userPositions: Record<string, number> = {};
    let selectedGroup: 'All' | 'Process' | 'Content' | 'Context' = 'All';
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;
  
    onMount(async () => {
      try {
        const res = await fetch('/data/landscapes.json');
        if (!res.ok) throw new Error('Failed to load paradoxes data');
        paradoxes = await res.json();
        
        // Load user positions from localStorage if available
        const savedPositions = localStorage.getItem('landscape-positions');
        if (savedPositions) {
          userPositions = JSON.parse(savedPositions);
        }
        
        setTimeout(() => sectionsVisible = true, 100);
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading = false;
      }
    });
  
    function handleParadoxSelect(event: CustomEvent<StrategicParadox>) {
      const paradox = event.detail;
      goto(`/landscapes/${paradox.id}`);
    }
  
    $: filteredParadoxes = selectedGroup === 'All' 
      ? paradoxes 
      : paradoxes.filter(p => p.group === selectedGroup);
  
    $: groupedParadoxes = paradoxes.reduce((acc, paradox) => {
      if (!acc[paradox.group]) acc[paradox.group] = [];
      acc[paradox.group].push(paradox);
      return acc;
    }, {} as Record<string, StrategicParadox[]>);
  
    function getGroupDescription(group: string) {
      switch (group) {
        case 'Process': return 'How strategy is formed and implemented within organizations';
        case 'Content': return 'What strategic choices organizations make and their substance';
        case 'Context': return 'The environmental conditions that shape strategic decisions';
        default: return '';
      }
    }
  
    function getGroupStats(group: string) {
      const groupParadoxes = groupedParadoxes[group] || [];
      const withPositions = groupParadoxes.filter(p => userPositions[p.id] !== undefined).length;
      return `${withPositions}/${groupParadoxes.length} explored`;
    }
  </script>
  
  {#if loading}
    <div class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p class="text-muted-foreground">Loading strategic landscapes...</p>
      </div>
    </div>
  {:else if error}
    <div class="text-center py-12">
      <div class="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 class="text-xl font-semibold mb-2">Failed to Load Landscapes</h2>
      <p class="text-muted-foreground">{error}</p>
    </div>
  {:else}
    <!-- Hero Section -->
    {#if sectionsVisible}
      <section 
        in:fly={{ y: 30, duration: 600, easing: quintOut }}
        class="text-center mb-12"
      >
        <div class="relative inline-block">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Strategic Landscapes
          </h1>
          <div class="absolute -inset-4 bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 rounded-lg blur-xl -z-10"></div>
        </div>
        
        <p class="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
          Navigate the fundamental tensions that shape strategic thinking. 
          Based on De Wit & Meyer's seminal work on strategic paradoxes.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></span>
            <span>Explore Tensions</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-primary rounded-full"></span>
            <span>Mark Positions</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-secondary rounded-full"></span>
            <span>Reflect & Learn</span>
          </div>
        </div>
      </section>
    {/if}
  
    <!-- Filter Section -->
    {#if sectionsVisible}
      <div 
        in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
        class="mb-8"
      >
        <div class="flex flex-wrap justify-center gap-2">
          {#each ['All', 'Process', 'Content', 'Context'] as group}
            <button
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {selectedGroup === group ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}"
              on:click={() => selectedGroup = group}
            >
              {group}
              {#if group !== 'All'}
                <span class="ml-2 text-xs opacity-75">
                  ({groupedParadoxes[group]?.length || 0})
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  
    <!-- Content based on filter -->
    {#if selectedGroup === 'All'}
      <!-- Grouped view -->
      {#if sectionsVisible}
        {#each Object.entries(groupedParadoxes) as [group, groupParadoxes], groupIndex}
          <section 
            in:fly={{ y: 30, duration: 500, delay: 300 + groupIndex * 100, easing: quintOut }}
            class="mb-12"
          >
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-2xl font-semibold flex items-center gap-3">
                  <span class="text-3xl">
                    {group === 'Process' ? '⚙️' : group === 'Content' ? '🎯' : '🌍'}
                  </span>
                  {group}
                </h2>
                <span class="text-sm text-muted-foreground px-3 py-1 bg-secondary rounded-full">
                  {getGroupStats(group)}
                </span>
              </div>
              <p class="text-muted-foreground">
                {getGroupDescription(group)}
              </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each groupParadoxes as paradox, index}
                <ParadoxCard 
                  {paradox} 
                  position={userPositions[paradox.id]}
                  delay={index * 100}
                  on:select={handleParadoxSelect}
                />
              {/each}
            </div>
          </section>
        {/each}
      {/if}
    {:else}
      <!-- Filtered view -->
      {#if sectionsVisible}
        <section 
          in:fly={{ y: 30, duration: 500, delay: 300, easing: quintOut }}
          class="mb-12"
        >
          <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">{selectedGroup} Paradoxes</h2>
            <p class="text-muted-foreground">
              {getGroupDescription(selectedGroup)}
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredParadoxes as paradox, index}
              <ParadoxCard 
                {paradox} 
                position={userPositions[paradox.id]}
                delay={index * 100}
                on:select={handleParadoxSelect}
              />
            {/each}
          </div>
        </section>
      {/if}
    {/if}
  
    <!-- Call to Action -->
    {#if sectionsVisible}
      <section 
        in:scale={{ duration: 500, delay: 800, easing: quintOut }}
        class="text-center py-12 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg"
      >
        <h3 class="text-xl font-semibold mb-4">Ready to Map Your Strategic Landscape?</h3>
        <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Explore each paradox to understand where you and your organization stand on these fundamental strategic tensions.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            on:click={() => {
              const firstUnexplored = paradoxes.find(p => userPositions[p.id] === undefined);
              if (firstUnexplored) {
                goto(`/landscapes/${firstUnexplored.id}`);
              } else {
                goto(`/landscapes/${paradoxes[0].id}`);
              }
            }}
          >
            Start Exploring
          </button>
          {#if Object.keys(userPositions).length > 0}
            <button 
              class="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              on:click={() => goto('/landscapes/profile')}
            >
              View My Profile
            </button>
          {/if}
        </div>
      </section>
    {/if}
  {/if}