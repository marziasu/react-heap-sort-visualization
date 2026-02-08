import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NodeDetailsModal.css';

const NodeDetailsModal = ({ selectedNode, heap, onClose }) => {

    // Safety check
    if (!selectedNode || !heap) {
        return null;
    }

    // Find the current live node data in the heap based on ID
    // We use findIndex because position matters for parent/child calcs
    const currentIndex = heap.findIndex(n => n.personId === selectedNode.personId);

    // If node was removed (e.g. extracted while modal open), fallback to selectedNode data but mark as "Removed"
    const isLive = currentIndex !== -1;
    const nodeData = isLive ? heap[currentIndex] : selectedNode;

    // Calculate Relations
    let parentId = null;
    let leftChildId = null;
    let rightChildId = null;
    let depth = 0;

    if (isLive) {
        const parentIdx = Math.floor((currentIndex - 1) / 2);
        if (parentIdx >= 0) parentId = heap[parentIdx].personId;

        const leftIdx = 2 * currentIndex + 1;
        if (leftIdx < heap.length) leftChildId = heap[leftIdx].personId;

        const rightIdx = 2 * currentIndex + 2;
        if (rightIdx < heap.length) rightChildId = heap[rightIdx].personId;

        depth = Math.floor(Math.log2(currentIndex + 1));
    }

    const backdropRef = useRef(null);

    const handleBackdropClick = (e) => {
        if (backdropRef.current === e.target) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={backdropRef}
                onClick={handleBackdropClick}
            >
                <motion.div
                    className="node-details-modal"
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <div className="modal-header">
                        <div className="modal-title-wrapper">
                            <span className="modal-badge">Heap Node Details</span>
                            <h2 className="modal-title">Person #{nodeData.personId}</h2>
                        </div>
                        <button className="close-button" onClick={onClose} title="Close">
                            ✕
                        </button>
                    </div>

                    <div className="main-stat-card">
                        <div className="stat-label">Weight Value</div>
                        <div className="stat-value">
                            {nodeData.weight}
                            <span className="stat-unit">kg</span>
                        </div>
                        {!isLive && <span style={{ fontSize: '12px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>Extracted / Removed</span>}
                    </div>

                    <div className="details-grid">
                        <div className="detail-item">
                            <div className="detail-label">Current Position</div>
                            <div className="detail-value">
                                {isLive ? `Index ${currentIndex}` : 'N/A'}
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">Tree Level</div>
                            <div className="detail-value">
                                {isLive ? `Depth ${depth}` : 'N/A'}
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">Parent Node</div>
                            <div className="detail-value">
                                {parentId ? (
                                    <>
                                        <span>ID: {parentId}</span>
                                        <span className="relation-badge">Parent</span>
                                    </>
                                ) : (
                                    <span style={{ color: '#94a3b8' }}>No Parent (Root)</span>
                                )}
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">Children Nodes</div>
                            <div className="detail-value" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                {leftChildId ? (
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <span>L: ID {leftChildId}</span>
                                    </div>
                                ) : <span style={{ color: '#94a3b8', fontSize: '11px' }}>No Left Child</span>}

                                {rightChildId ? (
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <span>R: ID {rightChildId}</span>
                                    </div>
                                ) : <span style={{ color: '#94a3b8', fontSize: '11px' }}>No Right Child</span>}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NodeDetailsModal;
