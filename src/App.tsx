import { useEffect, useState } from 'react'
import TodoItem from './TodoItem';
import { Construction } from 'lucide-react';

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type  Todo = {
  id: number;
  text: string;
  priority: Priority;
}

function App() {
const [input, setInput] = useState<string>('');
const [priority, setPriority] = useState<Priority>('Moyenne');

const saveTodos = localStorage.getItem('todos');
const initialTodos = saveTodos ? JSON.parse(saveTodos) : [];
console.log(saveTodos);
const [listeTodo, setListeTodo] = useState<Todo[]>(initialTodos);
const [filter, setFilter] = useState<Priority | 'Tous'>('Tous');

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(listeTodo));
}, [listeTodo]);

    function addTodo() {
      if(input.trim() === '') {
        return;
      }
      
   

     const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        priority: priority
      };

      const newTodos = [newTodo, ...listeTodo];
      setListeTodo(newTodos);
      setInput('');
      setPriority('Moyenne');
      console.log( newTodos); 
  };

  let filteredTodos: Todo[] = []
  if(filter === 'Tous') {
    filteredTodos = listeTodo;
  } else {
    filteredTodos = listeTodo.filter((todo) => todo.priority === filter);
  }

  const urgentCount = listeTodo.filter((todo) => todo.priority === 'Urgente').length;
  const moyenneCount = listeTodo.filter((todo) => todo.priority === 'Moyenne').length;
  const basseCount = listeTodo.filter((todo) => todo.priority === 'Basse').length;
  const totalCount = listeTodo.length;
  console.log(filteredTodos);

  function supprimerTodo(id: number) {
    const newTodos = listeTodo.filter((todo) => todo.id !== id);
    setListeTodo(newTodos);
  }

  const [selectedTodo, setSelectedTodo] = useState<Set<number>>(new Set());

  function toggleSelectTodos(id: number){
    const newSelected = new Set(selectedTodo);
    if(newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodo(newSelected);
  }

  function finishSelected() {
    const newTodos = listeTodo.filter((todo) => {
      if(selectedTodo.has(todo.id)) {
        return false;
      } else {
      return true;
      }
    });

    setListeTodo(newTodos);
    setSelectedTodo(new Set());
  }

  return (
    <div className="flex justify-center items-start min-h-screen w-full px-4 py-4 sm:items-center sm:py-0">
       <div className="w-full max-w-md flex flex-col gap-4 bg-gray-900 p-4 sm:p-5 rounded-2xl">
          <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-2">
                <input
                 type="text" 
                 className="input flex-1 text-sm sm:text-base"
                 placeholder="Ajouter une tâche..."
                  value={input} onChange={(e) => setInput(e.target.value)}
                 />
                 <button onClick={addTodo} className="btn btn-info btn-sm sm:btn-md whitespace-nowrap">Ajouter</button>
              </div>
              <select className="select select-sm sm:select-md w-full"
               name="priority"
                id="" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                  <option value="Urgente">Urgente</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
              </select>
          </div>
          <div className="space-y-3 flex-1 h-fit w-full">
           <div className='flex flex-col gap-3 w-full'>
               <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                <button className={`btn btn-sm sm:btn-md btn-soft ${filter === "Tous"? "btn-info" : ""}`}onClick={() => setFilter("Tous")} > Tous ({totalCount}) </button>  
                <button className={`btn btn-sm sm:btn-md btn-soft ${filter === "Urgente"? "btn-error" : ""}`}onClick={() => setFilter("Urgente")} > Urgente ({urgentCount}) </button>  
                <button className={`btn btn-sm sm:btn-md btn-soft ${filter === "Moyenne"? "btn-warning" : ""}`}onClick={() => setFilter("Moyenne")} > Moyenne ({moyenneCount}) </button>  
                <button className={`btn btn-sm sm:btn-md btn-soft ${filter === "Basse"? "btn-secondary" : ""}`}onClick={() => setFilter("Basse")} > Basse ({basseCount}) </button>    
              </div>
              <button className="btn btn-primary btn-sm sm:btn-md w-full" onClick={finishSelected}
              disabled={selectedTodo.size === 0}>Finir la selection ({selectedTodo.size})

              </button>

           </div>
              

              {filteredTodos.length > 0 ? (
                <ul className="divide-y divide-primary/20">
                  {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                           <TodoItem
                            todo={todo}
                            isSelected={selectedTodo.has(todo.id)}
                            onDelete={() => supprimerTodo(todo.id)}
                            onToggleSelect={() => toggleSelectTodos(todo.id)}
                            />
                    </li>
                  ))}
                </ul> 
              ) : ( 
                <div className='flex justify-center items-center flex-col p-4 sm:p-5'>
                  <div>
                    <Construction strokeWidth={1} className='w-24 h-24 sm:w-40 sm:h-40 text-primary' />
                  </div>
                   <p className='text-xs sm:text-sm text-center'>Aucune tâche pour ce filtre</p>
                </div>
              )
              }
          </div>
       </div>
    </div>
  )
}

export default App
