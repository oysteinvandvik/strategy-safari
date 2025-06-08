<!-- src/lib/components/BookCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
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
  
    export let book: Book;
    export let viewMode: 'grid' | 'list' = 'grid';
    export let delay = 0;
    export let categories: Record<string, any>;
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      dispatch('select', book);
    }
  
    function getReadingLevelColor(level: string) {
      switch (level) {
        case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      }
    }
  
    function getCategoryColor(category: string) {
      return categories[category]?.color || '#6B7280';
    }
  
    function getTopVoices() {
      return Object.entries(book.voices_emphasis)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
        .filter(([,value]) => value >= 4);
    }
  
    function formatAuthors(authors: string[]) {
      if (authors.length === 1) return authors[0];
      if (authors.length === 2) return authors.join(' & ');
      return `${authors[0]} et al.`;
    }
  
    function handleImageError(event: Event) {
      const img = event.target as HTMLImageElement;
      img.src = `https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=${encodeURIComponent(book.title.slice(0, 20))}`;
    }
  </script>
  
  {#if viewMode === 'grid'}
    <!-- Grid View -->
    <div
      in:scale={{ duration: 400, delay, easing: quintOut }}
      class="group bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      on:click={handleClick}
      on:keydown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabindex="0"
    >
      <!-- Cover Image -->
      <div class="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.cover_medium}
          alt="{book.title} cover"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          on:error={handleImageError}
          loading="lazy"
        />
        
        <!-- Reading Level Badge -->
        <div class="absolute top-2 left-2">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getReadingLevelColor(book.reading_level)}">
            {book.reading_level}
          </span>
        </div>
        
        <!-- Category Badge -->
        <div class="absolute top-2 right-2">
          <div 
            class="w-3 h-3 rounded-full border-2 border-white shadow-sm"
            style="background-color: {getCategoryColor(book.category)}"
            title="{categories[book.category]?.name || book.category}"
          ></div>
        </div>
        
        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="bg-white/90 dark:bg-black/90 rounded-full p-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Content -->
      <div class="p-4">
        <!-- Title & Author -->
        <h3 class="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p class="text-sm text-muted-foreground mb-3">
          {formatAuthors(book.authors)} • {book.publication_year}
        </p>
  
        <!-- Description -->
        <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {book.description}
        </p>
  
        <!-- Voice Emphasis -->
        {#if getTopVoices().length > 0}
          <div class="mb-3">
            <div class="flex flex-wrap gap-1">
              {#each getTopVoices() as [voice, emphasis]}
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                  {voice} ({emphasis}/5)
                </span>
              {/each}
            </div>
          </div>
        {/if}
  
        <!-- Footer -->
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>{book.page_count} pages</span>
          <span>→</span>
        </div>
      </div>
    </div>
  
  {:else}
    <!-- List View -->
    <div
      in:scale={{ duration: 400, delay, easing: quintOut }}
      class="group bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      on:click={handleClick}
      on:keydown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabindex="0"
    >
      <div class="flex gap-6">
        <!-- Cover Image -->
        <div class="flex-shrink-0">
          <div class="w-24 h-32 rounded-lg overflow-hidden bg-muted">
            <img
              src={book.cover_small}
              alt="{book.title} cover"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              on:error={handleImageError}
              loading="lazy"
            />
          </div>
        </div>
  
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-xl leading-tight mb-1 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p class="text-muted-foreground">
                {formatAuthors(book.authors)} • {book.publisher} • {book.publication_year}
              </p>
            </div>
            
            <!-- Badges -->
            <div class="flex items-center gap-2 ml-4">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getReadingLevelColor(book.reading_level)}">
                {book.reading_level}
              </span>
              <div 
                class="w-4 h-4 rounded-full border border-gray-200"
                style="background-color: {getCategoryColor(book.category)}"
                title="{categories[book.category]?.name || book.category}"
              ></div>
            </div>
          </div>
  
          <!-- Description -->
          <p class="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {book.description}
          </p>
  
          <!-- Voice Emphasis & Tags -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <!-- Top Voices -->
              {#if getTopVoices().length > 0}
                <div class="flex flex-wrap gap-1">
                  {#each getTopVoices() as [voice, emphasis]}
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {voice} ({emphasis}/5)
                    </span>
                  {/each}
                </div>
              {/if}
              
              <!-- Paradoxes -->
              {#if book.paradoxes_explored.length > 0}
                <div class="flex flex-wrap gap-1">
                  {#each book.paradoxes_explored.slice(0, 2) as paradox}
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {paradox}
                    </span>
                  {/each}
                  {#if book.paradoxes_explored.length > 2}
                    <span class="text-xs text-muted-foreground">+{book.paradoxes_explored.length - 2} more</span>
                  {/if}
                </div>
              {/if}
            </div>
  
            <!-- Meta Info -->
            <div class="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{book.page_count} pages</span>
              <span class="group-hover:text-primary transition-colors">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>