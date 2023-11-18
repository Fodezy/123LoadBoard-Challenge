import React, { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    { key: 'email', label: 'What is your email?', type: 'email' },
    { key: 'name', label: 'What is your name?', type: 'text' },
    { key: 'skill', label: 'What is your skill level?', type: 'text' },
    { key: 'availability', label: 'What are your available days?', type: 'text' },
];
const backgroundColors = ['#ff9a9e', '#ffb5b0', '#ffc1b6', '#ffcabf', '#ffd3c9']; // Add more colors as needed


class Form extends Component {
    state = {
        currentQuestionIndex: 0,
        formData: {
            email: '',
            name: '',
            skill: '',
            availability: '',
        },
        backgroundColorIndex: 0,
        focused: null, // Track the focused input
    };
    componentDidMount() {
        this.applyBackground(this.state.backgroundColorIndex);
        // Add the keyframes for the flowing background animation
        document.body.style.backgroundImage = `linear-gradient(270deg, ${backgroundColors.join(', ')})`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = `flowBackground 15s ease infinite`;
      }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.backgroundColorIndex !== this.state.backgroundColorIndex) {
            this.applyBackground(this.state.backgroundColorIndex);
        }
    }

    componentWillUnmount() {
        // Reset body style properties when the component unmounts
        document.body.style = null;
    }

    applyBackground = (index) => {
        // Change the animation to a faster speed temporarily
        document.body.style.animation = `flowBackground 5s ease infinite`;
      
        // After a short delay, revert back to the original speed
        setTimeout(() => {
          document.body.style.animation = `flowBackground 15s ease infinite`;
        }, 5000); // Adjust the timing as needed
      };
      
      
    handleNextQuestion = (e) => {
        e.preventDefault();
        const { currentQuestionIndex, formData, backgroundColorIndex } = this.state;
        if (currentQuestionIndex < questions.length - 1) {
            this.setState({
                currentQuestionIndex: currentQuestionIndex + 1,
                backgroundColorIndex: (backgroundColorIndex + 1) % backgroundColors.length,
            });
        } else {
            // All questions answered, handle form submission here
            console.log(formData); // Here you'd typically send the data to a server
        }
        this.applyBackground(this.state.backgroundColorIndex);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: value }
        }));
    };
    handleFocus = (e) => {
        if (e.target) {
            e.target.style.transition = 'height 0.3s ease'; // Add this line for a smooth transition
            e.target.style.height = '150px'; // Grow the textarea when focused
        }
    };

    handleBlur = (e) => {
        if (e.target) {
            e.target.style.transition = 'height 0.3s ease'; // Add this line for a smooth transition
            e.target.style.height = '50px'; // Shrink the textarea when not focused
        }
    };

    render() {
        const { currentQuestionIndex, formData, focused } = this.state;
        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div className="container d-flex justify-content-center align-items-center vh-100 text-center">
                <AnimatePresence mode='wait'>
                    <motion.form
                        key={currentQuestion.key}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={this.handleNextQuestion}
                    >
                        <motion.div className="form-group">
                            <label htmlFor={currentQuestion.key}>{currentQuestion.label}</label>
                            <br />
                            <br />
                            <motion.textarea
                                type={currentQuestion.type}
                                className="form-control"
                                id={currentQuestion.key}
                                name={currentQuestion.key}
                                value={formData[currentQuestion.key]}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                animate={focused === currentQuestion.key ? { scale: 1.3 } : { scale: 1 }} // Enlarges when focused
                                transition={{ type: 'spring', stiffness: 300 }}
                                style={{ height: '50px' }} // Default height
                                required
                                autoComplete="off"
                            />

                        </motion.div>
                        <br />
                        <motion.button className="btn btn-primary" type="submit">
                            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                        </motion.button>
                    </motion.form>
                </AnimatePresence>
            </div>
        );
    }
}

export default Form;