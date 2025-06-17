<!-- src/lib/components/SchoolsOverview.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import SchoolCard from '$lib/components/SchoolCard.svelte';

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
    emphasis?: {
      plan: number;
      pattern: number;
      position: number;
      perspective: number;
      ploy: number;
    };
    pApproaches?: any;
  }

  interface SchoolsData {
    schools: School[];
  }

  let schoolsData: SchoolsData | null = null;
  let filteredSchools: School[] = [];
  let selectedGroup: 'All' | 'Prescriptive' | 'Descriptive' = 'All';
  let loading = true;
  let error: string | null = null;
  let sectionsVisible = false;

  onMount(async () => {
    try {
      const res = await fetch('/data/schools.json');
      if (!res.ok) throw new Error('Failed to load schools data');
      schoolsData = await res.json();
      
      updateFilteredSchools();
      setTimeout(() => sectionsVisible = true, 100);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });

  function updateFilteredSchools() {
    if (!schoolsData) return;
    
    if (selectedGroup === 'All') {
      filteredSchools = schoolsData.schools;
    } else {
      filteredSchools = schoolsData.schools.filter(school => school.group === selectedGroup);
    }
  }

  function handleGroupChange(group: 'All' | 'Prescriptive' | 'Descriptive') {
    selectedGroup = group;
    updateFilteredSchools();
  }

  function handleSchoolSelect(event: CustomEvent<School>) {
    const school = event.detail;
    goto(`/schools/${school.id}`);
  }

  function getGroupCount(group: 'Prescriptive' | 'Descriptive') {
    if (!schoolsData) return 0;
    return schoolsData.schools.filter(school => school.group === group).length;
  }
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-[400px]">
    <div class="text-center">
      <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
      <p class="text-muted-foreground">Loading strategy schools...</p>
    </div>
  </div>
{:else if error}
  <div class="text-center py-12">
    <div class="text-red-500 text-6xl mb-4">🏛️</div>
    <h2 class="text-xl font-semibold mb-2">Failed to Load Schools</h2>
    <p class="text-muted-foreground">{error}</p>
  </div>
{:else if schoolsData}
  <!-- Hero Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 600, easing: quintOut }}
      class="text-center mb-12"
    >
      <div class="relative inline-block">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🏛️ Strategy Schools Overview
        </h1>
        <div class="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-lg blur-xl -z-10"></div>
      </div>
      
      <p class="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
        Explore Henry Mintzberg's ten schools of strategic thought from Strategy Safari. Each school offers a unique lens for understanding how strategy forms in organizations.
      </p>
      
      <!-- School Count Stats -->
      <div class="flex flex-wrap justify-center gap-6 text-sm">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span>{getGroupCount('Prescriptive')} Prescriptive Schools</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>{getGroupCount('Descriptive')} Descriptive Schools</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-primary rounded-full"></span>
          <span>{schoolsData.schools.length} Total Schools</span>
        </div>
      </div>
    </section>
  {/if}

  <!-- Filter Tabs -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
      class="mb-12"
    >
      <div class="flex justify-center">
        <div class="inline-flex rounded-lg border bg-muted p-1">
          <button
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all {selectedGroup === 'All' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => handleGroupChange('All')}
          >
            All Schools ({schoolsData.schools.length})
          </button>
          <button
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all {selectedGroup === 'Prescriptive' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => handleGroupChange('Prescriptive')}
          >
            Prescriptive ({getGroupCount('Prescriptive')})
          </button>
          <button
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all {selectedGroup === 'Descriptive' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => handleGroupChange('Descriptive')}
          >
            Descriptive ({getGroupCount('Descriptive')})
          </button>
        </div>
      </div>
    </section>
  {/if}

  <!-- Schools Grid -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 500, delay: 400, easing: quintOut }}
      class="mb-16"
    >
      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredSchools as school, index}
          <SchoolCard 
            {school} 
            delay={index * 100}
            on:select={handleSchoolSelect}
          />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Explore Further Section -->
  {#if sectionsVisible}
    <section 
      in:scale={{ duration: 500, delay: 800, easing: quintOut }}
      class="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border"
    >
      <h3 class="text-2xl font-semibold mb-4">Explore Further</h3>
      <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Compare these strategy schools visually or learn more about the Five P's framework that underlies strategic thinking.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button 
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          on:click={() => goto('/radar')}
        >
          📊 Interactive Radar Chart
        </button>
        <button 
          class="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          on:click={()