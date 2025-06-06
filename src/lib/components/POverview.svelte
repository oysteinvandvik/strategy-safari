<script lang="ts">
  export let schoolName: string;
  export let values: Record<string, number>;
</script>

<div class="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
  <h2 class="text-lg font-semibold">{schoolName}</h2>
  <ul class="mt-2 space-y-1 text-sm text-muted-foreground">
    {#each Object.entries(values) as [key, val]}
      <li class="flex justify-between">
        <span class="capitalize">{key}</span>
        <span>{val}</span>
      </li>
    {/each}
  </ul>
</div>
