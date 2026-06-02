<!-- src/routes/schools/[slug]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { SchoolParadoxPosition } from '$lib/types';

    let schoolData: any = null;
    let allSchoolsData: any = null;
    let schoolNames: Record<string, string> = {};
    let paradoxMeta: Record<string, { name: string; left_label: string; right_label: string }> = {};
    let loading = true;
    let error: string | null = null;
    let sectionsVisible = false;

    // Get the slug from the URL
    $: slug = $page.params.slug;

    onMount(async () => {
      try {
        const [res, paradoxRes] = await Promise.all([
          fetch('/data/schools.json'),
          fetch('/data/landscapes.json')
        ]);
        if (!res.ok) throw new Error('Failed to load schools data');
        allSchoolsData = await res.json();

        // id → name map, for the "Tensions with other schools" links
        schoolNames = Object.fromEntries(
          allSchoolsData.schools.map((s: any) => [s.id, s.name])
        );

        // paradox id → metadata, for the "Position in strategic paradoxes" links
        if (paradoxRes.ok) {
          const paradoxes = await paradoxRes.json();
          paradoxMeta = Object.fromEntries(
            paradoxes.map((p: any) => [
              p.id,
              { name: p.name, left_label: p.left_label, right_label: p.right_label }
            ])
          );
        }

        // Find the specific school based on the slug
        schoolData = allSchoolsData.schools.find((school: any) => school.id === slug);

        if (!schoolData) {
          error = `Strategy school "${slug}" not found`;
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

    function getPoleColor(pole: string) {
      switch (pole) {
        case 'left': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
        case 'right': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        default: return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      }
    }

    function getPoleLabel(paradoxId: string, pole: string): string {
      const meta = paradoxMeta[paradoxId];
      if (!meta) return pole;
      if (pole === 'left') return meta.left_label;
      if (pole === 'right') return meta.right_label;
      return 'Both poles';
    }
  
    function getGroupColor(group: string) {
      return group === 'Prescriptive' 
        ? 'from-blue-500 to-blue-700'
        : 'from-green-500 to-green-700';
    }
  
    function getGroupTextColor(group: string) {
      return group === 'Prescriptive' 
        ? 'text-blue-600'
        : 'text-green-600';
    }
  
    function getGroupBorderColor(group: string) {
      return group === 'Prescriptive' 
        ? 'border-blue-200'
        : 'border-green-200';
    }
  
    function getPLabels(): string[] {
      return ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
    }
  
    function getPColors(): string[] {
      return [
        'bg-blue-500',    // Plan
        'bg-red-500',     // Pattern
        'bg-green-500',   // Position
        'bg-amber-500',   // Perspective
        'bg-purple-500'   // Ploy
      ];
    }
  
    function getPStrengthColor(value: number): string {
      if (value >= 4) return 'text-green-600 bg-green-100';
      if (value >= 3) return 'text-amber-600 bg-amber-100';
      return 'text-gray-600 bg-gray-100';
    }
  
    function navigateToOtherSchool(schoolId: string) {
      goto(`/schools/${schoolId}`);
    }
  </script>
  
  <svelte:head>
    {#if schoolData}
      <title>{schoolData.name} - Strategy Schools</title>
      <meta name="description" content="{schoolData.longDescription}" />
    {/if}
  </svelte:head>
  
  {#if loading}
    <div class="max-w-7xl mx-auto px-4 py-16 text-center">
      <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-4 text-muted-foreground">Loading school details...</p>
    </div>
  
  {:else if error}
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold text-red-800 mb-2">Strategy School Not Found</h2>
        <p class="text-red-600 mb-4">{error}</p>
        <a href="/schools" class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          ← Back to Schools Overview
        </a>
      </div>
    </div>
  
  {:else if schoolData}
    <div class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Breadcrumb -->
      <nav class="mb-8" in:fly={{ y: -20, duration: 600, easing: quintOut }}>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/schools" class="hover:text-primary transition-colors">Strategy Schools</a>
          <span>›</span>
          <span class="font-medium {getGroupTextColor(schoolData.group)}">{schoolData.name}</span>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <div class="mb-12" in:fly={{ y: 30, duration: 800, easing: quintOut }}>
        <div class="bg-gradient-to-br {getGroupColor(schoolData.group)} rounded-2xl p-8 md:p-12 text-white mb-8">
          <div class="flex flex-col md:flex-row md:items-center gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <h1 class="text-4xl md:text-5xl font-bold">{schoolData.name}</h1>
                <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {schoolData.group}
                </span>
              </div>
              <p class="text-xl opacity-90 mb-4">{schoolData.description}</p>
              <div class="flex flex-wrap gap-4 text-sm opacity-80">
                <span><strong>Key Figures:</strong> {schoolData.keyFigures.join(', ')}</span>
                <span>•</span>
                <span><strong>Origin Period:</strong> {schoolData.originPeriod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {#if sectionsVisible}
        <!-- Five P's Analysis -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">📊</span>
            How This School Approaches the Five P's
          </h2>
          <div class="grid lg:grid-cols-2 gap-6">
            {#each schoolData.values as value, i}
              <div class="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                   in:scale={{ duration: 600, delay: i * 100 }}>
                
                <!-- P Header with Score -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 {getPColors()[i]} rounded-full"></div>
                    <h3 class="text-xl font-bold">{getPLabels()[i]}</h3>
                  </div>
                  <span class="px-3 py-1 rounded-full text-sm font-medium {getPStrengthColor(value)}">
                    {value}/5
                  </span>
                </div>
  
                <!-- Progress Bar -->
                <div class="mb-4">
                  <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      class="{getPColors()[i]} h-full transition-all duration-1000 ease-out"
                      style="width: {value * 20}%"
                    ></div>
                  </div>
                </div>
  
                <!-- P-specific Content -->
                {#if schoolData.pApproaches && schoolData.pApproaches[getPLabels()[i].toLowerCase()]}
                  {@const pData = schoolData.pApproaches[getPLabels()[i].toLowerCase()]}
                  
                  <!-- Description -->
                  <p class="text-muted-foreground mb-3 leading-relaxed">
                    {pData.description}
                  </p>
  
                  <!-- Characteristics -->
                  {#if pData.characteristics && pData.characteristics.length > 0}
                    <div class="mb-3">
                      <h4 class="text-sm font-medium mb-2">Key Characteristics:</h4>
                      <div class="flex flex-wrap gap-1">
                        {#each pData.characteristics as characteristic}
                          <span class="px-2 py-1 bg-secondary/50 text-xs rounded-full">
                            {characteristic}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}
  
                  <!-- Example -->
                  {#if pData.example}
                    <div class="mt-3 p-3 bg-secondary/20 rounded-lg border-l-4 {getPColors()[i].replace('bg-', 'border-')}">
                      <h4 class="text-xs font-medium text-muted-foreground mb-1">Example:</h4>
                      <p class="text-sm italic">{pData.example}</p>
                    </div>
                  {/if}
                {:else}
                  <!-- Fallback content when no pApproaches data -->
                  <p class="text-muted-foreground">
                    {#if value >= 4}
                      This school places strong emphasis on {getPLabels()[i].toLowerCase()}, making it a central element of their strategic approach.
                    {:else if value >= 3}
                      This school gives moderate attention to {getPLabels()[i].toLowerCase()} in their strategic framework.
                    {:else if value >= 2}
                      This school acknowledges {getPLabels()[i].toLowerCase()} but doesn't make it a primary focus.
                    {:else}
                      This school gives minimal emphasis to {getPLabels()[i].toLowerCase()} in their strategic approach.
                    {/if}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </section>
  
        <!-- Main Description -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">📖</span>
            Overview
          </h2>
          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{schoolData.longDescription}</p>
          </div>

          {#if schoolData.historicalContext}
            <div class="mt-6 bg-card border rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>🕰️</span> Historical Context
              </h3>
              <p class="text-muted-foreground leading-relaxed whitespace-pre-line">{schoolData.historicalContext}</p>
            </div>
          {/if}

          {#if schoolData.keyText}
            <div class="mt-4 flex items-start gap-3 bg-secondary/30 border-l-4 border-primary rounded-r-lg p-4">
              <span class="text-xl">📚</span>
              <div>
                <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Foundational text</div>
                <p class="text-sm font-medium">{schoolData.keyText}</p>
              </div>
            </div>
          {/if}
        </section>
  
        <!-- Three columns: Core Beliefs, Strengths, Weaknesses -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
          <div class="grid md:grid-cols-3 gap-8">
            
            <!-- Core Beliefs -->
            <div class="bg-card border rounded-xl p-6">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="text-blue-500">💡</span>
                Core Beliefs
              </h3>
              <ul class="space-y-3">
                {#each schoolData.coreBeliefs as belief, index}
                  <li class="flex items-start gap-3"
                      in:fly={{ x: -20, duration: 400, delay: index * 100 }}>
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-sm text-muted-foreground">{belief}</span>
                  </li>
                {/each}
              </ul>
            </div>
  
            <!-- Strengths -->
            <div class="bg-card border rounded-xl p-6">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="text-green-500">✅</span>
                Strengths
              </h3>
              <ul class="space-y-3">
                {#each schoolData.strengths as strength, index}
                  <li class="flex items-start gap-3"
                      in:fly={{ x: -20, duration: 400, delay: index * 100 }}>
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-sm text-muted-foreground">{strength}</span>
                  </li>
                {/each}
              </ul>
            </div>
  
            <!-- Weaknesses -->
            <div class="bg-card border rounded-xl p-6">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="text-red-500">⚠️</span>
                Weaknesses
              </h3>
              <ul class="space-y-3">
                {#each schoolData.weaknesses as weakness, index}
                  <li class="flex items-start gap-3"
                      in:fly={{ x: -20, duration: 400, delay: index * 100 }}>
                    <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-sm text-muted-foreground">{weakness}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </section>
  
        <!-- Position in Strategic Paradoxes -->
        {#if schoolData.paradoxPositions && Object.keys(schoolData.paradoxPositions).length > 0}
          <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 350, easing: quintOut }}>
            <h2 class="text-2xl font-bold mb-2 flex items-center gap-2">
              <span class="text-2xl">🗺️</span>
              Position in the Strategic Paradoxes
            </h2>
            <p class="text-muted-foreground mb-6">
              Where this school stands in the tensions framed by De Wit &amp; Meyer. Click a paradox to explore it.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              {#each Object.entries(schoolData.paradoxPositions) as [paradoxId, pos] (paradoxId)}
                {@const p = pos as SchoolParadoxPosition}
                <button
                  class="text-left bg-card border rounded-xl p-5 hover:shadow-lg hover:border-primary/50 transition-all"
                  on:click={() => goto(`/landscapes/${paradoxId}`)}
                >
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="font-semibold">{paradoxMeta[paradoxId]?.name ?? paradoxId}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap {getPoleColor(p.pole)}">
                      {getPoleLabel(paradoxId, p.pole)}
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground">{p.note}</p>
                </button>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Tensions with Other Schools -->
        {#if schoolData.tensionsWith && schoolData.tensionsWith.length > 0}
          <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 380, easing: quintOut }}>
            <h2 class="text-2xl font-bold mb-2 flex items-center gap-2">
              <span class="text-2xl">⚔️</span>
              Tensions with Other Schools
            </h2>
            <p class="text-muted-foreground mb-6">
              Where {schoolData.shortName} School disagrees with its rivals — the debates that define the field.
            </p>
            <div class="space-y-4">
              {#each schoolData.tensionsWith as t}
                <div class="bg-card border rounded-xl p-5">
                  <button
                    class="inline-flex items-center gap-2 mb-2 font-semibold text-primary hover:underline"
                    on:click={() => navigateToOtherSchool(t.school)}
                  >
                    vs. {schoolNames[t.school] ?? t.school} →
                  </button>
                  <p class="text-sm text-muted-foreground leading-relaxed">{t.tension}</p>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Navigation to Other Schools -->
        <section class="mb-12" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="text-2xl">🔗</span>
            Explore Other Schools
          </h2>
          {#if allSchoolsData}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each allSchoolsData.schools as otherSchool}
                {#if otherSchool.id !== schoolData.id}
                  <button 
                    class="p-4 rounded-lg border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left {getGroupBorderColor(otherSchool.group)} bg-card"
                    on:click={() => navigateToOtherSchool(otherSchool.id)}
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-bold {getGroupTextColor(otherSchool.group)}">{otherSchool.shortName}</span>
                      <span class="px-2 py-1 rounded text-xs {otherSchool.group === 'Prescriptive' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}">
                        {otherSchool.group}
                      </span>
                    </div>
                    <p class="text-xs text-muted-foreground">{otherSchool.description}</p>
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </section>
  
        <!-- Back to Overview -->
        <div class="text-center" in:scale={{ duration: 600, delay: 500 }}>
          <a href="/schools" 
             class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
            ← Back to Schools Overview
          </a>
        </div>
      {/if}
    </div>
  {/if}