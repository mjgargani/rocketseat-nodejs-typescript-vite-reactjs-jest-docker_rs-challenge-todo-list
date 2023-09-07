import { ChangeEvent, MouseEvent, useState } from "react";

interface InputTaskProps {
  addTask: (task: string) => void
}

export function InputTask({ addTask }: InputTaskProps) {
  const [inputValue, setInputValue] = useState<string>("Adicione uma nova tarefa")

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  const handleAddTask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(inputValue){
      addTask(inputValue);
      setInputValue("");
    }
  }

  return (<div>
    <input type="text" value={inputValue} onChange={handleInputValue} required/>
    <button onClick={handleAddTask} disabled={!inputValue}>Criar</button>
  </div>)
}