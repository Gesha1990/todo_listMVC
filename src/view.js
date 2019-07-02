import {createTodoItem,  EventEmitter} from "./helpers";

class View extends EventEmitter{
	constructor(){
		super()
		this.todoList = document.querySelector('.todo-list');
		this.todoForm = document.querySelector('.todo-form');
		this.addInput = document.querySelector('.add-input');
		this.addButton = document.querySelector('.fa-plus');
		this.todoForm.addEventListener('submit', this.toggleAddTodoItem.bind(this));
		this.addButton.addEventListener('click', this.toggleAddTodoItem.bind(this));

	}
	findTodoItem(id) {
		const li = this.todoList.querySelector(`[data-id="${id}"]`);
		return li;
	}
	createTodoItem (todo) {
		const checkbox = createTodoItem('i', {className:`${todo.completed? 'far fa-check-square' : 'far fa-square'}`,  'data-job': 'complete'});
		const label = createTodoItem('label', {className: 'title'}, todo.title);
		const input = createTodoItem('input', {type: 'text', className: 'textfield editing'});
		const editButton = createTodoItem('i', {className: 'fas fa-pencil-alt edit'});
		const removeButton = createTodoItem('i', {className: 'fas fa-trash'});
		const li = createTodoItem('li', {className: `todo-item${todo.completed ? " complete" : ''}`, 'data-id': todo.id}, checkbox, label, input, editButton, removeButton);
		this.todoList.appendChild(li)
		
		return this.bindEvents(li);
	}

	bindEvents(li) {
		const checkbox = li.querySelector(`[data-job=complete]`);
		const editButton = li.querySelector('.fa-pencil-alt');
		const removeButton = li.querySelector('.fa-trash');

		checkbox.addEventListener('click', this.toggleCompleteTodoItem.bind(this));
		editButton.addEventListener('click', this.toggleEditTodoItem.bind(this));
		removeButton.addEventListener('click', this.toggleRemoveTodoItem.bind(this));
	}
	
	toggleAddTodoItem(event) {
		event.preventDefault();
		
		if(this.addInput.value == '') {
			alert('Please, write a task')
		} else{
			const title = this.addInput.value;
			this.addInput.value = '';
	
			this.trigger('add', title);
		}
	}

	toggleCompleteTodoItem({target}) {
		const li = target.parentNode;
		const checkbox = target;
		
		const id = li.getAttribute('data-id');
		var completed = !checkbox.classList.toggle('far' && 'fa-square');
		checkbox.classList.toggle('fas' && 'fa-check-square');

		this.trigger('complete', {id, completed})
	}
	
	completeTodoItem(todo) {
		const li = this.findTodoItem(todo.id);
		
		if(todo.completed) {
			li.classList.add('complete');

		} else {
			li.classList.remove('complete')
		}
		
	}

	toggleEditTodoItem({target}) {
		const li = target.parentNode;
		const inputEdit = li.querySelector('.textfield');
		const label = li.querySelector('.title');
		const editButton = li.querySelector('.edit');
		const id = li.getAttribute('data-id');
		
		editButton.classList.toggle("fas" && "fa-pencil-alt");
		editButton.classList.toggle("far" && "fa-save");
		
		if (li.classList.contains('editing')) {
			li.classList.remove('editing');
			if (inputEdit.value == '') {
				alert('Please, write a task')
			} else {
				const title = inputEdit.value;

				this.trigger('editing', {id, title});
			}
		} else {
			li.classList.add('editing');
			inputEdit.value = label.innerHTML;
		}
	}

	editTodoItem(todo) {
		const li = this.findTodoItem(todo.id);
		const label = li.querySelector('.title');

		label.textContent = todo.title;
	}

	toggleRemoveTodoItem({target}){
		const li = target.parentNode;
		const id = li.getAttribute('data-id');

		this.trigger('remove', id);
	}
	romoveTodoItem(id) {
		const li = this.findTodoItem(id);
		li.remove();		
	}
	
	renderTodoItem(todos){
		todos.forEach(todo => this.createTodoItem(todo))
	}
}
export default View;