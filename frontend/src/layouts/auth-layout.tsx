import { ModeToggle } from "@/components/ModeToggle";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      <div className="absolute right-3 top-3">
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
