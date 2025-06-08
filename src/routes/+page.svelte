<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly, scale, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let sectionsVisible = false;

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
    {
      id: 'radar',
      title: 'The Radar',
      icon: '📊',
      description: 'Visualize and compare how different schools emphasize the five voices of strategy through interactive radar charts.',
      href: '/radar',
      color: 'from-orange-500 to-red-600',
      gradient: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/20 dark:to-red-900/20'
    }
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

  onMount(() => {
    setTimeout(() => sectionsVisible = true, 100);
  });
</script>

<svelte:head>
  <title>Strategy Explorer - Discover strategy as a landscape, not a recipe</title>
  <meta name="description" content="Interactive platform for exploring strategic thinking through multiple perspectives, voices, and paradoxes. Navigate the wilds of strategic management." />
</svelte:head>

<!-- Floating Background Elements -->
<div class="fixed inset-0 overflow-hidden pointer-events-none">
  <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
</div>

<main class="relative">
  <!-- Hero Section -->
  <section class="min-h-screen flex items-center justify-center px-4 py-16 text-center relative">
    <div class="max-w-4xl mx-auto">
      {#if sectionsVisible}
        <div 
          in:scale={{ duration: 800, easing: quintOut }}
          class="relative inline-block mb-8"
        >
          <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Strategy Explorer
          </h1>
          <div class="absolute -inset-8 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-teal-600/20 rounded-2xl blur-2xl -z-10"></div>
        </div>
        
        <p 
          in:fly={{ y: 30, duration: 600, delay: 300, easing: quintOut }}
          class="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
        >
          Discover strategy as a <span class="font-semibold text-foreground">landscape</span> — not a recipe
        </p>
        
        <div 
          in:fly={{ y: 30, duration: 600, delay: 600, easing: quintOut }}
          class="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center"
        >
          <button 
            class="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            on:click={() => goto('/schools')}
          >
            Begin Exploration 🧭
          </button>
          <button 
            class="w-full md:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg hover:bg-secondary/80 transition-colors"
            on:click={() => goto('/about')}
          >
            Learn More
          </button>
        </div>
      {/if}
    </div>
  </section>

  <!-- Philosophy Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 50, duration: 600, delay: 800, easing: quintOut }}
      class="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-950/30"
    >
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-8">
          Why <span class="text-indigo-600">Exploration</span> Over <span class="text-gray-400">Prescription</span>?
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="text-left space-y-4">
            <h3 class="text-xl font-semibold text-red-600">❌ The Recipe Approach</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• One-size-fits-all solutions</li>
              <li>• Linear, step-by-step processes</li>
              <li>• Ignores context and complexity</li>
              <li>• Creates false confidence</li>
            </ul>
          </div>
          
          <div class="text-left space-y-4">
            <h3 class="text-xl font-semibold text-green-600">✅ The Landscape Approach</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• Multiple valid perspectives</li>
              <li>• Embraces paradox and tension</li>
              <li>• Context-sensitive thinking</li>
              <li>• Builds strategic maturity</li>
            </ul>
          </div>
        </div>
        
        <blockquote class="text-lg italic text-muted-foreground border-l-4 border-indigo-600 pl-6 py-4 bg-white/50 dark:bg-black/20 rounded-r-lg">
          "The real challenge in strategic management is learning, not planning."
          <cite class="block text-sm font-medium text-foreground mt-2">— Henry Mintzberg</cite>
        </blockquote>
      </div>
    </section>
  {/if}

  <!-- Modules Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 50, duration: 600, delay: 1000, easing: quintOut }}
      class="py-20"
    >
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Explore the Strategic Landscape</h2>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate through interconnected modules that build your strategic thinking from multiple angles
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {#each modules as module, index}
            <div
              in:scale={{ duration: 500, delay: 1200 + (index * 100), easing: quintOut }}
              class="group {module.gradient} rounded-2xl p-8 border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              on:click={() => goto(module.href)}
              on:keydown={(e) => e.key === 'Enter' && goto(module.href)}
              role="button"
              tabindex="0"
            >
              <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {module.icon}
              </div>
              <h3 class="text-xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:{module.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {module.title}
              </h3>
              <p class="text-muted-foreground leading-relaxed">
                {module.description}
              </p>
            </div>
          {/each}
        </div>
        
        <!-- Coming Soon -->
        <div class="text-center mb-8">
          <h3 class="text-2xl font-semibold text-muted-foreground mb-8">Coming Soon</h3>
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {#each comingSoon as item, index}
              <div
                in:scale={{ duration: 400, delay: 1800 + (index * 100), easing: quintOut }}
                class="group {item.gradient} rounded-xl p-6 border opacity-60 hover:opacity-80 transition-opacity duration-300"
              >
                <div class="text-3xl mb-3">{item.icon}</div>
                <h4 class="text-lg font-semibold mb-2">{item.title}</h4>
                <p class="text-sm text-muted-foreground">{item.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Strategic Maturity Section -->
  {#if sectionsVisible}
    <section 
      in:fly={{ y: 50, duration: 600, delay: 1400, easing: quintOut }}
      class="py-20 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20"
    >
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-8">Develop Strategic Maturity</h2>
        
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="space-y-4">
            <div class="text-4xl">🌱</div>
            <h3 class="text-xl font-semibold">Novice</h3>
            <p class="text-muted-foreground text-sm">
              Seeks the "right" answer. Prefers clear frameworks and step-by-step processes.
            </p>
          </div>
          
          <div class="space-y-4">
            <div class="text-4xl">🌿</div>
            <h3 class="text-xl font-semibold">Advanced Beginner</h3>
            <p class="text-muted-foreground text-sm">
              Recognizes multiple approaches. Can apply different tools to different situations.
            </p>
          </div>
          
          <div class="space-y-4">
            <div class="text-4xl">🌳</div>
            <h3 class="text-xl font-semibold">Strategic Thinker</h3>
            <p class="text-muted-foreground text-sm">
              Embraces paradox and tension. Comfortable with ambiguity and multiple perspectives.
            </p>
          </div>
        </div>
        
        <p class="text-lg text-muted-foreground mb-8">
          Strategy Explorer guides you from seeking simple answers to embracing strategic complexity.
        </p>
        
        <button 
          class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          on:click={() => goto('/landscapes')}
        >
          Start Your Journey 🚀
        </button>
      </div>
    </section>
  {/if}
</main>