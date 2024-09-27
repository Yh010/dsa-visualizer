export const mergeSort = (array, animations = []) => {
  if (array.length <= 1) return array;

  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle), animations);
  const right = mergeSort(array.slice(middle), animations);

  return merge(left, right, array, animations);
};

const merge = (left, right, originalArray, animations) => {
  let i = 0, j = 0, k = 0;
  const tempArray = [...originalArray];

  // While there are elements in both left and right arrays
  while (i < left.length && j < right.length) {
    const leftIndex = k;  // Current index in original array being filled
    const rightIndex = k; // Same index for both comparisons

    // Record comparison animation
    animations.push({
      array: [...tempArray],
      active: [i, j],  // Left and right index in their respective subarrays
      highlight: [],   // No highlight yet, just comparison
      operation: `Comparing ${left[i]} and ${right[j]}`,
    });

    // Perform merging
    if (left[i] < right[j]) {
      originalArray[k++] = left[i++];
    } else {
      originalArray[k++] = right[j++];
    }

    // Record merge animation
    animations.push({
      array: [...originalArray],
      active: [],  // No comparison active
      highlight: [k - 1],  // The merged index should be highlighted
      operation: `Merging ${originalArray[k - 1]} into position`,
    });
  }

  // When there are remaining elements in the left array
  while (i < left.length) {
    originalArray[k] = left[i];
    animations.push({
      array: [...originalArray],
      active: [],  // No comparison active
      highlight: [k],  // Highlight the position where the element is being merged
      operation: `Merging remaining left element ${left[i]}`,
    });
    i++;
    k++;
  }

  // When there are remaining elements in the right array
  while (j < right.length) {
    originalArray[k] = right[j];
    animations.push({
      array: [...originalArray],
      active: [],  // No comparison active
      highlight: [k],  // Highlight the position where the element is being merged
      operation: `Merging remaining right element ${right[j]}`,
    });
    j++;
    k++;
  }

  return originalArray;
};
