# Home Credit Loan Against Property – AI Voice Agent

## About the Project

This project is an AI-powered voice agent developed as part of an assignment. It simulates a customer call for a **Home Credit Loan Against Property (LAP)** offer of up to ₹75 lakh.

The agent talks to the customer, explains the offer, asks eligibility-related questions, and determines whether the customer meets the initial eligibility criteria.

The goal is to automate the preliminary screening process before a loan expert follows up with the customer.

## Features

- **Voice Conversation:** Interacts with customers using natural speech.
- **Offer Introduction:** Explains the Loan Against Property offer.
- **Eligibility Screening:** Checks property type, ownership, document availability, loan amount, occupation, income mode, property value, and loan tenure.
- **Eligibility Handling:** Identifies cases that do not meet the initial criteria.
- **Loan Transfer Support:** Routes customers with an existing property loan or an EMI-reduction request to a specialist.
- **Human Follow-up:** Directs eligible customers to a loan expert for further discussion.
- **Web Demo:** Provides a website where users can test the voice agent.

## Technology Used

- **Bolna.ai** – Voice agent creation and conversation management.
- **Node.js** – Backend runtime.
- **Express.js** – Backend server and API endpoints.
- **HTML, CSS, and JavaScript** – Frontend website.
- **Render** – Website deployment.
- **GitHub** – Source code management.

## How It Works

1. The agent starts a conversation and verifies the intended customer.
2. It introduces the Loan Against Property offer.
3. It asks questions about the customer's property and financial details.
4. It checks the responses against the initial eligibility criteria.
5. If the customer meets the criteria, a loan expert can follow up.
6. If the customer does not meet a required criterion, the agent explains this politely and ends the screening.

The agent does not guarantee loan approval or invent interest rates.

## Project Structure

```text
Home_credit_loan_against_property_ai_voice_agent/
├── public/
│   └── index.html
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 18 or later
- A Bolna.ai account
- A Bolna API key and the correct agent ID

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pritialapure/Home_credit_loan_against_property_ai_voice_agent.git
   ```

2. Open the project folder:

   ```bash
   cd Home_credit_loan_against_property_ai_voice_agent
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the required environment variables using your local environment or a `.env` file supported by your setup:

   ```text
   BOLNA_API_KEY=your_bolna_api_key
   BOLNA_AGENT_ID=your_actual_agent_id
   PORT=3000
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser.

## Deployment

The application can be deployed on Render by connecting the GitHub repository.

Configure the required environment variables in the Render dashboard before testing the voice-call feature.

## Security and Testing

- Never expose the Bolna API key in frontend code or commit it to GitHub.
- Use fictional customer details while testing.
- Allow microphone access when prompted by the browser.
- Test different responses to verify eligibility and disqualification handling.

## Disclaimer

This is an assignment demonstration, not an official Home Credit website or a production loan application. Eligibility screening is preliminary and does not constitute loan approval or a financial offer.