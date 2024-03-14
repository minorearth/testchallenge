"use client";

import { TaskProps } from "./components/taskprops";

export default function Home({ params }) {
  return (
    <>
      <TaskProps collection="tasks2" TaskId={params.taskmanager} />
    </>
  );
}

// useEffect(() => {
//   setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
// }, []);
