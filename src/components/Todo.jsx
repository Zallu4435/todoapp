import React, { useEffect, useRef, useState } from 'react';
import TodoItems from './TodoItems';
import todo_icon from '../assets/todo_icon.png';

function Todo() {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const [deleteId, setDeleteId] = useState(null); 
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if(inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
        
    };

    const confirmDelete = (id) => {
        setDeleteId(id); 
    };

    const deleteTodo = () => {
        setTodoList((prev) => prev.filter((todo) => todo.id !== deleteId));
        setDeleteId(null); 
    };

    const toggle = (id) => {
        setTodoList((prev) => (
            prev.map(todo => (
                todo.id === id ? {...todo, isComplete:!todo.isComplete} : todo
            ))
        ));
    };

    const [error,setError] = useState({
        state:false,
        message:''
    })

    useEffect(() => {
        // This is the mount phase, component mounted.
        console.log('Component mounted');
    
        return () => {
            // This is the unmount phase, component will be unmounted.
            console.log('Component unmounted');
        };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount
    

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            {/* Confirmation Modal */}
            {deleteId !== null && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this to-do item?</p>
                        <button onClick={deleteTodo}>Yes</button>
                        <button onClick={() => setDeleteId(null)}>No</button>
                    </div>
                </div>
            )}
            
            {/* ----- title ----- */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="Todo Icon" />
                <p>{todoList.length}</p>
                <p>{error.message}</p>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/* ----- input box ----- */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    ref={inputRef} type="text" placeholder='Add your task' />
                <button className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                    onClick={add}>ADD +</button>
            </div>

            {/* ----- todo list ----- */}
            <div>
                {todoList.map((item, index) => (
                    <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} 
                        deleteTodo={() => confirmDelete(item.id)} toggle={toggle} />
                ))}
            </div>
        </div>
    );
}

export default Todo;
