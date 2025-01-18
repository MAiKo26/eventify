import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Calendar, MapPin, Users, Clock} from "lucide-react";
import {Link, useParams} from "react-router";

export default function EventDetails() {
  const params = useParams();
  const [event] = useState({
    id: params.id,
    title: "Tech Conference 2024",
    description:
      "Annual technology conference featuring the latest innovations and industry trends.",
    date: "2024-03-15",
    time: "09:00 AM - 05:00 PM",
    location: "San Francisco Convention Center",
    participants: 120,
    tasks: [
      {id: 1, title: "Setup Audio Equipment", status: "In Progress"},
      {id: 2, title: "Prepare Welcome Packages", status: "To Do"},
      {id: 3, title: "Coordinate with Speakers", status: "Done"},
    ],
    agenda: [
      {time: "09:00 AM", activity: "Registration and Welcome Coffee"},
      {time: "10:00 AM", activity: "Keynote Speech"},
      {time: "11:30 AM", activity: "Panel Discussion: Future of AI"},
      {time: "01:00 PM", activity: "Lunch Break"},
      {time: "02:00 PM", activity: "Workshop Sessions"},
      {time: "04:30 PM", activity: "Closing Remarks"},
    ],
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <Button>Edit Event</Button>
      </div>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p>{event.description}</p>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date: {event.date}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              Time: {event.time}
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              Location: {event.location}
            </div>
            <div className="flex items-center text-sm">
              <Users className="mr-2 h-4 w-4" />
              Participants: {event.participants}
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Event Tasks</CardTitle>
                <Button asChild>
                  <Link to="/tasks/create">Add Task</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center p-4 bg-muted rounded-lg"
                  >
                    <span>{task.title}</span>
                    <Badge
                      variant={
                        task.status === "To Do"
                          ? "outline"
                          : task.status === "In Progress"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Event Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-muted rounded-lg"
                  >
                    <span className="font-semibold min-w-[100px]">
                      {item.time}
                    </span>
                    <span>{item.activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
