import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router";

export default function EventList() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-03-15",
      location: "San Francisco, CA",
      participants: 120,
    },
    {
      id: 2,
      title: "Product Launch",
      date: "2024-04-01",
      location: "New York, NY",
      participants: 75,
    },
    // Add more events as needed
  ];

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <Button asChild>
            <Link to="/dashboard/events/create">Create Event</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    {event.participants} participants
                  </div>
                  <Button variant="outline" className="mt-4 w-full" asChild>
                    <Link to={`/dashboard/events/${event.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
