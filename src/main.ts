const taskForm = document.querySelector('.form')! as HTMLFormElement;

const formInput = document.querySelector<HTMLInputElement>('.form-input');

const taskListElement = document.querySelector<HTMLUListElement>('.list');

type Task = {
	description: string;
	isCompleted: boolean;
};

let tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

function loadTasks(): Task[] {
	const storedTasks = localStorage.getItem('tasks');
	return storedTasks ? JSON.parse(storedTasks) : [];
}

// function to add the task

const createTask = (e: SubmitEvent) => {
	e.preventDefault();

	const taskDescription = formInput?.value;

	if (taskDescription) {
		const task: Task = {
			description: taskDescription,
			isCompleted: false,
		};
		// add task to the list
		addTask(task);
		// render task
		renderTask(task);
		// update to local storage
		updateStorage();
		formInput.value = '';
		return;
	}

	alert('Please enter a task description');
};

taskForm?.addEventListener('submit', createTask);

// add task
function addTask(task: Task): void {
	tasks.push(task);
}

// render task list in the dom elements
function renderTask(task: Task): void {
	const taskElement = document.createElement('li');
	taskElement.textContent = task.description;
	// checkbox

	const taskCheckbox = document.createElement('input');
	taskCheckbox.type = 'checkbox';

	taskCheckbox.checked = task.isCompleted;

	// toggle checkbox
	taskCheckbox.addEventListener('change', () => {
		task.isCompleted = !task.isCompleted;
		updateStorage();
	});

	taskListElement?.appendChild(taskElement);
	taskElement.appendChild(taskCheckbox);
}

// save the task in to local storage
const updateStorage = (): void => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};
