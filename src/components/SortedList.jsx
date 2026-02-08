import { motion, AnimatePresence } from 'framer-motion';
import './SortedList.css';

const SortedList = ({ sortedPeople, isPreview }) => {
    const handleExportJSON = () => {
        const dataStr = JSON.stringify(sortedPeople, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = "heap_sorted_list.json";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            className="sorted-list-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
        >
            <div className="sorted-header">
                <div className="header-badge">Collection Field</div>
                <h2>
                    <span className="sorted-icon">📥</span>
                    Extracted from Tree
                </h2>
                <div className="sorted-count">
                    {sortedPeople.length} {sortedPeople.length === 1 ? 'Person' : 'People'} Sorted
                </div>
                {sortedPeople.length > 0 && (
                    <button
                        className="export-button"
                        onClick={handleExportJSON}
                        title="Download as JSON"
                    >
                        <span className="export-icon">💾</span>
                        Export JSON
                    </button>
                )}
            </div>

            {sortedPeople.length === 0 ? (
                <div className="empty-sorted-field">
                    <p>When the root is removed, it will move here...</p>
                </div>
            ) : (
                <div className="sorted-items-wrapper">
                    <AnimatePresence mode="popLayout">
                        {sortedPeople.map((person, index) => (
                            <motion.div
                                key={`sorted-${person.personId}`}
                                layoutId={isPreview ? undefined : `node-${person.personId}`}
                                className="sorted-circle-item"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 30
                                }}
                            >
                                <div className="sorted-circle" title={`Weight: ${person.weight}`}>
                                    <div className="sorted-rank">#{index + 1}</div>
                                    <div className="sorted-weight">{person.weight}</div>
                                    <div className="sorted-id">ID:{person.personId}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};

export default SortedList;
