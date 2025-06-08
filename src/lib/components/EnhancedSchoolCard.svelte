<!-- src/lib/components/EnhancedSchoolCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { slide } from 'svelte/transition';
    import type { EnhancedSchoolData, StrategyP } from '$lib/types';
  
    export let school: EnhancedSchoolData;
    export let expanded = false;
    export let showComparison = false;
  
    const dispatch = createEventDispatcher();
  
    function toggleExpanded() {
      expanded = !expanded;
      dispatch('toggle', { school, expanded });
    }
  
    function getPLabel(index: number): string {
      const labels: StrategyP[] = ['plan', 'pattern', 'position', 'perspective', 'ploy'];
      return labels[index] || 'unknown';
    }
  
    function getGroupColor(group: string) {
      return group === 'Prescriptive' 
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  
    function getStrengthColor(value: number): string {
      if (value >= 4) return 'text-green-600';
      if (value >= 3) return 'text-yellow-600';
      return 'text-gray-500';
    }
  
    $: strongestP = school.values.reduce((max, curr, idx) => 
      curr > school.values[max] ? idx : max, 0);
    
    $: averageEmphasis = school.values.reduce((sum, val) => sum + val, 0) / 5;
  </script>
  
  <div class="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <!-- Header -->
    <button 
      on:click={toggleExpanded}
      class="w-full p-6 text-left hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
    >
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
              {school.name}
            </h3>
            <span class="text-xs px-2 py-1 rounded-full font-medium {getGroupColor(school.group)}">
              {school.group}
            </span>
          </div>
          
          <p class="text-muted-foreground text-sm mb-3 leading-relaxed">
            {school.description}
          </p>
  
          <!-- Quick stats -->
          <div class="flex items-center gap-4 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <span class="font-medium {getStrengthColor(school.values[strongestP])}">
                Strongest: {getPLabel(strongestP).charAt(0).toUpperCase() + getPLabel(strongestP).slice(1)}
              </span>
              <span class="text-muted-foreground/60">({school.values[strongestP]}/5)</span>
            </span>
            <span class="text-muted-foreground/40">•</span>
            <span>Avg: {averageEmphasis.toFixed(1)}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-2 ml-4">
          {#if showComparison}
            <div class="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
              Selected
            </div>
          {/if}
          <div class="text-muted-foreground transition-transform duration-200" 
               class:rotate-180={expanded}>
            ↓
          </div>
        </div>
      </div>
    </button>
  
    <!-- Expanded Content -->
    {#if expanded}
      <div transition:slide={{ duration: 300 }} class="px-6 pb-6 space-y-6">
        
        <!-- Origin & Key Figures -->
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-card-foreground mb-2 flex items-center gap-2">
              <span class="text-base">📅</span>
              Origin Period
            </h4>
            <p class="text-muted-foreground">{school.originPeriod}</p>
          </div>
          <div>
            <h4 class="font-semibold text-card-foreground mb-2 flex items-center gap-2">
              <span class="text-base">👥</span>
              Key Figures
            </h4>
            <p class="text-muted-foreground">{school.keyFigures.join(', ')}</p>
          </div>
        </div>
  
        <!-- Long Description -->
        <div>
          <h4 class="font-semibold text-card-foreground mb-2 flex items-center gap-2">
            <span class="text-base">📝</span>
            Overview
          </h4>
          <p class="text-muted-foreground text-sm leading-relaxed">
            {school.longDescription}
          </p>
        </div>
  
        <!-- Core Beliefs -->
        <div>
          <h4 class="font-semibold text-card-foreground mb-3 flex items-center gap-2">
            <span class="text-base">💡</span>
            Core Beliefs
          </h4>
          <ul class="space-y-2">
            {#each school.coreBeliefs as belief}
              <li class="flex items-start gap-2 text-sm">
                <span class="text-primary text-xs mt-1">•</span>
                <span class="text-muted-foreground">{belief}</span>
              </li>
            {/each}
          </ul>
        </div>
  
        <!-- Five P's Analysis -->
        <div>
          <h4 class="font-semibold text-card-foreground mb-3 flex items-center gap-2">
            <span class="text-base">📊</span>
            Five P's Emphasis
          </h4>
          <div class="space-y-3">
            {#each school.values as value, index}
              {@const pKey = getPLabel(index)}
              {@const pData = school.pApproaches[pKey]}
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-card-foreground capitalize">
                    {pKey}
                  </span>
                  <span class="text-sm {getStrengthColor(value)} font-medium">
                    {value}/5
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-muted rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                      style="width: {(value / 5) * 100}%"
                    ></div>
                  </div>
                </div>
                {#if pData}
                  <p class="text-xs text-muted-foreground pl-1">
                    {pData.description}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
  
        <!-- Strengths & Weaknesses -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <span class="text-base">✅</span>
              Strengths
            </h4>
            <ul class="space-y-2">
              {#each school.strengths as strength}
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-green-500 text-xs mt-1">+</span>
                  <span class="text-muted-foreground">{strength}</span>
                </li>
              {/each}
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <span class="text-base">⚠️</span>
              Limitations
            </h4>
            <ul class="space-y-2">
              {#each school.weaknesses as weakness}
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-yellow-500 text-xs mt-1">-</span>
                  <span class="text-muted-foreground">{weakness}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex gap-3 pt-4 border-t border-border">
          <button 
            on:click={() => dispatch('compare', school)}
            class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <span>📊</span>
            Compare in Radar
          </button>
          <button 
            on:click={() => dispatch('learn-more', school)}
            class="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            <span>📖</span>
            Learn More
          </button>
        </div>
      </div>
    {/if}
  </div>