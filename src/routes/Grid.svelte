<script lang="ts">
	import { sampleData } from '$lib/data';
	import { createGridData } from '$lib/utils';
	import RevenueGrid from './RevenueGrid.svelte';
	const total = 338_785;

	let gridItems = createGridData(sampleData, total);
	let totalRevenue = sampleData.reduce((acc, item) => acc + item.value, 0);
	const totalCells = gridItems.length;
	const filledCells = gridItems.filter((item) => item.percentageFilled == 100).length;
</script>

<div class="min-h-screen bg-gray-50 py-12">
	<div class="mx-auto max-w-4xl px-4">
		<div class="mb-8 text-center">
			<div class="mb-2 flex items-center justify-center gap-2">
				<!-- <Target class="h-8 w-8 text-emerald-500" /> -->
				<h1 class="text-3xl font-bold text-gray-900">Revenue Target Tracker</h1>
			</div>
			<p class="mb-4 text-gray-600">Track your progress towards revenue goal</p>
			<div class="text-2xl font-semibold text-emerald-600">
				{totalRevenue.toLocaleString()} RON / {total.toLocaleString()} RON
			</div>
			<div class="mt-2 h-2 w-full rounded-full bg-gray-200">
				<div
					class="h-2 rounded-full bg-emerald-500 transition-all duration-500"
					style="width: {Math.min((totalRevenue / total) * 100, 100)}%"
				></div>
			</div>
			<p class="mt-2 text-emerald-700">
				You are {((totalRevenue / total) * 100).toFixed(2)}% towards your goal
			</p>
			<p class="mt-2 text-emerald-700">
				You need {Math.max(total - totalRevenue, 0).toLocaleString()} RON more to reach your goal
			</p>
			<p class="mt-2 text-emerald-700">
				You need to fill a total of {totalCells} squares. You have filled {filledCells} squares.
			</p>
		</div>

		<RevenueGrid {gridItems} />

		<div class="mt-8 text-center text-sm text-gray-600">
			Each square represents 2,000 RON in revenue. Hover over filled squares to see dates.
		</div>
	</div>
</div>
