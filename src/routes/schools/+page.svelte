<!-- src/routes/schools/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface School {
    id: string;
    name: string;
    shortName: string;
    group: 'Prescriptive' | 'Descriptive';
    description: string;
    longDescription: string;
    keyFigures: string[];
    originPeriod: string;
    coreBeliefs: string[];
    strengths: string[];
    weaknesses: string[];
    values: number[];
  }

  let schoolsData: { schools: School[] } | null = null;
  let selectedGroup: 'All' | 'Prescriptive' | 'Descriptive' = 'All';
  let loading = true;
  let error: string | null = null;
  let pageVisible = false;

  onMount(async () => {
    try {
      const res = await fetch('/data/schools.json');
      if (!res.ok) throw new Error('Failed to load schools data');
      schoolsData = await res.json();
      
      setTimeout(() => pageVisible = true, 100);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });

  // Computed filtered schools
  $: filteredSchools = schoolsData?.schools.filter(school => {
    return selectedGroup === 'All' || school.group === selectedGroup;
  }) || [];

  $: prescriptiveCount = schoolsData?.schools.filter(s => s.group === 'Prescriptive').length || 0;
  $: descriptiveCount = schoolsData?.schools.filter(s => s.group === 'Descriptive').length || 0;
  $: totalCount = schoolsData?.schools.length || 0;

  function getGroupColor(group: string) {
    return group === 'Prescriptive' 
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-green-100 text-green-800 border-green-200';
  }

  function getPLabels(): string[] {
    return ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
  }

  function getPColors(): string[] {
    return [
      'bg-blue-500',    // Plan - Blue
      'bg-red-500',     // Pattern - Red  
      'bg-green-500',   // Position - Green
      'bg-amber-500',   // Perspective - Amber
      'bg-purple-500'   // Ploy - Purple
    ];
  }
</script>

<svelte:head>
  <title>Strategy Schools Overview - Strategy Safari</title>
  <meta name="description" content="Comprehensive overview of the ten schools of strategy formation from Mintzberg's Strategy Safari with detailed P's analysis." />
</svelte:head>

{#if loading}
  <div class="max-w-7xl mx-auto px-4 py-16 text-center">
    <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
    <p class="mt-4 text-muted-foreground">Loading strategy schools...</p>
  </div>

{:else if error}
  <div class="max-w-7xl mx-auto px-4 py-16">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Schools</h2>
      <p class="text-red-600 mb-4">{error}</p>
      <p class="text-sm text-red-500">Please check that the <code>static/data/schools.json</code> file exists and is properly formatted.</p>
    </div>
  </div>

{:else if schoolsData && pageVisible}
  <div class="max-w-7xl mx-auto px-4 py-8">
    
    <!-- Header -->
    <div class="mb-8" in:fly={{ y: -30, duration: 800, easing: quintOut }}>
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        Strategy Schools Overview
      </h1>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-8" in:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 rounded-lg font-medium transition-all {selectedGroup === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedGroup = 'All'}
        >
          All Schools ({totalCount})
        </button>
        <button
          class="px-4 py-2 rounded-lg font-medium transition-all {selectedGroup === 'Prescriptive' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedGroup = 'Prescriptive'}
        >
          Prescriptive ({prescriptiveCount})
        </button>
        <button
          class="px-4 py-2 rounded-lg font-medium transition-all {selectedGroup === 'Descriptive' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedGroup = 'Descriptive'}
        >
          Descriptive ({descriptiveCount})
        </button>
      </div>
    </div>

    <!-- Schools Grid -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      {#each filteredSchools as school, index (school.id)}
        <div class="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
             in:scale={{ duration: 600, delay: index * 100, easing: quintOut }}
             on:click={() => goto(`/schools/${school.id}`)}
             role="button"
             tabindex="0"
             on:keydown={(e) => e.key === 'Enter' && goto(`/schools/${school.id}`)}>
          
          <!-- School Header -->
          <div class="mb-4">
            <h2 class="text-xl font-bold mb-2">{school.name}</h2>
            <span class="inline-block px-2 py-1 rounded-full text-xs font-medium border {getGroupColor(school.group)}">
              {school.group}
            </span>
          </div>

          <!-- Five P's Emphasis -->
          <div class="mb-4">
            <h3 class="font-semibold mb-3 text-sm">Five P's Emphasis:</h3>
            <div class="space-y-3">
              {#each school.values as value, i}
                <div class="flex items-center">
                  <!-- P Label -->
                  <div class="w-20 text-sm font-medium text-gray-700">
                    {getPLabels()[i]}:
                  </div>
                  
                  <!-- Progress Bar -->
                  <div class="flex-1 mx-3">
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        class="h-full {getPColors()[i]} transition-all duration-1000 ease-out"
                        style="width: {value * 20}%"
                      ></div>
                    </div>
                  </div>
                  
                  <!-- Value -->
                  <div class="w-8 text-right text-sm font-medium text-gray-600">
                    {value}/5
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Bottom Call to Action -->
    {#if filteredSchools.length > 0}
      <div class="mt-12 text-center" in:scale={{ duration: 600, delay: 400 }}>
        <div class="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-4">Explore Further</h3>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Compare these strategy schools visually or learn more about the Five P's framework.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/radar" 
               class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <span>📊</span>
              Interactive Radar Chart
            </a>
            <a href="/ps" 
               class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
              <span>📝</span>
              Learn About the 5 P's
            </a>
          </div>
        </div>
      </div>
    {/if}

    <!-- Empty State -->
    {#if filteredSchools.length === 0}
      <div class="text-center py-12" in:scale={{ duration: 400, delay: 200 }}>
        <div class="text-4xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2">No schools found</h3>
        <p class="text-muted-foreground mb-4">
          Try selecting a different category
        </p>
        <button
          on:click={() => selectedGroup = 'All'}
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Show all schools
        </button>
      </div>
    {/if}
  </div>
{/if}