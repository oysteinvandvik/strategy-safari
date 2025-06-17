<!-- 
  FILE: src/routes/schools/+page.svelte
  Enhanced Schools Overview with descriptions 
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface School {
    id: string;
    name: string;
    shortName: string;
    group: 'Prescriptive' | 'Descriptive';
    description: string;
    longDescription: string;
    keyFigures: string[];
    originPeriod: string;
    coreBeliefs: string[];
    strengths: string[];
    weaknesses: string[];
    values: number[];
  }

  // Mock data - replace with your actual data loading
  let schoolsData: { schools: School[] } = {
    schools: [
      {
        id: "design",
        name: "Design School",
        shortName: "Design",
        group: "Prescriptive",
        description: "Strategy as a process of conception — clear, deliberate design through internal fit.",
        longDescription: "The Design School views strategy formation as a process of conception...",
        keyFigures: ["Kenneth Andrews", "Roland Christensen"],
        originPeriod: "1960s",
        coreBeliefs: ["Strategy should be explicit and clear"],
        strengths: ["Promotes clear thinking"],
        weaknesses: ["May oversimplify"],
        values: [5, 2, 3, 2, 1]
      },
      {
        id: "planning",
        name: "Planning School", 
        shortName: "Planning",
        group: "Prescriptive",
        description: "Strategy as formal planning with detailed procedures, explicit steps and checklists.",
        longDescription: "The Planning School emphasizes formal procedures...",
        keyFigures: ["Igor Ansoff"],
        originPeriod: "1970s", 
        coreBeliefs: ["Formal planning processes"],
        strengths: ["Systematic approach"],
        weaknesses: ["Can be rigid"],
        values: [5, 1, 3, 2, 2]
      },
      {
        id: "positioning",
        name: "Positioning School",
        shortName: "Positioning", 
        group: "Prescriptive",
        description: "Strategy as analytical process focused on industry analysis and competitive positioning.",
        longDescription: "The Positioning School focuses on industry structure...",
        keyFigures: ["Michael Porter"],
        originPeriod: "1980s",
        coreBeliefs: ["Industry analysis is key"],
        strengths: ["Rigorous analysis"],
        weaknesses: ["Can ignore internal capabilities"],
        values: [4, 2, 5, 2, 4]
      },
      {
        id: "entrepreneurial",
        name: "Entrepreneurial School",
        shortName: "Entrepreneurial",
        group: "Descriptive", 
        description: "Strategy as visionary process driven by the leader's vision and intuition.",
        longDescription: "The Entrepreneurial School emphasizes vision...",
        keyFigures: ["Joseph Schumpeter"],
        originPeriod: "Various",
        coreBeliefs: ["Leadership vision drives strategy"],
        strengths: ["Inspires and motivates"],
        weaknesses: ["Depends on one person"],
        values: [3, 3, 3, 5, 4]
      },
      {
        id: "cognitive",
        name: "Cognitive School",
        shortName: "Cognitive",
        group: "Descriptive",
        description: "Strategy as mental process focusing on how strategists think and process information.",
        longDescription: "The Cognitive School examines mental processes...",
        keyFigures: ["Herbert Simon"],
        originPeriod: "1980s",
        coreBeliefs: ["Mind matters in strategy"],
        strengths: ["Understands biases"],
        weaknesses: ["Can be too theoretical"],
        values: [2, 3, 2, 5, 1]
      },
      {
        id: "learning",
        name: "Learning School",
        shortName: "Learning", 
        group: "Descriptive",
        description: "Strategy as emergent process where strategies develop through organizational learning.",
        longDescription: "The Learning School sees strategy as emergent...",
        keyFigures: ["James Quinn", "Ikujiro Nonaka"],
        originPeriod: "1990s",
        coreBeliefs: ["Strategy emerges through learning"],
        strengths: ["Adapts to change"],
        weaknesses: ["Can lack direction"],
        values: [2, 5, 3, 4, 2]
      },
      {
        id: "power",
        name: "Power School",
        shortName: "Power",
        group: "Descriptive",
        description: "Strategy as process of negotiation and bargaining between competing power holders.",
        longDescription: "The Power School views strategy formation...",
        keyFigures: ["Graham Allison", "Jeffrey Pfeffer"],
        originPeriod: "1970s-80s",
        coreBeliefs: ["Politics and power shape strategy"],
        strengths: ["Realistic about organizations"],
        weaknesses: ["Can be cynical"],
        values: [3, 4, 4, 3, 5]
      },
      {
        id: "cultural",
        name: "Cultural School",
        shortName: "Cultural",
        group: "Descriptive", 
        description: "Strategy as collective process rooted in organizational culture and social beliefs.",
        longDescription: "The Cultural School emphasizes collective processes...",
        keyFigures: ["Edgar Schein"],
        originPeriod: "1980s",
        coreBeliefs: ["Culture drives strategy"],
        strengths: ["Emphasizes collective wisdom"],
        weaknesses: ["Resistant to change"],
        values: [2, 5, 3, 5, 1]
      },
      {
        id: "environmental",
        name: "Environmental School", 
        shortName: "Environmental",
        group: "Descriptive",
        description: "Strategy as reactive process where the environment sets demands on the organization.",
        longDescription: "The Environmental School sees the environment...",
        keyFigures: ["Michael Hannan", "John Freeman"],
        originPeriod: "1970s",
        coreBeliefs: ["Environment shapes strategy"],
        strengths: ["Acknowledges constraints"],
        weaknesses: ["Downplays strategic choice"],
        values: [1, 4, 4, 2, 2]
      },
      {
        id: "configuration",
        name: "Configuration School",
        shortName: "Configuration",
        group: "Descriptive",
        description: "Strategy as transformation process between stable configurations and change periods.",
        longDescription: "The Configuration School describes organizations...",
        keyFigures: ["Henry Mintzberg", "Danny Miller"],
        originPeriod: "1980s-90s", 
        coreBeliefs: ["Organizations are configurations"],
        strengths: ["Integrative approach"],
        weaknesses: ["Complex to implement"],
        values: [4, 4, 4, 4, 3]
      }
    ]
  };

  let selectedGroup: 'All' | 'Prescriptive' | 'Descriptive' = 'All';
  let loading = false;
  let pageVisible = false;

  const pLabels = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
  const pColors = ['#3366cc', '#dc2626', '#16a34a', '#ea580c', '#9333ea'];

  $: filteredSchools = selectedGroup === 'All' 
    ? schoolsData.schools 
    : schoolsData.schools.filter(school => school.group === selectedGroup);

  $: totalCount = schoolsData.schools.length;
  $: prescriptiveCount = schoolsData.schools.filter(s => s.group === 'Prescriptive').length;
  $: descriptiveCount = schoolsData.schools.filter(s => s.group === 'Descriptive').length;

  onMount(() => {
    setTimeout(() => pageVisible = true, 100);
  });

  function handleSchoolClick(schoolId: string) {
    goto(`/schools/${schoolId}`);
  }

  function getGroupColor(group: string) {
    return group === 'Prescriptive' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }
</script>

<svelte:head>
  <title>Strategy Schools Overview - Strategy Explorer</title>
  <meta name="description" content="Explore the 10 strategic schools from Mintzberg's Strategy Safari. Compare their approaches to the Five P's of strategy." />
</svelte:head>

<!-- Page Header -->
{#if pageVisible}
  <div in:fly={{ y: 30, duration: 600, easing: quintOut }} class="mb-8">
    <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
      Strategy Schools Overview
    </h1>
    <p class="text-xl text-muted-foreground max-w-3xl">
      Discover the ten distinct schools of strategic thought from Henry Mintzberg's Strategy Safari. 
      Each school offers a unique perspective on how strategy is formed and implemented.
    </p>
  </div>
{/if}

<!-- Filter Tabs -->
{#if pageVisible}
  <div in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }} class="mb-8">
    <div class="flex flex-wrap gap-2">
      <button
        on:click={() => selectedGroup = 'All'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedGroup === 'All' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
      >
        All Schools ({totalCount})
      </button>
      <button
        on:click={() => selectedGroup = 'Prescriptive'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedGroup === 'Prescriptive' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
      >
        Prescriptive ({prescriptiveCount})
      </button>
      <button
        on:click={() => selectedGroup = 'Descriptive'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedGroup === 'Descriptive' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
      >
        Descriptive ({descriptiveCount})
      </button>
    </div>
  </div>
{/if}

<!-- Schools Grid -->
{#if pageVisible}
  <div 
    in:fly={{ y: 20, duration: 500, delay: 400, easing: quintOut }}
    class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
  >
    {#each filteredSchools as school, index (school.id)}
      <div
        in:scale={{ duration: 300, delay: index * 50, easing: quintOut }}
        class="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
        on:click={() => handleSchoolClick(school.id)}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && handleSchoolClick(school.id)}
      >
        <!-- School Header -->
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {school.name}
            </h3>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 {getGroupColor(school.group)}">
              {school.group}
            </span>
          </div>
          <div class="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
            {school.group === 'Prescriptive' ? '📋' : '🔍'}
          </div>
        </div>

        <!-- School Description -->
        <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
          {school.description}
        </p>

        <!-- Five P's Profile -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-foreground mb-3">Five P's Emphasis:</h4>
          {#each school.values as value, idx}
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground min-w-0 flex-1">
                {pLabels[idx]}:
              </span>
              <div class="flex items-center gap-2 flex-1 max-w-[120px]">
                <div class="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    style="width: {(value / 5) * 100}%; background-color: {pColors[idx]}"
                  ></div>
                </div>
                <span class="text-xs text-muted-foreground min-w-[24px] text-right">
                  {value}/5
                </span>
              </div>
            </div>
          {/each}
        </div>

        <!-- Hover Arrow -->
        <div class="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-sm text-primary font-medium">Learn more</span>
          <svg class="w-4 h-4 ml-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- Call to Action Section -->
{#if pageVisible}
  <div 
    in:fly={{ y: 30, duration: 600, delay: 600, easing: quintOut }}
    class="text-center py-12 bg-muted/30 rounded-2xl"
  >
    <h2 class="text-2xl font-bold text-foreground mb-4">
      Explore Further
    </h2>
    <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
      Compare these strategy schools visually or learn more about the Five P's framework.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        on:click={() => goto('/radar')}
        class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        <span class="mr-2">📊</span>
        Interactive Radar Chart
      </button>
      <button 
        on:click={() => goto('/ps')}
        class="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
      >
        <span class="mr-2">🗣️</span>
        Learn About the 5 P's
      </button>
    </div>
  </div>
{/if}