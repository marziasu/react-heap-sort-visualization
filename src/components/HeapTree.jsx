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
        heap.forEach((_, index) => {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            const parent = getNodePosition(index);

            if (leftChild < heap.length) {
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

            if (rightChild < heap.length) {
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
        <div className="heap-tree-container">
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

                {/* Nodes */}
                <AnimatePresence>
                    {heap.map((person, index) => {
                        const { x, y, level } = getNodePosition(index);
                        const isHighlighted = highlightedIndices.includes(index);

                        return (
                            <motion.g
                                key={person.personId}
                                animate={{
                                    x: x - 40,
                                    y: y - 40,
                                    opacity: 1,
                                    scale: 1
                                }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    layout: { duration: 0.3 }
                                }}
                            >
                                <foreignObject width="100" height="100" x="-10" y="-10">
                                    <HeapNode
                                        person={person}
                                        isHighlighted={isHighlighted}
                                        isPaused={isPaused}
                                        level={level}
                                    />
                                </foreignObject>
                            </motion.g>
                        );
                    })}
                </AnimatePresence>
            </svg>
        </div>
    );
};

export default HeapTree;
