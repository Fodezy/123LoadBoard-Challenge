import React, { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import LoadingIcons from 'react-loading-icons'
import api from '@/functions/api';




const questions = [
    { key: 'email', label: 'What is your email?', type: 'email', area: 'false' },
    { key: 'name', label: 'What is your name?', type: 'text', area: 'false' },
    { key: 'availability', label: 'What is your general weekly availability?', type: 'text', area: 'true' },
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
        loading: false,
        resolved: false,
    };
    componentDidMount() {
        this.applyBackground(this.state.backgroundColorIndex);
        // Add the keyframes for the flowing background animation
        document.body.style.backgroundImage = `linear-gradient(270deg, ${backgroundColors.join(', ')})`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = `flowBackground 15s ease infinite`;
    }

    async waitForRequest(promise) {
        // when the given promise resolves, set the state to resolved
        await promise;
        console.log("resolved");
        this.setState({ resolved: true });
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
        if (this.state.currentQuestionIndex < questions.length - 1) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                backgroundColorIndex: (this.state.backgroundColorIndex + 1) % backgroundColors.length,
            });
        } else {
            // All questions answered, handle form submission here
            //call api/submit
            this.setState({ loading: true });
            // setTimeout(() => {
            this.setState({ loading: false, resolved: true });
    
            
            axios.post("http://35.222.150.179/api/submit", formData)
                .then((response) => {
                    console.log("recieved a response from /submit");
                    // Handle response...
                    this.setState({ resolved: true });
                }).catch((error) => {
                    console.error('Error submitting form:', error);
                    // Handle error...
                });
            ;
            // }, 5000);

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
            //change the placeholder text
            e.target.placeholder = "Ex: I work from 8am-2 on weekdays and 4-6 on weekends. I also go to church Sunday mornings but am free otherwise...";
        }
    };
    handleFocusNoGrow = (e) => {
        // if (e.target) {
        //     e.target.style.transition = 'height 0.3s ease'; // Add this line for a smooth transition
        //     // e.target.style.height = '150px'; // Grow the textarea when focused
        // }
    };

    handleBlur = (e) => {
        setTimeout(() => {
            // Check if the active element is the submit button
            if (document.activeElement.type !== "submit") {
                if (e.target) {
                    //change placeholder text
                    e.target.placeholder = "";
                    e.target.style.transition = 'height 0.3s ease';
                    e.target.style.height = '50px'; // Shrink the textarea when not focused
                }
            }
        }, 0);
    };
    handleBlurNoGrow = (e) => {
        // setTimeout(() => {
        //     // Check if the active element is the submit button
        //     if (document.activeElement.type !== "submit") {
        //         if (e.target) {
        //             e.target.style.transition = 'height 0.3s ease';
        //             e.target.style.height = '50px'; // Shrink the textarea when not focused
        //         }
        //     }
        // }, 0);
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
                        {this.state.loading ? (
                            <div>
                                <LoadingIcons.Bars />
                                <p className='text-muted'>connecting to OpenAI</p>
                            </div>
                        ) : this.state.resolved ? (
                            <div className="confirmation-message">
                                <h5>Your submission has been successfully processed!</h5>
                                <p>Check for a matchup email from SquashNoFriends soon</p>
                            </div>
                        ) : (
                            <motion.div className="form-group">
                                <h3>
                                    <label htmlFor={currentQuestion.key}>{currentQuestion.label}</label>
                                </h3>
                                <br />
                                <br />

                                {currentQuestion.area === 'true' ? (
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
                                ) : (
                                    <motion.input
                                        type={currentQuestion.type}
                                        className="form-control"
                                        id={currentQuestion.key}
                                        name={currentQuestion.key}
                                        value={formData[currentQuestion.key]}
                                        onChange={this.handleChange}
                                        onFocus={this.handleFocusNoGrow}
                                        onBlur={this.handleBlurNoGrow}
                                        animate={focused === currentQuestion.key ? { scale: 1.3 } : { scale: 1 }} // Enlarges when focused
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        style={{ height: '40px' }} // Default height
                                        required
                                        autoComplete="off"
                                    />
                                )}
                            </motion.div>
                        )}

                        <br />
                        {
                            !this.state.loading && !this.state.resolved ?
                                <motion.button className="btn btn-primary" type="submit">
                                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                                </motion.button> : <></>
                        }
                    </motion.form>
                </AnimatePresence>
            </div>
        );
    }
}

export default Form;