<script lang="ts">
    export let title: string;
    export let description: string;
  </script>
  
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
    <h2 class="text-lg font-semibold">{title}</h2>
    <p class="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
  