import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Alice", content: "Hey everyone!", timestamp: "10:00 AM" },
    {
      id: 2,
      sender: "Bob",
      content: "Hi Alice, how's it going?",
      timestamp: "10:02 AM",
    },
    {
      id: 3,
      sender: "Charlie",
      content: "Hello there!",
      timestamp: "10:05 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <Card className="h-[calc(90vh-2rem)]">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-8rem)] flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="font-semibold">{message.sender}</div>
              <div className="rounded-lg bg-gray-100 p-2">
                {message.content}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {message.timestamp}
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}
