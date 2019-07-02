import {save, EventEmitter} from './helpers'

class Model extends EventEmitter {
	constructor(todos = []) {
		super();
		this.todos = todos;
	}
	
	setTodo(todo) {
		 this.todos.push(todo);
		 save(this.todos);
		
		 return todo;
	}

	getTodo(id) {
		 return this.todos.find(todo => todo.id == id);
	}

	updateTodo(id, properties ) {
		const todo = this.getTodo(id);
		
		Object.keys(properties).forEach(property => todo[property] = properties[property]);
		save(this.todos)
		return todo;
	}

	
	removeTodo(id) {
		const todo = this.getTodo(id);
		const index = this.todos.findIndex(todo => todo.id == id);

		this.todos.splice(index, 1);
		save(this.todos)
	}
}

export default Model