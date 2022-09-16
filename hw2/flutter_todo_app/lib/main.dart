import 'package:flutter/material.dart';

void main() => runApp( // entry point for application
      new TodoApp(), // create a new instance of TodoApp
    );

class TodoApp extends StatelessWidget { // stateless widget is the base class of our to_do app that means our app cant change based on user input and data
  @override
  Widget build(BuildContext context) { // create a material app styled widget with a title and a TODO list
    return new MaterialApp(
      title: 'Todo list',
      home: new TodoList(),
    );
  }
}

class TodoList extends StatefulWidget { // the to_do list has a state. It can change based on user input and data
  @override
  _TodoListState createState() => new _TodoListState();
}

class _TodoListState extends State<TodoList> {
  final TextEditingController _textFieldController = TextEditingController();
  final List<Todo> _todos = <Todo>[];

  @override
  Widget build(BuildContext context) {
    // Widget template comes here
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Todo list'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: _todos.map((Todo todo) {
          return TodoItem( // to_do item
            todo: todo,
            onTodoChanged: _handleTodoChange,
          );
        }).toList(),
      ),
      floatingActionButton: FloatingActionButton( // button for adding a new to_do item
          onPressed: () => _displayDialog(), // when pressed, the button will call the _displayDialog function
          tooltip: 'Add Item', // tooltip for the button
          child: Icon(Icons.add)),  // icon for the button which is a + sign
    );
  }

  // dialog to add a new to_do item
  Future<void> _displayDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Add a new todo item'),
          content: TextField( // create text field to add description of to_do item
            controller: _textFieldController,
            decoration: const InputDecoration(hintText: 'Type your new todo'), // hint text for the text field
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Add'), // add button to add a to_do item
              onPressed: () { // handle on item pressed
                Navigator.of(context).pop();
                _addTodoItem(_textFieldController.text);
              },
            ),
          ],
        );
      },
    );
  }

  void _addTodoItem(String name) { // function that is called when adding clicking add in the new to_do item dialog
    setState(() {
      _todos.add(Todo(name: name, checked: false)); // create new to-do object and add it to list
    });
    _textFieldController.clear(); // clear the text field
  }

  void _handleTodoChange(Todo todo) { // function that is called when a to_do item is clicked
    setState(() {
      todo.checked = !todo.checked;
    });
  }

// Other functions
}

class Todo {
  Todo({required this.name, required this.checked});

  final String name;
  bool checked;
}
// class for to_do items, each to_do item has a to_of type To-Do
class TodoItem extends StatelessWidget {
  TodoItem({
    required this.todo,
    required this.onTodoChanged,
  }) : super(key: ObjectKey(todo));

  final Todo todo;
  final onTodoChanged;

  // strike through text if to_do item is checked
  TextStyle? _getTextStyle(bool checked) {
    if (!checked) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onTodoChanged(todo);
      },
      leading: CircleAvatar(
        child: Text(todo.name[0]),
      ),
      title: Text(todo.name, style: _getTextStyle(todo.checked)),
    );
  }
}
