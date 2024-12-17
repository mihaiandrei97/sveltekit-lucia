export interface RevenueEntry {
	date: string;
	value: number;
}

export interface DateEntry {
	date: string;
	value: number;
}

export interface GridItem {
	start: number;
	end: number;
	dates: DateEntry[];
	filled: boolean;
	percentageFilled: number;
}
export const createGridData = (entries: RevenueEntry[], total: number): GridItem[] => {
	const gridItems: GridItem[] = [];
	// const totalGrids = 50; // 100k / 2k = 50 grids
	const gridSize = 2000;
	const totalGrids = Math.ceil(total / gridSize);

	// Initialize grid items
	for (let i = 0; i < totalGrids; i++) {
		gridItems.push({
			start: i * gridSize,
			end: Math.min((i + 1) * gridSize, total),
			dates: [],
			filled: false,
			percentageFilled: 0
		});
	}

	// Sort entries by date
	const sortedEntries = [...entries].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	let currentTotal = 0;

	// Process each entry
	sortedEntries.forEach((entry) => {
		let remainingValue = entry.value;

		while (remainingValue > 0) {
			const currentGridIndex = Math.floor(currentTotal / gridSize);

			if (currentGridIndex >= totalGrids) break;

			// const currentGridStart = currentGridIndex * gridSize;
			const amountNeededForGrid = (currentGridIndex + 1) * gridSize - currentTotal;
			const amountToAdd = Math.min(remainingValue, amountNeededForGrid);

			gridItems[currentGridIndex].filled = true;
			gridItems[currentGridIndex].dates.push({
				date: entry.date,
				value: amountToAdd
			});

			const totalForCurrentGridItem = gridItems[currentGridIndex].dates.reduce(
				(acc, { value }) => acc + value,
				0
			);
			const percentageForCurrentGridItem = (totalForCurrentGridItem / gridSize) * 100;
			gridItems[currentGridIndex].percentageFilled = percentageForCurrentGridItem;

			remainingValue -= amountToAdd;
			currentTotal += amountToAdd;
		}
	});

	return gridItems;
};
