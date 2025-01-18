import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Tasks
          </h2>
          <Button asChild>
            <Link to="/dashboard/tasks/create">Create Task</Link>
          </Button>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((task) => (
            <Card key={task}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Task {task}</span>
                  <Badge
                    variant={
                      task % 3 === 0
                        ? "default"
                        : task % 3 === 1
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {task % 3 === 0
                      ? "Done"
                      : task % 3 === 1
                        ? "In Progress"
                        : "To Do"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assigned to: User Name</p>
                <p>Event: Event Name</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to={`/dashboard/tasks/${task}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
