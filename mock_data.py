from typing import Dict, Any

def get_order_details(order_id: str) -> Dict[str, Any]:
    """Retrieves transaction history, price, seller, buyer, event date."""
    # Mock data
    if order_id == "ORD-123":
        return {
            "order_id": "ORD-123",
            "price": 350.00,
            "seller_id": "SELLER-88",
            "buyer_id": "BUYER-99",
            "event_date": "2024-06-15",
            "status": "COMPLETED"
        }
    return {}

def get_seller_profile(seller_id: str) -> Dict[str, Any]:
    """Retrieves reputation score, previous disputes, verification status, fraud flags."""
    if seller_id == "SELLER-88":
        return {
            "seller_id": "SELLER-88",
            "verification_status": "VERIFIED",
            "reputation_score": 4.8,
            "previous_disputes": 0,
            "account_age_days": 1200,
            "fraud_flags": []
        }
    return {}

def get_buyer_profile(buyer_id: str) -> Dict[str, Any]:
    """Retrieves loyalty, refund history, pattern analysis, first-time buyer status."""
    if buyer_id == "BUYER-99":
        return {
            "buyer_id": "BUYER-99",
            "loyalty_tier": "GOLD",
            "refund_history_count": 0,
            "is_first_time_buyer": False,
            "suspicious_activity": False
        }
    return {}

def get_event_status(event_id: str = "EVT-001") -> Dict[str, Any]:
    """Retrieves event date, status (upcoming/completed/cancelled)."""
    return {
        "event_id": "EVT-001",
        "date": "2024-06-15",
        "status": "COMPLETED", # Event happened in the past for this scenario
        "seller_claims": []
    }

def check_policy(issue_type: str, event_date: str) -> Dict[str, Any]:
    """Checks refund eligibility based on event date, seller status, issue type."""
    return {
        "eligible_for_refund": True,
        "policy_reference": "REFUND-POLICY-2024-A"
    }
