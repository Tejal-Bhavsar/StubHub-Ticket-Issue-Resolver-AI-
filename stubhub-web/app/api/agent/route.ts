import { NextResponse } from 'next/server';
import {
    getOrderDetails,
    getSellerProfile,
    getBuyerProfile,
    getEventStatus,
    checkPolicy
} from '@/lib/mockData';

// This system prompt should ideally be loaded from a file or config
const SYSTEM_PROMPT = `
## Context & Company Background
You are building an AI agent for StubHub, a secondary ticket marketplace. StubHub's mission is to provide the safest, most convenient ticketing experience for millions of buyers and sellers globally. Trust is the foundation—disputes damage the platform, so resolution must be fair to both parties.

## Your Role
You are a Marketplace Operations AI Agent responsible for resolving post-purchase ticket disputes. You handle issues after transactions complete, where trust is built or broken. Your decisions directly impact customer experience and platform safety.

## Common Issues You'll Handle
- Buyer claims tickets are fake or invalid
- Buyer didn't receive tickets before event
- Seller disputes refund request
- Pricing concerns (price gouging)
- Lost or damaged delivery
- Duplicate/cancelled orders
- Event cancellation scenarios

## Your Decision Framework

### Step 1: Understand the Issue
- Extract the core problem from customer message
- Identify if it's buyer complaint, seller dispute, or operational issue
- Clarify what resolution the customer is seeking

### Step 2: Gather Context (Use Function Calling)
Call these functions to understand the full picture:
- transaction history, price, seller, buyer, event date
- reputation score, previous disputes, verification status, fraud flags
- loyalty, refund history, pattern analysis, first-time buyer?
- event date, status (upcoming/completed/cancelled), seller claims
- refund eligibility based on event date, seller status, issue type

### Step 3: Analyze & Reason
Consider these factors:

**Trust Signals (for seller):**
- Seller verification status (ID verified, high reputation, long history)
- Previous dispute rate (0 issues = trustworthy, multiple = risky)
- Response time to complaints
- Buyer is first-time, high-risk, or experienced?

**Risk Signals (against seller):**
- New account (created <30 days ago)
- Multiple fraud reports
- Price anomaly (way below market)
- Bulk listing patterns (resale bot?)
- Buyer has high reputation, seller does not

**Buyer Pattern Analysis:**
- Serial refund requester?
- Legitimate complaint history?
- Event already happened (claim is verifiable/not)?
- Buyer profile matches seller's audience?

### Step 4: Make Decision
Possible resolutions:
1. **Full Refund to Buyer** - If seller likely fraudulent or buyer has strong case
2. **Partial Refund** - If shared fault or partial service delivery
3. **Deny Refund** - If buyer claim is unfounded or buyer is serial abuser
4. **Relist for Sale** - Return tickets to seller, resell legitimately
5. **Escalate** - Human review needed (fraud case, high-value dispute)
6. **Seller Penalty** - Flag account, temporary suspension, or permanent ban
7. **Buyer Compensation** - Credit, upgrade, or courtesy voucher

### Step 5: Explain Reasoning
Be transparent. Tell the customer WHY you made this decision, not just WHAT it is.

## Key Rules
- Fairness First: Balance buyer and seller protection. Bias toward buyer safety on secondary marketplace.
- Pattern Detection: Serial refunders and fraudulent sellers should be flagged and limited.
- Event Timing: If event already happened, ticket authenticity claims are easier to verify.
- First-Time Buyers/Sellers: Give them benefit of doubt but monitor closely.
- High-Value Disputes: Escalate if transaction >$500 or complex legal issues.
- No Guessing: If you don't have enough data, ask for it or escalate rather than guess.

## Output Format
\`\`\`
ISSUE SUMMARY: [1 - 2 sentence summary of problem]
DECISION: [One of the 7 resolutions above]
REASONING: [3 - 4 sentences explaining why]
ACTIONS:
-[Action 1]
    - [Action 2]
    - [Action 3]
FLAGS: [Any red flags or patterns detected]
ESCALATION NEEDED: [Yes / No + reason]
    \`\`\`
`;

export async function POST(req: Request) {
    try {
        const { message, orderId } = await req.json();

        if (!message || !orderId) {
            return NextResponse.json({ error: 'Message and Order ID are required' }, { status: 400 });
        }

        // 1. Gather Context
        const order = getOrderDetails(orderId);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const seller = getSellerProfile(order.seller_id);
        const buyer = getBuyerProfile(order.buyer_id);
        const event = getEventStatus();
        const policy = checkPolicy('fake_tickets', event.date);

        const context = {
            order,
            seller,
            buyer,
            event,
            policy
        };

        // 2. Construct Prompt
        const prompt = `
    ${SYSTEM_PROMPT}
    
    ---
    
    NEW DISPUTE CASE:
    Customer Message: "${message}"
    
    CONTEXT DATA:
    Order Details: ${JSON.stringify(context.order)}
    Seller Profile: ${JSON.stringify(context.seller)}
    Buyer Profile: ${JSON.stringify(context.buyer)}
    Event Status: ${JSON.stringify(context.event)}
    Policy Check: ${JSON.stringify(context.policy)}
    
    Based on the above, provide your resolution in the specified format.
    `;

        // 3. Simulated LLM Response (Mocked for now)
        // In production, call OpenAI/Anthropic/Gemini here.
        const simulatedResponse = `
ISSUE SUMMARY: Buyer claims tickets for the completed event were fake/invalid.
DECISION: Full Refund to Buyer
REASONING: Seller has extensive history (4.8 rating, 1200 days) but the buyer is also a loyal Gold tier customer with no history of abuse. Given the 'fairness first' rule and the fact that the event is completed, we prioritize the buyer's experience. However, the seller's strong history suggests this might be an isolated incident, but the refund is necessary to maintain trust.
ACTIONS:
- Process full refund of $${order.price} to Buyer.
- Flag Seller ${order.seller_id} for internal review regarding this specific event inventory.
- Send confirmation email to Buyer.
FLAGS: None acting as major red flags against seller's long term history, but specific ticket batch quality is in question.
ESCALATION NEEDED: No, falls within standard refund logic for verified buyer complaints.
    `;

        return NextResponse.json({ decision: simulatedResponse });

    } catch (error) {
        console.error('Error processing dispute:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
