function createTodoItem(tag, properties, ...children) {
	const element = document.createElement(tag);
	Object.keys(properties || {}).forEach(property => {
		if(property.startsWith('data-id')) {
		element.setAttribute('data-id', properties[property]);
		} else if (property.startsWith('data-job')) {
			element.setAttribute('data-job', properties[property]);
		} else {
			element[property] = properties[property];
		}
	})

	children.forEach(child => {
		if(typeof child == 'string') {
			const textNode = document.createTextNode(child);
			element.appendChild(textNode)
		} else {
			element.appendChild(child);
		}
		
	})
	return element;
}

class EventEmitter {
	constructor() {
		this.event = {}
	}

	on(type, listener) {
		 this.event[type] = [listener]
	}

	trigger(type, args) {
		if (this.event[type]) {
			this.event[type].forEach(listener => listener(args))
		}
	}
}

function save(todos) {
	const string = JSON.stringify(todos);
	localStorage.setItem('todos', string);
}

function load() {
	const string = localStorage.getItem('todos');
	const todos = JSON.parse(string);
	return todos;
}
export {EventEmitter,  createTodoItem, save, load};