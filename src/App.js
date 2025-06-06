// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
// import Todo from './components/Todo';

function App() {
  const [todo, setTodo] = useState("");   //for single todo
  const [todos, setTodos] = useState([]);   // for all todos
  const [editId, setEditId] = useState(0)

  const handleSubmit =(e) => {

    e.preventDefault();     // prevents page from get refreshed

    if(editId){
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => 
        t.id === editTodo.id 
        ? t= {id: t.id, todo} 
        : {id: t.id, todo: t.todo}
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if(todo !== ""){
      setTodos([{ id: `${todo}-${Date.now()}`, todo}, ...todos]);     //id-> for creating key in map(generates random unique id every time)
      // setTodos((todos) => {
      //   return [{todo}, ...todos];
      // })
      setTodo("");
    }
    

  }

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }

  return (
    <div className="App">
     <div className='container'>
      <h1>Todo List App</h1>
      <form className='todoForm' onSubmit={handleSubmit}>
        <input type='text' 
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}/>
        <button type='submit'>{editId ? "Edit" : "Go"}</button>
      </form>


      <ul className='allTodos'>
        {todos.map((t) => (
            <li className='singleTodo'>
            <span className='todoText' key={t.id}>{t.todo}</span>
            <button onClick={()=> handleEdit(t.id)}>Edit</button>
            <button onClick={()=> handleDelete(t.id)}>Delete</button>
          </li>
        ))}
        
      </ul>


     </div>
    </div>
  );
}

export default App;
