"use client";

import { useEffect, useState } from "react";

type Event = {
  _id: string;
  name: string;
  date: string;
  type?: string; // optional event type (e.g., Sports, Concert)
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="p-8 text-center text-gray-700">Loading events...</p>;

  if (events.length === 0)
    return (
      <p className="p-8 text-center text-gray-500">
        No events available at the moment.
      </p>
    );

  // Optional: group events by type
  const grouped: Record<string, Event[]> = {};
  events.forEach((e) => {
    const key = e.type || "General";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>

      {Object.keys(grouped).map((type) => (
        <div key={type} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{type}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[type].map((event) => (
              <div
                key={event._id}
                className="p-5 border rounded-2xl shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                {event.type && (
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {event.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
