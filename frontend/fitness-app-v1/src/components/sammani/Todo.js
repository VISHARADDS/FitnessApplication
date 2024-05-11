import React, { useEffect, useState } from 'react';
import './assets/css/headerUI.css';
import '../sammani/assets/css/todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisV, faLocationPin, faSave, faThumbTack, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from "../../api/axiosConfig.js"


function Todo({ userName }) {
    const [numPinned, setNumPinned] = useState(0);
    const [completedTask, setCompletedTask] = useState(0);
    const [pinnedTasks, setPinnedTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
    const [editTask, setEditTask] = useState('');
    const [editDescription, setEditDescription] = useState('');
    

    // Function to close the edit modal
    const handleCloseModal = () => {
        // Reset modal data and close the modal
        setEditTaskModalOpen(false);
    };
   
    useEffect(() => {
        console.log("userName:", userName);
        function clock() {
            let d = new Date();
            let day = d.getDay();
            let date = d.getDate();
            let month = d.getMonth();

            let daysOF = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            let monthsOF = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            let time = `${daysOF[day]}, ${monthsOF[month]}${date}`;

            document.querySelector('.dayMonth').textContent = time;
            setTimeout(clock, 1000);
        }

        clock();

        let addList = document.querySelector('.addList');
        let addingNote = document.querySelector('.addingNote');
        let description = document.querySelector('.description');

        addList.addEventListener('input', () => {
            if (addList.value) {
                addingNote.style.display = 'block';
                description.style.display = 'block';
            } else {
                addingNote.style.display = 'none';
                description.style.display = 'none';
            }
        });

        // Fetch todos on component mount
        fetchTodos(userName); // Pass userName as an argument
    }, [userName]); 

    const fetchTodos = async (userName) => {
        try {
            const response = await api.get(`/api/v1/todos/username/${userName}`);
            const data = response.data[0]; // Access the first element of the array
            console.log("Response data:", data);
            
            // Check if the data contains the 'todo' property which is an array
            if (data && Array.isArray(data.todo)) {
                console.log("Todos array:", data.todo);
                setTodos(data.todo); // Set the array of todos in the state
            } else {
                console.error('Todos data is not in the expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
    
    const handleDelete = async (taskId) => {
        try {
            // Make API call to delete todo item by taskId
            await api.delete(`/api/v1/todo-items/delete/${taskId}`);
    
            // Fetch updated todo items after deleting the todo
            // Update the todos state by removing the deleted todo item
        setTodos(prevTodos => prevTodos.filter(todo => todo.taskId !== taskId));
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

    const generateTaskId = () => {
        const randomString = Math.random().toString(36).substring(2, 8);
        const taskId = 'task_' + randomString;
        console.log('Generated taskId:', taskId);
        return taskId;
    };
    
    const addTodoItem = async (taskInput, userName) => {
        try {
            console.log('userName:', userName);
            let completedTaskElement = document.querySelector('.completedTask');
            completedTaskElement.textContent = 0;
    
            if (taskInput.trim() !== '') {
                const taskId = generateTaskId(); // Generate unique task ID
    
                // Fetch the todoId based on the userName
                const response = await api.get(`/api/v1/todos/username/${userName}`);
                console.log('API Response:', response.data);
    
                // Check if response data is an array and contains at least one object
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const todoId = response.data[0].todoId;
                    console.log('todoId:', todoId);
    
                    const todoItemData = {
                        todoId: todoId,
                        taskId: taskId,
                        task: taskInput.trim(),
                        description: descriptionInput.trim(),
                        completed: false
                    };
    
                    console.log('Todo Item Data:', todoItemData);
    
                    // Make API call to add todo item to the database
                    await api.post('/api/v1/todo-items/addItem', todoItemData);
    
                    // Update the todos state with the new todo item
                  setTodos(prevTodos => [...prevTodos, todoItemData]);
                    // Fetch updated todo items after adding new todo
                    fetchTodos();
    
                    // Update input fields
                    setTaskInput('');
                    setDescriptionInput('');
                } else {
                    console.error('No todo data found for the user:', userName);
                }
            } else {
                console.error('Task cannot be empty');
            }
        } catch (error) {
            console.error('Error creating todo item:', error);
        }
    };
    
    const handleTaskInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const handleDescriptionInputChange = (e) => {
        setDescriptionInput(e.target.value);
    };

    const handleEdit = async (taskId) => {
        try {
            console.log('Editing task with ID:', taskId);
    
            // Fetch existing data based on taskId
            const response = await api.get(`/api/v1/todo-items/item/${taskId}`);
            const todoItem = response.data;


    
            // Set the editTaskId and existing task and description
            setEditTaskId(taskId);
            setEditTask(todoItem.task); // Possible source of null value warning
            setEditDescription(todoItem.description); // Possible source of null value warning
    
            // Open the modal
            setEditTaskModalOpen(true);
            
        } catch (error) {
            console.error('Error setting editTaskId:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            // Make API call to update todo item
            await api.put(`/api/v1/todo-items/update/${editTaskId}`, {
                task: editTask,
                description: editDescription
            });

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.taskId === editTaskId ? { ...todo, task: editTask, description: editDescription } : todo
                )
            );
    
            handleCloseModal();

            // Fetch updated todo items
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo item:', error);
        }
    };
    return (
        <>
            <div>
                <main className="mainContainer" style={{color:"white"}}>
                    <div className="currentDay">
                        To Do List<span>Completed Task: <strong className="completedTask">{completedTask}</strong></span>
                    </div>
                    <div className="dateMonth">
                        <span className="dayMonth"></span>
                    </div>

                    <div className="toDoAdd">
                        <div className="AddText">
                            <input type="text" value={taskInput} onChange={handleTaskInputChange} className="addList" />
                            <button  onClick={() => addTodoItem(taskInput, userName)}  className="addButton">ADD</button>
                        </div>
                        <span className="addingNote">Add Notes</span>
                        <textarea value={descriptionInput} onChange={handleDescriptionInputChange} className="description"></textarea>
                    </div>
                    <div className="pinTopDiv">
                        {/* <span className="numberPinned"> Pinned: <span className="numberOfPins">{numPinned}</span></span> */}
                        <div className="pinnedTasks">
                            
                        </div>
                    </div>

                    <section className="ListOfWork">
    {todos.map((todo, index) => (
        <div key={index} className="taskActive">
            <h2 className="TextAdded">{todo.task}</h2>
            <div className="descriptionAdded">Notes: {todo.description}</div>
            <div className="editDeleteButtons">
                <button className="editing2" onClick={() => handleEdit(todo.taskId)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="editing" onClick={() => handleDelete(todo.taskId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <input type="checkbox" className="taskDone" />
        </div>
    ))}
    {editTaskModalOpen && (
        <div className="modaltodo">
            <div className="modal-content-todo">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <input
                    className='descriptionAdded'
                    style={{marginTop:'10px', marginLeft:'10px',height:'30px' ,border:"1px solid black"}}
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                />
                <textarea
                    className='descriptionAdded'
                    style={{marginTop:'5px',marginLeft:"10px"}}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                ></textarea>
                <button onClick={handleSaveEdit}  style={{backgroundColor:"transparent", border:"none", color:"#ff7aa8"}}>
                    <FontAwesomeIcon icon={faSave} size='2x'/>
                </button>
            </div>
        </div>
    )}
</section>
                </main>
               
            </div>
        </>
    );
}

export default Todo;
