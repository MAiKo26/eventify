import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as z from "zod";

// schemas
export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

// interfaces

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt: string;
  verified: boolean;
  online: boolean;
  role: "Admin" | "Participant" | "Organizer";
}

export interface Event {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  location: string;
  createdBy: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: number;
  eventId: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  senderId: number;
  timestamp: string;
  taskId: number;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  timestamp: string;
}

export interface AppState {
  token: string | null;

  currentUser: User | null;
  allUsers: User[];
  allEvents: Event[];
  allTasks: Task[];
  allMessages: Message[];

  isLoading: {
    token: boolean;
    users: boolean;
    events: boolean;
    tasks: boolean;
    messages: boolean;
  };

  // Actions

  setToken: (token: string | null) => void;
  setCurrentUser: (user: User) => void;

  setAllUsers: (users: User[]) => void;
  setAllEvents: (events: Event[]) => void;
  setAllTasks: (tasks: Task[]) => void;
  setAllMessages: (messages: Message[]) => void;

  setLoading: (key: keyof AppState["isLoading"], value: boolean) => void;

  // Fetch Actions

  fetchCurrentUser: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  fetchPrivateMessage: (id: string) => Promise<void>;

  login: (values: loginFormSchemaType) => void;
  logout: () => void;
  register: (values: registerFormSchemaType) => void;
}

// store

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State

      token: sessionStorage.getItem("authToken") || null,
      currentUser: null,
      allUsers: [],
      allEvents: [],
      allTasks: [],
      allMessages: [],

      isLoading: {
        token: false,
        users: false,
        events: false,
        tasks: false,
        messages: false,
      },

      // Basic Setters
      setToken: (token) => {
        if (token) {
          sessionStorage.setItem("authToken", token);
        } else {
          sessionStorage.removeItem("authToken");
        }
        set({ token: token });
      },
      setCurrentUser: (user) => set({ currentUser: user }),
      setAllUsers: (users) => set({ allUsers: users }),
      setAllEvents: (events) => set({ allEvents: events }),
      setAllTasks: (tasks) => set({ allTasks: tasks }),
      setAllMessages: (messages) => set({ allMessages: messages }),
      setLoading: (key, value) =>
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: value },
        })),

      // Fetch Actions
      fetchCurrentUser: async () => {
        const state = get();
        try {
          state.setLoading("users", true);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/identify`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch current user");
          }

          const user: User = await response.json();

          if (!user) {
            throw new Error("Failed to fetch current user");
          }

          set({ currentUser: user });
        } catch {
          state.logout();
        } finally {
          state.setLoading("users", false);
        }
      },
      fetchUsers: async () => {
        const state = get();
        try {
          state.setLoading("users", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }

          const users: User[] = await response.json();

          set({ allUsers: users });
        } finally {
          state.setLoading("users", false);
        }
      },
      fetchEvents: async () => {
        const state = get();
        try {
          state.setLoading("events", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }

          const events: Event[] = await response.json();

          set({ allEvents: events });
        } finally {
          state.setLoading("events", false);
        }
      },
      fetchTasks: async () => {
        const state = get();
        try {
          state.setLoading("tasks", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }

          const tasks: Task[] = await response.json();

          set({ allTasks: tasks });
        } finally {
          state.setLoading("tasks", false);
        }
      },
      fetchMessages: async () => {
        const state = get();
        try {
          state.setLoading("messages", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/messages`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }

          const messages: Message[] = await response.json();

          set({ allMessages: messages });
        } finally {
          state.setLoading("messages", false);
        }
      },
      fetchPrivateMessage: async (id) => {
        const state = get();
        try {
          state.setLoading("messages", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }

          const messages: Message[] = await response.json();

          set({ allMessages: messages });
        } finally {
          state.setLoading("messages", false);
        }
      },

      // Auth Actions
      login: async (values: loginFormSchemaType) => {
        const state = get();
        try {
          state.setLoading("token", true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            },
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
          }

          const { token, user } = await response.json();
          state.setToken(token);
          state.setCurrentUser(user);
        } finally {
          state.setLoading("token", false);
        }
      },
      logout: () => {
        const state = get();
        state.setLoading("token", true);
        set({
          token: null,
          currentUser: null,
        });
        sessionStorage.removeItem("authToken");
        window.location.href = "/auth/login";
        state.setLoading("token", false);
      },
      register: async (values: registerFormSchemaType) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Register failed");
        }
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        token: state.token,
        currentUser: state.currentUser,
      }),
    },
  ),
);

export default useAppStore;
