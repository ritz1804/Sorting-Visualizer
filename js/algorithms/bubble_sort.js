async function bubbleSort() {
    var i, j;
    await sleep(delay);
    for(i = 0; i < size - 1; i++) {
        for(j = 0; j < size - i - 1; j++) {
            await sleep(delay);
            setColor(j, comparisonBlock);
            setColor(j + 1, comparisonBlock);
            await sleep(delay);
            if(arr[j] > arr[j + 1]) {
                swap(j, j + 1);
                await sleep(delay);
            }
            setColor(j, unsortedBlock);
            setColor(j + 1, unsortedBlock);
        }
        await sleep(delay);
        setColor(j, sortedBlock);
    }
    setColor(0, sortedBlock);
}