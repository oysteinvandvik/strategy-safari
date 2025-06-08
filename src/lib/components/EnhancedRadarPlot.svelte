<!-- src/lib/components/EnhancedRadarPlot.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { RadarSchoolData } from '$lib/types';
    
    export let filteredData: RadarSchoolData[] = [];
    export let animationDuration = 1500;
    
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    let isAnimating = false;
    
    const colors = [
      { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgb(99, 102, 241)' }, // Indigo
      { bg: 'rgba(236, 72, 153, 0.2)', border: 'rgb(236, 72, 153)' }, // Pink
      { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgb(34, 197, 94)' },   // Green
      { bg: 'rgba(251, 146, 60, 0.2)', border: 'rgb(251, 146, 60)' }, // Orange
      { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgb(168, 85, 247)' }, // Purple
      { bg: 'rgba(14, 165, 233, 0.2)', border: 'rgb(14, 165, 233)' }, // Sky
      { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgb(239, 68, 68)' },   // Red
      { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgb(16, 185, 129)' }, // Emerald
      { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgb(245, 158, 11)' }, // Amber
      { bg: 'rgba(139, 92, 246, 0.2)', border: 'rgb(139, 92, 246)' }  // Violet
    ];
  
    const createChart = () => {
      const labels = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
  
      const datasets = filteredData.map((school, index) => ({
        label: school.school,
        data: school.values,
        fill: true,
        backgroundColor: colors[index % colors.length].bg,
        borderColor: colors[index % colors.length].border,
        borderWidth: 3,
        borderDash: [],
        pointBackgroundColor: colors[index % colors.length].border,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: colors[index % colors.length].border,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        tension: 0.1
      }));
  
      chart = new Chart(canvas, {
        type: 'radar',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: animationDuration,
            easing: 'easeOutQuart',
            onProgress: (animation) => {
              isAnimating = animation.currentStep < animation.numSteps;
            },
            onComplete: () => {
              isAnimating = false;
            }
          },
          interaction: {
            intersect: false,
            mode: 'point'
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                  size: 13,
                  weight: '500'
                },
                generateLabels: (chart) => {
                  const datasets = chart.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: colors[i % colors.length].border,
                    strokeStyle: colors[i % colors.length].border,
                    lineWidth: 0,
                    pointStyle: 'circle',
                    datasetIndex: i
                  }));
                }
              },
              onHover: (evt, legendItem, legend) => {
                legend.chart.canvas.style.cursor = 'pointer';
              },
              onLeave: (evt, legendItem, legend) => {
                legend.chart.canvas.style.cursor = 'default';
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              displayColors: true,
              callbacks: {
                title: (tooltipItems) => {
                  return tooltipItems[0]?.label || '';
                },
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.parsed.r;
                  return `${label}: ${value}/5`;
                }
              }
            }
          },
          scales: {
            r: {
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1,
                backdropColor: 'transparent',
                color: 'rgba(156, 163, 175, 0.8)',
                font: {
                  size: 11
                },
                z: 1
              },
              grid: {
                color: 'rgba(156, 163, 175, 0.2)',
                lineWidth: 1
              },
              angleLines: {
                color: 'rgba(156, 163, 175, 0.3)',
                lineWidth: 1
              },
              pointLabels: {
                font: {
                  size: 14,
                  weight: '600'
                },
                color: 'rgba(75, 85, 99, 1)',
                padding: 20
              }
            }
          },
          onHover: (event, elements) => {
            if (chart?.canvas) {
              chart.canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
            }
          }
        }
      });
    };
  
    // Enhanced update function with staggered animations
    const updateChart = async () => {
      if (!chart) return;
      
      isAnimating = true;
      
      // Animate out old data
      chart.data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(() => 0);
      });
      chart.update('none');
      
      // Small delay before animating in new data
      setTimeout(() => {
        chart.data.datasets = filteredData.map((school, index) => ({
          label: school.school,
          data: school.values,
          fill: true,
          backgroundColor: colors[index % colors.length].bg,
          borderColor: colors[index % colors.length].border,
          borderWidth: 3,
          pointBackgroundColor: colors[index % colors.length].border,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: colors[index % colors.length].border,
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          tension: 0.1
        }));
        
        chart.update('active');
      }, 150);
    };
  
    onMount(() => {
      createChart();
    });
  
    $: if (chart && filteredData) {
      updateChart();
    }
  
    onDestroy(() => {
      chart?.destroy();
    });
  </script>
  
  <div class="relative bg-card border border-border rounded-xl p-6 shadow-lg overflow-hidden">
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
    
    <!-- Loading indicator during animations -->
    {#if isAnimating}
      <div class="absolute top-4 right-4 z-10">
        <div class="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    {/if}
    
    <!-- Chart title with animation -->
    <div class="relative z-10 mb-4">
      <h3 class="text-lg font-semibold text-card-foreground flex items-center gap-2">
        <span class="text-xl">📊</span>
        Strategy Schools Radar
        <span class="text-sm text-muted-foreground ml-auto">
          ({filteredData.length} {filteredData.length === 1 ? 'school' : 'schools'})
        </span>
      </h3>
    </div>
    
    <!-- Chart container -->
    <div class="relative z-10 h-96">
      <canvas bind:this={canvas} class="drop-shadow-sm"></canvas>
    </div>
    
    <!-- Quick insights panel -->
    {#if filteredData.length > 0}
      <div class="relative z-10 mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
        <h4 class="text-sm font-medium text-card-foreground mb-2">Quick Insights:</h4>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          {#each ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'] as p, index}
            {@const avgValue = filteredData.reduce((sum, school) => sum + school.values[index], 0) / filteredData.length}
            <div class="text-center p-2 bg-background/50 rounded border border-border/30">
              <div class="font-medium text-card-foreground">{p}</div>
              <div class="text-primary font-bold">{avgValue.toFixed(1)}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>