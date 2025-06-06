<script lang="ts">
	import { onMount } from 'svelte';
	import RadarPlot from '$lib/components/RadarPlot.svelte';
	import type { RadarSchoolData } from '$lib/types';
  
	let radarData: RadarSchoolData[] = [];
	let selectedGroup = 'All';
	let selectedSchools: string[] = [];
	
	$: filteredData = selectedGroup === 'All' 
	  ? radarData.filter(school => selectedSchools.length === 0 || selectedSchools.includes(school.school))
	  : radarData.filter(school => 
		  school.group === selectedGroup && 
		  (selectedSchools.length === 0 || selectedSchools.includes(school.school))
		);
  
	onMount(async () => {
	  try {
		const res = await fetch('/data/radarData.json');
		if (!res.ok) throw new Error('Failed to load radar data');
		radarData = await res.json();
		
		// Initialize with Design and Learning schools selected
		selectedSchools = ['Design School', 'Learning School'];
	  } catch (error) {
		console.error('Error loading radar data:', error);
	  }
	});
  
	function toggleSchool(schoolName: string) {
	  if (selectedSchools.includes(schoolName)) {
		selectedSchools = selectedSchools.filter(s => s !== schoolName);
	  } else {
		selectedSchools = [...selectedSchools, schoolName];
	  }
	}
  
	function selectAll() {
	  const availableSchools = selectedGroup === 'All' 
		? radarData.map(s => s.school)
		: radarData.filter(s => s.group === selectedGroup).map(s => s.school);
	  selectedSchools = availableSchools;
	}
  
	function clearAll() {
	  selectedSchools = [];
	}
  </script>
  
  <section class="max-w-6xl mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6 text-foreground">Strategy Schools Radar</h1>
	
	<div class="grid lg:grid-cols-4 gap-6">
	  <!-- Controls -->
	  <div class="lg:col-span-1 space-y-4">
		<div class="bg-card border border-border rounded-lg p-4">
		  <h3 class="font-semibold mb-3 text-card-foreground">Filter by Group</h3>
		  <select
			bind:value={selectedGroup}
			class="w-full bg-background text-foreground border border-border rounded px-3 py-2"
		  >
			<option value="All">All Schools</option>
			<option value="Prescriptive">Prescriptive</option>
			<option value="Descriptive">Descriptive</option>
		  </select>
		</div>
  
		<div class="bg-card border border-border rounded-lg p-4">
		  <div class="flex justify-between items-center mb-3">
			<h3 class="font-semibold text-card-foreground">Select Schools</h3>
			<div class="space-x-1">
			  <button
				on:click={selectAll}
				class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-80"
			  >
				All
			  </button>
			  <button
				on:click={clearAll}
				class="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:opacity-80"
			  >
				Clear
			  </button>
			</div>
		  </div>
		  
		  <div class="space-y-2 max-h-64 overflow-y-auto">
			{#each radarData.filter(school => selectedGroup === 'All' || school.group === selectedGroup) as school}
			  <label class="flex items-center space-x-2 text-sm cursor-pointer">
				<input
				  type="checkbox"
				  checked={selectedSchools.includes(school.school)}
				  on:change={() => toggleSchool(school.school)}
				  class="rounded border-border"
				/>
				<span class="text-card-foreground">{school.school}</span>
				<span class="text-xs text-muted-foreground">({school.group})</span>
			  </label>
			{/each}
		  </div>
		</div>
	  </div>
  
	  <!-- Radar Chart -->
	  <div class="lg:col-span-3">
		{#if filteredData.length > 0}
		  <RadarPlot {filteredData} />
		{:else}
		  <div class="bg-card border border-border rounded-lg p-8 text-center">
			<p class="text-muted-foreground">No schools selected. Choose some schools to visualize.</p>
		  </div>
		{/if}
	  </div>
	</div>
  
	<!-- Legend -->
	<div class="mt-6 bg-card border border-border rounded-lg p-4">
	  <h3 class="font-semibold mb-2 text-card-foreground">The Five P's of Strategy</h3>
	  <div class="grid md:grid-cols-5 gap-4 text-sm">
		<div>
		  <strong class="text-card-foreground">Plan:</strong>
		  <span class="text-muted-foreground">Deliberate strategy</span>
		</div>
		<div>
		  <strong class="text-card-foreground">Pattern:</strong>
		  <span class="text-muted-foreground">Emergent strategy</span>
		</div>
		<div>
		  <strong class="text-card-foreground">Position:</strong>
		  <span class="text-muted-foreground">Market positioning</span>
		</div>
		<div>
		  <strong class="text-card-foreground">Perspective:</strong>
		  <span class="text-muted-foreground">Shared mindset</span>
		</div>
		<div>
		  <strong class="text-card-foreground">Ploy:</strong>
		  <span class="text-muted-foreground">Tactical maneuver</span>
		</div>
	  </div>
	</div>
  </section>