import TaskItem from './TaskItem';
import { getDataFromApi } from '../data';

const TaskList = async ($taskList) => {
  const currentTasks = await getDataFromApi();

  currentTasks?.forEach((task) => {
    $taskList.appendChild(TaskItem(task));
  });
};

export default TaskList;
