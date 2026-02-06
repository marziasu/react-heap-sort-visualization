import { motion, AnimatePresence } from 'framer-motion';
import './SortedList.css';

const SortedList = ({ sortedPeople }) => {
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
                                layoutId={`node-${person.personId}`}
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
