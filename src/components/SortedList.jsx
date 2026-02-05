import { motion, AnimatePresence } from 'framer-motion';
import './SortedList.css';

const SortedList = ({ sortedPeople, onExport }) => {
    if (!sortedPeople || sortedPeople.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(sortedPeople, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sorted-heap.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            className="sorted-list-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="sorted-header">
                <h2>
                    <span className="sorted-icon">📊</span>
                    Sorted List
                    <span className="sorted-badge">{sortedPeople.length} people</span>
                </h2>
                <motion.button
                    className="export-button"
                    onClick={handleExport}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="export-icon">💾</span>
                    Export JSON
                </motion.button>
            </div>

            <motion.div
                className="sorted-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {sortedPeople.map((person, index) => (
                        <motion.div
                            key={`sorted-${person.personId}`}
                            className="sorted-item"
                            variants={itemVariants}
                            layout
                        >
                            <div className="sorted-rank">#{index + 1}</div>
                            <div className="sorted-content">
                                <div className="sorted-id">Person ID: {person.personId}</div>
                                <div className="sorted-weight">{person.weight} kg</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default SortedList;
