import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CalendarDays, Users, ListTodo, MessageSquare} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {name: "Total Events", value: "12", icon: CalendarDays},
    {name: "Active Users", value: "48", icon: Users},
    {name: "Pending Tasks", value: "25", icon: ListTodo},
    {name: "Chat Messages", value: "156", icon: MessageSquare},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
