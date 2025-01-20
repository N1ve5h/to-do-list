import useLocalStorageTodo from '@/hooks/useLocalStorageTodo';
import Form from './components/Form';
import { AnimatePresence } from 'framer-motion'
import { TodoItem } from '@/components/todo-item'
import { TodoSummary } from '@/components/todo-summary'

function App() {
  const [todos, addTodo, removeTodo, toggleTodo] = useLocalStorageTodo('todos');
  
  const completedTodos = todos.filter(todo => todo.completed)
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Form onAdd={addTodo} />
          </div>
          <TodoSummary total={todos.length} completed={completedTodos.length} />
        </div>
        <AnimatePresence>
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggle={toggleTodo}
                onDelete={removeTodo}
              />
            ))}
          </div>
        </AnimatePresence>
        {todos.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No todos yet. Add one to get started!
          </p>
        )}
      </main>
    </div>
  )
}

export default App
