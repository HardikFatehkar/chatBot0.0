const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

const responses = {
    greetings: {
        text: "Hello! How can I assist you today?",
        options: [
            { text: "Help with HR", value: "hr" },
            { text: "IT Support", value: "it" },
            { text: "General Inquiry", value: "general" },
            { text: "Leave Request", value: "leave" },
            { text: "Feedback", value: "feedback" },
        ]
    },
    hr: {
        text: "HR Assistance: Please choose a topic.",
        options: [
            { text: "Salary Queries", value: "salary" },
            { text: "Leave Policies", value: "leave-policy" },
            { text: "Employee Benefits", value: "benefits" },
            { text: "Training Programs", value: "training" },
            { text: "Contact HR", value: "contact-hr" },
        ]
    },
    it: {
        text: "IT Support: What do you need help with?",
        options: [
            { text: "Password Reset", value: "reset-password" },
            { text: "Software Installation", value: "install-software" },
            { text: "Hardware Issues", value: "hardware" },
            { text: "Network Problems", value: "network" },
            { text: "Report an Issue", value: "report-issue" },
        ]
    },
    general: {
        text: "Support: What do you need help with?",
        options: [
            { text: "Knowledge of eStudent", value: "knowledege-eStudent" },
            { text: "Enrollment Contract", value: "enrollment-conrtract" },
            { text: "Acceptance Letter Issues", value: "acceptance-letter" },
            { text: "Status Current Problems", value: "not-current" },
        ]
    },
    // Additional categories can be added here...
};

app.post('/api/message', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botReply;

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
        botReply = responses.greetings;
    } else if (userMessage.includes('hr')) {
        botReply = responses.hr;
    } else if (userMessage.includes('it')) {
        botReply = responses.it;
    }  else if (userMessage.includes('general')) {
        botReply = responses.general;
    }else {
        botReply = { text: "I'm sorry, I didn't understand that.", options: null };
    }

    res.json(botReply);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
