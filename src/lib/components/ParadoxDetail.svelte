<!-- src/lib/components/ParadoxDetail.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    import type { StrategicParadox } from '$lib/types';
  
    export let paradox: StrategicParadox;
    export let initialPosition: number | null = null;
  
    const dispatch = createEventDispatcher();
  
    let position = initialPosition || 50;
    let hasInteracted = false;
    let showReflection = false;
    let userReflection = '';
    let sectionsVisible = false;
  
    // Smooth animation for slider
    const smoothPosition = spring(position, {
      stiffness: 0.1,
      damping: 0.4
    });
  
    $: smoothPosition.set(position);
  
    // Load saved reflection if exists
    $: {
      const saved = localStorage.getItem(`reflection-${paradox.id}`);
      if (saved) {
        userReflection = saved;
      }
    }
  
    function handleSliderChange(event: Event) {
      const target = event.target as HTMLInputElement;
      position = parseInt(target.value);
      hasInteracted = true;
      savePosition();
    }
  
    function savePosition() {
      const positions = JSON.parse(localStorage.getItem('landscape-positions') || '{}');
      positions[paradox.id] = position;
      localStorage.setItem('landscape-positions', JSON.stringify(positions));
      
      dispatch('positionChanged', {
        paradoxId: paradox.id,
        position,
        timestamp: new Date()
      });
    }
  
    function saveReflection() {
      localStorage.setItem(`reflection-${paradox.id}`, userReflection);
      dispatch('reflectionSaved', {
        paradoxId: paradox.id,
        reflection: userReflection
      });
    }
  
    function getGroupColor(group: string) {
      switch (group) {
        case 'Process': return 'from-blue-500 to-blue-600';
        case 'Content': return 'from-green-500 to-green-600';
        case 'Context': return 'from-purple-500 to-purple-600';
        default: return 'from-gray-500 to-gray-600';
      }
    }
  
    function getPositionDescription(pos: number) {
      if (pos < 20) return `Strongly ${paradox.left_label}`;
      if (pos < 40) return `Moderately ${paradox.left_label}`;
      if (pos > 80) return `Strongly ${paradox.right_label}`;
      if (pos > 60) return `Moderately ${paradox.right_label}`;
      return 'Balanced Approach';
    }
  
    function onMount() {
      setTimeout(() => sectionsVisible = true, 100);
    }
  
    onMount();
  </script>
  
  <!-- Hero Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 600, easing: quintOut }}
      class="relative py-12 mb-8"
    >
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="detail-grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#detail-grid)" />
        </svg>
      </div>
  
      <div class="relative text-center">
        <!-- Group badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r {getGroupColor(paradox.group)} text-white rounded-full text-sm font-medium mb-4">
          <span>{paradox.group === 'Process' ? '⚙️' : paradox.group === 'Content' ? '🎯' : '🌍'}</span>
          {paradox.group}
        </div>
  
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {paradox.name}
        </h1>
        
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {paradox.description}
        </p>
      </div>
    </section>
  {/if}
  
  <!-- Position Slider Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 500, delay: 200, easing: quintOut }}
      class="bg-card border rounded-lg p-8 mb-8"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Where Do You Stand?</h2>
      
      <!-- Tension Labels -->
      <div class="flex items-center justify-between mb-6">
        <div class="text-center flex-1">
          <div class="text-2xl mb-2">🔄</div>
          <h3 class="font-semibold text-orange-600 dark:text-orange-400">{paradox.left_label}</h3>
        </div>
        
        <div class="text-muted-foreground mx-4">⚖️</div>
        
        <div class="text-center flex-1">
          <div class="text-2xl mb-2">🎯</div>
          <h3 class="font-semibold text-blue-600 dark:text-blue-400">{paradox.right_label}</h3>
        </div>
      </div>
  
      <!-- Slider -->
      <div class="relative mb-6">
        <input
          type="range"
          min="0"
          max="100"
          bind:value={position}
          on:input={handleSliderChange}
          class="w-full h-3 bg-gradient-to-r from-orange-200 to-blue-200 dark:from-orange-900/30 dark:to-blue-900/30 rounded-lg appearance-none cursor-pointer slider"
          style="background: linear-gradient(to right, #f97316 0%, #f97316 {$smoothPosition}%, #3b82f6 {$smoothPosition}%, #3b82f6 100%)"
        />
        
        <!-- Position indicator -->
        <div 
          class="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-3 border-primary rounded-full shadow-lg transition-all duration-300 pointer-events-none"
          style="left: calc({$smoothPosition}% - 12px)"
        ></div>
      </div>
  
      <!-- Position feedback -->
      <div class="text-center">
        <div class="text-lg font-medium mb-2">
          {getPositionDescription(position)}
        </div>
        <div class="text-sm text-muted-foreground">
          Position: {Math.round(position)}% towards {position > 50 ? paradox.right_label : paradox.left_label}
        </div>
        
        {#if hasInteracted}
          <div 
            in:scale={{ duration: 300, delay: 100 }}
            class="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm"
          >
            <span>✓</span>
            Position saved
          </div>
        {/if}
      </div>
    </section>
  {/if}
  
  <!-- Reflection Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 500, delay: 400, easing: quintOut }}
      class="bg-card border rounded-lg p-8 mb-8"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold">Reflection</h2>
        <button
          class="text-sm text-primary hover:text-primary/80 transition-colors"
          on:click={() => showReflection = !showReflection}
        >
          {showReflection ? 'Hide' : 'Show'} reflection
        </button>
      </div>
      
      <!-- Reflection question -->
      <div class="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg p-6 mb-6">
        <h3 class="font-medium mb-3 flex items-center gap-2">
          <span class="text-xl">🤔</span>
          Consider this:
        </h3>
        <p class="text-muted-foreground italic">
          "{paradox.reflection_question}"
        </p>
      </div>
  
      {#if showReflection}
        <div in:fly={{ y: 20, duration: 300 }}>
          <label for="reflection" class="block text-sm font-medium mb-2">
            Your thoughts:
          </label>
          <textarea
            id="reflection"
            bind:value={userReflection}
            on:blur={saveReflection}
            placeholder="Take a moment to reflect on this paradox and your position..."
            rows="4"
            class="w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          <div class="text-xs text-muted-foreground mt-2">
            Your reflection is automatically saved locally
          </div>
        </div>
      {/if}
    </section>
  {/if}
  
  <!-- Shadow Warning -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 500, delay: 600, easing: quintOut }}
      class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 mb-8"
    >
      <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
        <span class="text-2xl">⚠️</span>
        The Shadow Side
      </h2>
      <p class="text-muted-foreground leading-relaxed">
        {paradox.shadow_hint}
      </p>
    </section>
  {/if}
  
  <!-- Book Recommendations -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 30, duration: 500, delay: 800, easing: quintOut }}
      class="mb-8"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Explore Further</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Left pole book -->
        <div class="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
            <h3 class="font-semibold text-orange-600 dark:text-orange-400">
              {paradox.left_label} Perspective
            </h3>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-4">
            <div class="text-2xl mb-3">📖</div>
            <p class="font-medium text-sm">
              {paradox.example_books.left}
            </p>
          </div>
        </div>
  
        <!-- Right pole book -->
        <div class="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
            <h3 class="font-semibold text-blue-600 dark:text-blue-400">
              {paradox.right_label} Perspective
            </h3>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4">
            <div class="text-2xl mb-3">📖</div>
            <p class="font-medium text-sm">
              {paradox.example_books.right}
            </p>
          </div>
        </div>
      </div>
    </section>
  {/if}
  
  <style>
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 24px;
      height: 24px;
      background: white;
      border: 3px solid hsl(var(--primary));
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .slider::-moz-range-thumb {
      width: 24px;
      height: 24px;
      background: white;
      border: 3px solid hsl(var(--primary));
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  </style>