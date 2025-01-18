import useAppStore from "@/store/useStore";
import { useEffect } from "react";

function useGlobalFetch() {
  const {
    fetchCurrentUser,
    fetchEvents,
    fetchTasks,
    fetchUsers,
    fetchMessages,
  } = useAppStore();
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([
        fetchCurrentUser(),
        fetchEvents(),
        fetchTasks(),
        fetchUsers(),
        fetchMessages(),
      ]);
    };

    fetchInitialData();
  }, []);
}
export default useGlobalFetch;
