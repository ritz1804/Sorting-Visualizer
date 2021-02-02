async function merge(low, mid, high) {
    await sleep(delay);
    var i, j;
    var n1 = mid - low + 1;
    var n2 = high - mid;
    var L = [];
    var R = [];
    for(i = 0; i < n1; i++) {
        L.push(arr[low + i]);
        setColor(low + i, leftBlock);
    }
    for(j = 0; j < n2; j++) {
        R.push(arr[mid + j + 1]);
        setColor(mid + j + 1, rightBlock);
    }
    L.push(Infinity);
    R.push(Infinity);
    i = 0;
    j = 0;
    for(var k = low; k <= high; k++) {
        await sleep(delay);
        if(L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        setHeight(k, arr[k]);
        setColor(k, selectedBlock);
    }
    await sleep(delay);
    if(low == 0 && high == size - 1)
        setColorRange(low, high, sortedBlock);
    else
        setColorRange(low, high, unsortedBlock);
}
async function mergeSort(low, high) {
    if(low < high) {
        var mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}