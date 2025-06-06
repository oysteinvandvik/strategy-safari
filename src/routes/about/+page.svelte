<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionsVisible = false;
  let heroVisible = false;

  onMount(() => {
    setTimeout(() => heroVisible = true, 100);
    setTimeout(() => sectionsVisible = true, 300);
  });
</script>

<svelte:head>
  <title>About Strategy Safari - Interactive Strategy Learning</title>
  <meta name="description" content="Learn about the Strategy Safari project, Henry Mintzberg's strategic thinking, and our approach to making strategy education more accessible and engaging." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
  <div class="absolute inset-0 opacity-5">
    <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="about-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.5" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#about-grid)" />
    </svg>
  </div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <div class="transition-all duration-1000 transform"
         class:translate-y-0={heroVisible}
         class:opacity-100={heroVisible}
         class:translate-y-8={!heroVisible}
         class:opacity-0={!heroVisible}>
      
      <div class="text-6xl mb-6">🧭</div>
      <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
        About Strategy Safari
      </h1>
      <p class="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        Navigating the complex landscape of strategic thinking through 
        <span class="text-primary font-semibold">interactive visualization</span> 
        and accessible learning experiences.
      </p>
    </div>
  </div>
</section>

<!-- Main Content -->
<section class="py-16 max-w-6xl mx-auto px-4">
  
  <!-- Project Vision -->
  <div class="mb-20 transition-all duration-700 transform"
       class:translate-y-0={sectionsVisible}
       class:opacity-100={sectionsVisible}
       class:translate-y-12={!sectionsVisible}
       class:opacity-0={!sectionsVisible}>
    
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
          <span class="text-3xl">🎯</span>
          Our Vision
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed mb-6">
          Strategy Safari was created to make Henry Mintzberg's profound insights about strategy 
          more accessible, engaging, and practical for modern learners and practitioners.
        </p>
        <p class="text-lg text-muted-foreground leading-relaxed mb-6">
          Through interactive visualizations and intuitive design, we bridge the gap between 
          academic theory and practical understanding, making strategic thinking more tangible 
          and applicable.
        </p>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Interactive Learning</span>
          <span class="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium">Visual Thinking</span>
          <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Accessibility</span>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
        <h3 class="text-xl font-bold mb-4 text-foreground">Key Principles</h3>
        <ul class="space-y-3 text-muted-foreground">
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">✓</span>
            <span>Make complex strategy concepts visually intuitive</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">✓</span>
            <span>Foster dialogue across disciplines and perspectives</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">✓</span>
            <span>Encourage reflective and pluralistic thinking</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary text-lg">✓</span>
            <span>Bridge academic theory with practical application</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- About Mintzberg -->
  <div class="mb-20 transition-all duration-700 transform"
       class:translate-y-0={sectionsVisible}
       class:opacity-100={sectionsVisible}
       class:translate-y-12={!sectionsVisible}
       class:opacity-0={!sectionsVisible}
       style="transition-delay: 200ms;">
    
    <div class="bg-muted/30 rounded-2xl p-8 md:p-12 border border-border">
      <h2 class="text-3xl font-bold mb-8 text-foreground text-center flex items-center justify-center gap-3">
        <span class="text-3xl">📚</span>
        Henry Mintzberg's Strategy Safari
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🔍</span>
          </div>
          <h3 class="font-bold text-lg mb-3 text-foreground">The Safari Metaphor</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Like explorers on a safari, we observe strategy formation in its natural habitat, 
            recognizing multiple species (schools) of strategic thinking.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🏫</span>
          </div>
          <h3 class="font-bold text-lg mb-3 text-foreground">Ten Schools</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            From the prescriptive schools (Design, Planning, Positioning) to the descriptive schools 
            (Entrepreneurial, Cognitive, Learning, and others).
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">📝</span>
          </div>
          <h3 class="font-bold text-lg mb-3 text-foreground">Five P's</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Strategy as Plan, Pattern, Position, Perspective, and Ploy - each offering 
            a unique lens for understanding strategic behavior.
          </p>
        </div>
      </div>
      
      <div class="mt-8 p-6 bg-background/50 rounded-xl border border-border/50">
        <blockquote class="text-lg italic text-muted-foreground text-center leading-relaxed">
          "Strategy formation is judgmental designing, intuitive visioning, and emergent learning; 
          it is about transformation as well as perpetuation; it must involve individual cognition 
          and social interaction, cooperation as well as conflict."
        </blockquote>
        <p class="text-center mt-4 text-sm text-muted-foreground/80">— Henry Mintzberg</p>
      </div>
    </div>
  </div>

  <!-- Technology & Approach -->
  <div class="mb-20 transition-all duration-700 transform"
       class:translate-y-0={sectionsVisible}
       class:opacity-100={sectionsVisible}
       class:translate-y-12={!sectionsVisible}
       class:opacity-0={!sectionsVisible}
       style="transition-delay: 400ms;">
    
    <h2 class="text-3xl font-bold mb-8 text-foreground text-center flex items-center justify-center gap-3">
      <span class="text-3xl">⚙️</span>
      Technology & Approach
    </h2>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
        <h3 class="text-xl font-bold mb-4 text-card-foreground flex items-center gap-3">
          <span class="text-2xl">🛠️</span>
          Built With
        </h3>
        <ul class="space-y-2 text-muted-foreground">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            <span><strong>SvelteKit</strong> - Modern, performant frontend framework</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            <span><strong>TypeScript</strong> - Type-safe development</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            <span><strong>Chart.js</strong> - Interactive radar visualizations</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            <span><strong>Tailwind CSS</strong> - Responsive, accessible design</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
        <h3 class="text-xl font-bold mb-4 text-card-foreground flex items-center gap-3">
          <span class="text-2xl">🎨</span>
          Design Philosophy
        </h3>
        <ul class="space-y-2 text-muted-foreground">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            <span><strong>Progressive Enhancement</strong> - Works without JavaScript</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            <span><strong>Accessibility First</strong> - Screen reader friendly</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            <span><strong>Mobile Responsive</strong> - Optimal on all devices</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            <span><strong>Performance</strong> - Fast loading and interactions</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Open Source & Community -->
  <div class="transition-all duration-700 transform"
       class:translate-y-0={sectionsVisible}
       class:opacity-100={sectionsVisible}
       class:translate-y-12={!sectionsVisible}
       class:opacity-0={!sectionsVisible}
       style="transition-delay: 600ms;">
    
    <div class="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 md:p-12 border border-border text-center">
      <h2 class="text-3xl font-bold mb-6 text-foreground flex items-center justify-center gap-3">
        <span class="text-3xl">🌟</span>
        Open Learning
      </h2>
      <p class="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
        This project is inspired by Mintzberg's commitment to accessible, reflective learning. 
        We believe that strategic thinking should be democratic, visual, and engaging for learners 
        across all backgrounds and disciplines.
      </p>
      
      <div class="grid md:grid-cols-3 gap-6 mt-8">
        <div class="text-center">
          <div class="text-3xl mb-2">🎓</div>
          <h4 class="font-semibold text-foreground mb-2">For Educators</h4>
          <p class="text-sm text-muted-foreground">Use in classrooms to make strategy concepts more tangible</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-2">💼</div>
          <h4 class="font-semibold text-foreground mb-2">For Practitioners</h4>
          <p class="text-sm text-muted-foreground">Reflect on your organization's strategic approaches</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-2">🤝</div>
          <h4 class="font-semibold text-foreground mb-2">For Everyone</h4>
          <p class="text-sm text-muted-foreground">Explore strategy thinking in an accessible, visual way</p>
        </div>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/radar" 
           class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <span>🚀</span>
          Start Exploring
        </a>
        <a href="/schools" 
           class="inline-flex items-center gap-3 text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors">
          <span>📖</span>
          Learn About Schools
        </a>
      </div>
    </div>
  </div>
</section>