<!-- src/lib/components/AnimatedCard.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { scale, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    export let title: string;
    export let description: string;
    export let icon: string = '📊';
    export let href: string | null = null;
    export let delay: number = 0;
    export let gradient: boolean = false;
  
    let cardElement: HTMLElement;
    let isHovered = false;
    let isVisible = false;
    let mounted = false;
  
    // Spring animation for hover effects
    const coords = spring({ x: 0, y: 0 }, {
      stiffness: 0.2,
      damping: 0.4
    });
  
    const tilt = spring({ x: 0, y: 0 }, {
      stiffness: 0.3,
      damping: 0.6
    });
  
    function handleMouseMove(event: MouseEvent) {
      if (!cardElement) return;
      
      const rect = cardElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      coords.set({ x, y });
      
      // Subtle 3D tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      tilt.set({ x: tiltX, y: tiltY });
    }
  
    function handleMouseEnter() {
      isHovered = true;
    }
  
    function handleMouseLeave() {
      isHovered = false;
      coords.set({ x: 0, y: 0 });
      tilt.set({ x: 0, y: 0 });
    }
  
    onMount(() => {
      mounted = true;
      setTimeout(() => {
        isVisible = true;
      }, delay);
    });
  
    $: transform = `perspective(1000px) rotateX(${$tilt.x}deg) rotateY(${$tilt.y}deg)`;
  </script>
  
  {#if mounted}
    <div
      class="relative group cursor-pointer"
      class:opacity-0={!isVisible}
      class:opacity-100={isVisible}
      in:fly={{ y: 50, duration: 600, delay, easing: quintOut }}
    >
      <!-- Card wrapper with 3D transform -->
      <div
        bind:this={cardElement}
        style="transform: {transform}; transition: transform 0.1s ease-out;"
        class="relative bg-card border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        class:shadow-2xl={isHovered}
        class:scale-105={isHovered}
        on:mousemove={handleMouseMove}
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        role={href ? "link" : "article"}
        tabindex={href ? 0 : -1}
      >
        <!-- Gradient overlay -->
        {#if gradient}
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/if}
  
        <!-- Animated spotlight effect -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style="background: radial-gradient(400px at {$coords.x}px {$coords.y}px, rgba(255,255,255,0.3), transparent 50%)"
        ></div>
  
        <!-- Content -->
        <div class="relative z-10 p-6">
          <!-- Icon with bounce animation -->
          <div class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            {icon}
          </div>
  
          <!-- Title with slide animation -->
          <h3 class="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
  
          <!-- Description -->
          <p class="text-muted-foreground leading-relaxed mb-4 transition-colors duration-300 group-hover:text-foreground/80">
            {description}
          </p>
  
          <!-- CTA with arrow animation -->
          {#if href}
            <div class="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore</span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          {/if}
        </div>
  
        <!-- Border glow effect -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors duration-300"></div>
      </div>
    </div>
  {/if}
  
  <!-- Enhanced Loading Spinner Component -->
  <div class="hidden">
    <!-- src/lib/components/LoadingSpinner.svelte -->
    <script>
      export let size = 'md'; // 'sm', 'md', 'lg'
      export let message = 'Loading...';
      
      const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8', 
        lg: 'w-12 h-12'
      };
    </script>
  
    <div class="flex flex-col items-center justify-center gap-4 p-8">
      <!-- Animated logo spinner -->
      <div class="relative {sizes[size]}">
        <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-2 border-2 border-secondary/40 rounded-full animate-pulse"></div>
      </div>
      
      <!-- Animated text -->
      <div class="text-muted-foreground text-sm animate-pulse">
        {message}
      </div>
      
      <!-- Loading dots -->
      <div class="flex gap-1">
        {#each Array(3) as _, i}
          <div 
            class="w-2 h-2 bg-primary rounded-full animate-bounce"
            style="animation-delay: {i * 0.1}s"
          ></div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Enhanced Button Component -->
  <div class="hidden">
    <!-- src/lib/components/AnimatedButton.svelte -->
    <script>
      export let variant = 'primary'; // 'primary', 'secondary', 'ghost'
      export let size = 'md'; // 'sm', 'md', 'lg'
      export let icon = '';
      export let loading = false;
      export let disabled = false;
      export let ripple = true;
      
      let buttonElement: HTMLElement;
      let ripples: Array<{id: number, x: number, y: number}> = [];
      
      function handleClick(event: MouseEvent) {
        if (!ripple || loading || disabled) return;
        
        const rect = buttonElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const newRipple = { id: Date.now(), x, y };
        ripples = [...ripples, newRipple];
        
        setTimeout(() => {
          ripples = ripples.filter(r => r.id !== newRipple.id);
        }, 600);
      }
      
      $: classes = [
        'relative overflow-hidden font-medium transition-all duration-200 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95',
        variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary' : '',
        variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary' : '',
        variant === 'ghost' ? 'bg-transparent text-foreground hover:bg-muted focus:ring-muted' : '',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : '',
        size === 'md' ? 'px-4 py-2' : '',
        size === 'lg' ? 'px-6 py-3 text-lg' : ''
      ].filter(Boolean).join(' ');
    </script>
  
    <button
      bind:this={buttonElement}
      class={classes}
      {disabled}
      on:click={handleClick}
      on:click
    >
      <!-- Ripple effects -->
      {#each ripples as ripple (ripple.id)}
        <span
          class="absolute bg-white/30 rounded-full animate-ping"
          style="left: {ripple.x - 10}px; top: {ripple.y - 10}px; width: 20px; height: 20px;"
        ></span>
      {/each}
      
      <!-- Content -->
      <span class="relative flex items-center justify-center gap-2">
        {#if loading}
          <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        {:else if icon}
          <span class="text-lg">{icon}</span>
        {/if}
        <slot />
      </span>
    </button>
  </div>