import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useGlobalFetch from "@/hooks/use-global-fetch";
import useAppStore from "@/store/useStore";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router";

function SidebarLayout() {
  const { logout } = useAppStore();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/auth/login";
    }
  }, []);
  useGlobalFetch();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
          <SidebarTrigger className="border-inherit p-3 dark:bg-background" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-1 justify-between">
            <span className="text-lg font-semibold">Eventify</span>
            <span className="flex items-center justify-center gap-2">
              <ModeToggle />
              <Button
                className="border-inherit p-3 dark:bg-background dark:text-white"
                onClick={() => logout()}
              >
                <LogOut />
              </Button>
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
