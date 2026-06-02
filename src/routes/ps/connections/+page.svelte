<!-- src/routes/ps/connections/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let psData: any = null;
  let loading = true;
  let error: string | null = null;

  let selected: { from: any; to: any; relationship: string } | null = null;

  onMount(async () => {
    try {
      const res = await fetch('/data/ps.json');
      if (!res.ok) throw new Error('Failed to load P data');
      psData = await res.json();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });

  function getEdge(fromId: string, toId: string) {
    return psData?.interactions?.matrix?.find(
      (e: any) => e.from === fromId && e.to === toId
    );
  }

  function selectCell(from: any, to: any) {
    if (from.id === to.id) return;
    const edge = getEdge(from.id, to.id);
    if (edge) selected = { from, to, relationship: edge.relationship };
  }

  function isSelected(fromId: string, toId: string) {
    return selected?.from.id === fromId && selected?.to.id === toId;
  }
</script>

<svelte:head>
  <title>How the Five Voices Connect - Strategy Safari</title>
  <meta
    name="description"
    content="An interactive map of how Mintzberg's five P's of strategy influence one another."
  />
</svelte:head>

{#if loading}
  <div class="max-w-7xl mx-auto px-4 py-16 text-center">
    <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
    <p class="mt-4 text-muted-foreground">Loading connections…</p>
  </div>

{:else if error}
  <div class="max-w-3xl mx-auto px-4 py-16">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
      <p class="text-red-600">{error}</p>
    </div>
  </div>

{:else if psData}
  <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <!-- Breadcrumb -->
    <nav class="mb-6" in:fly={{ y: -20, duration: 500, easing: quintOut }}>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/ps" class="hover:text-primary transition-colors">5 P's of Strategy</a>
        <span>›</span>
        <span class="font-medium text-foreground">Connections</span>
      </div>
    </nav>

    <!-- Header -->
    <div class="mb-8" in:fly={{ y: 20, duration: 600, easing: quintOut }}>
      <h1 class="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
        <span class="text-3xl">🕸️</span>
        How the Voices Connect
      </h1>
      <p class="text-muted-foreground max-w-2xl">
        The five voices don't exist in isolation — each one shapes the others. Pick a
        <span class="font-medium text-foreground">row</span> (the voice that acts) and a
        <span class="font-medium text-foreground">column</span> (the voice it acts on) to read the relationship.
      </p>
    </div>

    <!-- Matrix -->
    <div class="overflow-x-auto -mx-4 px-4" in:fade={{ duration: 400, delay: 200 }}>
      <table class="border-separate border-spacing-1 mx-auto">
        <thead>
          <tr>
            <th class="w-20 text-xs text-muted-foreground font-normal text-right pr-2 align-bottom pb-1">
              acts on →
            </th>
            {#each psData.ps as col}
              <th class="w-16 text-center">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-xl">{col.icon}</span>
                  <span class="text-[11px] font-medium text-muted-foreground">{col.label}</span>
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each psData.ps as row}
            <tr>
              <th class="text-right pr-2">
                <div class="flex items-center justify-end gap-1.5">
                  <span class="text-[11px] font-medium text-muted-foreground">{row.label}</span>
                  <span class="text-xl">{row.icon}</span>
                </div>
              </th>
              {#each psData.ps as col}
                {#if row.id === col.id}
                  <!-- diagonal: a voice with itself -->
                  <td>
                    <div class="w-14 h-14 rounded-lg bg-muted/40 flex items-center justify-center">
                      <span class="text-muted-foreground/30 text-lg">·</span>
                    </div>
                  </td>
                {:else}
                  <td>
                    <button
                      class="w-14 h-14 rounded-lg border transition-all flex items-center justify-center hover:scale-105 {isSelected(row.id, col.id) ? 'ring-2 ring-offset-1 ring-primary shadow-md' : 'hover:shadow-sm'}"
                      style="background-color: {row.color}1a; border-color: {row.color}40;"
                      on:click={() => selectCell(row, col)}
                      aria-label="{row.label} acts on {col.label}"
                    >
                      <span
                        class="w-3 h-3 rounded-full transition-transform"
                        style="background-color: {row.color};"
                      ></span>
                    </button>
                  </td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Selected relationship -->
    <div class="mt-8 min-h-[7rem]">
      {#if selected}
        {@const sel = selected}
        {#key `${sel.from.id}-${sel.to.id}`}
          <div
            in:fly={{ y: 12, duration: 350, easing: quintOut }}
            class="bg-card border rounded-xl p-6"
          >
            <div class="flex items-center gap-2 mb-3 text-sm font-medium">
              <button class="inline-flex items-center gap-1.5 hover:underline" on:click={() => goto(`/ps/${sel.from.id}`)}>
                <span class="text-lg">{sel.from.icon}</span>{sel.from.label}
              </button>
              <span class="text-muted-foreground">→</span>
              <button class="inline-flex items-center gap-1.5 hover:underline" on:click={() => goto(`/ps/${sel.to.id}`)}>
                <span class="text-lg">{sel.to.icon}</span>{sel.to.label}
              </button>
            </div>
            <p class="text-muted-foreground leading-relaxed">{sel.relationship}</p>
          </div>
        {/key}
      {:else}
        <div class="text-center text-sm text-muted-foreground py-8 border border-dashed rounded-xl">
          Select a cell above to read how one voice influences another.
        </div>
      {/if}
    </div>

    <!-- Back -->
    <div class="text-center mt-10">
      <a
        href="/ps"
        class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
      >
        ← Back to 5 P's Overview
      </a>
    </div>
  </div>
{/if}
