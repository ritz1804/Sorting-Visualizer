async function selectionSort() {
    var i, j, min_idx;
    for(i = 0; i < size - 1; i++) {
        await sleep(delay);
        min_idx = i;
        setColor(min_idx, selectedBlock);
        for(j = i + 1; j < size; j++) {
            await sleep(delay);
            setColor(j, comparisonBlock);
            await sleep(delay);
            if(arr[j] < arr[min_idx]) {
                setColor(min_idx, unsortedBlock);
                min_idx = j;
                setColor(min_idx, selectedBlock);
                await sleep(delay);
            }
            else {
                setColor(j, unsortedBlock);
            }
        }
        await sleep(delay);
        if(min_idx != i) {
            setColor(i, comparisonBlock);
            await sleep(delay);
            setColor(min_idx, comparisonBlock);
            setColor(i, selectedBlock);
            swap(min_idx, i);
            await sleep(delay);
        }
        setColor(min_idx, unsortedBlock);
        setColor(i, sortedBlock);
    }
    setColor(size - 1, sortedBlock);
}