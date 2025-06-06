<!-- src/lib/components/Header.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<header class="sticky top-0 z-50 bg-muted/95 backdrop-blur-sm border-b border-border shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
    <a href="/" class="text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
      Strategy Safari
    </a>

    <div class="flex items-center gap-4">
      <nav class="flex space-x-4 text-sm font-medium">
        <a
          href="/radar"
          class="px-3 py-2 rounded-md transition-all duration-200"
          class:bg-primary={$currentPath === '/radar'}
          class:text-primary-foreground={$currentPath === '/radar'}
          class:text-muted-foreground={$currentPath !== '/radar'}
          class:hover:text-foreground={$currentPath !== '/radar'}
          class:hover:bg-muted={$currentPath !== '/radar'}
        >
          📊 Radar
        </a>
        <a
          href="/schools"
          class="px-3 py-2 rounded-md transition-all duration-200"
          class:bg-primary={$currentPath === '/schools'}
          class:text-primary-foreground={$currentPath === '/schools'}
          class:text-muted-foreground={$currentPath !== '/schools'}
          class:hover:text-foreground={$currentPath !== '/schools'}
          class:hover:bg-muted={$currentPath !== '/schools'}
        >
          🏫 Schools
        </a>
        <a
          href="/ps"
          class="px-3 py-2 rounded-md transition-all duration-200"
          class:bg-primary={$currentPath === '/ps'}
          class:text-primary-foreground={$currentPath === '/ps'}
          class:text-muted-foreground={$currentPath !== '/ps'}
          class:hover:text-foreground={$currentPath !== '/ps'}
          class:hover:bg-muted={$currentPath !== '/ps'}
        >
          📝 5 P's
        </a>
        <a
          href="/about"
          class="px-3 py-2 rounded-md transition-all duration-200"
          class:bg-primary={$currentPath === '/about'}
          class:text-primary-foreground={$currentPath === '/about'}
          class:text-muted-foreground={$currentPath !== '/about'}
          class:hover:text-foreground={$currentPath !== '/about'}
          class:hover:bg-muted={$currentPath !== '/about'}
        >
          ℹ️ About
        </a>
      </nav>

      <ThemeToggle />
    </div>
  </div>
</header>