<script lang="ts">
  import { onMount } from 'svelte';
  import type { StrategySchool } from '$lib/types';

  let schools: StrategySchool[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const res = await fetch('/data/radarData.json');
      if (!res.ok) throw new Error('Failed to fetch school data');
      schools = await res.json();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p class="text-muted-foreground">Loading...</p>
{:else if error}
  <p class="text-red-500">Error: {error}</p>
{:else}
  <div class="grid md:grid-cols-2 gap-4">
    {#each schools as school (school.name)}
      <div class="border rounded-lg p-4 bg-card shadow-sm">
        <h2 class="text-xl font-semibold mb-1">{school.name}</h2>
        <p class="text-sm text-muted-foreground">{school.description}</p>
      </div>
    {/each}
  </div>
{/if}
