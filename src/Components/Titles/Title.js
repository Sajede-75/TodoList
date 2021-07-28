import React, { useState ,useEffect} from 'react';
import './Title.scss'

function Todo({todo ,index ,completeTodo , removeTodo}){
    return(
        
        <div 
            className="todo"
            style={{textDecoration:todo.iscopmleted ? "line-through" : ""}}
        >
        {todo.text}
        <div>
            <button onClick={()=> {
                if(todo.text !==""){
                    completeTodo(index)
                }
            }}>Complete</button>
            <button onClick={()=> removeTodo(index)}>Remove</button>
        </div>
        </div>
    )
}

//add new todo
function TodoForm({addTodo}){
    const[input,setInput]= useState("");
    const addSubmit=e=>{
        e.preventDefault();
        if(!input) return;
        addTodo(input);
        setInput("");
    }
    return(
        <form onSubmit={addSubmit}>
            <input
                text="text"
                className="input"
                value={input}
                onChange={e=> setInput(e.target.value)}
            />
        </form>
    )
}


function Titles(){
    const[title, setTitle]=useState([
        {
         text:"",
         iscopmleted:false  //update list
        }
    ]);
    const saveData=(newTodos)=>{
        localStorage.setItem("title" ,JSON.stringify(newTodos));
    };
    useEffect(()=>{
        if(localStorage.getItem("title")){
            setTitle(JSON.parse(localStorage.getItem("title")))
        }
    },[]);

    //add new todo
    const addTodo=text=>{
        const newTodo=[...title ,{text}];
        setTitle(newTodo);
        saveData(newTodo)
    }
    //update list
    const completeTodo=index=>{
        const newTodo =[...title];
        newTodo[index].iscopmleted=true;
        setTitle(newTodo);
        saveData(newTodo)
    }
    //delete item
    const removeTodo=index=>{
        const newTodo =[...title];
        newTodo.splice(index,1);
        setTitle(newTodo);
        saveData(newTodo)
    }
    
    return(
        <div className='todoList'>
            <TodoForm addTodo={addTodo}/>
            {title.map((todo ,index)=>(
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    )
}
export default Titles;