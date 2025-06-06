<script lang="ts">
  import { onMount } from 'svelte';
  import type { RadarSchoolData, SchoolInfo } from '$lib/types';

  let radarData: RadarSchoolData[] = [];
  let schoolsInfo: SchoolInfo[] = [];
  let selectedGroup: 'All' | 'Prescriptive' | 'Descriptive' = 'All';

  $: filteredSchools = selectedGroup === 'All' 
    ? radarData 
    : radarData.filter(school => school.group === selectedGroup);

  onMount(async () => {
    try {
      // Load radar data
      const radarRes = await fetch('/data/radarData.json');
      if (!radarRes.ok) throw new Error('Failed to load radar data');
      radarData = await radarRes.json();

      // Load schools info  
      const schoolsRes = await fetch('/data/schools.json');
      if (!schoolsRes.ok) throw new Error('Failed to load schools data');
      schoolsInfo = await schoolsRes.json();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });

  function getSchoolInfo(schoolName: string): SchoolInfo | undefined {
    return schoolsInfo.find(info => 
      info.name.toLowerCase().includes(schoolName.toLowerCase().split(' ')[0])
    );
  }

  function getPLabel(index: number): string {
    const labels = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
    return labels[index] || '';
  }
</script>

<section class="max-w-6xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6 text-foreground">Strategy Schools Overview</h1>

  <!-- Filter buttons -->
  <div class="mb-6 flex gap-2 flex-wrap">
    <button 
      on:click={() => selectedGroup = 'All'}
      class="px-4 py-2 rounded-lg font-medium transition-colors"
      class:bg-primary={selectedGroup === 'All'}
      class:text-primary-foreground={selectedGroup === 'All'}
      class:bg-secondary={selectedGroup !== 'All'}
      class:text-secondary-foreground={selectedGroup !== 'All'}
    >
      All Schools ({radarData.length})
    </button>
    <button 
      on:click={() => selectedGroup = 'Prescriptive'}
      class="px-4 py-2 rounded-lg font-medium transition-colors"
      class:bg-primary={selectedGroup === 'Prescriptive'}
      class:text-primary-foreground={selectedGroup === 'Prescriptive'}
      class:bg-secondary={selectedGroup !== 'Prescriptive'}
      class:text-secondary-foreground={selectedGroup !== 'Prescriptive'}
    >
      Prescriptive ({radarData.filter(s => s.group === 'Prescriptive').length})
    </button>
    <button 
      on:click={() => selectedGroup = 'Descriptive'}
      class="px-4 py-2 rounded-lg font-medium transition-colors"
      class:bg-primary={selectedGroup === 'Descriptive'}
      class:text-primary-foreground={selectedGroup === 'Descriptive'}
      class:bg-secondary={selectedGroup !== 'Descriptive'}
      class:text-secondary-foreground={selectedGroup !== 'Descriptive'}
    >
      Descriptive ({radarData.filter(s => s.group === 'Descriptive').length})
    </button>
  </div>

  <!-- Schools grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each filteredSchools as school}
      {@const schoolInfo = getSchoolInfo(school.school)}
      <div class="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="mb-4">
          <h2 class="text-xl font-semibold text-card-foreground mb-2">{school.school}</h2>
          <span class="inline-block px-2 py-1 text-xs font-medium rounded-full"
                class:bg-blue-100={school.group === 'Prescriptive'}
                class:text-blue-800={school.group === 'Prescriptive'}
                class:bg-green-100={school.group === 'Descriptive'}
                class:text-green-800={school.group === 'Descriptive'}>
            {school.group}
          </span>
        </div>

        {#if schoolInfo}
          <p class="text-sm text-muted-foreground mb-4">{schoolInfo.description}</p>
        {/if}

        <!-- Five P's values -->
        <div class="space-y-2">
          <h3 class="font-medium text-card-foreground mb-2">Five P's Emphasis:</h3>
          {#each school.values as value, index}
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium w-20 text-card-foreground">{getPLabel(index)}:</span>
              <div class="flex-1 bg-muted rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full transition-all duration-300"
                  style="width: {(value / 5) * 100}%"
                ></div>
              </div>
              <span class="text-sm text-muted-foreground w-8">{value}/5</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredSchools.length === 0}
    <div class="text-center py-12">
      <p class="text-muted-foreground">No schools found for the selected group.</p>
    </div>
  {/if}
</section>