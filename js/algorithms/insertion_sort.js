//www.geeksforgeeks.org/insertion-sort/

async function insertionSort() {
    var i, j, key;
    await sleep(delay);
    setColor(0, selectedBlock);
    await sleep(delay);
    setColor(0, sortedBlock);
    for(i = 1; i < size; i++) {
        j = i - 1;
        key = arr[i];
        await sleep(delay);
        setColor(i, selectedBlock);
        await sleep(delay);
        while(j >= 0 && arr[j] > key) {
            setColor(j, comparisonBlock);
            await sleep(delay);
            swap(j, j + 1);
            setColor(j, selectedBlock);
            setColor(j + 1, comparisonBlock);
            await sleep(delay);
            setColor(j + 1, sortedBlock);
            await sleep(delay);
            j--;
        }
        setColor(j + 1, sortedBlock);
    }
}