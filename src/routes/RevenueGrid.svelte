<script lang="ts">
	import type { GridItem } from '$lib/utils';

	let props: { gridItems: GridItem[] } = $props();
	console.log(props.gridItems);
</script>

<div class="mx-auto grid max-w-4xl grid-cols-20 gap-2 p-4">
	{#each props.gridItems as item}
		<div class="group relative">
			<div
				class="flex aspect-square w-full items-end overflow-hidden rounded-md border border-gray-200 bg-gray-100 hover:scale-105"
			>
				<div
					class={`w-full ${item.filled ? 'bg-emerald-500' : ''}`}
					style={`height: ${item.percentageFilled}%`}
				></div>
			</div>

			<div
				class="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform group-hover:block"
			>
				<div class="w-[200px] rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
					<div class="mb-1 text-center font-semibold">
						{item.start.toLocaleString()} RON - {item.end.toLocaleString()} RON
					</div>
					<div class="max-h-60 overflow-y-auto text-center">
						{#each item.dates as dateEntry}<div class="whitespace-nowrap">
								{new Date(dateEntry.date).toLocaleDateString()} - {dateEntry.value} RON
							</div>
						{/each}
					</div>
					<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
						<div class="border-8 border-transparent border-t-gray-900"></div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
