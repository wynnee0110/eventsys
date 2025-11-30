const API_URL = "http://localhost:4000"; // your backend server

// GET all events
export async function getEvents() {
  const res = await fetch(`${API_URL}/events`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json();
}

// CREATE an event
export async function createEvent(data: { name: string; date: string }) {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
