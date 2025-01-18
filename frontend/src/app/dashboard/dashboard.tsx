import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useAppStore from "@/store/useStore";
import { CalendarDays, Users, ListTodo, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const eventData = [
  { name: "Event A", participants: 120 },
  { name: "Event B", participants: 80 },
  { name: "Event C", participants: 150 },
  { name: "Event D", participants: 90 },
  { name: "Event E", participants: 110 },
];

const taskData = [
  { name: "To Do", value: 30 },
  { name: "In Progress", value: 45 },
  { name: "Done", value: 25 },
];

export default function Dashboard() {
  const { allEvents, allUsers, allTasks, allMessages, isLoading } =
    useAppStore();

  const featuredEvent = allEvents[allEvents.length - 1];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-3">
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading.events ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allEvents.length}</div>
                </CardContent>
              </Card>
            )}
            {isLoading.users ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allUsers.length}</div>
                </CardContent>
              </Card>
            )}
            {isLoading.tasks ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      allTasks.filter((task) => task.status === "pending")
                        .length
                    }
                  </div>
                </CardContent>
              </Card>
            )}
            {isLoading.messages ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allMessages.length}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Featured Event */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Featured Event</h2>
            {isLoading.events ? (
              <Skeleton className="h-40 w-full" />
            ) : featuredEvent ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    {featuredEvent.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {featuredEvent.description}
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    Date: {new Date(featuredEvent.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground">
                No events to feature at the moment.
              </p>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
            {isLoading.tasks ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {allMessages.slice(0, 3).map((message, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {message.content}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Recent Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {allTasks.slice(0, 3).map((task, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {task.title} - {task.status}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Analytics) */}
        <div className="space-y-6">
          <Tabs defaultValue="events">
            <TabsList>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Event Participation</CardTitle>
                  <CardDescription>
                    Number of participants per event
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={eventData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="participants" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rates</CardTitle>
                  <CardDescription>
                    Distribution of task statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
