import { useState } from 'react';
import { motion } from 'framer-motion';
import './AddPersonForm.css';

const AddPersonForm = ({ onAddPerson, nextPersonId, disabled }) => {
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const weightNum = parseInt(weight);

        if (!weight || weight.trim() === '') {
            setError('Please enter a weight');
            return;
        }

        if (isNaN(weightNum)) {
            setError('Weight must be a number');
            return;
        }

        if (weightNum <= 0) {
            setError('Weight must be positive');
            return;
        }

        if (weightNum > 500) {
            setError('Weight must be less than 500 kg');
            return;
        }

        onAddPerson(weightNum);
        setWeight('');
    };

    return (
        <motion.div
            className="add-person-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="form-title">
                <span className="form-icon">👤</span>
                Add New Person
                <span className="next-id-badge">Next ID: {nextPersonId}</span>
            </h3>

            <form onSubmit={handleSubmit} className="form-content">
                <div className="input-group">
                    <label htmlFor="weight-input" className="input-label">
                        Weight (kg)
                    </label>
                    <div className="input-wrapper">
                        <input
                            id="weight-input"
                            type="number"
                            className="weight-input"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter weight (e.g., 75)"
                            disabled={disabled}
                            min="1"
                            max="500"
                        />
                        <span className="input-unit">kg</span>
                    </div>
                </div>

                {error && (
                    <motion.div
                        className="error-message"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        ⚠️ {error}
                    </motion.div>
                )}

                <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={disabled}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="submit-icon">✨</span>
                    Add to Heap
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddPersonForm;
