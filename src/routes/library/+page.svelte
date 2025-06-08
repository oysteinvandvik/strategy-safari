<!-- src/routes/library/+page.svelte -->
<script lang="ts">
    import LibraryOverview from '$lib/components/LibraryOverview.svelte';
  </script>
  
  <svelte:head>
    <title>Strategy Library - Strategy Explorer</title>
    <meta name="description" content="Discover essential strategy books organized by the five voices of strategy and strategic paradoxes. Curated collection of 20+ foundational strategy texts." />
  </svelte:head>
  
  <section class="max-w-7xl mx-auto px-4 py-8 md:py-16">
    <LibraryOverview />
  </section>