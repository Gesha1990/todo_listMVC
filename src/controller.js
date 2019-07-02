
class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		view.on('add', this.toggleAddTodoItem.bind(this));
		view.on('complete', this.toggleCompleteTodoItem.bind(this));
		view.on('editing', this.toggleEditTodoItem.bind(this));
		view.on('remove', this.toggleRemoveTodoItem.bind(this));
		view.renderTodoItem(model.todos || undefined);
	}

	toggleAddTodoItem(title) {
		const todo = this.model.setTodo({
			id: Date.now(),
			title,
			completed: false
		})
		this.view.createTodoItem(todo);
	}

	toggleCompleteTodoItem({id, completed}) {
		
		const todo = this.model.updateTodo(id, {completed});

		this.view.completeTodoItem(todo);
	}

	toggleEditTodoItem({id, title}) {
	const todo =	this.model.updateTodo(id, {title});

	this.view.editTodoItem(todo);
	}

	toggleRemoveTodoItem(id) {
		this.model.removeTodo(id);

		this.view.romoveTodoItem(id);
	}
}

export default Controller;