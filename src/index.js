import View from './view'
import Model from './model';
import Controller from './controller';
import {load, save} from './helpers'

const todos = load();

const view = new View();
const model = new Model(todos || []);

const controller = new Controller(view, model);
