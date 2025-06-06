<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="min-h-screen bg-background text-foreground font-sans antialiased">
  <Header />
  <main>
    <slot />
  </main>
</div>