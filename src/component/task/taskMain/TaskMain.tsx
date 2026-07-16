import { TaskProvider } from "../TaskProvider";

import style from "./TaskMain.module.css";

import { TaskInputName } from "../taskInputName/TaskInputName";
import { TaskList } from "../taskList/TaskList";

const TaskMain = () => {
  return (
    <TaskProvider>
      <div className={style.content}>
        <div>TaskMain</div>

        <TaskInputName />

        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default TaskMain;