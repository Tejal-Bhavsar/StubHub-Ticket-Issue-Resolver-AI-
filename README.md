# StubHub-Ticket-Issue-Resolver-AI-

Walkthrough - StubHub Web Application & AI Agent

Link: https://onion-casual-role-burning.trycloudflare.com/

Video Demo: https://drive.google.com/file/d/1KQh_jm2tT8_2mU_Ewska25Kmiz98OeNm/view?usp=drive_link

<img width="1470" height="772" alt="image" src="https://github.com/user-attachments/assets/a1299c23-d3ac-4adb-a03b-efcbf8b1db77" />


Overview
I have successfully migrated the project to a Next.js full-stack application. The new codebase features a UI that closely mimics the StubHub design and integrates the Dispute Resolution Agent via a chat interface.

Features Implemented
UI: Custom Tailwind configuration matching StubHub's purple branding.
Components: Header, Footer, Hero, and Event Cards matching the provided screenshots.
Agent: Ported 
agent.py logic to 
app/api/agent/route.ts

for real-time dispute resolution.

Interactive Chat: A "Resolution Agent" floating widget to simulate customer support flow.
Dynamic Simulation: The agent acts differently based on your input keywords:
Fraud: "fake", "invalid", "scam" -> Full Refund
Delivery: "not received", "missing" -> Investigation
Remorse: "changed mind", "mistake" -> Deny Refund
Price: "too expensive", "price" -> Deny Refund (Policy)
How to Run

1. Prerequisites
Ensure you have Node.js installed.

2. Install Dependencies
cd stubhub-web
npm install
3. Start Development Server
npm run dev
Open http://localhost:3000 in your browser.

How to Test the Agent
1.Click the "Resolution Agent" button (purple circle with bot icon) in the bottom-right corner.
2.Type a complaint, for example:
  "My tickets were fake"

3.The agent will process the request (using mock data for Order #ORD-123) and return a decision.
