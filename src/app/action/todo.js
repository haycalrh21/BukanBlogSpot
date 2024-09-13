"use server";
import connectMongo from "../libs/mongodb";
import Todo from "../model/todo";

// Server action to create a new todo
export async function createTodoAction(formData) {
	const text = formData.get("text");

	if (!text) {
		throw new Error("Text is required");
	}

	await connectMongo();

	const todo = new Todo({ text });
	await todo.save();

	return JSON.stringify(todo); // Return JSON for client-side usage
}

export async function deleteTodoAction(id) {
	await connectMongo();
	await Todo.findByIdAndDelete(id);
}

// Server action to fetch all todos
export async function fetchTodosAction() {
	await connectMongo();

	const todos = await Todo.find({}); // Fetch all todos from the database

	return JSON.stringify(todos); // Return todos as JSON
}
