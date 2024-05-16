import React from 'react';

function FeedbackForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Access form data
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/feedbacksubmitted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Convert FormData to JSON object
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            // Handle successful feedback submission
            console.log('Feedback submitted successfully');
            console.log(response);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="feedbackcontent" placeholder="Please Enter Your Feedback" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default FeedbackForm;