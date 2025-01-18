import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";

function SidebarLayout() {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // if (!token) {
    //   window.location.href = "/auth/login";
    // }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
          <SidebarTrigger className="dark:bg-gray-900" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-1 justify-between">
            <span className="text-lg font-semibold">Eventify</span>
            <span>
              <ModeToggle />
            </span>
          </div>
        </header>
        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden bg-background p-5">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default SidebarLayout;
