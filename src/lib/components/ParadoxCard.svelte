<!-- src/lib/components/ParadoxCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { StrategicParadox } from '$lib/types';
  
    export let paradox: StrategicParadox;
    export let position: number | null = null; // 0-100 hvis bruker har en posisjon
    export let delay = 0;
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      dispatch('select', paradox);
    }
  
    function getGroupColor(group: string) {
      switch (group) {
        case 'Process': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        case 'Content': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        case 'Context': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      }
    }
  
    function getGroupIcon(group: string) {
      switch (group) {
        case 'Process': return '⚙️';
        case 'Content': return '🎯';
        case 'Context': return '🌍';
        default: return '❓';
      }
    }
  </script>
  
  <div
    in:scale={{ duration: 500, delay, easing: quintOut }}
    class="group relative bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
    role="button"
    tabindex="0"
  >
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
      <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="paradox-grid-{paradox.id}" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#paradox-grid-{paradox.id})" />
      </svg>
    </div>
  
    <!-- Header -->
    <div class="relative flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">{getGroupIcon(paradox.group)}</span>
        <div>
          <h3 class="font-semibold text-lg group-hover:text-primary transition-colors">
            {paradox.name}
          </h3>
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getGroupColor(paradox.group)} mt-1">
            {paradox.group}
          </span>
        </div>
      </div>
      
      <!-- Arrow indicator -->
      <div class="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
        →
      </div>
    </div>
  
    <!-- Tension Display -->
    <div class="relative mb-4">
      <div class="flex items-center justify-between text-sm font-medium mb-2">
        <span class="text-orange-600 dark:text-orange-400">{paradox.left_label}</span>
        <span class="text-muted-foreground">vs</span>
        <span class="text-blue-600 dark:text-blue-400">{paradox.right_label}</span>
      </div>
      
      <!-- Position indicator if user has one -->
      {#if position !== null}
        <div class="relative">
          <div class="w-full h-2 bg-secondary rounded-full">
            <div 
              class="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full transition-all duration-300"
              style="width: {position}%"
            ></div>
            <div 
              class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-sm transition-all duration-300"
              style="left: calc({position}% - 6px)"
            ></div>
          </div>
          <div class="text-xs text-muted-foreground mt-1 text-center">
            Your position: {Math.round(position)}%
          </div>
        </div>
      {:else}
        <div class="w-full h-2 bg-gradient-to-r from-orange-200 to-blue-200 dark:from-orange-900/30 dark:to-blue-900/30 rounded-full"></div>
      {/if}
    </div>
  
    <!-- Description -->
    <p class="text-sm text-muted-foreground leading-relaxed">
      {paradox.description}
    </p>
  
    <!-- Hover effect -->
    <div class="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
  </div>