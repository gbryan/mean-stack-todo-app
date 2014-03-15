var Todo = require('./models/todo');

module.exports = function(app) {

	/**
	 * List all todos.
	 */
	app.get('/api/todos', function(req, res) {

		// Show all records in the db.
		Todo.find(function(err, data) { 
			if (err) {
				res.send(err);
			}
			else {
				res.json(data);
			}
		});

	});

	/**
	 * Update an existing todo item (update only specified parameters).
	 */
	app.patch('/api/todos/:todo_id', function(req, res) {

		// Todo.save({ _id: req.params.todo_id }, req.body, function(err, document) {
		Todo.findOneAndUpdate({ _id: req.params.todo_id }, req.body, {}, function(err, document) {

			if (err) {
				res.send(err);
			}
			else {
				// Return all todos.
				Todo.find(function(err, data) {

					if (err) {
						res.send(err);
					}
					else {
						res.json(data);
					}
				});
			}

		});

	});

	/**
	 * Save a new todo item.
	 */
	app.put('/api/todos', function(req, res) {

		// Create one new todo.
		var todo = new Todo({
			title 		: req.body.title,
			description	: req.body.description,
			completed	: req.body.completed
		});

		todo.save(function(err, document) {

			if (err) {
				res.send(err);
			}
			else {
				// Return all todos.
				Todo.find(function(err, data) {

					if (err) {
						res.send(err);
					}
					else {
						res.json(data);
					}
				});
			}
		});

	});

	/**
	 * Load the app's UI. AngularJS handles front-end routing within the single page.
	 */
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
