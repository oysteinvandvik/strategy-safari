<!-- src/lib/components/SchoolCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface School {
    id: string;
    name: string;
    shortName: string;
    group: string;
    description: string;
    longDescription?: string;
    keyFigures?: string[];
    originPeriod?: string;
    coreBeliefs?: string[];
    strengths?: string[];
    weaknesses?: string[];
    values?: number[];
    emphasis?: {
      plan: number;
      pattern: number;
      position: number;
      perspective: number;
      ploy: number;
    };
    pApproaches?: any;
  }

  export let school: School;
  export let delay = 0;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', school);
  }

  function getCategoryStyle(category: string) {
    return category === 'Prescriptive' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }

  function getSchoolIcon(schoolId: string) {
    const icons = {
      design: '🎨',
      planning: '📋',
      positioning: '🎯',
      entrepreneurial: '🚀',
      cognitive: '🧠',
      learning: '📚',
      power: '⚡',
      cultural: '🌍',
      environmental: '🌿',
      configuration: '⚙️'
    };
    return icons[schoolId as keyof typeof icons] || '🏛️';
  }

  function getVoiceColor(voice: string) {
    const colors = {
      plan: 'bg-blue-500',
      pattern: 'bg-green-500',
      position: 'bg-orange-500',
      perspective: 'bg-purple-500',
      ploy: 'bg-red-500'
    };
    return colors[voice as keyof typeof colors] || 'bg-gray-500';
  }

  // Use either emphasis or values array for backward compatibility
  function getEmphasisData() {
    if (school.emphasis) {
      return Object.entries(school.emphasis);
    } else if (school.values && school.values.length === 5) {
      const voices = ['plan', 'pattern', 'position', 'perspective', 'ploy'];
      return voices.map((voice, index) => [voice, school.values![index]]);
    }
    return [];
  }
</script>

<div
  in:scale={{ duration: 400, delay, easing: quintOut }}
  class="group bg-card border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-6">
    <div class="flex-1">
      <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {school.name}
      </h3>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium {getCategoryStyle(school.group)}">
        {school.group}
      </span>
    </div>
    <div class="text-2xl ml-4">
      {getSchoolIcon(school.id)}
    </div>
  </div>

  <!-- Description -->
  <p class="text-sm text-muted-foreground mb-6 leading-relaxed">
    {school.description}
  </p>

  <!-- Five P's Emphasis -->
  {#if getEmphasisData().length > 0}
    <div class="space-y-3">
      <h4 class="text-sm font-semibold text-muted-foreground">Five P's Emphasis:</h4>
      {#each getEmphasisData() as [voice, value]}
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium w-20 capitalize">{voice}:</span>
          <div class="flex-1 flex items-center gap-2">
            <div class="flex-1 bg-secondary rounded-full h-2">
              <div 
                class="h-2 rounded-full {getVoiceColor(voice)} transition-all duration-500"
                style="width: {value * 20}%"
              ></div>
            </div>
            <span class="text-xs text-muted-foreground w-8">{value}/5</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Hover Indicator -->
  <div class="flex items-center justify-end mt-6 text-xs text-muted-foreground group-hover:text-primary transition-colors">
    <span>Learn more →</span>
  </div>
</div>