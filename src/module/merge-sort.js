function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex += 1;
        } else {
            result.push(right[rightIndex]);
            rightIndex += 1;
        }
    }

    // Concatenate any remaining elements from both arrays
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

export default function mergeSort(arr) {
    const len = arr.length;

    if (len <= 1) {
        return arr;
    }

    const mid = Math.floor(len / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}
