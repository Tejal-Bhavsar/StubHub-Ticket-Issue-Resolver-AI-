import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import DisputeChat from '@/components/DisputeChat';

export default function Home() {
  const trendingEvents = [
    {
      image: "/events/concert.png",
      title: "Electric Pulse Tour - Taylor Swift",
      date: "Sat, Oct 26 • 8:00 PM",
      location: "MetLife Stadium, NJ",
      price: 402
    },
    {
      image: "/events/sports.png",
      title: "Manchester City vs Liverpool",
      date: "Sun, Nov 12 • 4:30 PM",
      location: "Etihad Stadium, UK",
      price: 150
    },
    {
      image: "/events/festival.png",
      title: "Coachella Valley Music Festival",
      date: "Fri, Apr 14 • 12:00 PM",
      location: "Indio, CA",
      price: 549
    },
    {
      image: "/events/theater.png",
      title: "Hamilton - Broadway",
      date: "Fri, Feb 27 • 7:30 PM",
      location: "Richard Rodgers Theatre, NY",
      price: 968
    },
  ];

  const recommendedEvents = [
    {
      image: "/events/concert.png",
      title: "Coldplay - Music of the Spheres",
      date: "Sat, Mar 21 • 7:30 PM",
      location: "Wembley Stadium, UK",
      price: 217
    },
    {
      image: "/events/festival.png",
      title: "Glastonbury Festival 2025",
      date: "Thu, Jun 26 • 10:00 AM",
      location: "Worthy Farm, UK",
      price: 350
    },
    {
      image: "/events/theater.png",
      title: "The Lion King",
      date: "Mon, May 04 • 7:30 PM",
      location: "Minskoff Theatre, NY",
      price: 185
    },
    {
      image: "/events/sports.png",
      title: "NBA Finals - Game 1",
      date: "Thu, Jun 05 • 8:30 PM",
      location: "TD Garden, MA",
      price: 850
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
