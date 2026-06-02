<!-- src/routes/landscapes/[slug]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import ParadoxDetail from '$lib/components/ParadoxDetail.svelte';
  import type { StrategicParadox } from '$lib/types';
  import type { PageData } from './$types';

  export let data: PageData;

  $: paradox = data.paradox as StrategicParadox;
  $: allParadoxes = data.allParadoxes as StrategicParadox[];
  $: schoolNames = data.schoolNames as Record<string, string>;

  // Books that explore this paradox
  $: paradoxBooks = ((data as any).books ?? []).filter(
    (b: any) => Array.isArray(b.paradoxes_explored) && b.paradoxes_explored.includes(paradox?.id)
  );

  let userPosition: number | null = null;

  onMount(() => {
    const positions = JSON.parse(localStorage.getItem('landscape-positions') || '{}');
    userPosition = positions[paradox.id] ?? null;
  });

  function handlePositionChanged(_event: CustomEvent) {}
  function handleReflectionSaved(_event: CustomEvent) {}

  function getNextParadox() {
    if (!paradox || !allParadoxes.length) return null;
    const currentIndex = allParadoxes.findIndex(p => p.id === paradox.id);
    if (currentIndex === -1) return null;
    return allParadoxes[(currentIndex + 1) % allParadoxes.length];
  }

  function getPrevParadox() {
    if (!paradox || !allParadoxes.length) return null;
    const currentIndex = allParadoxes.findIndex(p => p.id === paradox.id);
    if (currentIndex === -1) return null;
    return allParadoxes[(currentIndex - 1 + allParadoxes.length) % allParadoxes.length];
  }

  function handleNext() {
    const next = getNextParadox();
    if (next) goto(`/landscapes/${next.id}`);
  }

  function handlePrev() {
    const prev = getPrevParadox();
    if (prev) goto(`/landscapes/${prev.id}`);
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
  {#if paradox}
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
        {schoolNames}
        initialPosition={userPosition}
        on:positionChanged={handlePositionChanged}
        on:reflectionSaved={handleReflectionSaved}
      />
    </div>

    <!-- Books exploring this paradox -->
    {#if paradoxBooks.length > 0}
      <section class="mt-8" in:fly={{ y: 20, duration: 500, delay: 300, easing: quintOut }}>
        <h2 class="text-2xl font-semibold mb-2 flex items-center gap-2">
          <span class="text-2xl">📚</span>
          Books That Explore This Tension
        </h2>
        <p class="text-muted-foreground mb-6">
          Read further on the {paradox.left_label} ↔ {paradox.right_label} paradox.
        </p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each paradoxBooks as book}
            <button
              class="flex gap-4 text-left bg-card border rounded-xl p-4 hover:shadow-lg hover:border-primary/50 transition-all"
              on:click={() => goto(`/library/${book.id}`)}
            >
              {#if book.cover_small || book.cover_url}
                <img
                  src={book.cover_small || book.cover_url}
                  alt="{book.title} cover"
                  class="w-12 h-16 object-cover rounded flex-shrink-0 bg-muted"
                  loading="lazy"
                />
              {/if}
              <div class="min-w-0">
                <div class="font-medium text-sm leading-snug mb-1">{book.title}</div>
                <div class="text-xs text-muted-foreground">{book.authors?.[0]}{book.publication_year ? ` · ${book.publication_year}` : ''}</div>
              </div>
            </button>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Navigation Controls -->
    <div 
      in:fly={{ y: 20, duration: 500, delay: 400, easing: quintOut }}
      class="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t"
    >
      <div class="flex gap-3">
        {#if getPrevParadox()}
          <button
            class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
            on:click={handlePrev}
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
            on:click={handleNext}
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