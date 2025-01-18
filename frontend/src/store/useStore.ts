import { create } from "zustand";
import { persist } from "zustand/middleware";

// constants

const api = "http://localhost:3636/api/v1/";

// interfaces

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  date: string;
  verified: boolean;
  online: boolean;
  role: "Admin" | "Participant";
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  eventId: number;
}

export interface Message {
  id: number;
  content: string;
  senderId: string;
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
    users: boolean;
    events: boolean;
    tasks: boolean;
    messages: boolean;
  };

  // Actions

  setToken: (token: string) => void;
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

  login: () => void;
  logout: () => void;
}

// store

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State

      token: sessionStorage.getItem("authToken"),
      currentUser: null,
      allUsers: [],
      allEvents: [],
      allTasks: [],
      allMessages: [],

      isLoading: {
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

          const response = await fetch(`${api}user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }

          const user: User = await response.json();

          if (!user) {
            state.logout();
            return;
          }
          set({ currentUser: user });
          state.setLoading("users", false);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
      fetchUsers: async () => {},
      fetchEvents: async () => {},
      fetchTasks: async () => {},
      fetchMessages: async () => {},

      // Auth Actions
      login: () => {
        // TODO
      },
      logout: () => {
        sessionStorage.clear();
        set({
          token: null,
          currentUser: null,
        });
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

export default useStore;
