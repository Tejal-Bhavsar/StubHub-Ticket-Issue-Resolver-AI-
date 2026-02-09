from agent import StubHubAgent
import sys

def main():
    print("--------------------------------------------------")
    print("   StubHub Marketplace Operations Agent (CLI)   ")
    print("--------------------------------------------------")
    
    # Initialize Agent
    agent = StubHubAgent()
    
    # Simulate an incoming dispute
    print("\n--- SIMULATION STARTED ---")
    order_id = "ORD-123"
    customer_message = "I bought tickets for the Taylor Swift concert last night, but when I got to the gate, they told me the tickets were already scanned! I want my money back immediately. This is fraud!"
    
    print(f"Incoming Ticket Dispute for Order #{order_id}")
    print(f"Customer Message: '{customer_message}'")
    print("\n[Thinking... Gathering context via function calling...]")
    
    # Run Agent
    response = agent.run(customer_message, order_id)
    
    print("\n--- AGENT DECISION ---")
    print(response)
    print("--------------------------------------------------")

if __name__ == "__main__":
    main()
