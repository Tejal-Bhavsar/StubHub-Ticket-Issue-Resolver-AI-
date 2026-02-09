import { ShieldCheck, MonitorSmartphone, Tag } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* FanProtect Promise */}
                    <div className="col-span-1 space-y-4">
                        <div className="flex items-center space-x-2 text-[var(--stubhub-purple)]">
                            <ShieldCheck className="h-8 w-8" />
                            <span className="font-bold text-lg text-gray-900">FanProtect™</span>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Tag className="h-5 w-5 text-blue-500 mt-0.5" />
                                <span className="text-sm text-gray-600">Buy and sell with confidence</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MonitorSmartphone className="h-5 w-5 text-blue-500 mt-0.5" />
                                <span className="text-sm text-gray-600">Customer service all the way to your seat</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                                <span className="text-sm text-gray-600">Every order is 100% guaranteed</span>
                            </li>
                        </ul>
                    </div>

                    {/* Our Company */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Our Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">About Us</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">Partners</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">Affiliate Program</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">Careers</a></li>
                        </ul>
                    </div>

                    {/* Have Questions? */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Have Questions?</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[var(--stubhub-purple)]">Gift Cards</a></li>
                        </ul>
                    </div>

                    {/* Language/Currency */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Live events all over the world</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50">
                                <span>🇺🇸 United States</span>
                            </button>
                            <div className="border border-gray-300 rounded-md overflow-hidden">
                                <button className="w-full flex items-center justify-between px-4 py-2 bg-white text-sm text-gray-700 border-b border-gray-300 hover:bg-gray-50">
                                    <span>English (US)</span>
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50">
                                    <span>US$ United States Dollar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-500">&copy; 2000-2026 StubHub. All Rights Reserved. Use of this website signifies your agreement to our User Agreement, Privacy Notice and Cookie Notice.</p>
                </div>
            </div>
        </footer>
    );
}
