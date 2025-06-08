<!-- src/routes/landscapes/[slug]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import ParadoxDetail from '$lib/components/ParadoxDetail.svelte';
  import type { StrategicParadox } from '$lib/types';

  let paradox: StrategicParadox | null = null;
  let allParadoxes: StrategicParadox[] = [];
  let loading = true;
  let error: string | null = null;
  let userPosition: number | null = null;

  // Get the slug from the URL
  $: slug = $page.params.slug;

  onMount(async () => {
    try {
      const res = await fetch('/data/landscapes.json');
      if (!res.ok) throw new Error('Failed to load paradoxes data');
      allParadoxes = await res.json();
      
      console.log('All paradoxes loaded:', allParadoxes.length);
      console.log('Looking for slug:', slug);
      
      // Find the specific paradox based on the slug
      paradox = allParadoxes.find(p => p.id === slug) || null;
      
      if (!paradox) {
        console.error(`Paradox not found for slug: ${slug}`);
        error = `Strategic paradox "${slug}" not found`;
      } else {
        console.log('Found paradox:', paradox.name);
        // Load user position if saved
        const positions = JSON.parse(localStorage.getItem('landscape-positions') || '{}');
        userPosition = positions[paradox.id] || null;
      }
    } catch (err) {
      console.error('Error loading paradoxes:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });

  function handlePositionChanged(event: CustomEvent) {
    console.log('Position changed:', event.detail);
  }

  function handleReflectionSaved(event: CustomEvent) {
    console.log('Reflection saved:', event.detail);
  }

  function getNextParadox() {
    if (!paradox || !allParadoxes.length) {
      console.log('getNextParadox: Missing paradox or allParadoxes');
      return null;
    }
    
    const currentIndex = allParadoxes.findIndex(p => p.id === paradox.id);
    console.log('Current index:', currentIndex, 'of', allParadoxes.length);
    
    if (currentIndex === -1) {
      console.log('Current paradox not found in array');
      return null;
    }
    
    const nextIndex = (currentIndex + 1) % allParadoxes.length;
    const nextParadox = allParadoxes[nextIndex];
    console.log('Next index:', nextIndex, 'Next paradox:', nextParadox?.name);
    
    return nextParadox;
  }

  function getPrevParadox() {
    if (!paradox || !allParadoxes.length) {
      console.log('getPrevParadox: Missing paradox or allParadoxes');
      return null;
    }
    
    const currentIndex = allParadoxes.findIndex(p => p.id === paradox.id);
    console.log('Current index for prev:', currentIndex, 'of', allParadoxes.length);
    
    if (currentIndex === -1) {
      console.log('Current paradox not found in array');
      return null;
    }
    
    const prevIndex = (currentIndex - 1 + allParadoxes.length) % allParadoxes.length;
    const prevParadox = allParadoxes[prevIndex];
    console.log('Prev index:', prevIndex, 'Prev paradox:', prevParadox?.name);
    
    return prevParadox;
  }

  function handleNext() {
    console.log('Next clicked, current paradox:', paradox?.name);
    console.log('All paradoxes:', allParadoxes.map(p => p.id));
    
    const next = getNextParadox();
    console.log('Next paradox:', next?.name);
    
    if (next) {
      console.log('Navigating to:', `/landscapes/${next.id}`);
      goto(`/landscapes/${next.id}`);
    } else {
      console.log('No next paradox found');
    }
  }

  function handlePrev() {
    console.log('Prev clicked, current paradox:', paradox?.name);
    
    const prev = getPrevParadox();
    console.log('Prev paradox:', prev?.name);
    
    if (prev) {
      console.log('Navigating to:', `/landscapes/${prev.id}`);
      goto(`/landscapes/${prev.id}`);
    } else {
      console.log('No prev paradox found');
    }
  }
</script>

<svelte:head>
  {#if paradox}
    <title>{paradox.name} - Strategic Landscapes</title>
    <meta name="description" content="{paradox.description} Explore this strategic paradox from De Wit & Meyer." />
  {:else}
    <title>Strategic Landscape - Strategy Safari</title>
  {/if}
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  {#if loading}
    <div class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p class="text-muted-foreground">Loading paradox...</p>
      </div>
    </div>
  {:else if error}
    <div class="text-center py-12">
      <div class="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 class="text-xl font-semibold mb-2">Paradox Not Found</h2>
      <p class="text-muted-foreground mb-6">{error}</p>
      <button 
        class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        on:click={() => goto('/landscapes')}
      >
        Back to Landscapes
      </button>
    </div>
  {:else if paradox}
    <!-- Breadcrumb Navigation -->
    <nav 
      in:fly={{ y: -20, duration: 500, easing: quintOut }}
      class="mb-8"
    >
      <ol class="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <a href="/landscapes" class="hover:text-foreground transition-colors">
            Strategic Landscapes
          </a>
        </li>
        <li>→</li>
        <li class="text-foreground font-medium">{paradox.name}</li>
      </ol>
    </nav>

    <!-- Main Content -->
    <div in:fly={{ y: 30, duration: 600, easing: quintOut }}>
      <ParadoxDetail 
        {paradox} 
        initialPosition={userPosition}
        on:positionChanged={handlePositionChanged}
        on:reflectionSaved={handleReflectionSaved}
      />
    </div>

    <!-- Navigation Controls -->
    <div 
      in:fly={{ y: 20, duration: 500, delay: 400, easing: quintOut }}
      class="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t"
    >
      <div class="flex gap-3">
        {#if getPrevParadox()}
          <button
            class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
            on:click={() => {
              console.log('Previous button clicked!');
              handlePrev();
            }}
          >
            ← Previous
          </button>
        {/if}
        
        <button
          class="px-4 py-2 bg-card border hover:bg-secondary text-foreground rounded-lg transition-colors"
          on:click={() => goto('/landscapes')}
        >
          All Landscapes
        </button>

        {#if getNextParadox()}
          <button
            class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            on:click={() => {
              console.log('Next button clicked!');
              handleNext();
            }}
          >
            Next →
          </button>
        {/if}
      </div>

      <!-- Progress indicator -->
      <div class="text-sm text-muted-foreground">
        {allParadoxes.findIndex(p => p.id === paradox.id) + 1} of {allParadoxes.length}
      </div>
    </div>
  {/if}
</div>