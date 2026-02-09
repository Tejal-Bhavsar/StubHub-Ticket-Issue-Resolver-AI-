import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import DisputeChat from '@/components/DisputeChat';

export default function Home() {
  const trendingEvents = [
    {
      image: "",
      title: "Christopher Cross",
      date: "Sat, Mar 21 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 402
    },
    {
      image: "",
      title: "Old Crow Medicine Show",
      date: "Thu, May 14 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 650
    },
    {
      image: "",
      title: "Wilco",
      date: "Mon, May 04 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 279
    },
    {
      image: "",
      title: "NEEDTOBREATHE",
      date: "Fri, Feb 27 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 968
    },
  ];

  const recommendedEvents = [
    {
      image: "",
      title: "ZZ Top",
      date: "Sat, Mar 21 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 517
    },
    {
      image: "",
      title: "Miranda Lambert",
      date: "Thu, May 14 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 83
    },
    {
      image: "",
      title: "Jason Mraz",
      date: "Mon, May 04 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 402
    },
    {
      image: "",
      title: "Kenny Chesney",
      date: "Fri, Feb 27 • 7:30 PM",
      location: "Stiefel Theatre",
      price: 968
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Trending Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Events near Unknown Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event, idx) => (
              <EventCard key={idx} {...event} />
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedEvents.map((event, idx) => (
              <EventCard key={idx} {...event} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <DisputeChat />
    </div>
  );
}
