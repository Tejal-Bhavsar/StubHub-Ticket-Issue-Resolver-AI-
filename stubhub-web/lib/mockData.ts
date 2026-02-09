export interface OrderDetails {
    order_id: string;
    price: number;
    seller_id: string;
    buyer_id: string;
    event_date: string;
    status: string;
    event_name?: string;
}

export interface SellerProfile {
    seller_id: string;
    verification_status: string;
    reputation_score: number;
    previous_disputes: number;
    account_age_days: number;
    fraud_flags: string[];
}

export interface BuyerProfile {
    buyer_id: string;
    loyalty_tier: string;
    refund_history_count: number;
    is_first_time_buyer: boolean;
    suspicious_activity: boolean;
}

export interface EventStatus {
    event_id: string;
    date: string;
    status: string;
    seller_claims: any[];
}

export interface PolicyCheck {
    eligible_for_refund: boolean;
    policy_reference: string;
}

export const getOrderDetails = (orderId: string): OrderDetails | null => {
    if (orderId === "ORD-123") {
        return {
            order_id: "ORD-123",
            price: 350.00,
            seller_id: "SELLER-88",
            buyer_id: "BUYER-99",
            event_date: "2024-06-15",
            status: "COMPLETED",
            event_name: "Taylor Swift | The Eras Tour"
        };
    }
    return null;
};

export const getSellerProfile = (sellerId: string): SellerProfile | null => {
    if (sellerId === "SELLER-88") {
        return {
            seller_id: "SELLER-88",
            verification_status: "VERIFIED",
            reputation_score: 4.8,
            previous_disputes: 0,
            account_age_days: 1200,
            fraud_flags: []
        };
    }
    return null;
};

export const getBuyerProfile = (buyerId: string): BuyerProfile | null => {
    if (buyerId === "BUYER-99") {
        return {
            buyer_id: "BUYER-99",
            loyalty_tier: "GOLD",
            refund_history_count: 0,
            is_first_time_buyer: false,
            suspicious_activity: false
        };
    }
    return null;
};

export const getEventStatus = (eventId: string = "EVT-001"): EventStatus => {
    return {
        event_id: "EVT-001",
        date: "2024-06-15",
        status: "COMPLETED",
        seller_claims: []
    };
};

export const checkPolicy = (issueType: string, eventDate: string): PolicyCheck => {
    return {
        eligible_for_refund: true,
        policy_reference: "REFUND-POLICY-2024-A"
    };
};
