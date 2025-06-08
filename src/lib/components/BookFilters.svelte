<!-- src/lib/components/BookFilters.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    export let categories: Record<string, any>;
    export let categoryStats: Record<string, number>;
    export let voiceStats: Record<string, number>;
    export let totalBooks: number;
    export let filteredCount: number;
  
    const dispatch = createEventDispatcher();
  
    let selectedCategory = 'all';
    let selectedVoice = 'all';
    let selectedParadox = 'all';
    let selectedLevel = 'all';
    let searchQuery = '';
    let sortBy: 'title' | 'year' | 'relevance' = 'relevance';
    let viewMode: 'grid' | 'list' = 'grid';
    let showAdvanced = false;
  
    const voices = [
      { id: 'plan', label: 'Plan', icon: '📋' },
      { id: 'pattern', label: 'Pattern', icon: '🔄' },
      { id: 'position', label: 'Position', icon: '🎯' },
      { id: 'perspective', label: 'Perspective', icon: '👁️' },
      { id: 'ploy', label: 'Ploy', icon: '🎭' }
    ];
  
    const paradoxes = [
      { id: 'thinking', label: 'Thinking', group: 'Process' },
      { id: 'formation', label: 'Formation', group: 'Process' },
      { id: 'change', label: 'Change', group: 'Process' },
      { id: 'locus', label: 'Locus', group: 'Content' },
      { id: 'response', label: 'Response', group: 'Content' },
      { id: 'network', label: 'Network', group: 'Content' },
      { id: 'industrial', label: 'Industrial', group: 'Context' },
      { id: 'organizational', label: 'Organizational', group: 'Context' },
      { id: 'geographical', label: 'Geographical', group: 'Context' }
    ];
  
    const readingLevels = [
      { id: 'beginner', label: 'Beginner', icon: '🌱' },
      { id: 'intermediate', label: 'Intermediate', icon: '🌿' },
      { id: 'advanced', label: 'Advanced', icon: '🌳' }
    ];
  
    function emitFilters() {
      dispatch('filtersChanged', {
        category: selectedCategory,
        voice: selectedVoice,
        paradox: selectedParadox,
        level: selectedLevel,
        search: searchQuery,
        sort: sortBy,
        view: viewMode
      });
    }
  
    function clearAllFilters() {
      selectedCategory = 'all';
      selectedVoice = 'all';
      selectedParadox = 'all';
      selectedLevel = 'all';
      searchQuery = '';
      sortBy = 'relevance';
      emitFilters();
    }
  
    function hasActiveFilters() {
      return selectedCategory !== 'all' || 
             selectedVoice !== 'all' || 
             selectedParadox !== 'all' || 
             selectedLevel !== 'all' || 
             searchQuery !== '';
    }
  
    // Reactive updates
    $: if (selectedCategory || selectedVoice || selectedParadox || selectedLevel || searchQuery || sortBy || viewMode) {
      emitFilters();
    }
  </script>
  
  <div class="bg-card border rounded-lg p-6 mb-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-semibold mb-1">Filter & Search</h2>
        <p class="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalBooks} books
          {#if hasActiveFilters()}
            • <button class="text-primary hover:underline" on:click={clearAllFilters}>Clear all filters</button>
          {/if}
        </p>
      </div>
      
      <button
        class="flex items-center gap-2 px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        on:click={() => showAdvanced = !showAdvanced}
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced
        <svg class="w-4 h-4 transform {showAdvanced ? 'rotate-180' : ''} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  
    <!-- Search -->
    <div class="mb-6">
      <label for="search" class="block text-sm font-medium mb-2">Search books</label>
      <div class="relative">
        <input
          id="search"
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, author, or keywords..."
          class="w-full px-4 py-2 pl-10 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        {#if searchQuery}
          <button
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            on:click={() => searchQuery = ''}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {/if}
      </div>
    </div>
  
    <!-- Quick Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium mb-2">Category</label>
        <select 
          bind:value={selectedCategory}
          class="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Categories ({totalBooks})</option>
          {#each Object.entries(categories) as [key, category]}
            <option value={key}>{category.name} ({categoryStats[key] || 0})</option>
          {/each}
        </select>
      </div>
  
      <!-- Voice Filter -->
      <div>
        <label class="block text-sm font-medium mb-2">Strategic Voice</label>
        <select 
          bind:value={selectedVoice}
          class="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Voices</option>
          {#each voices as voice}
            <option value={voice.id}>{voice.icon} {voice.label} ({voiceStats[voice.id] || 0})</option>
          {/each}
        </select>
      </div>
  
      <!-- Reading Level Filter -->
      <div>
        <label class="block text-sm font-medium mb-2">Reading Level</label>
        <select 
          bind:value={selectedLevel}
          class="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Levels</option>
          {#each readingLevels as level}
            <option value={level.id}>{level.icon} {level.label}</option>
          {/each}
        </select>
      </div>
  
      <!-- Sort -->
      <div>
        <label class="block text-sm font-medium mb-2">Sort by</label>
        <select 
          bind:value={sortBy}
          class="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="relevance">Relevance</option>
          <option value="title">Title A-Z</option>
          <option value="year">Newest First</option>
        </select>
      </div>
    </div>
  
    <!-- Advanced Filters -->
    {#if showAdvanced}
      <div in:slide={{ duration: 300, easing: quintOut }} class="border-t pt-6">
        <h3 class="text-lg font-medium mb-4">Advanced Filters</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Strategic Voices Detail -->
          <div>
            <h4 class="font-medium mb-3">Strategic Voices (High Emphasis)</h4>
            <div class="space-y-2">
              {#each voices as voice}
                <label class="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 cursor-pointer">
                  <input
                    type="radio"
                    bind:group={selectedVoice}
                    value={voice.id}
                    class="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span class="text-lg">{voice.icon}</span>
                  <span class="flex-1">{voice.label}</span>
                  <span class="text-sm text-muted-foreground">({voiceStats[voice.id] || 0})</span>
                </label>
              {/each}
              <label class="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 cursor-pointer">
                <input
                  type="radio"
                  bind:group={selectedVoice}
                  value="all"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="text-lg">🎯</span>
                <span class="flex-1">All Voices</span>
              </label>
            </div>
          </div>
  
          <!-- Strategic Paradoxes -->
          <div>
            <h4 class="font-medium mb-3">Strategic Paradoxes</h4>
            <div class="space-y-3">
              {#each ['Process', 'Content', 'Context'] as group}
                <div>
                  <h5 class="text-sm font-medium text-muted-foreground mb-2">{group}</h5>
                  <div class="space-y-1 ml-2">
                    {#each paradoxes.filter(p => p.group === group) as paradox}
                      <label class="flex items-center gap-2 p-1 rounded-md hover:bg-secondary/50 cursor-pointer">
                        <input
                          type="radio"
                          bind:group={selectedParadox}
                          value={paradox.id}
                          class="w-3 h-3 text-primary focus:ring-primary"
                        />
                        <span class="text-sm">{paradox.label}</span>
                      </label>
                    {/each}
                  </div>
                </div>
              {/each}
              <label class="flex items-center gap-2 p-1 rounded-md hover:bg-secondary/50 cursor-pointer mt-3">
                <input
                  type="radio"
                  bind:group={selectedParadox}
                  value="all"
                  class="w-3 h-3 text-primary focus:ring-primary"
                />
                <span class="text-sm font-medium">All Paradoxes</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    {/if}
  
    <!-- Active Filters Summary -->
    {#if hasActiveFilters()}
      <div in:fly={{ y: 20, duration: 300 }} class="border-t pt-4 mt-4">
        <h4 class="text-sm font-medium mb-2">Active Filters:</h4>
        <div class="flex flex-wrap gap-2">
          {#if selectedCategory !== 'all'}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Category: {categories[selectedCategory]?.name}
              <button class="hover:text-blue-600" on:click={() => selectedCategory = 'all'}>×</button>
            </span>
          {/if}
          {#if selectedVoice !== 'all'}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              Voice: {voices.find(v => v.id === selectedVoice)?.label}
              <button class="hover:text-purple-600" on:click={() => selectedVoice = 'all'}>×</button>
            </span>
          {/if}
          {#if selectedParadox !== 'all'}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Paradox: {paradoxes.find(p => p.id === selectedParadox)?.label}
              <button class="hover:text-green-600" on:click={() => selectedParadox = 'all'}>×</button>
            </span>
          {/if}
          {#if selectedLevel !== 'all'}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
              Level: {readingLevels.find(l => l.id === selectedLevel)?.label}
              <button class="hover:text-orange-600" on:click={() => selectedLevel = 'all'}>×</button>
            </span>
          {/if}
          {#if searchQuery}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
              Search: "{searchQuery}"
              <button class="hover:text-gray-600" on:click={() => searchQuery = ''}>×</button>
            </span>
          {/if}
        </div>
      </div>
    {/if}
  </div>