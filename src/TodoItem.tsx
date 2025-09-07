import { Trash } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type  Todo = {
  id: number;
  text: string;
  priority: Priority;
}

type Props = {  
  todo: Todo;
  onDelete: () => void;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
}


const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect }: Props) => {
  return (
    
      <li className="p-2 sm:p-3">
        <div className="flex justify-between items-start gap-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
                <input
                 type="checkbox"
                 className="checkbox checkbox-success checkbox-sm mt-1 flex-shrink-0" 
                 checked={isSelected}
                 onChange={() => onToggleSelect?.(todo.id)}
                />
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-sm sm:text-md font-bold break-words">{todo.text}</span>
                  <span className={`badge badge-xs sm:badge-sm badge-soft ${
                    todo.priority === 'Urgente' ? 'badge-error' : 
                    todo.priority === 'Moyenne' ? 'badge-warning' : 
                    'badge-secondary'
                  }`}>
                      {todo.priority}
                  </span>
                </div>
            </div>
            <button onClick={ onDelete} className="btn btn-xs sm:btn-sm btn-primary btn-soft flex-shrink-0">
                <Trash className="w-3 h-3 sm:w-4 sm:h-4"></Trash>
            </button>

        </div>
      </li>
    
  )
}

export default TodoItem;