import React, { useState } from "react";
import classes from './ToDoItem.module.scss'

export default function ToDoItem({number, title, text, id, remove, isComplited, change}){
    const [isDone, setIsDone] = useState(isComplited)
    function handleChange(id){
        setIsDone(!isDone)
        change(id)
    }
    return(
        <div className={`${classes.Container} ${isDone && classes.isDone}`}>
            <h2  onClick={()=>handleChange(id)} >{number}: {title}</h2>
            <p>{text}</p>
            <button onClick={()=>remove(id)}>X</button>
        </div>
    )
}