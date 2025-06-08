<!-- src/lib/components/LibraryOverview.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import BookCard from '$lib/components/BookCard.svelte';
    import BookFilters from '$lib/components/BookFilters.svelte';
  
    interface Book {
      id: string;
      title: string;
      authors: string[];
      isbn: string;
      publication_year: number;
      publisher: string;
      description: string;
      category: string;
      cover_url: string;
      cover_medium: string;
      cover_small: string;
      openlibrary_url: string;
      voices_emphasis: {
        plan: number;
        pattern: number;
        position: number;
        perspective: number;
        ploy: number;
      };
      paradoxes_explored: string[];
      paradox_position?: string;
      tags: string[];
      reading_level: string;
      page_count: number;
    }
  
    interface LibraryData {
      library: {
        title: string;
        description: string;
        total_books: number;
      };
      books: Book[];
      categories: Record<string, any>;
    }
  
    let libraryData: LibraryData | null = null;
    let filteredBooks: Book[] = [];
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;
  
    // Filter states
    let selectedCategory = 'all';
    let selectedVoice = 'all';
    let selectedParadox = 'all';
    let selectedLevel = 'all';
    let searchQuery = '';
    let viewMode: 'grid' | 'list' = 'grid';
    let sortBy: 'title' | 'year' | 'relevance' = 'relevance';
  
    onMount(async () => {
      try {
        const res = await fetch('/data/books.json');
        if (!res.ok) throw new Error('Failed to load library data');
        libraryData = await res.json();
        
        applyFilters();
        setTimeout(() => sectionsVisible = true, 100);
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading = false;
      }
    });
  
    function applyFilters() {
      if (!libraryData) return;
      
      let books = libraryData.books.filter(book => {
        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) return false;
        
        // Voice filter - check if book has strong emphasis (4-5) on selected voice
        if (selectedVoice !== 'all') {
          const emphasis = book.voices_emphasis[selectedVoice as keyof typeof book.voices_emphasis];
          if (emphasis < 4) return false;
        }
        
        // Paradox filter
        if (selectedParadox !== 'all' && !book.paradoxes_explored.includes(selectedParadox)) return false;
        
        // Reading level filter
        if (selectedLevel !== 'all' && book.reading_level !== selectedLevel) return false;
        
        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const searchableText = [
            book.title,
            book.authors.join(' '),
            book.description,
            ...book.tags
          ].join(' ').toLowerCase();
          
          if (!searchableText.includes(query)) return false;
        }
        
        return true;
      });
  
      // Apply sorting
      books.sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'year':
            return b.publication_year - a.publication_year;
          case 'relevance':
          default:
            // If searching, sort by relevance; otherwise by category then title
            if (searchQuery) {
              const aScore = calculateRelevanceScore(a, searchQuery);
              const bScore = calculateRelevanceScore(b, searchQuery);
              return bScore - aScore;
            }
            return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
        }
      });
  
      filteredBooks = books;
    }
  
    function calculateRelevanceScore(book: Book, query: string): number {
      let score = 0;
      const q = query.toLowerCase();
      
      if (book.title.toLowerCase().includes(q)) score += 10;
      if (book.authors.some(author => author.toLowerCase().includes(q))) score += 8;
      if (book.description.toLowerCase().includes(q)) score += 5;
      if (book.tags.some(tag => tag.toLowerCase().includes(q))) score += 3;
      
      return score;
    }
  
    function handleFiltersChanged(event: CustomEvent) {
      const filters = event.detail;
      selectedCategory = filters.category;
      selectedVoice = filters.voice;
      selectedParadox = filters.paradox;
      selectedLevel = filters.level;
      searchQuery = filters.search;
      sortBy = filters.sort;
      viewMode = filters.view;
      
      applyFilters();
    }
  
    function handleBookSelect(event: CustomEvent<Book>) {
      const book = event.detail;
      goto(`/library/${book.id}`);
    }
  
    function getCategoryStats() {
      if (!libraryData) return {};
      
      const stats: Record<string, number> = {};
      libraryData.books.forEach(book => {
        stats[book.category] = (stats[book.category] || 0) + 1;
      });
      return stats;
    }
  
    function getVoiceStats() {
      if (!libraryData) return {};
      
      const stats: Record<string, number> = { plan: 0, pattern: 0, position: 0, perspective: 0, ploy: 0 };
      libraryData.books.forEach(book => {
        Object.entries(book.voices_emphasis).forEach(([voice, emphasis]) => {
          if (emphasis >= 4) stats[voice]++;
        });
      });
      return stats;
    }
  </script>
  
  {#if loading}
    <div class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p class="text-muted-foreground">Loading strategy library...</p>
      </div>
    </div>
  {:else if error}
    <div class="text-center py-12">
      <div class="text-red-500 text-6xl mb-4">📚</div>
      <h2 class="text-xl font-semibold mb-2">Failed to Load Library</h2>
      <p class="text-muted-foreground">{error}</p>
    </div>
  {:else if libraryData}
    <!-- Hero Section -->
    {#if sectionsVisible}
      <section 
        in:fly={{ y: 30, duration: 600, easing: quintOut }}
        class="text-center mb-12"
      >
        <div class="relative inline-block">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            📚 Strategy Library
          </h1>
          <div class="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-600/10 to-red-600/10 rounded-lg blur-xl -z-10"></div>
        </div>
        
        <p class="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
          {libraryData.library.description}
        </p>
        
        <!-- Quick Stats -->
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-primary rounded-full"></span>
            <span>{libraryData.library.total_books} Essential Books</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>{Object.keys(libraryData.categories).length} Categories</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>5 Strategic Voices</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span>9 Strategic Paradoxes</span>
          </div>
        </div>
      </section>
    {/if}
  
    <!-- Filters Section -->
    {#if sectionsVisible}
      <section 
        in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
        class="mb-8"
      >
        <BookFilters
          categories={libraryData.categories}
          categoryStats={getCategoryStats()}
          voiceStats={getVoiceStats()}
          totalBooks={libraryData.library.total_books}
          filteredCount={filteredBooks.length}
          on:filtersChanged={handleFiltersChanged}
        />
      </section>
    {/if}
  
    <!-- Results Section -->
    {#if sectionsVisible}
      <section 
        in:fly={{ y: 30, duration: 500, delay: 400, easing: quintOut }}
      >
        <!-- Results Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold">
              {#if searchQuery}
                Search Results
              {:else if selectedCategory !== 'all'}
                {libraryData.categories[selectedCategory]?.name || 'Books'}
              {:else}
                All Books
              {/if}
            </h2>
            <p class="text-muted-foreground">
              {filteredBooks.length} of {libraryData.library.total_books} books
              {#if searchQuery}for "{searchQuery}"{/if}
            </p>
          </div>
          
          <!-- View Toggle -->
          <div class="flex items-center gap-2">
            <button
              class="p-2 rounded-md {viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} hover:opacity-80 transition-colors"
              on:click={() => {viewMode = 'grid'; applyFilters();}}
              title="Grid view"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button
              class="p-2 rounded-md {viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} hover:opacity-80 transition-colors"
              on:click={() => {viewMode = 'list'; applyFilters();}}
              title="List view"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Books Grid/List -->
        {#if filteredBooks.length === 0}
          <div class="text-center py-16 bg-card rounded-lg border">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold mb-2">No Books Found</h3>
            <p class="text-muted-foreground mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              on:click={() => {
                selectedCategory = 'all';
                selectedVoice = 'all';
                selectedParadox = 'all';
                selectedLevel = 'all';
                searchQuery = '';
                applyFilters();
              }}
            >
              Clear All Filters
            </button>
          </div>
        {:else}
          <div class="{viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}">
            {#each filteredBooks as book, index}
              <BookCard 
                {book}
                {viewMode}
                delay={index * 50}
                categories={libraryData.categories}
                on:select={handleBookSelect}
              />
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  
    <!-- Call to Action -->
    {#if sectionsVisible && filteredBooks.length > 0}
      <section 
        in:scale={{ duration: 500, delay: 800, easing: quintOut }}
        class="text-center py-12 mt-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border"
      >
        <h3 class="text-2xl font-semibold mb-4">Discover Your Strategic Reading Path</h3>
        <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Use your Strategic Explorer profile to find books that match your strategic preferences and paradox positions.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            class="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
            on:click={() => goto('/landscapes/profile')}
          >
            View My Profile
          </button>
          <button 
            class="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            on:click={() => goto('/about')}
          >
            Learn More
          </button>
        </div>
      </section>
    {/if}
  {/if}