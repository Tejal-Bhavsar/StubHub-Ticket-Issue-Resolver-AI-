import os
from typing import Dict, Any
from mock_data import get_order_details, get_seller_profile, get_buyer_profile, get_event_status, check_policy

class StubHubAgent:
    def __init__(self, system_prompt_path: str = "system_prompt.md"):
        self.system_prompt = self._load_system_prompt(system_prompt_path)

    def _load_system_prompt(self, path: str) -> str:
        try:
            with open(path, "r") as f:
                return f.read()
        except FileNotFoundError:
            return "Error: System prompt file not found."

    def gather_context(self, order_id: str) -> Dict[str, Any]:
        """Aggregates all necessary context for the dispute."""
        order = get_order_details(order_id)
        if not order:
            return {"error": "Order not found"}
        
        seller = get_seller_profile(order.get("seller_id"))
        buyer = get_buyer_profile(order.get("buyer_id"))
        event = get_event_status() # Mocked to return a specific event
        policy = check_policy("fake_tickets", event.get("date")) # Assuming issue is fake tickets for this context
        
        return {
            "order": order,
            "seller": seller,
            "buyer": buyer,
            "event": event,
            "policy": policy
        }

    def construct_prompt(self, customer_message: str, context: Dict[str, Any]) -> str:
        """Combines system prompt, customer message, and context into a final prompt."""
        context_str = f"""
        CONTEXT DATA:
        Order Details: {context.get('order')}
        Seller Profile: {context.get('seller')}
        Buyer Profile: {context.get('buyer')}
        Event Status: {context.get('event')}
        Policy Check: {context.get('policy')}
        """
        
        full_prompt = f"""
        {self.system_prompt}
        
        ---
        
        NEW DISPUTE CASE:
        Customer Message: "{customer_message}"
        
        {context_str}
        
        Based on the above, provide your resolution in the specified format.
        """
        return full_prompt

    def run(self, customer_message: str, order_id: str) -> str:
        """Main entry point to process a dispute."""
        print(f"Analyzing dispute for Order ID: {order_id}...")
        
        # 1. Gather Context
        context = self.gather_context(order_id)
        if "error" in context:
            return f"Error: {context['error']}"
            
        # 2. Construct Prompt
        prompt = self.construct_prompt(customer_message, context)
        
        # 3. Call LLM (Simulated)
        # In a real scenario, this would be: response = openai.ChatCompletion.create(...)
        response = self._simulate_llm_response(prompt)
        
        return response

    def _simulate_llm_response(self, prompt: str) -> str:
        """Simulates an LLM response for demonstration purposes."""
        # For the demo, we'll return a pre-canned response that fits the 'Good Decision' examples
        # specifically tailored to the inputs if they match the mock data.
        
        return """
ISSUE SUMMARY: Buyer claims tickets for the completed event were fake/invalid.
DECISION: Full Refund to Buyer
REASONING: Seller has extensive history (1200 days, 4.8 rating) but the buyer is also a loyal Gold tier customer with no history of abuse. Given the 'fairness first' rule and the fact that the event is completed, we prioritize the buyer's experience. However, the seller's strong history suggests this might be an isolated incident, but the refund is necessary to maintain trust.
ACTIONS:
- Process full refund of $350.00 to Buyer.
- Flag Seller SELLER-88 for internal review regarding this specific event inventory.
- Send confirmation email to Buyer.
FLAGS: None acting as major red flags against seller's long term history, but specific ticket batch quality is in question.
ESCALATION NEEDED: No, falls within standard refund logic for verified buyer complaints.

NEXT STEPS FOR CUSTOMER:
1. Please check your registered email address for the refund confirmation details.
2. The refund should appear on your original payment method within 3-5 business days.
3. If you have any other questions regarding this transaction, feel free to ask!

SUPPORT OPTIONS:
- Connect with a Live Advocate (Available 24/7)
- Email our Fraud Specialization Team at trust@stubhub.com
- Call Priority Support at 1-800-STUBHUB
        """
