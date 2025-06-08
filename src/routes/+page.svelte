{
  id: 'radar',
  title: 'The Radar',
  icon: '📊',
  description: 'Visualize and compare how different schools emphasize the five voices of strategy through interactive radar charts.',
  href: '/radar',
  color: 'from-orange-500 to-red-600',
  gradient: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/20 dark:to-red-900/20'
}<!-- src/routes/+page.svelte -->
<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { fly, scale, fade } from 'svelte/transition';
import { quintOut, elasticOut } from 'svelte/easing';

let heroVisible = false;
let modulesVisible = false;
let philosophyVisible = false;
let ctaVisible = false;

onMount(() => {
// Staggered animations
setTimeout(() => heroVisible = true, 100);
setTimeout(() => modulesVisible = true, 600);
setTimeout(() => philosophyVisible = true, 1200);
setTimeout(() => ctaVisible = true, 1800);
});

const modules = [
{
  id: 'schools',
  title: 'The Schools',
  icon: '🏛️',
  description: 'Dive into 10 classic strategy schools from Henry Mintzberg\'s Strategy Safari. Each school has its own history, logic, and blind spots.',
  href: '/schools',
  color: 'from-blue-500 to-indigo-600',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/20'
},
{
  id: 'voices',
  title: 'The Voices',
  icon: '🗣️',
  description: 'Strategy speaks with five voices: Plan, Ploy, Pattern, Position, and Perspective. Explore your own preferences and biases.',
  href: '/ps',
  color: 'from-emerald-500 to-teal-600',
  gradient: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-900/20'
},
{
  id: 'landscape',
  title: 'The Landscape',
  icon: '🗺️',
  description: 'Explore 9 real-world strategic paradoxes from De Wit & Meyer. Place yourself between the poles and discover shadow sides.',
  href: '/landscapes',
  color: 'from-purple-500 to-violet-600',
  gradient: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-900/20'
},
{
  id: 'library',
  title: 'The Library',
  icon: '📚',
  description: 'Browse curated strategy books tagged by voices and paradoxes they engage with. Perfect for deeper dives.',
  href: '/library',
  color: 'from-amber-500 to-yellow-600',
  gradient: 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/20 dark:to-yellow-900/20'
},
];

const comingSoon = [
{
  title: 'The Scenarios',
  icon: '🎭',
  description: 'Encounter narrative dilemmas that surface trade-offs and tensions. Ideal for team discussions.',
  gradient: 'bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/20 dark:to-pink-900/20'
},
{
  title: 'Your Thread',
  icon: '🧵',
  description: 'Track reflections and evolving strategic thinking. Weave your insights into the fabric of strategy.',
  gradient: 'bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/20 dark:to-blue-900/20'
}
];

function handleModuleClick(moduleHref: string) {
goto(moduleHref);
}
</script>

<svelte:head>
<title>Strategy Explorer - Discover Strategy as a Landscape</title>
<meta name="description" content="An interactive, reflective learning space that invites you to explore the many voices, schools, and tensions that shape strategy. Develop strategic maturity through exploration, not recipes." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
<!-- Animated Background -->
<div class="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-purple-600/3">
<div class="absolute inset-0 opacity-30">
  <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="explorer-grid" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="0.5" fill="currentColor" opacity="0.3"/>
        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#explorer-grid)" />
  </svg>
</div>
</div>

<!-- Floating Elements -->
<div class="absolute inset-0 overflow-hidden pointer-events-none">
{#if heroVisible}
  <div 
    in:scale={{ duration: 2000, delay: 500, easing: elasticOut }}
    class="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"
  ></div>
  <div 
    in:scale={{ duration: 2000, delay: 800, easing: elasticOut }}
    class="absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-30 animate-bounce"
    style="animation-delay: 1s; animation-duration: 3s;"
  ></div>
  <div 
    in:scale={{ duration: 2000, delay: 1200, easing: elasticOut }}
    class="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-25 animate-pulse"
    style="animation-delay: 2s;"
  ></div>
{/if}
</div>

<!-- Hero Content -->
<div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
{#if heroVisible}
  <div in:fly={{ y: 50, duration: 800, easing: quintOut }}>
    <div class="relative inline-block mb-8">
      <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
        Strategy Explorer
      </h1>
      <div class="absolute -inset-8 bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 rounded-2xl blur-2xl -z-10"></div>
    </div>
  </div>

  <div in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
    <h2 class="text-2xl md:text-4xl font-medium text-muted-foreground mb-8 leading-relaxed">
      Discover strategy as a <span class="text-primary font-semibold">landscape</span> — not a recipe.
    </h2>
  </div>

  <div in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}>
    <p class="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
      An interactive, reflective learning space that invites you to explore the many voices, schools, 
      and tensions that shape strategy. Develop strategic maturity through exploration.
    </p>
  </div>

  <div in:scale={{ duration: 600, delay: 900, easing: quintOut }}>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        class="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        on:click={() => goto('/schools')}
      >
        <span class="relative z-10">Start Exploring</span>
        <div class="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
      
      <button
        class="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg hover:bg-secondary/80 transition-all duration-300"
        on:click={() => goto('/about')}
      >
        Learn More
      </button>
    </div>
  </div>
{/if}
</div>

<!-- Scroll indicator -->
{#if heroVisible}
<div 
  in:fade={{ duration: 1000, delay: 1500 }}
  class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
>
  <div class="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
    <div class="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
  </div>
</div>
{/if}
</section>

<!-- Why Strategy Explorer Section -->
{#if philosophyVisible}
<section 
in:fly={{ y: 50, duration: 800, easing: quintOut }}
class="py-24 bg-gradient-to-r from-secondary/30 to-muted/30"
>
<div class="max-w-6xl mx-auto px-4 text-center">
  <h2 class="text-3xl md:text-4xl font-bold mb-8">
    🧭 Why Strategy Explorer?
  </h2>
  
  <p class="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
    In a world of complexity and change, strategy isn't something you apply. 
    <span class="text-foreground font-medium">It's something you explore.</span>
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each [
      { icon: '🗣️', title: 'Multiple Voices', desc: 'Understand the different ways strategy can speak' },
      { icon: '🏛️', title: 'Schools of Thought', desc: 'Compare and contrast strategic approaches' },
      { icon: '⚖️', title: 'Strategic Tensions', desc: 'Navigate real-world paradoxes that matter' },
      { icon: '🔗', title: 'Theory & Practice', desc: 'Connect concepts with your experience' },
      { icon: '🧭', title: 'Strategic Stance', desc: 'Develop your evolving perspective' },
      { icon: '❓', title: 'Better Questions', desc: 'Ask deeper, more nuanced questions' }
    ] as benefit, index}
      <div 
        in:scale={{ duration: 500, delay: index * 100, easing: quintOut }}
        class="bg-card/50 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="text-4xl mb-4">{benefit.icon}</div>
        <h3 class="font-semibold text-lg mb-2">{benefit.title}</h3>
        <p class="text-muted-foreground text-sm">{benefit.desc}</p>
      </div>
    {/each}
  </div>
</div>
</section>
{/if}

<!-- Modules Section -->
{#if modulesVisible}
<section 
in:fly={{ y: 50, duration: 800, easing: quintOut }}
class="py-24"
>
<div class="max-w-7xl mx-auto px-4">
  <div class="text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      🧶 Modules to Explore
    </h2>
    <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
      Each module offers a different lens for understanding strategy. 
      Start anywhere that sparks your curiosity.
    </p>
  </div>

  <!-- Active Modules -->
  <div class="grid md:grid-cols-2 gap-8 mb-16">
    {#each modules as module, index}
      <div 
        in:scale={{ duration: 600, delay: index * 150, easing: quintOut }}
        class="group relative bg-card border rounded-xl p-8 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2"
        on:click={() => handleModuleClick(module.href)}
        on:keydown={(e) => e.key === 'Enter' && handleModuleClick(module.href)}
        role="button"
        tabindex="0"
      >
        <!-- Background gradient -->
        <div class="absolute inset-0 {module.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        <!-- Content -->
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-4xl">{module.icon}</span>
            <h3 class="text-2xl font-bold">{module.title}</h3>
          </div>
          
          <p class="text-muted-foreground leading-relaxed mb-6">
            {module.description}
          </p>
          
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
              Explore now
            </span>
            <div class="w-8 h-8 bg-gradient-to-r {module.color} rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              →
            </div>
          </div>
        </div>

        <!-- Hover effect -->
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r {module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      </div>
    {/each}
  </div>

  <!-- Coming Soon -->
  <div class="text-center mb-8">
    <h3 class="text-2xl font-semibold text-muted-foreground">Coming Soon</h3>
  </div>
  
  <div class="grid md:grid-cols-3 gap-6">
    {#each comingSoon as module, index}
      <div 
        in:scale={{ duration: 500, delay: 600 + index * 100, easing: quintOut }}
        class="relative bg-card/50 border border-dashed rounded-lg p-6 text-center opacity-60 hover:opacity-80 transition-opacity"
      >
        <div class="absolute inset-0 {module.gradient} rounded-lg"></div>
        <div class="relative z-10">
          <div class="text-3xl mb-3">{module.icon}</div>
          <h4 class="font-semibold mb-2">{module.title}</h4>
          <p class="text-sm text-muted-foreground">{module.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
</section>
{/if}

<!-- Quote Section -->
{#if ctaVisible}
<section 
in:fly={{ y: 30, duration: 800, easing: quintOut }}
class="py-24 bg-gradient-to-r from-primary/5 via-purple-600/5 to-blue-600/5"
>
<div class="max-w-4xl mx-auto px-4 text-center">
  <div class="relative">
    <div class="text-6xl text-primary/20 mb-4">"</div>
    <blockquote class="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-relaxed">
      The best way to understand strategy is to see it in all its variety — and contradiction.
    </blockquote>
    <cite class="text-lg text-muted-foreground">— Henry Mintzberg</cite>
    <div class="text-6xl text-primary/20 mt-4 rotate-180">"</div>
  </div>
  
  <div class="mt-12 p-8 bg-card/30 backdrop-blur-sm rounded-xl border">
    <h3 class="text-xl font-semibold mb-4">This is not a framework.</h3>
    <p class="text-muted-foreground leading-relaxed">
      It's a companion for thinking, sensing, and discovering what strategy might mean to you.
    </p>
  </div>
</div>
</section>
{/if}

<!-- Final CTA -->
{#if ctaVisible}
<section 
in:scale={{ duration: 600, delay: 200, easing: quintOut }}
class="py-24"
>
<div class="max-w-4xl mx-auto px-4 text-center">
  <h2 class="text-3xl md:text-4xl font-bold mb-8">
    Ready to Begin Your Strategic Journey?
  </h2>
  
  <div class="grid md:grid-cols-3 gap-6 mb-12">
    <div class="p-6 bg-card border rounded-lg">
      <div class="text-3xl mb-3">🧠</div>
      <h3 class="font-semibold mb-2">Individual Exploration</h3>
      <p class="text-sm text-muted-foreground">Reflect at your own pace</p>
    </div>
    <div class="p-6 bg-card border rounded-lg">
      <div class="text-3xl mb-3">🧩</div>
      <h3 class="font-semibold mb-2">Learning & Teaching</h3>
      <p class="text-sm text-muted-foreground">Spark conversation, build understanding</p>
    </div>
    <div class="p-6 bg-card border rounded-lg">
      <div class="text-3xl mb-3">🧭</div>
      <h3 class="font-semibold mb-2">Teams & Leaders</h3>
      <p class="text-sm text-muted-foreground">Explore strategic alignment and tension</p>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      class="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      on:click={() => goto('/schools')}
    >
      Explore the Schools
    </button>
    <button
      class="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg hover:bg-secondary/80 transition-all duration-300"
      on:click={() => goto('/landscapes')}
    >
      Navigate the Landscape
    </button>
  </div>
</div>
</section>
{/if}