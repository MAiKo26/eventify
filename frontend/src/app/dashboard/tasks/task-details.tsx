import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Calendar, Clock, User} from "lucide-react";
import {useState} from "react";
import {useParams} from "react-router";

export default function TaskDetails() {
  const params = useParams();

  const [task, setTask] = useState({
    id: params.id,
    title: "Setup Audio Equipment",
    description:
      "Ensure all audio equipment is properly set up and tested before the conference starts.",
    event: "Tech Conference 2024",
    assignedTo: "John Doe",
    dueDate: "2024-03-14",
    status: "In Progress",
    comments: [
      {
        id: 1,
        user: "Jane Smith",
        content: "I've ordered the new microphones.",
        timestamp: "2023-12-01 10:30 AM",
      },
      {
        id: 2,
        user: "John Doe",
        content:
          "Great, I'll test them when they arrive.', timestamp: '2023-12-01 11:15 AM",
      },
    ],
  });

  const [newComment, setNewComment] = useState("");

  const handleStatusChange = (newStatus: string) => {
    setTask({...task, status: newStatus});
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: task.comments.length + 1,
        user: "You",
        content: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setTask({...task, comments: [...task.comments, comment]});
      setNewComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Task Details</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{task.title}</CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{task.description}</p>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              Event: {task.event}
            </div>
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4" />
              Assigned to: {task.assignedTo}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              Due: {task.dueDate}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleStatusChange("To Do")}
                variant={task.status === "To Do" ? "default" : "outline"}
              >
                To Do
              </Button>
              <Button
                onClick={() => handleStatusChange("In Progress")}
                variant={task.status === "In Progress" ? "default" : "outline"}
              >
                In Progress
              </Button>
              <Button
                onClick={() => handleStatusChange("Done")}
                variant={task.status === "Done" ? "default" : "outline"}
              >
                Done
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id} className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="space-y-2">
              <Label htmlFor="comment">Add a comment</Label>
              <Textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type your comment here..."
              />
              <Button type="submit">Post Comment</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
