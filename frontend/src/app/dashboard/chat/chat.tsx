import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAppStore, { Message } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatPage() {
  const { allMessages, setAllMessages, isLoading } = useAppStore();

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: allMessages.length + 1,
        senderId: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setAllMessages([...allMessages, message]);
      setNewMessage("");
    }
  };

  return (
    <Card className="h-[calc(90vh-2rem)]">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-8rem)] flex-col gap-4">
        {isLoading.messages ? (
          <ScrollArea className="flex flex-1 gap-5 pr-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="mb-4 flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </ScrollArea>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            {allMessages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="font-semibold">{message.senderId}</div>
                <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900">
                  {message.content}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {message.timestamp}
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading.messages}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
