/**
 * Max Heap Operations
 * All operations maintain the max-heap property: parent >= children
 */

export class MaxHeap {
    constructor(initialData = []) {
        this.heap = [];

        // Build heap from initial data
        if (initialData.length > 0) {
            this.buildHeap(initialData);
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
            description: `Step 1: Added ${person.weight} at the end of the heap.`
        });

        while (currentIdx > 0) {
            const parentIdx = this.getParentIndex(currentIdx);

            if (this.heap[currentIdx].weight > this.heap[parentIdx].weight) {
                // Perform the swap in the real state
                this.swap(currentIdx, parentIdx);
                currentIdx = parentIdx;

                // CRITICAL: We push the state AFTER the swap so Framer Motion sees 
                // that the IDs have changed positions and animates the circles sliding.
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx, this.getLeftChildIndex(currentIdx), this.getRightChildIndex(currentIdx)].filter(i => i < this.heap.length),
                    description: `SWAPPING: ${person.weight} moves up to parent position.`
                });
            } else {
                break;
            }
        }
        return steps;
    }

    extractMaxWithSteps() {
        if (this.heap.length === 0) return [];
        const steps = [];
        const max = this.heap[0];

        if (this.heap.length === 1) {
            const extracted = this.heap.pop();
            steps.push({
                heap: [],
                highlighted: [],
                extracted: extracted,
                description: `Only one element left: Weight ${extracted.weight}. Extracting it.`
            });
            return steps;
        }

        const lastIdx = this.heap.length - 1;
        // CRITICAL: Create DEEP copies so these values don't change when heap is modified
        const lastElement = { ...this.heap[lastIdx] };
        const extracted = { ...this.heap[0] };

        // Step 1: Highlight Root (Visual Confirmation)
        // Show the user WHICH node is about to be removed
        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `1. Current Root (${max.weight}) is the largest. Selecting it for extraction.`
        });

        // Step 2: Extract Root (Visual Drop)
        // We create a ghost heap where the root is hidden (isGhost) to show it's gone
        const ghostHeap = [...this.heap];
        ghostHeap[0] = { ...this.heap[0], isGhost: true };

        steps.push({
            heap: ghostHeap,
            highlighted: [],
            extracted: extracted,
            description: `2. Root extracted. The root position is now empty.`
        });

        // Step 3: Highlight Last Element (Visual Selection for Replacement)
        // Show the user WHICH node will fill the empty spot
        steps.push({
            heap: ghostHeap, // Root is still ghost/empty
            highlighted: [lastIdx],
            description: `3. Selecting the last element (${lastElement.weight}) to fill the empty root.`
        });

        // Step 4: Move Last Node to Root
        // We already have lastElement as a deep copy from line 86
        // Now modify the actual heap
        this.heap.pop(); // Remove last element
        this.heap[0] = lastElement; // Place the saved copy at root

        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `4. Moved last element (${lastElement.weight}) to the root position. Now need to heapify down.`
        });

        // Step 5+: Start Heapify Down Process
        let currentIdx = 0;
        let stepCount = 5;

        while (true) {
            const length = this.heap.length;
            const leftIdx = this.getLeftChildIndex(currentIdx);
            const rightIdx = this.getRightChildIndex(currentIdx);

            // If no children exist, we're done
            if (leftIdx >= length) {
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `${stepCount}. No children to compare. Node is at correct position.`
                });
                break;
            }

            let largestIdx = currentIdx;

            // Collect all candidates (parent + children)
            const candidates = [currentIdx];
            if (leftIdx < length) candidates.push(leftIdx);
            if (rightIdx < length) candidates.push(rightIdx);

            // Step N: Highlight all nodes being compared (parent + children)
            steps.push({
                heap: [...this.heap],
                highlighted: candidates,
                description: `${stepCount}. Comparing Parent (${this.heap[currentIdx].weight}) with children to find the largest.`
            });
            stepCount++;

            // Find the largest among parent and children
            if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = rightIdx;
            }

            if (largestIdx !== currentIdx) {
                // Need to swap
                const val1 = this.heap[currentIdx].weight;
                const val2 = this.heap[largestIdx].weight;

                this.swap(currentIdx, largestIdx);

                // Step N+1: Show the swap result
                steps.push({
                    heap: [...this.heap],
                    highlighted: [largestIdx, currentIdx],
                    description: `${stepCount}. Child (${val2}) is larger than Parent (${val1}). Swapping them.`
                });
                stepCount++;

                currentIdx = largestIdx;
            } else {
                // Heap property satisfied - done heapifying
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `${stepCount}. Parent is larger than or equal to children. Heapify complete. Correct position found.`
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