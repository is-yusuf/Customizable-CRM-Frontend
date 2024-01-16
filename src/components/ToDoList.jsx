import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
  
    const handleTodoAdd = () => {
      if (todoText.trim() !== "") {
        setTodos([...todos, todoText.trim()]);
        setTodoText("");
      }
    };
  
    const handleTodoRemove = (index) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  
    return (
      <Box display="flex" flexDirection="column" gap="10px">
        <TextField
          fullWidth
          variant="filled"
          label="Add Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button onClick={handleTodoAdd} variant="contained" color="primary">
          Add
        </Button>
        {todos.map((todo, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
            <span>{todo}</span>
            <Button onClick={() => handleTodoRemove(index)} color="secondary">
              Remove
            </Button>
          </Box>
        ))}
      </Box>
    );
  };
export default TodoList;