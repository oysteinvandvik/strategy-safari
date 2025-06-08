<!-- src/lib/components/BookDetail.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    interface Book {
      id: string;
      title: string;
      authors: string[];
      isbn: string;
      isbn_10: string;
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
  
    export let bookId: string;
  
    let book: Book | null = null;
    let allBooks: Book[] = [];
    let categories: Record<string, any> = {};
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;
  
    onMount(async () => {
      try {
        const res = await fetch('/data/books.json');
        if (!res.ok) throw new Error('Failed to load books data');
        const data = await res.json();
        
        allBooks = data.books;
        categories = data.categories;
        book = allBooks.find(b => b.id === bookId) || null;
        
        if (!book) {
          error = `Book "${bookId}" not found`;
        } else {
          setTimeout(() => sectionsVisible = true, 100);
        }
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading = false;
      }
    });
  
    function getVoiceColor(voice: string): string {
      const colors = {
        plan: 'bg-blue-500',
        pattern: 'bg-green-500',
        position: 'bg-orange-500',
        perspective: 'bg-purple-500',
        ploy: 'bg-red-500'
      };
      return colors[voice as keyof typeof colors] || 'bg-gray-500';
    }
  
    function getVoiceIcon(voice: string): string {
      const icons = {
        plan: '📋',
        pattern: '🔄',
        position: '🎯',
        perspective: '👁️',
        ploy: '🎭'
      };
      return icons[voice as keyof typeof icons] || '❓';
    }
  
    function getReadingLevelInfo(level: string) {
      const levels = {
        beginner: { icon: '🌱', color: 'text-green-600', description: 'Great for newcomers to strategy' },
        intermediate: { icon: '🌿', color: 'text-yellow-600', description: 'Requires some strategy background' },
        advanced: { icon: '🌳', color: 'text-red-600', description: 'Best for experienced strategists' }
      };
      return levels[level as keyof typeof levels] || { icon: '❓', color: 'text-gray-600', description: 'Unknown level' };
    }
  
    function getRelatedBooks(): Book[] {
      if (!book) return [];
      
      return allBooks
        .filter(b => b.id !== book.id)
        .filter(b => 
          b.category === book.category || 
          b.paradoxes_explored.some(p => book.paradoxes_explored.includes(p)) ||
          Object.entries(b.voices_emphasis).some(([voice, emphasis]) => 
            book.voices_emphasis[voice as keyof typeof book.voices_emphasis] >= 4 && emphasis >= 4
          )
        )
        .slice(0, 4);
    }
  
    function formatAuthors(authors: string[]): string {
      if (authors.length === 1) return authors[0];
      if (authors.length === 2) return authors.join(' & ');
      if (authors.length === 3) return `${authors[0]}, ${authors[1]} & ${authors[2]}`;
      return `${authors[0]} et al.`;
    }
  
    function handleImageError(event: Event) {
      const img = event.target as HTMLImageElement;
      img.src = `https://via.placeholder.com/400x600/f3f4f6/9ca3af?text=${encodeURIComponent(book?.title.slice(0, 20) || 'Book')}`;
    }
  </script>
  
  {#if loading}
    <div class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p class="text-muted-foreground">Loading book details...</p>
      </div>
    </div>
  {:else if error}
    <div class="text-center py-12">
      <div class="text-red-500 text-6xl mb-4">📚</div>
      <h2 class="text-xl font-semibold mb-2">Book Not Found</h2>
      <p class="text-muted-foreground mb-6">{error}</p>
      <button 
        class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        on:click={() => goto('/library')}
      >
        Back to Library
      </button>
    </div>
  {:else if book}
    <!-- Breadcrumb -->
    {#if sectionsVisible}
      <nav 
        in:fly={{ y: -20, duration: 500, easing: quintOut }}
        class="mb-8"
      >
        <ol class="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <a href="/library" class="hover:text-foreground transition-colors">Library</a>
          </li>
          <li>→</li>
          <li>
            <a href="/library?category={book.category}" class="hover:text-foreground transition-colors">
              {categories[book.category]?.name || book.category}
            </a>
          </li>
          <li>→</li>
          <li class="text-foreground font-medium">{book.title}</li>
        </ol>
      </nav>
    {/if}
  
    <!-- Main Content -->
    <div class="grid lg:grid-cols-3 gap-12">
      <!-- Book Cover & Quick Info -->
      {#if sectionsVisible}
        <div 
          in:scale={{ duration: 600, easing: quintOut }}
          class="lg:col-span-1"
        >
          <!-- Cover Image -->
          <div class="relative mb-6">
            <div class="aspect-[3/4] w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-muted">
              <img
                src={book.cover_url}
                alt="{book.title} cover"
                class="w-full h-full object-cover"
                on:error={handleImageError}
              />
            </div>
            
            <!-- Category Badge -->
            <div class="absolute top-4 right-4">
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                style="background-color: {categories[book.category]?.color || '#6B7280'}"
              >
                {categories[book.category]?.name || book.category}
              </span>
            </div>
          </div>
  
          <!-- Quick Actions -->
          <div class="space-y-3">
            <a
              href={book.openlibrary_url}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View on OpenLibrary
            </a>
            
            <button
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              on:click={() => goto('/library')}
            >
              ← Back to Library
            </button>
          </div>
  
          <!-- Reading Level -->
          <div class="mt-6 p-4 bg-card border rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">{getReadingLevelInfo(book.reading_level).icon}</span>
              <div>
                <h3 class="font-medium capitalize">{book.reading_level} Level</h3>
                <p class="text-sm text-muted-foreground">{getReadingLevelInfo(book.reading_level).description}</p>
              </div>
            </div>
          </div>
        </div>
      {/if}
  
      <!-- Book Details -->
      {#if sectionsVisible}
        <div 
          in:fly={{ y: 30, duration: 600, delay: 200, easing: quintOut }}
          class="lg:col-span-2 space-y-8"
        >
          <!-- Header -->
          <div>
            <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {book.title}
            </h1>
            
            <div class="flex flex-wrap items-center gap-4 text-lg text-muted-foreground mb-6">
              <span>by {formatAuthors(book.authors)}</span>
              <span>•</span>
              <span>{book.publisher}</span>
              <span>•</span>
              <span>{book.publication_year}</span>
              <span>•</span>
              <span>{book.page_count} pages</span>
            </div>
  
            <p class="text-lg leading-relaxed text-muted-foreground">
              {book.description}
            </p>
          </div>
  
          <!-- Strategic Voice Analysis -->
          <div class="bg-card border rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Strategic Voice Emphasis</h2>
            <p class="text-muted-foreground mb-6">
              How strongly this book emphasizes each of the five P's of strategy
            </p>
            
            <div class="space-y-4">
              {#each Object.entries(book.voices_emphasis) as [voice, emphasis]}
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 w-32">
                    <span class="text-xl">{getVoiceIcon(voice)}</span>
                    <span class="font-medium capitalize">{voice}</span>
                  </div>
                  
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          class="h-2 rounded-full {getVoiceColor(voice)} transition-all duration-500"
                          style="width: {emphasis * 20}%"
                        ></div>
                      </div>
                      <span class="text-sm font-medium w-12">{emphasis}/5</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
  
          <!-- Strategic Paradoxes -->
          {#if book.paradoxes_explored.length > 0}
            <div class="bg-card border rounded-lg p-6">
              <h2 class="text-xl font-semibold mb-4">Strategic Paradoxes Explored</h2>
              <p class="text-muted-foreground mb-6">
                This book addresses these fundamental strategic tensions
              </p>
              
              <div class="flex flex-wrap gap-3">
                {#each book.paradoxes_explored as paradox}
                  <a
                    href="/landscapes/{paradox}"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <span class="capitalize">{paradox}</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                {/each}
              </div>
            </div>
          {/if}
  
          <!-- Tags -->
          {#if book.tags.length > 0}
            <div class="bg-card border rounded-lg p-6">
              <h2 class="text-xl font-semibold mb-4">Topics & Themes</h2>
              <div class="flex flex-wrap gap-2">
                {#each book.tags as tag}
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground">
                    {tag.replace(/-/g, ' ')}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
  
          <!-- Publication Details -->
          <div class="bg-card border rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Publication Details</h2>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt class="text-sm font-medium text-muted-foreground">ISBN-13</dt>
                <dd class="text-sm">{book.isbn}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">ISBN-10</dt>
                <dd class="text-sm">{book.isbn_10}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">Publisher</dt>
                <dd class="text-sm">{book.publisher}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">Publication Year</dt>
                <dd class="text-sm">{book.publication_year}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">Pages</dt>
                <dd class="text-sm">{book.page_count}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">Reading Level</dt>
                <dd class="text-sm capitalize">{book.reading_level}</dd>
              </div>
            </dl>
          </div>
        </div>
      {/if}
    </div>
  
    <!-- Related Books -->
    {#if sectionsVisible && getRelatedBooks().length > 0}
      <section 
        in:fly={{ y: 30, duration: 500, delay: 600, easing: quintOut }}
        class="mt-16"
      >
        <h2 class="text-2xl font-semibold mb-6">Related Books</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each getRelatedBooks() as relatedBook, index}
            <div 
              in:scale={{ duration: 400, delay: index * 100, easing: quintOut }}
              class="group bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              on:click={() => goto(`/library/${relatedBook.id}`)}
              on:keydown={(e) => e.key === 'Enter' && goto(`/library/${relatedBook.id}`)}
              role="button"
              tabindex="0"
            >
              <div class="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={relatedBook.cover_medium}
                  alt="{relatedBook.title} cover"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {relatedBook.title}
                </h3>
                <p class="text-sm text-muted-foreground">
                  {relatedBook.authors[0]} • {relatedBook.publication_year}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  {/if}
  
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>