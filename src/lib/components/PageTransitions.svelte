<!-- src/lib/components/PageTransition.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
  
    let isLoading = false;
    let currentPath = '';
  
    // Watch for route changes
    $: if ($page.url.pathname !== currentPath) {
      currentPath = $page.url.pathname;
      handleRouteChange();
    }
  
    function handleRouteChange() {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
      }, 300);
    }
  
    onMount(() => {
      currentPath = $page.url.pathname;
    });
  </script>
  
  <!-- Loading overlay for route transitions -->
  {#if isLoading}
    <div 
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
      transition:fade={{ duration: 200 }}
    >
      <div class="flex flex-col items-center gap-4">
        <div class="relative">
          <div class="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
          <div class="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div class="text-muted-foreground text-sm animate-pulse">
          Navigating strategy landscape...
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Page content wrapper with enter animation -->
  <div
    in:fly={{ y: 20, duration: 400, delay: 150, easing: cubicOut }}
    out:fly={{ y: -20, duration: 200, easing: cubicOut }}
  >
    <slot />
  </div>