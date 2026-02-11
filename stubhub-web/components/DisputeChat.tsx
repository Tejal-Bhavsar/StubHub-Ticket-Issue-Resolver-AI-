'use client';

import { useState } from 'react';
import { Send, Bot, User, AlertCircle, CheckCircle, Scale, FileText, ShieldCheck, HelpCircle, ArrowRight, Info } from 'lucide-react';

export default function DisputeChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Array<{
        role: 'user' | 'agent',
        content: string,
        type?: 'analysis' | 'decision' | 'reasoning' | 'step' | 'support' | 'error'
    }>>([]);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('ORD-123'); // Default for demo

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = message;
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setMessage('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const res = await fetch('/api/agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, orderId }),
            });

            const data = await res.json();

            if (data.decision) {
                // Parse the structured decision
                const decisionText = data.decision;
                const sections = decisionText.split('\n\n');

                // 1. Initial analysis message
                setChatHistory(prev => [...prev, {
                    role: 'agent',
                    type: 'analysis',
                    content: "I've analyzed your case. Based on StubHub's policies and the transaction context, here is my decision:"
                }]);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 2. Main Decision & Reasoning
                const decisionMatch = decisionText.match(/DECISION:\s*(.*)/);
                const reasoningMatch = decisionText.match(/REASONING:\s*(.*)/);

                if (decisionMatch) {
                    setChatHistory(prev => [...prev, {
                        role: 'agent',
                        type: 'decision',
                        content: decisionMatch[1]
                    }]);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                if (reasoningMatch) {
                    setChatHistory(prev => [...prev, {
                        role: 'agent',
                        type: 'reasoning',
                        content: reasoningMatch[1]
                    }]);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }

                // 3. Next Steps (Step by Step)
                const nextStepsSection = decisionText.split('NEXT STEPS FOR CUSTOMER:')[1]?.split('SUPPORT OPTIONS:')[0];
                if (nextStepsSection) {
                    const steps = nextStepsSection.trim().split('\n').filter((s: string) => s.trim() !== '');
                    for (const step of steps) {
                        const cleanStep = step.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim();
                        if (cleanStep) {
                            setChatHistory(prev => [...prev, {
                                role: 'agent',
                                type: 'step',
                                content: cleanStep
                            }]);
                            await new Promise(resolve => setTimeout(resolve, 1200));
                        }
                    }
                }

                // 4. Support Options
                const supportSection = decisionText.split('SUPPORT OPTIONS:')[1];
                if (supportSection) {
                    const options = supportSection.trim().split('\n').filter((s: string) => s.trim() !== '');
                    if (options.length > 0) {
                        setChatHistory(prev => [...prev, {
                            role: 'agent',
                            type: 'support',
                            content: options.map((o: string) => o.replace(/^-\s*/, '• ')).join('\n')
                        }]);
                    }
                }

            } else if (data.error) {
                setChatHistory(prev => [...prev, { role: 'agent', type: 'error', content: `Error: ${data.error}` }]);
            }

        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'agent', content: 'Sorry, I encountered a network error.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-[var(--stubhub-purple)] hover:bg-[var(--stubhub-purple-dark)] text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                    {isOpen ? <span className="font-bold text-xl">×</span> : <div className="flex items-center space-x-2"><Bot className="h-6 w-6" /><span>Resolution Agent</span></div>}
                </button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
                    {/* Header */}
                    <div className="bg-[var(--stubhub-purple)] p-4 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">StubHub Resolution Center</h3>
                            <p className="text-xs text-purple-100">AI-Powered Dispute Resolution</p>
                        </div>
                        <div className="text-xs bg-purple-800 px-2 py-1 rounded">
                            Order #{orderId}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                        {chatHistory.length === 0 && (
                            <div className="text-center text-gray-500 mt-10">
                                <Bot className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                <p>How can I help with your order today?</p>
                                <p className="text-xs mt-2">Try: "My tickets were fake"</p>
                            </div>
                        )}

                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 ${msg.role === 'user'
                                    ? 'bg-[var(--stubhub-purple)] text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                                    } shadow-sm`}>

                                    <div className="flex items-start space-x-2">
                                        {msg.role === 'agent' && (
                                            <div className="mt-0.5">
                                                {msg.type === 'analysis' && <Info className="h-4 w-4 text-blue-500" />}
                                                {msg.type === 'decision' && <Scale className="h-4 w-4 text-[var(--stubhub-purple)]" />}
                                                {msg.type === 'reasoning' && <FileText className="h-4 w-4 text-gray-400" />}
                                                {msg.type === 'step' && <ShieldCheck className="h-4 w-4 text-green-500" />}
                                                {msg.type === 'support' && <HelpCircle className="h-4 w-4 text-orange-500" />}
                                                {msg.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                                                {!msg.type && <Bot className="h-4 w-4 text-gray-400" />}
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            {msg.type === 'decision' && <p className="text-[10px] font-bold text-[var(--stubhub-purple)] uppercase mb-1">Official Decision</p>}
                                            {msg.type === 'reasoning' && <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Reasoning</p>}
                                            {msg.type === 'step' && <p className="text-[10px] font-bold text-green-600 uppercase mb-1">Action Required</p>}
                                            {msg.type === 'support' && <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">Support Options</p>}

                                            <p className={`whitespace-pre-wrap ${msg.type === 'decision' ? 'text-sm font-semibold' : 'text-sm'}`}>
                                                {msg.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-lg p-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-black focus:outline-none focus:border-[var(--stubhub-purple)]"
                        />
                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="bg-[var(--stubhub-purple)] text-white p-2 rounded-full hover:bg-opacity-90 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
