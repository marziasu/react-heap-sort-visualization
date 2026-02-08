

/**
 * Max Heap Operations
 * All operations maintain the max-heap property: parent >= children
 */

export class MaxHeap {
    constructor(initialData = [], skipBuild = false) {
        this.heap = [];

        // Build heap from initial data
        if (initialData.length > 0) {
            if (skipBuild) {
                // Direct copy without heapify (used for rendering intermediate states)
                this.heap = [...initialData];
            } else {
                this.buildHeap(initialData);
            }
        }
    }

    // Build heap from array using bottom-up approach
    buildHeap(arr) {
        this.heap = [...arr];
        const startIdx = Math.floor(this.heap.length / 2) - 1;

        for (let i = startIdx; i >= 0; i--) {
            this.heapifyDownInternal(i);
        }
    }

    getParentIndex(idx) { return Math.floor((idx - 1) / 2); }
    getLeftChildIndex(idx) { return 2 * idx + 1; }
    getRightChildIndex(idx) { return 2 * idx + 2; }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    // Returns a list of steps for visual intuition
    insertWithSteps(person) {
        const steps = [];
        this.heap.push(person);
        let currentIdx = this.heap.length - 1;

        // Step 1: Just the addition
        steps.push({
            heap: [...this.heap],
            highlighted: [currentIdx],
            description: `Added Person ${person.personId} (W:${person.weight}) at the end`
        });

        while (currentIdx > 0) {
            const parentIdx = this.getParentIndex(currentIdx);

            if (this.heap[currentIdx].weight > this.heap[parentIdx].weight) {
                // Show comparison before swap
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx, parentIdx],
                    description: `Comparing: Child ${this.heap[currentIdx].weight} > Parent ${this.heap[parentIdx].weight}`
                });

                // Perform the swap
                this.swap(currentIdx, parentIdx);
                currentIdx = parentIdx;

                // Show after swap
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `Swapped! Person ${person.personId} moved up to index ${currentIdx}`
                });
            } else {
                // Final position
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `Correct position found! Person ${person.personId} stays at index ${currentIdx}`
                });
                break;
            }
        }
        return steps;
    }

    // extractMaxWithSteps() {
    //     if (this.heap.length === 0) return [];
    //     const steps = [];

    //     if (this.heap.length === 1) {
    //         const extracted = { ...this.heap[0] };
    //         this.heap = [];
    //         steps.push({
    //             heap: [],
    //             highlighted: [],
    //             extracted: extracted,
    //             description: `Extracted last element: Person ${extracted.personId} (W:${extracted.weight})`
    //         });
    //         return steps;
    //     }

    //     const lastIdx = this.heap.length - 1;
    //     const maxElement = { ...this.heap[0] };
    //     const lastElement = { ...this.heap[lastIdx] };

    //     // ===== STEP 1: Highlight Root (What will be extracted) =====
    //     steps.push({
    //         heap: [...this.heap],
    //         highlighted: [0],
    //         description: `Step 1: Selecting root Person ${maxElement.personId} (W:${maxElement.weight}) for extraction`
    //         // NO extracted field here
    //     });

    //     // ===== STEP 2: Extract Root - Make it GHOST =====
    //     const heapWithGhostRoot = this.heap.map((person, idx) => {
    //         if (idx === 0) {
    //             return { ...person, isGhost: true };
    //         }
    //         return { ...person };
    //     });

    //     steps.push({
    //         heap: heapWithGhostRoot,
    //         highlighted: [],
    //         extracted: maxElement,  // ✅ ONLY HERE - একবারই extracted পাঠাচ্ছি
    //         description: `Step 2: Root Person ${maxElement.personId} extracted! Root position is now empty.`
    //     });

    //     // ===== STEP 3: Highlight Last Element (Will move to root) =====
    //     steps.push({
    //         heap: heapWithGhostRoot,
    //         highlighted: [lastIdx],
    //         // NO extracted field here
    //         description: `Step 3: Last element Person ${lastElement.personId} (W:${lastElement.weight}) will move to root`
    //     });

    //     // ===== STEP 4: SLIDE Last Element to Root =====
    //     const heapAfterSlide = [...this.heap];
    //     heapAfterSlide.pop();
    //     heapAfterSlide[0] = { ...lastElement };

    //     // Update actual heap
    //     this.heap = heapAfterSlide;

    //     steps.push({
    //         heap: [...this.heap],
    //         highlighted: [0],
    //         // NO extracted field here
    //         description: `Step 4: Person ${lastElement.personId} (W:${lastElement.weight}) moved to root position`
    //     });

    //     // ===== STEP 5+: Heapify Down Process =====
    //     let currentIdx = 0;
    //     let stepCount = 5;

    //     while (true) {
    //         const length = this.heap.length;
    //         const leftIdx = this.getLeftChildIndex(currentIdx);
    //         const rightIdx = this.getRightChildIndex(currentIdx);

    //         // If no children, done
    //         if (leftIdx >= length) {
    //             steps.push({
    //                 heap: [...this.heap],
    //                 highlighted: [currentIdx],
    //                 // NO extracted field here
    //                 description: `Step ${stepCount}: No children to compare. Person ${this.heap[currentIdx].personId} is in correct position!`
    //             });
    //             break;
    //         }

    //         // Collect all nodes for comparison (parent + children)
    //         const allCandidates = [currentIdx];
    //         if (leftIdx < length) allCandidates.push(leftIdx);
    //         if (rightIdx < length) allCandidates.push(rightIdx);

    //         // Build comparison text
    //         const parentVal = this.heap[currentIdx].weight;
    //         const parentId = this.heap[currentIdx].personId;
    //         let comparisonText = `Parent (ID:${parentId}, W:${parentVal})`;

    //         if (leftIdx < length) {
    //             comparisonText += ` vs Left (ID:${this.heap[leftIdx].personId}, W:${this.heap[leftIdx].weight})`;
    //         }
    //         if (rightIdx < length) {
    //             comparisonText += ` vs Right (ID:${this.heap[rightIdx].personId}, W:${this.heap[rightIdx].weight})`;
    //         }

    //         // STEP A: Highlight all candidates (comparison phase)
    //         steps.push({
    //             heap: [...this.heap],
    //             highlighted: allCandidates,
    //             // NO extracted field here
    //             description: `Step ${stepCount}: Comparing - ${comparisonText}`
    //         });
    //         stepCount++;

    //         // Find largest among parent and children
    //         let largestIdx = currentIdx;
    //         if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) {
    //             largestIdx = leftIdx;
    //         }
    //         if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) {
    //             largestIdx = rightIdx;
    //         }

    //         // Check if swap is needed
    //         if (largestIdx !== currentIdx) {
    //             const largestVal = this.heap[largestIdx].weight;
    //             const largestId = this.heap[largestIdx].personId;
    //             const childSide = largestIdx === leftIdx ? "Left" : "Right";

    //             // STEP B: Highlight only the winner (selection phase)
    //             steps.push({
    //                 heap: [...this.heap],
    //                 highlighted: [currentIdx, largestIdx],
    //                 // NO extracted field here
    //                 description: `Step ${stepCount}: ${childSide} child (ID:${largestId}, W:${largestVal}) is larger than Parent (ID:${parentId}, W:${parentVal})`
    //             });
    //             stepCount++;

    //             // STEP C: Perform the swap
    //             this.swap(currentIdx, largestIdx);

    //             // STEP D: Show swap result
    //             steps.push({
    //                 heap: [...this.heap],
    //                 highlighted: [currentIdx, largestIdx],
    //                 // NO extracted field here
    //                 description: `Step ${stepCount}: Swapped! Parent moved to index ${largestIdx}, child moved to index ${currentIdx}`
    //             });
    //             stepCount++;

    //             currentIdx = largestIdx;
    //         } else {
    //             // Heap property satisfied - parent is already largest
    //             steps.push({
    //                 heap: [...this.heap],
    //                 highlighted: [currentIdx],
    //                 // NO extracted field here
    //                 description: `Step ${stepCount}: Parent (ID:${parentId}, W:${parentVal}) is already larger than children. Correct position found!`
    //             });
    //             break;
    //         }
    //     }

    //     return steps;
    // }

    extractMaxWithSteps() {
        if (this.heap.length === 0) return [];
        const steps = [];

        if (this.heap.length === 1) {
            const extracted = { ...this.heap[0] };
            this.heap = [];
            steps.push({
                heap: [],
                highlighted: [],
                extracted: extracted,
                description: `Extracted last element: Person ${extracted.personId} (W:${extracted.weight})`
            });
            return steps;
        }

        const lastIdx = this.heap.length - 1;
        const maxElement = { ...this.heap[0] };
        const lastElement = { ...this.heap[lastIdx] };

        // ===== STEP 1: Highlight Root (What will be extracted) =====
        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `Step 1: Selecting root Person ${maxElement.personId} (W:${maxElement.weight}) for extraction`
        });

        // ===== STEP 2: Extract Root - Make it GHOST =====
        const heapWithGhostRoot = this.heap.map((person, idx) => {
            if (idx === 0) {
                return { ...person, isGhost: true };
            }
            return { ...person };
        });

        steps.push({
            heap: heapWithGhostRoot,
            highlighted: [],
            extracted: maxElement,
            description: `Step 2: Root Person ${maxElement.personId} extracted! Root position is now empty.`
        });

        // ===== STEP 3: Highlight Last Element (Will move to root) =====
        steps.push({
            heap: heapWithGhostRoot,
            highlighted: [lastIdx],
            description: `Step 3: Last element Person ${lastElement.personId} (W:${lastElement.weight}) will move to root`
        });

        // ===== STEP 4: SLIDE Last Element to Root =====
        const heapAfterSlide = [...this.heap];
        heapAfterSlide.pop();
        heapAfterSlide[0] = { ...lastElement };

        // Update actual heap
        this.heap = heapAfterSlide;

        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `Step 4: Person ${lastElement.personId} (W:${lastElement.weight}) moved to root position`
        });

        // ===== STEP 5+: Heapify Down Process =====
        let currentIdx = 0;
        let stepCount = 5;

        while (true) {
            const length = this.heap.length;
            const leftIdx = this.getLeftChildIndex(currentIdx);
            const rightIdx = this.getRightChildIndex(currentIdx);

            // If no children, done
            if (leftIdx >= length) {
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `Step ${stepCount}: No children to compare. Person ${this.heap[currentIdx].personId} is in correct position!`
                });
                break;
            }

            // Collect all nodes for comparison (parent + children)
            const allCandidates = [currentIdx];
            if (leftIdx < length) allCandidates.push(leftIdx);
            if (rightIdx < length) allCandidates.push(rightIdx);

            // Build comparison text
            const parentVal = this.heap[currentIdx].weight;
            const parentId = this.heap[currentIdx].personId;
            let comparisonText = `Parent (ID:${parentId}, W:${parentVal})`;

            if (leftIdx < length) {
                comparisonText += ` vs Left (ID:${this.heap[leftIdx].personId}, W:${this.heap[leftIdx].weight})`;
            }
            if (rightIdx < length) {
                comparisonText += ` vs Right (ID:${this.heap[rightIdx].personId}, W:${this.heap[rightIdx].weight})`;
            }

            // STEP A: Highlight all candidates (comparison phase)
            steps.push({
                heap: [...this.heap],
                highlighted: allCandidates,
                description: `Step ${stepCount}: Comparing - ${comparisonText}`
            });
            stepCount++;

            // Find largest among parent and children
            let largestIdx = currentIdx;
            if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = rightIdx;
            }

            // Check if swap is needed
            if (largestIdx !== currentIdx) {
                const largestVal = this.heap[largestIdx].weight;
                const largestId = this.heap[largestIdx].personId;
                const childSide = largestIdx === leftIdx ? "Left" : "Right";

                // STEP B: Highlight only the two nodes that WILL swap
                // ✅ CRITICAL: Don't swap yet, just show which ones will swap
                steps.push({
                    heap: [...this.heap],  // ✅ Same heap, no swap yet
                    highlighted: [currentIdx, largestIdx],
                    description: `Step ${stepCount}: ${childSide} child (ID:${largestId}, W:${largestVal}) is larger. Will swap with Parent (ID:${parentId}, W:${parentVal})`
                });
                stepCount++;

                // STEP C: NOW perform the actual swap
                // ✅ This is where the heap state changes
                this.swap(currentIdx, largestIdx);

                // STEP D: Show the result AFTER swap
                // ✅ Now layoutId will animate the position change
                steps.push({
                    heap: [...this.heap],  // ✅ New heap state after swap
                    highlighted: [currentIdx, largestIdx],
                    description: `Step ${stepCount}: Swapped! Positions exchanged.`
                });
                stepCount++;

                currentIdx = largestIdx;
            } else {
                // Heap property satisfied - parent is already largest
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `Step ${stepCount}: Parent (ID:${parentId}, W:${parentVal}) is already larger than children. Correct position found!`
                });
                break;
            }
        }

        return steps;
    }

    // INTERNAL: Used during initial build without animation
    heapifyDownInternal(idx) {
        let currentIdx = idx;
        const length = this.heap.length;
        while (true) {
            const leftIdx = this.getLeftChildIndex(currentIdx);
            const rightIdx = this.getRightChildIndex(currentIdx);
            let largestIdx = currentIdx;

            if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) largestIdx = leftIdx;
            if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) largestIdx = rightIdx;

            if (largestIdx !== currentIdx) {
                this.swap(currentIdx, largestIdx);
                currentIdx = largestIdx;
            } else {
                break;
            }
        }
    }

    getHeap() { return [...this.heap]; }
    size() { return this.heap.length; }
}

export function heapSortWithIntuitionSteps(initialHeapArray) {
    const heap = new MaxHeap(initialHeapArray);
    const allSteps = [];
    const sorted = [];

    while (heap.size() > 0) {
        const steps = heap.extractMaxWithSteps();

        for (const step of steps) {
            if (step.extracted) {
                sorted.push(step.extracted);
            }
            // Add a copy of current sorted array to each step
            step.sortedSoFar = [...sorted];
            allSteps.push(step);
        }
    }

    return { sorted, allSteps };
}