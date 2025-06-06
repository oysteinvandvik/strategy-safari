<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let heroVisible = false;
  let cardsVisible = false;

  onMount(() => {
    // Staggered animations
    setTimeout(() => heroVisible = true, 100);
    setTimeout(() => cardsVisible = true, 300);
  });
</script>

<svelte:head>
  <title>Strategy Safari - Interactive Strategy Visualization</title>
  <meta name="description" content="Explore Mintzberg's Strategy Safari and the five P's of strategy through interactive visualizations." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  </div>
  
  <div class="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
    <div class="transition-all duration-1000 transform" 
         class:translate-y-0={heroVisible} 
         class:opacity-100={heroVisible}
         class:translate-y-8={!heroVisible}
         class:opacity-0={!heroVisible}>
      
      <!-- Main Title -->
      <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
        Strategy Safari
      </h1>
      
      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
        Navigate the landscape of strategic thinking through 
        <span class="text-primary font-semibold">interactive visualizations</span>
      </p>
      
      <!-- Description -->
      <p class="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
        Explore Henry Mintzberg's ten schools of strategy and the five P's framework 
        through beautiful, interactive charts and comprehensive guides.
      </p>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="/radar" 
           class="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
          <span class="text-2xl group-hover:rotate-12 transition-transform duration-200">📊</span>
          Explore Radar Chart
        </a>
        <a href="/schools" 
           class="inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
          <span class="text-2xl">🏫</span>
          Browse Schools
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-20 bg-muted/30">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Discover Strategic Perspectives
      </h2>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Each tool offers a unique lens for understanding strategy formation and implementation
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Interactive Radar -->
      <div class="group transition-all duration-500 transform hover:scale-105"
           class:translate-y-0={cardsVisible}
           class:opacity-100={cardsVisible}
           class:translate-y-8={!cardsVisible}
           class:opacity-0={!cardsVisible}
           style="transition-delay: 0ms;">
        <a href="/radar" class="block bg-card border border-border shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 h-full">
          <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
          <h3 class="text-xl font-bold mb-4 text-card-foreground">Interactive Radar</h3>
          <p class="text-muted-foreground mb-6 leading-relaxed">
            Visualize strategy schools using the 5 P's framework in a dynamic, filterable radar chart.
          </p>
          <div class="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-200">
            <span>Explore visualization</span>
            <span class="ml-2">→</span>
          </div>
        </a>
      </div>
      
      <!-- Strategy Schools -->
      <div class="group transition-all duration-500 transform hover:scale-105"
           class:translate-y-0={cardsVisible}
           class:opacity-100={cardsVisible}
           class:translate-y-8={!cardsVisible}
           class:opacity-0={!cardsVisible}
           style="transition-delay: 100ms;">
        <a href="/schools" class="block bg-card border border-border shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 h-full">
          <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏫</div>
          <h3 class="text-xl font-bold mb-4 text-card-foreground">Strategy Schools</h3>
          <p class="text-muted-foreground mb-6 leading-relaxed">
            Deep dive into the ten schools of strategy formation from Design to Configuration.
          </p>
          <div class="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-200">
            <span>Browse schools</span>
            <span class="ml-2">→</span>
          </div>
        </a>
      </div>
      
      <!-- The 5 P's -->
      <div class="group transition-all duration-500 transform hover:scale-105"
           class:translate-y-0={cardsVisible}
           class:opacity-100={cardsVisible}
           class:translate-y-8={!cardsVisible}
           class:opacity-0={!cardsVisible}
           style="transition-delay: 200ms;">
        <a href="/ps" class="block bg-card border border-border shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 h-full">
          <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📝</div>
          <h3 class="text-xl font-bold mb-4 text-card-foreground">The 5 P's</h3>
          <p class="text-muted-foreground mb-6 leading-relaxed">
            Master Plan, Pattern, Position, Perspective, and Ploy as strategic concepts.
          </p>
          <div class="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-200">
            <span>Learn framework</span>
            <span class="ml-2">→</span>
          </div>
        </a>
      </div>
      
      <!-- About -->
      <div class="group transition-all duration-500 transform hover:scale-105"
           class:translate-y-0={cardsVisible}
           class:opacity-100={cardsVisible}
           class:translate-y-8={!cardsVisible}
           class:opacity-0={!cardsVisible}
           style="transition-delay: 300ms;">
        <a href="/about" class="block bg-card border border-border shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 h-full">
          <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">ℹ️</div>
          <h3 class="text-xl font-bold mb-4 text-card-foreground">About</h3>
          <p class="text-muted-foreground mb-6 leading-relaxed">
            Learn about this project's inspiration and methodology behind the visualizations.
          </p>
          <div class="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-200">
            <span>Read more</span>
            <span class="ml-2">→</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Quick Start Section -->
<section class="py-20 bg-background">
  <div class="max-w-6xl mx-auto px-4 text-center">
    <div class="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 border border-border">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-foreground">
        Ready to Explore?
      </h2>
      <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
        Start your journey through the strategic landscape. Compare schools, 
        understand frameworks, and discover new perspectives on strategy formation.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="/radar" 
           class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <span>🚀</span>
          Start with Radar
        </a>
        <a href="/schools" 
           class="inline-flex items-center gap-3 text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors">
          <span>📖</span>
          Read About Schools
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-muted/30">
  <div class="max-w-4xl mx-auto px-4">
    <div class="grid md:grid-cols-3 gap-8 text-center">
      <div class="space-y-2">
        <div class="text-4xl font-bold text-primary">10</div>
        <div class="text-muted-foreground">Strategy Schools</div>
      </div>
      <div class="space-y-2">
        <div class="text-4xl font-bold text-primary">5</div>
        <div class="text-muted-foreground">Strategic Perspectives</div>
      </div>
      <div class="space-y-2">
        <div class="text-4xl font-bold text-primary">∞</div>
        <div class="text-muted-foreground">Insights to Discover</div>
      </div>
    </div>
  </div>
</section>