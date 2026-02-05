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
        steps.push({
            heap: [...this.heap],
            highlighted: [0], // Always highlight root
            description: `Adding ${person.weight} to the heap.`
        });

        let currentIdx = this.heap.length - 1;
        while (currentIdx > 0) {
            const parentIdx = this.getParentIndex(currentIdx);
            if (this.heap[currentIdx].weight > this.heap[parentIdx].weight) {
                this.swap(currentIdx, parentIdx);
                currentIdx = parentIdx;
                steps.push({
                    heap: [...this.heap],
                    highlighted: [0], // Always highlight root
                    description: `Heapify-Up: Moving to correct position.`
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
            steps.push({ heap: [], highlighted: [], extracted: extracted });
            return steps;
        }

        // 1. Swap root with last element
        const lastIdx = this.heap.length - 1;
        const lastElement = this.heap[lastIdx];

        // Highlight root before swap
        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            description: `Current Root: ${max.weight}. Swapping with last element ${lastElement.weight}.`
        });

        this.swap(0, lastIdx);
        const extracted = this.heap.pop();

        steps.push({
            heap: [...this.heap],
            highlighted: [0],
            extracted: extracted,
            description: `Extracted ${extracted.weight}. New Root is ${this.heap[0].weight}.`
        });

        // 2. Heapify Down
        let currentIdx = 0;
        const length = this.heap.length;

        while (true) {
            const leftIdx = this.getLeftChildIndex(currentIdx);
            const rightIdx = this.getRightChildIndex(currentIdx);
            let largestIdx = currentIdx;

            if (leftIdx < length && this.heap[leftIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx].weight > this.heap[largestIdx].weight) {
                largestIdx = rightIdx;
            }

            if (largestIdx !== currentIdx) {
                this.swap(currentIdx, largestIdx);
                currentIdx = largestIdx;
                steps.push({
                    heap: [...this.heap],
                    highlighted: [0], // Always highlight root
                    description: `Heapify-Down: Adjusting root to maintain Max-Heap.`
                });
            } else {
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
            } else break;
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
        if (steps.length > 0) {
            const lastStep = steps[steps.length - 1];
            sorted.push(lastStep.extracted);
            // Enrich steps with current sorted state
            steps.forEach(s => s.sortedSoFar = [...sorted]);
            allSteps.push(...steps);
        }
    }

    return { sorted, allSteps };
}
