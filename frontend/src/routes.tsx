import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./app/auth/login";
import RegisterPage from "./app/auth/register";
import AdminPage from "./app/dashboard/admin/admin";
import AnalyticsPage from "./app/dashboard/admin/analytics";
import SettingsPage from "./app/dashboard/admin/settings";
import ChatPage from "./app/dashboard/chat/chat";
import Dashboard from "./app/dashboard/dashboard";
import CreateEventPage from "./app/dashboard/events/event-create";
import EventDetailPage from "./app/dashboard/events/event-details";
import EventsPage from "./app/dashboard/events/events-list";
import TaskEventPage from "./app/dashboard/tasks/task-details";
import TasksPage from "./app/dashboard/tasks/tasks";
import { NotFound } from "./app/not-found";
import { Toaster } from "./components/ui/toaster";
import SidebarLayout from "./layouts/sidebar-layout";
import { ThemeProvider } from "./components/theme-provider";
import AuthLayout from "./layouts/auth-layout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<SidebarLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="admin">
              <Route index element={<AdminPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>

            <Route path="settings" element={<SettingsPage />} />

            <Route path="chat" element={<ChatPage />} />

            <Route path="events">
              <Route index element={<EventsPage />} />
              <Route path="create" element={<CreateEventPage />} />
              <Route path=":id" element={<EventDetailPage />} />
            </Route>

            <Route path="tasks">
              <Route index element={<TasksPage />} />
              <Route path="create" element={<TaskEventPage />} />
              <Route path=":id" element={<TaskEventPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="register" element={<RegisterPage />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
