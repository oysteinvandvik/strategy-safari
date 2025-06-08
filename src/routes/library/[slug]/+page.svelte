<!-- src/routes/library/[slug]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import BookDetail from '$lib/components/BookDetail.svelte';

  $: bookId = $page.params.slug;
</script>

<svelte:head>
  <title>Book Details - Strategy Library</title>
  <meta name="description" content="Detailed view of strategy book with voice analysis, paradox exploration, and related recommendations." />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
  <BookDetail {bookId} />
</div>