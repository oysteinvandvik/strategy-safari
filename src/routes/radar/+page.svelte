<!-- src/routes/radar/+page.svelte (Enkel og funksjonell versjon) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	
	// Importer din foretrukne radar-komponent
	import RadarPlot from '$lib/components/RadarPlot.svelte';
	// import StableRadarPlot from '$lib/components/StableRadarPlot.svelte';
	
	import type { RadarSchoolData } from '$lib/types';
  
	let radarData: RadarSchoolData[] = [];
	let selectedGroup = 'All';
	let selectedSchools: string[] = [];
	let showMobileFilters = false; // Kun for mobile
	let loading = true;
	let error: string | null = null;
	
	// Animation states
	let pageVisible = false;
  
	// Spring animations for counters
	const selectedCount = spring(0, { stiffness: 0.3, damping: 0.8 });
  
	$: filteredData = selectedGroup === 'All' 
	  ? radarData.filter(school => selectedSchools.length === 0 || selectedSchools.includes(school.school))
	  : radarData.filter(school => 
		  school.group === selectedGroup && 
		  (selectedSchools.length === 0 || selectedSchools.includes(school.school))
		);
  
	$: availableSchools = selectedGroup === 'All' 
	  ? radarData 
	  : radarData.filter(s => s.group === selectedGroup);
  
	// Update spring values
	$: selectedCount.set(selectedSchools.length);
  
	onMount(async () => {
	  try {
		const res = await fetch('/data/radarData.json');
		if (!res.ok) throw new Error('Failed to load radar data');
		radarData = await res.json();
		
		// Initialize with Design and Learning schools
		selectedSchools = ['Design School', 'Learning School'];
		
		// Trigger animations
		setTimeout(() => pageVisible = true, 100);
		
	  } catch (err) {
		error = err instanceof Error ? err.message : 'Unknown error';
	  } finally {
		loading = false;
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
	  selectedSchools = availableSchools.map(s => s.school);
	}
  
	function clearAll() {
	  selectedSchools = [];
	}
  
	function getSchoolGroupColor(group: string) {
	  return group === 'Prescriptive' 
		? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
		: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
	}
  </script>
  
  <svelte:head>
	<title>Interactive Strategy Radar - Strategy Safari</title>
	<meta name="description" content="Explore strategy schools through an interactive radar visualization showing how each school emphasizes the five P's of strategy." />
  </svelte:head>
  
  {#if loading}
	<div class="min-h-screen flex items-center justify-center">
	  <div class="text-center">
		<div class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
		<p class="text-muted-foreground">Loading Strategy Radar...</p>
	  </div>
	</div>
  {:else if error}
	<div class="max-w-2xl mx-auto px-4 py-16">
	  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
		<div class="text-4xl mb-4">⚠️</div>
		<h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Error Loading Data</h2>
		<p class="text-red-600 dark:text-red-400">{error}</p>
	  </div>
	</div>
  {:else}
	<section class="max-w-7xl mx-auto px-4 py-6 md:py-8">
	  <!-- Header -->
	  <div class="mb-6 md:mb-8 transition-all duration-700 transform"
		   class:translate-y-0={pageVisible}
		   class:opacity-100={pageVisible}
		   class:-translate-y-4={!pageVisible}
		   class:opacity-0={!pageVisible}>
		
		<h1 class="text-2xl md:text-3xl font-bold mb-3 text-foreground flex items-center gap-2">
		  <span class="text-xl">🧭</span>
		  Strategy Schools Radar
		</h1>
		<p class="text-muted-foreground text-sm md:text-base mb-4">
		  Visualize how different strategy schools emphasize the five P's framework
		</p>
		
		<!-- Quick stats -->
		<div class="flex gap-4">
		  <div class="px-3 py-1 bg-primary/10 rounded-full text-sm border border-primary/20">
			<span class="font-medium text-primary">{Math.round($selectedCount)}</span>
			<span class="text-muted-foreground">selected</span>
		  </div>
		  <div class="px-3 py-1 bg-secondary/10 rounded-full text-sm border border-secondary/20">
			<span class="font-medium text-secondary-foreground">{availableSchools.length}</span>
			<span class="text-muted-foreground">available</span>
		  </div>
		</div>
	  </div>
  
	  <!-- Mobile Filter Toggle -->
	  <div class="lg:hidden mb-4 transition-all duration-500 transform"
		   class:translate-y-0={pageVisible}
		   class:opacity-100={pageVisible}
		   class:-translate-y-4={!pageVisible}
		   class:opacity-0={!pageVisible}>
		<button
		  on:click={() => showMobileFilters = !showMobileFilters}
		  class="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 hover:bg-muted/50 transition-colors"
		>
		  <span class="font-medium text-card-foreground flex items-center gap-2">
			<span class="text-xl">🎛️</span>
			Filters & Controls
		  </span>
		  <span class="text-muted-foreground transition-transform duration-200" 
				class:rotate-180={showMobileFilters}>
			↓
		  </span>
		</button>
	  </div>
  
	  <div class="grid lg:grid-cols-4 gap-6">
		<!-- Controls Panel - Always visible on desktop, toggleable on mobile -->
		<div class="lg:col-span-1 space-y-4 transition-all duration-500"
			 class:hidden={!showMobileFilters && false} 
			 class:block={showMobileFilters || true}
			 class:lg:block={true}>
		  
		  <!-- Group Filter -->
		  <div class="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
			<h3 class="font-semibold mb-3 text-card-foreground flex items-center gap-2">
			  <span class="text-lg">🏷️</span>
			  Filter by Group
			</h3>
			<select
			  bind:value={selectedGroup}
			  class="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
			>
			  <option value="All">All Schools ({radarData.length})</option>
			  <option value="Prescriptive">Prescriptive ({radarData.filter(s => s.group === 'Prescriptive').length})</option>
			  <option value="Descriptive">Descriptive ({radarData.filter(s => s.group === 'Descriptive').length})</option>
			</select>
		  </div>
  
		  <!-- School Selection -->
		  <div class="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
			<div class="flex justify-between items-center mb-3">
			  <h3 class="font-semibold text-card-foreground flex items-center gap-2">
				<span class="text-lg">🏫</span>
				Select Schools
			  </h3>
			  <div class="flex gap-1">
				<button
				  on:click={selectAll}
				  class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
				>
				  All
				</button>
				<button
				  on:click={clearAll}
				  class="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
				>
				  Clear
				</button>
			  </div>
			</div>
			
			<div class="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
			  {#each availableSchools as school}
				<label class="flex items-center space-x-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors group">
				  <input
					type="checkbox"
					checked={selectedSchools.includes(school.school)}
					on:change={() => toggleSchool(school.school)}
					class="rounded border-border focus:ring-2 focus:ring-primary"
				  />
				  <div class="flex-1 min-w-0">
					<span class="text-card-foreground font-medium block truncate group-hover:text-primary transition-colors">
					  {school.school}
					</span>
					<span class="text-xs px-2 py-0.5 rounded-full {getSchoolGroupColor(school.group)}">
					  {school.group}
					</span>
				  </div>
				</label>
			  {/each}
			</div>
		  </div>
  
		  <!-- Quick Info -->
		  <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-border">
			<h4 class="font-semibold text-card-foreground mb-2 text-sm flex items-center gap-2">
			  <span class="text-lg">💡</span>
			  Quick Info
			</h4>
			<div class="text-xs text-muted-foreground space-y-1">
			  <p>• Select schools to compare their strategic emphasis</p>
			  <p>• Values show strength on each of the 5 P's (1-5 scale)</p>
			  <p>• Prescriptive schools focus on planning</p>
			  <p>• Descriptive schools focus on emergence</p>
			</div>
		  </div>
		</div>
  
		<!-- Chart Section -->
		<div class="lg:col-span-3 transition-all duration-700 transform"
			 class:translate-y-0={pageVisible}
			 class:opacity-100={pageVisible}
			 class:-translate-y-4={!pageVisible}
			 class:opacity-0={!pageVisible}>
		  
		  {#if filteredData.length > 0}
			<!-- Use your preferred radar component here -->
			<RadarPlot {filteredData} />
			
			<!-- Quick Insights -->
			{#if filteredData.length > 1}
			  <div class="mt-6 bg-muted/30 rounded-xl p-4 border border-border">
				<h3 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
				  <span class="text-xl">📈</span>
				  Comparison Insights
				</h3>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
				  {#each ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'] as p, index}
					{@const avgValue = filteredData.reduce((sum, school) => sum + school.values[index], 0) / filteredData.length}
					<div class="text-center p-3 bg-background/50 rounded-lg border border-border/30">
					  <div class="font-bold text-primary text-lg">{avgValue.toFixed(1)}</div>
					  <div class="text-muted-foreground text-xs">{p}</div>
					</div>
				  {/each}
				</div>
			  </div>
			{/if}
			
		  {:else}
			<div class="bg-card border border-border rounded-xl p-12 text-center">
			  <div class="text-6xl mb-4">🤔</div>
			  <h3 class="text-xl font-semibold text-card-foreground mb-2">No schools selected</h3>
			  <p class="text-muted-foreground mb-6">Choose some strategy schools to visualize their emphasis on the five P's.</p>
			  <button
				on:click={() => showMobileFilters = true}
				class="lg:hidden inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
			  >
				<span>🎛️</span>
				Open Filters
			  </button>
			  <button
				on:click={selectAll}
				class="hidden lg:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
			  >
				<span>🚀</span>
				Select All Schools
			  </button>
			</div>
		  {/if}
		</div>
	  </div>
  
	  <!-- Help Text -->
	  <div class="mt-8 text-center">
		<p class="text-sm text-muted-foreground max-w-2xl mx-auto">
		  💡 <strong>Tip:</strong> Compare prescriptive vs descriptive schools to see how they approach strategy differently. 
		  Each school's values show how much they emphasize each of the five P's of strategy.
		</p>
	  </div>
	</section>
  {/if}