import Link from 'next/link';
import { Search, User, Heart, Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Nav */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-[var(--stubhub-purple)]">StubHub</span>
                        </Link>

                        <nav className="hidden md:flex space-x-6">
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Sports</Link>
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Concerts</Link>
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Theatre</Link>
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Festivals</Link>
                        </nav>
                    </div>

                    {/* Search Bar - Center (Hidden on small screens) */}
                    <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[var(--stubhub-purple)] focus:border-[var(--stubhub-purple)] sm:text-sm"
                                placeholder="Search events, artists, teams and more"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Sell</Link>
                            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">My Tickets</Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <Heart className="h-6 w-6" />
                            </button>
                            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                                <User className="h-6 w-6" />
                                <span className="hidden md:inline text-sm font-medium">Sign In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
