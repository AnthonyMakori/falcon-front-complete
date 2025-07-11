import { useEffect, useState } from "react";
import Header from '../../components/header/Header';
import Head from "next/head";
import PaymentForm from "../../components/form/PaymentForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  poster: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/public-events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(
          data.events.map((event: Event) => ({
            ...event,
            image: event.poster,
          }))
        );
        
        setLoading(false);
      })
      
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Upcoming Events</title>
        <meta name="description" content="Stay updated with upcoming events." />
        <meta name="keywords" content="events, upcoming events, community events" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <div className="max-w-6xl mx-auto p-6" style={{ marginTop: "60px" }}>
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          Upcoming Events
        </h1>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={event.poster}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  width={500}
                  height={750}
                />

                {/* eslint-enable @next/next/no-img-element */}
                <h2 className="text-2xl font-semibold text-blue-800 mt-4">{event.title}</h2>
                <p className="mt-2 text-gray-600">{event.description}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    📅 {new Date(event.date).toDateString()}
                  </span>
                  <span className="flex items-center">
                    📍 {event.location}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-green-600">Price: {event.price}</p>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-500">No upcoming events available.</div>
        )}
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Payment for {selectedEvent.title}</h2>
            <PaymentForm
              price={parseFloat(selectedEvent.price)}
              movie={selectedEvent.id}
              onSuccess={() => setSelectedEvent(null)} 
              onError={(msg) => console.error("Payment error:", msg)} 
            />
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
