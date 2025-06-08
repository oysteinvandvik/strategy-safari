<!-- src/routes/landscapes/+page.svelte -->
<script lang="ts">
    import LandscapeOverview from '$lib/components/LandscapeOverview.svelte';
  </script>
  
  <svelte:head>
    <title>Strategic Landscapes - Strategy Safari</title>
    <meta name="description" content="Explore the fundamental strategic paradoxes from De Wit & Meyer. Navigate tensions between different strategic approaches through interactive exploration." />
  </svelte:head>
  
  <section class="max-w-7xl mx-auto px-4 py-8 md:py-16">
    <LandscapeOverview />
  </section>