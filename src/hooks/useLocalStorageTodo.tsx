import { useState, useEffect } from 'react';

const useLocalStorageTodo = (getItemStorage: string) => {
  const [todos, setTodos] = useState(() => {
    // Get the initial value from localStorage if available, otherwise use the provided initialValue   
    const storedTodos = localStorage.getItem(getItemStorage);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    // Save the todos to localStorage whenever the todos state changes
    localStorage.setItem(getItemStorage, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: string) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = (index: number) => {
    setTodos(todos.map(todo =>
      todo.index === index ? { ...todo, completed: !todo.completed } : todo
    ))
  };

  return [todos, addTodo, removeTodo, toggleTodo];
};

export default useLocalStorageTodo;
