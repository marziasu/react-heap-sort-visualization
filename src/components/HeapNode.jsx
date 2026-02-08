import { motion } from 'framer-motion';
import './HeapNode.css';

const HeapNode = ({ person, isHighlighted, isExtracted, level, isPaused, onClick, isGhost }) => {
    const nodeVariants = {
        normal: {
            scale: 1,
            backgroundColor: 'hsl(240, 70%, 45%)',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        },
        highlighted: {
            scale: 1.2,
            backgroundColor: 'hsl(45, 90%, 55%)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.8)',
            border: '4px solid #ffffff',
            zIndex: 50,
        },
        paused: {
            scale: 1.15,
            backgroundColor: 'hsl(320, 90%, 60%)',
            boxShadow: '0 6px 20px rgba(167, 139, 250, 0.6)',
        },
        extracted: {
            scale: 0.9,
            backgroundColor: 'hsl(140, 70%, 50%)',
            boxShadow: '0 4px 12px rgba(74, 222, 128, 0.4)',
        },
        ghost: { // নতুন state
            scale: 0.7,
            backgroundColor: 'hsl(240, 20%, 60%)',
            boxShadow: 'none',
            opacity: 0.3,
        }
    };

    const textVariants = {
        normal: { color: '#ffffff' },
        highlighted: { color: '#ffffff', fontWeight: 700 },
        paused: { color: '#ffffff', fontWeight: 700 },
        extracted: { color: '#ffffff', fontWeight: 600 },
        ghost: { color: '#cccccc', fontWeight: 400 }, // নতুন
    };

    const getAnimationState = () => {
        if (isGhost) return 'ghost'; // প্রথমে check করুন
        if (isExtracted) return 'extracted';
        if (isHighlighted && isPaused) return 'paused';
        if (isHighlighted) return 'highlighted';
        return 'normal';
    };

    return (
        <motion.div
            className="heap-node"
            variants={nodeVariants}
            initial="normal"
            animate={getAnimationState()}
            whileHover={isGhost ? {} : { scale: 1.1 }} // Ghost এ hover disable
            onClick={isGhost ? undefined : onClick}
        >
            <motion.div className="node-content" variants={textVariants}>
                <div className="person-id">ID: {person.personId}</div>
                <div className="person-weight">W: {person.weight}</div>
            </motion.div>
        </motion.div>
    );
};

export default HeapNode;
