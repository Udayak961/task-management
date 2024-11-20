import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
    const [tab, setTab] = useState(1)
    const [task, setTask] = useState('')
    const [todos, setTodos] = useState(null)
    const [isEdit, setIsEdit] = useState(false);

    const [activeTodos, setActiveTodos] = useState(null)
    const [completedTodos, setCompletedTodos] = useState(null)

    const handleTabs = (tab) => {
        setTab(tab)
        
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/new-task', {task})
        .then(res => {
            setTodos(res.data)
            setTask('')
        });
        
    }

    useEffect(() => {
        axios.get('http://localhost:8081/read-tasks')
        .then(res => {
            setTodos(res.data)
            
        })
    }, [])

    

    const [updateId, setUpdateId] = useState(null)
    const [updatedTask, setUpdatedTask] = useState('')
    const handleEdit = (id, task) => {
        setIsEdit(true)
        setTask(task)
        setUpdatedTask(task);
        setUpdateId(id)

    }

    const updateTask = () => {
        axios.post('http://localhost:8081/update-task', {updateId, task})
        .then(res => {
            setTodos(res.data)
            setTask('')
            setIsEdit(false)
        })

    }

    const handleDelete = (id) => {
        axios.post('http://localhost:8081/delete-task', {id})
        .then(res => {
            setTodos(res.data)
        })
        
    }

    const handleComplete = (id) => {
        axios.post('http://localhost:8081/complete-task', {id})
        .then(res => {
            setTodos(res.data)
        })
    }

    

    

  return (
    <div className=' bg-gray-100 w-screen h-screen'>
        <div className=' col col-w-screen h-screen justify-center items-center'>
            <div >
                 <h1 className=" flex-column bg-primary font-bold justify-center text-2xl mr-8 mb-1">
                 
                    TASK STATE MANAGEMENT
                 </h1>
                
            </div>
            <div className=' gap-2'>
                <input value={task} onChange={e => setTask(e.target.value)} type='text' placeholder='Enter todo' className=' w-80% p-2 outline-none border border-blue-300 rounded-md' />
                <button  className=' bg-blue-600 text-white px-4 rounded-md'>{isEdit ? <button className='p-2 mb-2 bg-dark rounded text-white' onClick={updateTask}>Update</button> : <button className='btn bg-dark btn-lg rounded text-white' onClick={handleAddTask}>add</button>}</button>
            </div>

            <div className='d-flex flex-row text-sm w-80 justify-content-between mt-4'>
         
                <button className='btn btn-md bg-success rounded text-center text-dark  '><p onClick={() => handleTabs(1)} className={`${tab === 1 ? 'text-blue-700 text-sm w-80 justify-content-between rounded' : 'text-black rounded'} cursor-pointer`}>Todos</p></button>
                <button className='btn btn-md bg-info rounded text-dark'><p onClick={() => handleTabs(2)} className={`${tab === 2 ? 'text-blue-700' : 'text-black rounded'} cursor-pointer`}>Inprogress</p></button>
                <button className='btn btn-md bg-warning rounded text-dark'><p onClick={() => handleTabs(3)} className={`${tab === 3 ? 'text-blue-700' : 'text-black rounded'} cursor-pointer`}>Done</p></button>
            </div>
            

            {
                tab == 1 && todos?.map(todo => (
                    <div className='card mt -2' style={{width: "24rem",marginBottom:'20px',marginTop:'10px',backgroundColor:'lightblue'}}>
                    <div className='flex justify-between  bg-white p-3 w-80 mt-3 rounded-md'>
                        <div>
                            <p className=' text-lg font-semibold'>{todo?.task}</p>
                                <p className=' text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className=' text-sm text-gray-700'>Status : {todo.status}</p>
                        </div>

                        <div className=' d-flex-col space-even text-sm justify items-center' >
                        <div class="d-flex gap-3"> 
                            {todo.status == 'done' ? null : <button className='btn btn-primary btn-sms' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>}
                            <button className=' btn btn-danger btn-sms' onClick={() => handleDelete(todo.id)}>Delete</button>
                            {todo.status == 'done' ? null : <button className='btn btn-info btn-sms text-white' onClick={() => handleComplete(todo.id)}>done</button>}

                        </div>
                        </div>
                    </div>
                    </div>
                ))
            }

            {
                tab == 2 && todos?.filter(todo => todo.status == 'inprogress').map(todo => (

                    <div className='card mt -2' style={{width: "24rem",marginBottom:'20px',marginTop:'10px',backgroundColor:'lightblue'}}>
                    
                    <div className=' flex justify-between  bg-white p-3 w-80 mt-3 rounded-md'>
                        <div>
                            <p className=' text-lg font-semibold'>{todo?.task}</p>
                                <p className=' text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className=' text-sm text-gray-700'>Status : {todo.status}</p>
                        </div>

                        <div className=' flex-col space-between text-sm justify-center items-center'>
                        <div class="d-flex gap-3">
                            {todo.status == 'done' ? null : <button className=' btn btn-primary btn-sms' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>}
                            <button className='btn btn-danger btn-sms ' onClick={() => handleDelete(todo.id)}>Delete</button>
                            {todo.status == 'done' ? null : <button className=' btn btn-info btn-sms' onClick={() => handleComplete(todo.id)}>done</button>}

                        </div>
                        </div>
                        
                    </div>
                    </div>
                ))
            }

            {
                tab == 3 && todos?.filter(todo => todo.status == 'done').map(todo => (
                    
                    <div className='card mt -2' style={{width: "24rem",marginBottom:'20px',marginTop:'10px',backgroundColor:'lightblue'}}>
                    <div className=' flex justify-content-end bg-white p-3 w-80 mt-3 rounded-md'>
                        <div>
                            <p className=' text-lg font-semibold'>{todo?.task}</p>
                                <p className=' text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className=' text-sm text-gray-700'>Status : {todo.status}</p>
                        </div>

                        <div className=' flex flex-col text-sm justify-center items-center'>
                            <button className=' p-1 mb-2 bg-warning  rounded border-dark text-dark' onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </div>
                    </div>
                    
                ))
            }

            
        </div>
    </div>
  )
}

export default Home