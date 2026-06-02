<!-- src/routes/library/[slug]/+page.svelte -->
<script lang="ts">
  import BookDetail from '$lib/components/BookDetail.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.book?.title ?? 'Book Details'} - Strategy Library</title>
  <meta name="description" content="Detailed view of strategy book with voice analysis, paradox exploration, and related recommendations." />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
  <BookDetail
    book={data.book}
    allBooks={data.allBooks}
    categories={data.categories}
    schoolNames={data.schoolNames}
    paradoxNames={data.paradoxNames}
  />
</div>