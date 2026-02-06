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
                description: `Only one element left: ${extracted.weight}. Extracting it.`
            });
            return steps;
        }

        const lastIdx = this.heap.length - 1;
        const lastElement = this.heap[lastIdx];

        // Step 1: Highlight Root
        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `Root (${max.weight}) will be extracted.`
        });

        // Step 2: Extract Root Visualization (Root leaves, leaving empty space)
        const ghostHeap = [...this.heap];
        ghostHeap[0] = { ...this.heap[0], isGhost: true }; // Mark as ghost to hide it
        const extracted = this.heap[0];

        steps.push({
            heap: ghostHeap,
            highlighted: [],
            extracted: extracted, // Moves to list
            description: `Root (${max.weight}) extracted. Position is now empty.`
        });

        // Step 3: Highlight Last Node (to fill the empty space)
        steps.push({
            heap: ghostHeap, // Still has ghost at 0
            highlighted: [lastIdx],
            description: `Last element (${lastElement.weight}) selected to fill the empty root.`
        });

        // Step 4: Move Last Node to Root
        this.heap[0] = this.heap.pop(); // Actual data move: Last becomes Root. Old Root gone.

        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `Moved ${lastElement.weight} to Root position.`
        });

        // Step 5: Heapify Down...
        let currentIdx = 0;

        while (true) {
            const length = this.heap.length;
            const leftIdx = this.getLeftChildIndex(currentIdx);
            const rightIdx = this.getRightChildIndex(currentIdx);
            let largestIdx = currentIdx;

            const candidates = [currentIdx];
            if (leftIdx < length) candidates.push(leftIdx);
            if (rightIdx < length) candidates.push(rightIdx);

            steps.push({
                heap: [...this.heap],
                highlighted: candidates,
                description: `Checking: Parent (${this.heap[currentIdx].weight}) vs children.`
            });

            if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = rightIdx;
            }

            if (largestIdx !== currentIdx) {
                const val1 = this.heap[currentIdx].weight;
                const val2 = this.heap[largestIdx].weight;

                this.swap(currentIdx, largestIdx);

                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx, largestIdx],
                    description: `Swapping: ${val1} ↓ with ${val2} ↑`
                });

                currentIdx = largestIdx;
            } else {
                steps.push({
                    heap: [...this.heap],
                    highlighted: [currentIdx],
                    description: `Heap restored.`
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
