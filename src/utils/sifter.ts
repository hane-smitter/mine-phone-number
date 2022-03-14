/**
 *
 * @param {number} start - Starting number
 * @param {number} stop - Stopping number
 * @param {number} [interval] - Interval between the numbers(skip)
 * @return {Array} - Returns array
 */
function defineRange(
	start: number,
	stop: number,
	interval: number = 1
): number[] {
	return Array.from(
		{ length: (stop - start) / interval + 1 },
		(_, i) => start + i * interval
	);
}

function sift(
	config: { include?: number[]; exclude?: number[] } | undefined,
	...ranges: { from: number; to: number; skip?: number }[]
): number[] {
	const include: number[] = config?.include || [];
	const exclude: number[] | undefined = config?.exclude;
	const sifted_1: number[] = [];
	if (ranges.length > 0)
		ranges.map(range => {
			sifted_1.push(...defineRange(range.from, range.to, range?.skip));
		});
	const sifted_2: number[] = sifted_1
		.filter(sift => !exclude?.includes(sift))
		.concat(include);
	return sifted_2;
}

export default sift;
