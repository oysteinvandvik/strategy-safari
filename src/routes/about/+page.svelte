<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  let sectionsVisible = false;
  let heroVisible = false;

  onMount(() => {
    setTimeout(() => heroVisible = true, 100);
    setTimeout(() => sectionsVisible = true, 300);
  });
</script>

<svelte:head>
  <title>About Strategy Explorer - Philosophy & Approach</title>
  <meta name="description" content="Learn about Strategy Explorer's philosophy of strategic learning, our approach to making strategy education more accessible, and the thinking behind our interactive modules." />
</svelte:head>

<!-- Hero Section -->
{#if heroVisible}
  <section 
    in:fly={{ y: 30, duration: 600, easing: quintOut }}
    class="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
  >
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

    <div class="relative max-w-4xl mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium mb-6">
        <span class="text-2xl">🧭</span>
        About Strategy Explorer
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Strategy as <span class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Exploration</span>, 
        Not Prescription
      </h1>
      
      <p class="text-xl text-muted-foreground leading-relaxed">
        A learning companion that invites you to discover the rich landscape of strategic thinking, 
        rather than offering simple answers to complex questions.
      </p>
    </div>
  </section>
{/if}

<!-- Philosophy Section -->
{#if sectionsVisible}
  <section 
    in:fly={{ y: 30, duration: 500, delay: 200, easing: quintOut }}
    class="py-16"
  >
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Our Philosophy</h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-card border rounded-lg p-8">
          <div class="text-4xl mb-4">🌱</div>
          <h3 class="text-xl font-semibold mb-4">Strategy as a Living Process</h3>
          <p class="text-muted-foreground leading-relaxed">
            We believe strategy isn't a static framework to be applied, but a dynamic process of exploration, 
            learning, and adaptation. Each situation demands fresh thinking and nuanced understanding.
          </p>
        </div>
        
        <div class="bg-card border rounded-lg p-8">
          <div class="text-4xl mb-4">🎭</div>
          <h3 class="text-xl font-semibold mb-4">Multiple Perspectives Matter</h3>
          <p class="text-muted-foreground leading-relaxed">
            Strategy speaks with many voices and can be viewed through various lenses. By exploring different 
            schools of thought and strategic tensions, we develop more mature and flexible strategic thinking.
          </p>
        </div>
        
        <div class="bg-card border rounded-lg p-8">
          <div class="text-4xl mb-4">🤔</div>
          <h3 class="text-xl font-semibold mb-4">Questions Over Answers</h3>
          <p class="text-muted-foreground leading-relaxed">
            Rather than providing definitive answers, we help you ask better questions. Strategic maturity 
            comes from understanding the tensions and trade-offs inherent in strategic decisions.
          </p>
        </div>
        
        <div class="bg-card border rounded-lg p-8">
          <div class="text-4xl mb-4">🔄</div>
          <h3 class="text-xl font-semibold mb-4">Reflection & Practice</h3>
          <p class="text-muted-foreground leading-relaxed">
            Learning happens through reflection on experience. Our interactive modules encourage you to 
            connect theoretical insights with your own context and strategic challenges.
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- Theoretical Foundation -->
{#if sectionsVisible}
  <section 
    in:fly={{ y: 30, duration: 500, delay: 400, easing: quintOut }}
    class="py-16 bg-gradient-to-r from-secondary/10 to-muted/10"
  >
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Built on Strong Foundations</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
            HM
          </div>
          <h3 class="font-semibold text-lg mb-2">Henry Mintzberg</h3>
          <p class="text-sm text-muted-foreground mb-4">Strategy Safari</p>
          <p class="text-muted-foreground text-sm leading-relaxed">
            The ten schools of strategic thought and the five P's of strategy provide our core framework 
            for understanding strategic diversity.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
            D&M
          </div>
          <h3 class="font-semibold text-lg mb-2">De Wit & Meyer</h3>
          <p class="text-sm text-muted-foreground mb-4">Strategic Paradoxes</p>
          <p class="text-muted-foreground text-sm leading-relaxed">
            The strategic paradoxes framework helps us navigate the fundamental tensions that shape 
            strategic thinking in practice.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
            🎓
          </div>
          <h3 class="font-semibold text-lg mb-2">Learning Science</h3>
          <p class="text-sm text-muted-foreground mb-4">Interactive Pedagogy</p>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Our approach combines visualization, reflection, and hands-on exploration to support 
            deep learning and skill development.
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- How It Works -->
{#if sectionsVisible}
  <section 
    in:fly={{ y: 30, duration: 500, delay: 600, easing: quintOut }}
    class="py-16"
  >
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">How Strategy Explorer Works</h2>
      
      <div class="space-y-12">
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-3">Explore Multiple Perspectives</h3>
            <p class="text-muted-foreground leading-relaxed">
              Start by exploring different schools of strategic thought, each with their own logic, 
              strengths, and blind spots. Compare how they approach the fundamental voices of strategy.
            </p>
          </div>
        </div>
        
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-3">Navigate Strategic Tensions</h3>
            <p class="text-muted-foreground leading-relaxed">
              Engage with real-world paradoxes that strategists face daily. Position yourself on 
              key tensions and reflect on the implications of different approaches.
            </p>
          </div>
        </div>
        
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-3">Reflect & Connect</h3>
            <p class="text-muted-foreground leading-relaxed">
              Use guided reflection prompts to connect theoretical insights with your own experience. 
              Build a personal understanding of your strategic preferences and biases.
            </p>
          </div>
        </div>
        
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
            4
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-3">Develop Strategic Maturity</h3>
            <p class="text-muted-foreground leading-relaxed">
              Through repeated exploration and reflection, develop a more nuanced understanding 
              of strategy that embraces complexity rather than seeking simple solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- Use Cases -->
{#if sectionsVisible}
  <section 
    in:fly={{ y: 30, duration: 500, delay: 800, easing: quintOut }}
    class="py-16 bg-gradient-to-r from-primary/5 to-purple-600/5"
  >
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">Who Benefits from Strategy Explorer?</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-card/50 backdrop-blur-sm border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
          <div class="text-5xl mb-6">🎓</div>
          <h3 class="text-xl font-semibold mb-4">Students & Educators</h3>
          <ul class="text-muted-foreground text-sm space-y-2 text-left">
            <li>• Interactive learning beyond textbooks</li>
            <li>• Visual comparison of strategic approaches</li>
            <li>• Discussion starters for classroom dialogue</li>
            <li>• Self-paced exploration and reflection</li>
          </ul>
        </div>
        
        <div class="bg-card/50 backdrop-blur-sm border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
          <div class="text-5xl mb-6">💼</div>
          <h3 class="text-xl font-semibold mb-4">Managers & Leaders</h3>
          <ul class="text-muted-foreground text-sm space-y-2 text-left">
            <li>• Develop strategic thinking skills</li>
            <li>• Understand your strategic preferences</li>
            <li>• Navigate complex strategic decisions</li>
            <li>• Build team alignment on strategy</li>
          </ul>
        </div>
        
        <div class="bg-card/50 backdrop-blur-sm border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
          <div class="text-5xl mb-6">🏢</div>
          <h3 class="text-xl font-semibold mb-4">Organizations & Consultants</h3>
          <ul class="text-muted-foreground text-sm space-y-2 text-left">
            <li>• Strategic capability development</li>
            <li>• Workshop and training content</li>
            <li>• Common language for strategy discussions</li>
            <li>• Assessment of strategic maturity</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- Technical Approach -->
{#if sectionsVisible}
  <section 
    in:fly={{ y: 30, duration: 500, delay: 1000, easing: quintOut }}
    class="py-16"
  >
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Our Technical Approach</h2>
      
      <div class="bg-card border rounded-lg p-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-2xl">🎨</span>
              Design Principles
            </h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• Clean, intuitive interface design</li>
              <li>• Progressive disclosure of complexity</li>
              <li>• Responsive and accessible</li>
              <li>• Smooth, meaningful animations</li>
              <li>• Dark/light mode support</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-2xl">⚡</span>
              Technology Stack
            </h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• SvelteKit for modern web development</li>
              <li>• Chart.js for interactive visualizations</li>
              <li>• Tailwind CSS for consistent styling</li>
              <li>• TypeScript for type safety</li>
              <li>• Local storage for user preferences</li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <span class="text-2xl">🔒</span>
            Privacy & Data
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            Your reflections and positions are stored locally in your browser. We don't collect, 
            track, or store any personal data on our servers. Your strategic journey remains private and under your control.
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- Future Vision -->
{#if sectionsVisible}
  <section 
    in:scale={{ duration: 600, delay: 1200, easing: quintOut }}
    class="py-16 bg-gradient-to-r from-secondary/10 to-muted/10"
  >
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8">The Future of Strategy Explorer</h2>
      
      <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
        We're continuously expanding Strategy Explorer with new modules, scenarios, and learning experiences. 
        Our goal is to create the most comprehensive platform for strategic learning and exploration.
      </p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-card/50 border rounded-lg p-6">
          <h3 class="font-semibold mb-2">Coming Soon</h3>
          <ul class="text-sm text-muted-foreground space-y-1 text-left">
            <li>• Curated strategy library with book recommendations</li>
            <li>• Interactive scenarios and case studies</li>
            <li>• Team collaboration features</li>
            <li>• Personal learning journey tracking</li>
          </ul>
        </div>
        
        <div class="bg-card/50 border rounded-lg p-6">
          <h3 class="font-semibold mb-2">Future Vision</h3>
          <ul class="text-sm text-muted-foreground space-y-1 text-left">
            <li>• AI-powered strategic thinking assistant</li>
            <li>• Industry-specific strategy modules</li>
            <li>• Multiplayer strategic simulations</li>
            <li>• Integration with strategic planning tools</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-primary/10 rounded-lg p-6">
        <h3 class="font-semibold mb-3">Get Involved</h3>
        <p class="text-muted-foreground text-sm mb-4">
          Strategy Explorer is an open-source project. We welcome contributions, feedback, and ideas 
          from the strategy community.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
            📧 Feedback Welcome
          </span>
          <span class="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
            🤝 Open Source
          </span>
          <span class="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
            🌍 Community Driven
          </span>
        </div>
      </div>
    </div>
  </section>
{/if}