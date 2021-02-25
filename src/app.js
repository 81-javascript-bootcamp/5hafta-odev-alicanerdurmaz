import { addTaskToApi } from './data';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';

class PomodoroApp {
  constructor(options) {
    let { tableTbodySelector, taskFormSelector, taskList } = options;

    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('input');
    this.$taskFormBtn = this.$taskForm.querySelector('button');
    this.$taskList = document.querySelector(taskList);
  }

  disableTaskForm() {
    this.$taskFormInput.value = 'Ekleniyor...';
    this.$taskFormBtn.innerHTML = 'Ekleniyor...';

    this.$taskFormInput.disabled = true;
    this.$taskFormBtn.disabled = true;
  }
  enableTaskForm() {
    this.$taskFormInput.disabled = false;
    this.$taskFormBtn.disabled = false;

    this.$taskFormInput.value = '';
    this.$taskFormBtn.innerHTML = 'Add Task';
  }

  async addTask(task) {
    this.disableTaskForm();

    const newTask = await addTaskToApi(task);
    newTask && this.$taskList.appendChild(TaskItem(newTask));

    this.enableTaskForm();
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = { title: this.$taskFormInput.value };
      this.addTask(task);
    });
  }

  async init() {
    this.handleAddTask();
    await TaskList(this.$taskList);
  }
}

export default PomodoroApp;
