<script lang="ts">
    import { onMount, tick } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let canvasEl: HTMLCanvasElement;
    let schoolData: Record<string, { group: string; values: number[] }> = {};
    const categories = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
    let selectedSchools: string[] = [];
    let chart: Chart;
  
    let groupedSchools: Record<string, string[]> = {};
  
    async function fetchData() {
      const res = await fetch('/schoolData.json');
      schoolData = await res.json();
      groupedSchools = {};
      for (const [school, data] of Object.entries(schoolData)) {
        const group = data.group;
        if (!groupedSchools[group]) groupedSchools[group] = [];
        groupedSchools[group].push(school);
      }
      selectedSchools = ['Design', 'Learning'];
      await tick();
      drawChart();
    }
  
    function toggleSchool(school: string, checked: boolean) {
      selectedSchools = checked
        ? [...selectedSchools, school]
        : selectedSchools.filter((s) => s !== school);
      drawChart();
    }
  
    function drawChart() {
      if (!canvasEl || !schoolData || selectedSchools.length === 0) return;
  
      const labels = [...categories, categories[0]];
      const datasets = selectedSchools.map((school, idx) => {
        const values = [...schoolData[school].values, schoolData[school].values[0]];
        return {
          label: school,
          data: values,
          fill: true,
          backgroundColor: `rgba(${50 * (idx + 1)}, ${100 + 10 * idx}, ${200 - 15 * idx}, 0.2)`,
          borderColor: `rgba(${50 * (idx + 1)}, ${100 + 10 * idx}, ${200 - 15 * idx}, 1)`,
          borderWidth: 1
        };
      });
  
      if (chart) chart.destroy();
  
      chart = new Chart(canvasEl, {
        type: 'radar',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 5,
              ticks: { stepSize: 1 }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { boxWidth: 12 }
            }
          }
        }
      });
    }
  
    onMount(fetchData);
  </script>
  
  <main class="p-4 sm:p-6 max-w-5xl mx-auto">
    <div class="rounded-xl border border-gray-300 bg-white shadow-md p-6">
      <h1 class="text-xl sm:text-2xl font-bold mb-4">Strategy Safari – Radarvisning</h1>
      {#if Object.keys(groupedSchools).length > 0}
        {#each Object.entries(groupedSchools) as [group, schools]}
          <div class="mb-2 font-semibold">{group} Schools</div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            {#each schools as school}
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedSchools.includes(school)}
                  on:change={(e) => toggleSchool(school, e.target.checked)}
                />
                {school}
              </label>
            {/each}
          </div>
        {/each}
        <div class="relative h-[60vh] sm:h-[70vh]">
          <canvas bind:this={canvasEl} class="w-full h-full"></canvas>
        </div>
      {/if}
    </div>
  </main>
  
  <style>
    canvas {
      max-width: 100%;
    }
  </style>
  