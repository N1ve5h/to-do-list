import { useState, useEffect } from 'react';

const useLocalStorageTodo = (initialValue = []) => {
  const [todos, setTodos] = useState(() => {
    // Get the initial value from localStorage if available, otherwise use the provided initialValue
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : initialValue;
  });

  useEffect(() => {
    // Save the todos to localStorage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return [todos, addTodo, removeTodo, toggleTodo];
};

export default useLocalStorageTodo;
