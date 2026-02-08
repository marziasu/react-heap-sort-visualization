import { motion, AnimatePresence } from 'framer-motion';
import HeapNode from './HeapNode';
import './HeapTree.css';

const HeapTree = ({ heap, highlightedIndices, isPaused }) => {
    console.log("\n🎨 === HEAP TREE RENDER ===");
    console.log("Heap size:", heap?.length || 0);
    console.log("Highlighted indices:", highlightedIndices);

    if (!heap || heap.length === 0) {
        console.log("Empty heap - showing empty message");
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

    // Calculate tree dimensions
    const maxLevels = Math.floor(Math.log2(heap.length)) + 1;
    const leavesCount = Math.pow(2, maxLevels - 1);
    // Use 110px per leaf node for spacing (80px node + 30px gap)
    const treeWidth = Math.max(1000, leavesCount * 110);
    const treeHeight = maxLevels * 120 + 100;

    // Calculate node position based on global tree width
    const getNodePosition = (index) => {
        const level = Math.floor(Math.log2(index + 1));
        const positionInLevel = index - (Math.pow(2, level) - 1);
        const maxNodesInLevel = Math.pow(2, level);

        // Center nodes within the total tree width
        // x = (position + 0.5) * (totalWidth / nodesInThisLevel)
        // This distributes the available width equally among nodes in the level, centering them.
        const x = (positionInLevel + 0.5) * (treeWidth / maxNodesInLevel);
        const y = level * 120 + 60;

        return {
            x: isNaN(x) ? 0 : x,
            y: isNaN(y) ? 0 : y,
            level
        };
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
                if (!isNaN(parent.x) && !isNaN(parent.y) && !isNaN(left.x) && !isNaN(left.y)) {
                    lines.push({
                        key: `line-${index}-${leftChild}`,
                        x1: parent.x,
                        y1: parent.y,
                        x2: left.x,
                        y2: left.y,
                        isHighlighted: highlightedIndices.includes(index) && highlightedIndices.includes(leftChild),
                    });
                }
            }

            if (rightChild < heap.length && !heap[rightChild].isGhost) {
                const right = getNodePosition(rightChild);
                if (!isNaN(parent.x) && !isNaN(parent.y) && !isNaN(right.x) && !isNaN(right.y)) {
                    lines.push({
                        key: `line-${index}-${rightChild}`,
                        x1: parent.x,
                        y1: parent.y,
                        x2: right.x,
                        y2: right.y,
                        isHighlighted: highlightedIndices.includes(index) && highlightedIndices.includes(rightChild),
                    });
                }
            }
        });
        return lines;
    };

    const lines = generateLines();

    console.log("Nodes to render:");
    heap.forEach((person, index) => {
        const { x, y } = getNodePosition(index);
        console.log(`  [${index}] ID:${person.personId} W:${person.weight} at (${x.toFixed(0)}, ${y.toFixed(0)})${person.isGhost ? ' (GHOST)' : ''}`);
    });

    return (
        <div
            className="heap-tree-container"
            style={{ height: 'auto', minHeight: treeHeight }}
        >
            <div
                className="tree-content-wrapper"
                style={{
                    width: treeWidth,
                    height: treeHeight,
                    position: 'relative',
                    flexShrink: 0
                }}
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
                            const { x, y, level } = getNodePosition(index);
                            const isHighlighted = highlightedIndices.includes(index);
                            const nodeKey = person.personId;

                            console.log(`  🎨 Rendering node: ID:${person.personId} at index ${index}, key="${nodeKey}", ghost=${!!person.isGhost}`);

                            return (
                                <motion.div
                                    key={nodeKey}
                                    layoutId={`node-${nodeKey}`}
                                    className="heap-node-wrapper"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        opacity: person.isGhost ? 0.2 : 1,
                                        scale: person.isGhost ? 0.8 : 1,
                                        zIndex: isHighlighted ? 100 : 1
                                    }}
                                    onLayoutAnimationStart={() => {
                                        console.log(`  🎬 Animation START: ID:${person.personId} at index ${index}`);
                                    }}
                                    onLayoutAnimationComplete={() => {
                                        console.log(`  ✅ Animation COMPLETE: ID:${person.personId} at index ${index}`);
                                    }}
                                    exit={{ scale: 0, opacity: 0, y: -20 }}
                                    style={{
                                        position: 'absolute',
                                        left: x,
                                        top: y
                                    }}
                                    layout
                                    transition={{
                                        layout: { type: "spring", stiffness: 120, damping: 25, mass: 1 },
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 }
                                    }}
                                >
                                    <HeapNode
                                        person={person}
                                        isHighlighted={isHighlighted}
                                        isPaused={isPaused}
                                        level={level}
                                        isGhost={person.isGhost}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default HeapTree;