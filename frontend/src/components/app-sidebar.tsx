import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  List,
  MessageCircle,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import useAppStore from "@/store/useStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Tasks", href: "/dashboard/tasks", icon: List },
  { name: "Chat", href: "/dashboard/chat", icon: MessageCircle },
  { name: "Admin", href: "/dashboard/admin", icon: UserRoundCog },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { currentUser } = useAppStore();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Calendar className="h-6 w-6" />
          <span className="font-semibold">Eventify</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    {item.name === "Admin" && currentUser?.role !== "Admin" ? (
                      <Button
                        className="flex justify-start"
                        disabled
                        variant="ghost"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Button>
                    ) : (
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
