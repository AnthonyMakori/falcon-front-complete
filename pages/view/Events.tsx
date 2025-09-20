import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/header/Header";
import EventPaymentForm from "../../components/form/eventPaymentForm";

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
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEvents = () => {
    setLoading(true);
    fetch(`${API_URL}/public-events`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
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

      <main className="max-w-6xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
          Upcoming Events
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center">
            {successMessage}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-64 rounded-xl"
              ></div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No upcoming events available.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={() => {
                setSelectedEvent(event);
                setPaymentError("");
              }}
            />
          ))}
        </div>
      </main>

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Payment for {selectedEvent.title}
          </h2>
          <EventPaymentForm
            price={parseFloat(selectedEvent.price)}
            eventId={selectedEvent.id}
            onSuccess={() => {
              setSelectedEvent(null);
              setPaymentError("");
              setSuccessMessage("Check Your Phone to complete payment!");
              fetchEvents(); 
            }}
            onError={(msg) => setPaymentError(msg)}
          />
          {paymentError && (
            <p className="text-red-600 text-sm mt-2">{paymentError}</p>
          )}
        </Modal>
      )}
    </div>
  );
}

function EventCard({
  event,
  onBook,
}: {
  event: Event;
  onBook: () => void;
}) {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-3xl transition-transform transform hover:-translate-y-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.poster}
        alt={event.title || "Event poster"}
        className="w-full h-[36rem] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-5">
        <h2 className="text-2xl font-bold text-white">{event.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-3 mt-2">
          {event.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
          <span>📅 {new Date(event.date).toDateString()}</span>
          <span>📍 {event.location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-green-400">
            {Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(Number(event.price))}
          </p>
          <button
            onClick={onBook}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
