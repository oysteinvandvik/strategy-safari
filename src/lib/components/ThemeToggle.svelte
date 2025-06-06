<script lang="ts">
  import { onMount } from 'svelte';

  let theme = 'light';

  const toggleTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  onMount(() => {
    const stored = localStorage.getItem('theme');
    theme = stored ?? 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
</script>

<button
  on:click={toggleTheme}
  class="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm hover:opacity-80 transition"
>
  {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
</button>
