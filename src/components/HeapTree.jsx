import { motion, AnimatePresence } from 'framer-motion';
import HeapNode from './HeapNode';
import './HeapTree.css';

const HeapTree = ({ heap, highlightedIndices, isPaused }) => {
    if (!heap || heap.length === 0) {
        return (
            <div className="empty-heap">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="empty-message"
                >
                    <div className="empty-icon">🌳</div>
                    <p>Heap is empty</p>
                    <p className="empty-subtitle">Add people to see the tree visualization</p>
                </motion.div>
            </div>
        );
    }

    // Calculate tree layout
    const getNodePosition = (index) => {
        const level = Math.floor(Math.log2(index + 1));
        const positionInLevel = index - (Math.pow(2, level) - 1);
        const maxNodesInLevel = Math.pow(2, level);

        // Dynamic spacing based on tree size
        const maxLevels = Math.floor(Math.log2(heap.length)) + 1;
        const baseWidth = Math.min(1400, 200 * maxNodesInLevel);
        const levelHeight = 120;

        const x = (positionInLevel + 0.5) * (baseWidth / maxNodesInLevel);
        const y = level * levelHeight + 60;

        return { x, y, level };
    };

    // Generate connection lines
    const generateLines = () => {
        const lines = [];
        heap.forEach((person, index) => {
            if (person.isGhost) return; // Don't draw lines from a ghost node

            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            const parent = getNodePosition(index);

            if (leftChild < heap.length && !heap[leftChild].isGhost) {
                const left = getNodePosition(leftChild);
                lines.push({
                    key: `line-${index}-${leftChild}`,
                    x1: parent.x,
                    y1: parent.y,
                    x2: left.x,
                    y2: left.y,
                    isHighlighted: highlightedIndices.includes(index) && highlightedIndices.includes(leftChild),
                });
            }

            if (rightChild < heap.length && !heap[rightChild].isGhost) {
                const right = getNodePosition(rightChild);
                lines.push({
                    key: `line-${index}-${rightChild}`,
                    x1: parent.x,
                    y1: parent.y,
                    x2: right.x,
                    y2: right.y,
                    isHighlighted: highlightedIndices.includes(index) && highlightedIndices.includes(rightChild),
                });
            }
        });
        return lines;
    };

    const lines = generateLines();
    const maxLevels = Math.floor(Math.log2(heap.length)) + 1;
    const treeWidth = Math.min(1400, 200 * Math.pow(2, maxLevels - 1));
    const treeHeight = maxLevels * 120 + 100;

    return (
        <div
            className="heap-tree-container"
            style={{ width: treeWidth, height: treeHeight, margin: '0 auto' }}
        >
            <svg
                className="heap-tree-svg"
                width={treeWidth}
                height={treeHeight}
                viewBox={`0 0 ${treeWidth} ${treeHeight}`}
            >
                {/* Connection lines */}
                {lines.map((line) => (
                    <motion.line
                        key={line.key}
                        animate={{
                            x1: line.x1,
                            y1: line.y1,
                            x2: line.x2,
                            y2: line.y2,
                            opacity: 1
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`tree-line ${line.isHighlighted ? 'highlighted' : ''} ${line.isHighlighted && isPaused ? 'line-paused' : ''}`}
                        initial={{ opacity: 0 }}
                    />
                ))}
            </svg>

            {/* Nodes Layer - HTML Elements */}
            <div className="heap-nodes-layer">
                <AnimatePresence>
                    {heap.map((person, index) => {
                        if (person.isGhost) return null;

                        const { x, y, level } = getNodePosition(index);
                        const isHighlighted = highlightedIndices.includes(index);

                        return (
                            <motion.div
                                key={person.personId}
                                layoutId={`node-${person.personId}`} // Shared ID for magic move
                                className="heap-node-wrapper"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    zIndex: isHighlighted ? 100 : 1
                                }}
                                style={{
                                    position: 'absolute',
                                    left: x,
                                    top: y
                                }}
                                layout
                                transition={{
                                    layout: { type: "spring", stiffness: 120, damping: 25, mass: 1 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                            >
                                <HeapNode
                                    person={person}
                                    isHighlighted={isHighlighted}
                                    isPaused={isPaused}
                                    level={level}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HeapTree;
