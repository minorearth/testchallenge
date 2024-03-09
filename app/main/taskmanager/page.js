"use client";

import { TaskProps } from "./components/taskprops";

export default function Home() {
  return (
        <TaskProps collection="tasks2"/>
  );
}

// useEffect(() => {
//   setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
// }, []);
