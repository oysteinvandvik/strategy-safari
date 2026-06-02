<!-- src/lib/components/Header.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  const currentPath = derived(page, ($page) => $page.url.pathname);
  
  let mobileMenuOpen = false;

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };

  // Close mobile menu when route changes
  $: if ($currentPath) {
    mobileMenuOpen = false;
  }

  const navigationItems = [
    { href: '/schools', label: 'Schools', icon: '🏛️' },
    { href: '/ps', label: 'Voices (5P)', icon: '🗣️' },
    { href: '/landscapes', label: 'Landscapes', icon: '🗻' },
    { href: '/library', label: 'Library', icon: '📚' },
    { href: '/radar', label: 'Radar', icon: '📊' },
    { href: '/about', label: 'About', icon: 'ℹ️' }
  ];

  // "Your Thread" is the user's own through-line — kept separate from the
  // content modules above.
  const threadItem = { href: '/landscapes/profile', label: 'Your Thread', icon: '🧵' };

  function isActive(href: string, path: string): boolean {
    if (href === '/landscapes/profile') return path === '/landscapes/profile';
    if (href === '/landscapes')
      return path === '/landscapes' || (path.startsWith('/landscapes/') && path !== '/landscapes/profile');
    if (href === '/ps' || href === '/library' || href === '/schools') return path.startsWith(href);
    return path === href;
  }
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex h-16 items-center justify-between">
      
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span class="text-2xl">🧭</span>
          <span class="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Strategy Explorer
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        {#each navigationItems as item}
          <a
            href={item.href}
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary {isActive(item.href, $currentPath) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}"
          >
            <span class="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        {/each}

        <!-- Your Thread — the user's own destination, set apart -->
        <a
          href={threadItem.href}
          class="flex items-center gap-2 ml-3 pl-3 border-l px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary {isActive(threadItem.href, $currentPath) ? 'bg-primary text-primary-foreground' : 'text-foreground'}"
        >
          <span class="text-base">{threadItem.icon}</span>
          <span>{threadItem.label}</span>
        </a>

        <div class="ml-4">
          <ThemeToggle />
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors"
        on:click={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {#if mobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="md:hidden py-4 border-t">
        <nav class="flex flex-col gap-2">
          {#each navigationItems as item}
            <a
              href={item.href}
              class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors {isActive(item.href, $currentPath) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}"
              on:click={closeMobileMenu}
            >
              <span class="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          {/each}

          <!-- Your Thread — set apart with a divider -->
          <a
            href={threadItem.href}
            class="flex items-center gap-3 mt-2 pt-3 border-t px-3 py-2 rounded-md text-sm font-medium transition-colors {isActive(threadItem.href, $currentPath) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'}"
            on:click={closeMobileMenu}
          >
            <span class="text-lg">{threadItem.icon}</span>
            <span>{threadItem.label}</span>
          </a>
        </nav>
        
        <div class="mt-4 pt-4 border-t">
          <ThemeToggle />
        </div>
      </div>
    {/if}
  </div>
</header>