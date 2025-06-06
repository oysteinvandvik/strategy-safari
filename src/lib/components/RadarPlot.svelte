<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { RadarSchoolData } from '$lib/types';
  
	export let filteredData: RadarSchoolData[] = [];
  
	let canvas: HTMLCanvasElement;
	let chart: Chart;
  
	const colors = [
	  'rgba(255, 99, 132, 0.6)',
	  'rgba(54, 162, 235, 0.6)', 
	  'rgba(255, 206, 86, 0.6)',
	  'rgba(75, 192, 192, 0.6)',
	  'rgba(153, 102, 255, 0.6)',
	  'rgba(255, 159, 64, 0.6)',
	  'rgba(199, 199, 199, 0.6)',
	  'rgba(255, 99, 255, 0.6)',
	  'rgba(100, 200, 100, 0.6)',
	  'rgba(0, 128, 255, 0.6)'
	];
  
	const createChart = () => {
	  const labels = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
  
	  const datasets = filteredData.map((school, index) => ({
		label: school.school,
		data: school.values,
		fill: true,
		backgroundColor: colors[index % colors.length],
		borderColor: colors[index % colors.length].replace('0.6', '1'),
		borderWidth: 2,
		pointBackgroundColor: colors[index % colors.length].replace('0.6', '1'),
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: colors[index % colors.length].replace('0.6', '1')
	  }));
  
	  chart = new Chart(canvas, {
		type: 'radar',
		data: {
		  labels,
		  datasets,
		},
		options: {
		  responsive: true,
		  maintainAspectRatio: false,
		  plugins: {
			legend: {
			  position: 'top',
			},
			title: {
			  display: false,
			}
		  },
		  scales: {
			r: {
			  min: 0,
			  max: 5,
			  ticks: {
				stepSize: 1,
				backdropColor: 'transparent'
			  },
			  grid: {
				color: 'rgba(0, 0, 0, 0.1)'
			  },
			  angleLines: {
				color: 'rgba(0, 0, 0, 0.1)'
			  }
			}
		  }
		}
	  });
	};
  
	onMount(() => {
	  createChart();
	});
  
	$: if (chart && filteredData) {
	  chart.data.datasets = filteredData.map((school, index) => ({
		label: school.school,
		data: school.values,
		fill: true,
		backgroundColor: colors[index % colors.length],
		borderColor: colors[index % colors.length].replace('0.6', '1'),
		borderWidth: 2,
		pointBackgroundColor: colors[index % colors.length].replace('0.6', '1'),
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: colors[index % colors.length].replace('0.6', '1')
	  }));
	  chart.update();
	}
  
	onDestroy(() => {
	  chart?.destroy();
	});
  </script>
  
  <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
	<div class="h-96">
	  <canvas bind:this={canvas}></canvas>
	</div>
  </div>