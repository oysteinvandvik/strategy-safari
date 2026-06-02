<!-- src/routes/ps/[slug]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    let pData: any = null;
    let allPsData: any = null;
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;
  
    // Get the slug from the URL
    $: slug = $page.params.slug;
  
    onMount(async () => {
      try {
        const res = await fetch('/data/ps.json');
        if (!res.ok) throw new Error('Failed to load P data');
        allPsData = await res.json();
        
        // Find the specific P based on the slug
        pData = allPsData.ps.find((p: any) => p.id === slug);
        
        if (!pData) {
          error = `Strategy P "${slug}" not found`;
        } else {
          // Trigger staggered animations
          setTimeout(() => sectionsVisible = true, 200);
        }
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading = false;
      }
    });
  
    function getColorClasses(color: string) {
      const colorMap: Record<string, string> = {
        '#3366cc': 'from-blue-500 to-blue-700',
        '#dc3545': 'from-red-500 to-red-700', 
        '#28a745': 'from-green-500 to-green-700',
        '#ffc107': 'from-amber-500 to-amber-700',
        '#6f42c1': 'from-purple-500 to-purple-700'
      };
      return colorMap[color] || 'from-gray-500 to-gray-700';
    }
  
    function getTextColor(color: string) {
      const colorMap: Record<string, string> = {
        '#3366cc': 'text-blue-600',
        '#dc3545': 'text-red-600', 
        '#28a745': 'text-green-600',
        '#ffc107': 'text-amber-600',
        '#6f42c1': 'text-purple-600'
      };
      return colorMap[color] || 'text-gray-600';
    }
  
    function getBorderColor(color: string) {
      const colorMap: Record<string, string> = {
        '#3366cc': 'border-blue-200',
        '#dc3545': 'border-red-200', 
        '#28a745': 'border-green-200',
        '#ffc107': 'border-amber-200',
        '#6f42c1': 'border-purple-200'
      };
      return colorMap[color] || 'border-gray-200';
    }
  
    function navigateToOtherP(pId: string) {
      goto(`/ps/${pId}`);
    }

    // Outgoing interactions: how THIS voice plays against the other four.
    $: interactions =
      allPsData?.interactions?.matrix?.filter((e: any) => e.from === pData?.id) ?? [];

    function getP(id: string) {
      return allPsData?.ps?.find((p: any) => p.id === id);
    }
  </script>
  
  <svelte:head>
    {#if pData}
      <title>Strategy as {pData.label} - The 5 P's of Strategy</title>
      <meta name="description" content="{pData.fullDescription}" />
    {/if}
  </svelte:head>
  
  {#if loading}
    <div class="max-w-7xl mx-auto px-4 py-16 text-center">
      <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-4 text-muted-foreground">Loading strategy details...</p>
    </div>
  
  {:else if error}
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold text-red-800 mb-2">Strategy P Not Found</h2>
        <p class="text-red-600 mb-4">{error}</p>
        <a href="/ps" class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          ← Back to 5 P's Overview
        </a>
      </div>
    </div>
  
  {:else if pData}
    <div class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Breadcrumb -->
      <nav class="mb-8" in:fly={{ y: -20, duration: 600, easing: quintOut }}>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/ps" class="hover:text-primary transition-colors">5 P's of Strategy</a>
          <span>›</span>
          <span class="font-medium {getTextColor(pData.color)}">{pData.label}</span>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <div class="mb-12" in:fly={{ y: 30, duration: 800, easing: quintOut }}>
        <div class="bg-gradient-to-br {getColorClasses(pData.color)} rounded-2xl p-8 md:p-12 text-white mb-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="text-6xl">{pData.icon}</div>
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">Strategy as {pData.label}</h1>
              <p class="text-xl opacity-90">{pData.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
  
      {#if sectionsVisible}
        <!-- Main Description -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}>
          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-muted-foreground leading-relaxed">{pData.fullDescription}</p>
          </div>
        </section>
  
        <!-- Characteristics -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">🔍</span>
            Key Characteristics
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each pData.characteristics as characteristic, index}
              <div class="flex items-start gap-3 p-4 rounded-lg border {getBorderColor(pData.color)} bg-card"
                   in:scale={{ duration: 400, delay: index * 50 }}>
                <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" style="background-color: {pData.color}"></div>
                <span class="text-sm font-medium">{characteristic}</span>
              </div>
            {/each}
          </div>
        </section>
  
        <!-- Real-World Examples -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">🏢</span>
            Real-World Examples
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            {#each pData.examples as example, index}
              <div class="p-6 rounded-xl border-2 {getBorderColor(pData.color)} bg-card hover:shadow-lg transition-shadow"
                   in:scale={{ duration: 600, delay: index * 100 }}>
                <h3 class="text-xl font-bold mb-2 {getTextColor(pData.color)}">{example.company}</h3>
                <p class="font-medium text-foreground mb-3">{example.description}</p>
                <p class="text-sm text-muted-foreground leading-relaxed">{example.details}</p>
              </div>
            {/each}
          </div>
        </section>
  
        <!-- Strategic Questions -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">❓</span>
            Strategic Questions to Consider
          </h2>
          <div class="bg-secondary/30 rounded-xl p-6">
            <div class="grid md:grid-cols-2 gap-4">
              {#each pData.questions as question, index}
                <div class="flex items-start gap-3 p-4 bg-background rounded-lg border"
                     in:fly={{ x: -20, duration: 400, delay: index * 75 }}>
                  <div class="text-lg" style="color: {pData.color}">•</div>
                  <p class="text-sm font-medium">{question}</p>
                </div>
              {/each}
            </div>
          </div>
        </section>
  
        <!-- How this voice interacts with the others (collapsed by default) -->
        {#if interactions.length > 0}
          <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 450, easing: quintOut }}>
            <details class="group rounded-xl border bg-card overflow-hidden">
              <summary class="flex items-center justify-between gap-3 p-5 cursor-pointer list-none hover:bg-secondary/30 transition-colors">
                <span class="flex items-center gap-2 font-semibold">
                  <span class="text-xl">🕸️</span>
                  How {pData.label} plays against the other voices
                </span>
                <span class="text-muted-foreground text-sm group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div class="px-5 pb-5 pt-1 space-y-3 border-t">
                <p class="text-sm text-muted-foreground pt-3">
                  The five voices don't act alone. Here's how {pData.label} shapes — and is shaped by — each of the others.
                </p>
                {#each interactions as edge}
                  {@const target = getP(edge.to)}
                  <div class="flex items-start gap-3 p-4 rounded-lg bg-background border">
                    <span class="text-xl flex-shrink-0">{target?.icon ?? '•'}</span>
                    <div>
                      <button
                        class="font-medium text-sm hover:underline {target ? getTextColor(target.color) : ''}"
                        on:click={() => navigateToOtherP(edge.to)}
                      >
                        {pData.label} → {target?.label ?? edge.to} →
                      </button>
                      <p class="text-sm text-muted-foreground leading-relaxed mt-1">{edge.relationship}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </details>
          </section>
        {/if}

        <!-- Navigation to Other P's -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 500, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">🔗</span>
            Explore Other Perspectives
          </h2>
          {#if allPsData}
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {#each allPsData.ps as otherP}
                {#if otherP.id !== pData.id}
                  <button 
                    class="p-4 rounded-lg border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left {getColorClasses(otherP.color)} border-opacity-20"
                    style="border-color: {otherP.color}20"
                    on:click={() => navigateToOtherP(otherP.id)}
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-2xl">{otherP.icon}</span>
                      <span class="font-bold {getTextColor(otherP.color)}">{otherP.label}</span>
                    </div>
                    <p class="text-xs text-muted-foreground">{otherP.shortDescription}</p>
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </section>
  
        <!-- Back to Overview -->
        <div class="text-center" in:scale={{ duration: 600, delay: 600 }}>
          <a href="/ps" 
             class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
            ← Back to 5 P's Overview
          </a>
        </div>
      {/if}
    </div>
  {/if}