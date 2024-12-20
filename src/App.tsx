import useLocalStorageTodo from '@/hooks/useLocalStorageTodo';
import undoSvg from '@/images/undo-svgrepo-com.svg';
import deleteSvg from '@/images/delete-1487-svgrepo-com.svg';
import doneSvg from '@/images/done-mini-1484-svgrepo-com.svg'
import { Key } from 'react';
import { Button } from "@/components/ui/button"
import Form from './components/Form';

function App() {
  const [todos, addTodo, removeTodo, toggleTodo] = useLocalStorageTodo('todos');

  return (
    <>
      <header>
        <h1 className="my-2 py-2 text-xl text-center">Nivesh's To Do List</h1>
      </header>
      <main>
        <Form add={addTodo} />
        {todos.length !== 0 ? (
          <ul className="w-11/12 py-5 border">
            {todos.map((todo: { completed: boolean; text: string; }, index: Key) => (
              <li key={index} className={`${todo.completed ? 'line-through decoration-2' : 'none'} text-center font-medium`}>
                {todo.text}
                <span>
                  <Button variant="ghost" size={"icon"} onClick={() => toggleTodo(index)}>
                    {todo.completed ? <img src={undoSvg} /> : <img src={doneSvg} />}
                  </Button>
                  <Button variant="ghost" size={"icon"} onClick={() => removeTodo(index)}>
                    <img src={deleteSvg} />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        ) : ''}
      </main>
    </>
  )
}

export default App
