<!-- src/lib/components/SchoolDetailView.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { scale, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { EnhancedSchoolData, StrategyP } from '$lib/types';
  
    export let schoolId: string;
    export let compact: boolean = false;
  
    let school: EnhancedSchoolData | null = null;
    let loading = true;
    let error: string | null = null;
    let activeTab: 'overview' | 'ps-analysis' | 'examples' = 'overview';
    let sectionsVisible = false;
  
    const pLabels: Record<StrategyP, string> = {
      plan: 'Plan',
      pattern: 'Pattern', 
      position: 'Position',
      perspective: 'Perspective',
      ploy: 'Ploy'
    };
  
    onMount(async () => {
      try {
        const res = await fetch('/data/enhanced-schools.json');
        if (!res.ok) throw new Error('Failed to load schools data');
        
        const data = await res.json();
        school = data.schools.find((s: EnhancedSchoolData