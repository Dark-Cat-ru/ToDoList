import './App.css';
import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import ToDoItem from './components/ToDoItem/ToDoItem.js';
import ItemVisual from './components/ItemVisual/ItemVisual.js';

function App(){
  
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchString, setSearchString] = useState('')
  const scrollRef = useRef()
  let Today = new Date(Date.now())
  let year = Today.getFullYear()
  let month = Today.getMonth() + 1
  let day = Today.getDate()

  useEffect(()=>{
    const ToDos = JSON.parse(localStorage.getItem("ToDos"))
    if(ToDos.length > 0){
      // console.log('true')
      setItems([...ToDos])
    } else{
      // console.log('false')
      fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        .then(response => response.json())
        .then(json => setItems(json))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("ToDos", JSON.stringify(items))
    window.scrollTo(0, scrollRef.current.scrollHeight)
  }, [items])


  function handleClick(title, text){
    if(title !== ''){
      const item = {
        title: title,
        text: text,
        id: nanoid(),
      }
      setItems([...items, item])
    }
  }

  function handleRemove(id){
    const newArr = items.filter((el)=>el.id !== id)
    setItems(newArr)
  }
  
  function handleChange(id){
    const newArr = items.map((el)=>{
      if(el.id === id){
        el.completed = !el.completed
      }
      return el 
    })
    setItems(newArr)
  }

  function handleSearch(event){
    setSearchString(event.target.value)
    const filteredArr = items.filter((el)=> el.title.includes(event.target.value))
    setFilteredItems(filteredArr)
  }

    return (
    <div className="App">
      <p>{day + '/' + month + '/' + year}</p>
      <input type='text' onChange={handleSearch} value={searchString}/>
      <ItemVisual handle={handleClick}/>
      {items.length === 0 && filteredItems.length && <h1>Дел нет</h1>}
      <div ref={scrollRef}>
        {searchString && filteredItems.map((el, i)=>
          <ToDoItem 
            title={el.title} 
            text={el.text} 
            number={i+1} 
            id={el.id} 
            remove={handleRemove} 
            isComplited={el.completed} 
            key={el.id} 
            change={handleChange}
          />
        )}
        {!searchString && items.map((el, i)=>
          <ToDoItem 
            title={el.title} 
            text={el.text} 
            number={i+1} 
            id={el.id} 
            remove={handleRemove} 
            isComplited={el.completed} 
            key={el.id} 
            change={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
