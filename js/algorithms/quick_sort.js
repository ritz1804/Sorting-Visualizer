async function partition(low, high) {
    await sleep(delay);
    var i = low - 1;
    setColor(high, selectedBlock);
    for(var j = low; j < high; j++) {
        await sleep(delay);
        if(arr[j] <= arr[high]) {
            i++;
            swap(i, j);
            setColor(j, rightBlock);
            setColor(i, leftBlock);
        }
        else {
            setColor(j, rightBlock);
        }
            
    }
    if(i + 1 < high) {
        await sleep(delay);
        swap(i + 1, high);
        setColor(high, rightBlock);
        setColor(i + 1, selectedBlock);
    }
    await sleep(delay);
    setColorRange(low, high, unsortedBlock);
    return i + 1;
}
async function quicksort(low, high) {
    if(low < high) {
        var pi = await partition(low, high);
        await quicksort(low, pi - 1);
        setColorRange(low, pi, sortedBlock);
        await quicksort(pi + 1, high);
        setColorRange(pi + 1, high, sortedBlock);
    }
    if(low == 0 && high == size - 1)
        await sleep(delay);
}