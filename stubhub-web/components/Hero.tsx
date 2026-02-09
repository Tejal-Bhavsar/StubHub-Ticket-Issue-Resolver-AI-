export default function Hero() {
    return (
        <div className="relative bg-[var(--stubhub-purple-dark)] h-[350px] overflow-hidden">
            {/* Background Gradient/Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#240055] to-[var(--stubhub-purple)] opacity-90"></div>

            {/* Geometric Shapes (Abstract CSS) */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 transform translate-x-1/4">
                <div className="w-full h-full bg-white rotate-12 transform origin-bottom-left"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                        World Cup
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="px-6 py-3 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-colors">
                            See Tickets
                        </button>
                    </div>
                </div>

                {/* Large Text Overlay (The "WORLD CUP" text in the screenshot) */}
                <div className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2">
                    <h2 className="text-[120px] font-black text-white opacity-20 leading-none">
                        WORLD<br />CUP
                    </h2>
                </div>
            </div>
        </div>
    );
}
