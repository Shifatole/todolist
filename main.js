//Model
            //if localstorage has a todos array,then use it else use the default
            let todos;
            //retrive localstorage
            const savedTodos = JSON.parse(localStorage.getItem('todos'));
            //check if it's an array
            if (Array.isArray(savedTodos)){
                todos = savedTodos;
            } else {
                todos = [{
                    title: 'Get Groceries',
                    dueDate: '2023-03-24',
                    id: 'id1'
                }, {
                    title: 'Car wash',
                    dueDate: '2023-03-22',
                    id: 'id2'
                }, {
                    title: 'Make dinner',
                    dueDate: '2023-03-29',
                    id: 'id3'
                }];
            }
            //Creates a todo
            function createTodo(title, dueDate) {
                const id = '' + new Date().getTime();

                todos.push({
                    title: title,
                    dueDate: dueDate,
                    id: id
                });

                saveTodos();
            }

            //Deletes a todo
            function removeTodo(idToDelete) {
                todos = todos.filter(function (todo) {
                    //if id of this mmatches idtodelet return false else true
                    if (todo.id == idToDelete) {
                        return false;
                    } else {
                        return true;
                    }
                });

                saveTodos();
            }

            function saveTodos() {
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            //controller section
            function addTodo() {
                const textbox = document.getElementById('todo-title');
                const title = textbox.value;

                const datePicker = document.getElementById('date-picker');
                const dueDate = datePicker.value;

                createTodo(title, dueDate);
                render();
            }

            function deleteTodo(event) {
                const deleteButton = event.target;
                const idToDelete = deleteButton.id;

                removeTodo(idToDelete);
                render();
            }

            //view section
            function render() {
                //reset our list
                document.getElementById('todo-list').innerHTML = '';

                todos.forEach(function (todo) {
                    const element = document.createElement('div');
                    element.innerText = todo.title + ' ' + todo.dueDate;
                    element.style = 'text-align:right;padding:6px'

                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete task';
                    deleteButton.style = ' margin-left: 12px; padding:6px; border-radius:5px';

                    deleteButton.onclick = deleteTodo;
                    deleteButton.id = todo.id;
                    element.appendChild(deleteButton);

                    const todolist = document.getElementById('todo-list');
                    todolist.appendChild(element);
                });
            }
            render();