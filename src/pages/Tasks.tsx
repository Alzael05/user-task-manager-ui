import { useState } from "react";

function Tasks() {
  const [taskList, setTaskList] = useState(0);

  return (
    <div className="list">
      <h2>Tasks</h2>
      <p>Number of tasks: {taskList}</p>
      <button onClick={() => setTaskList(taskList + 1)}>Add Task</button>
    </div>
  );
}

export default Tasks;
