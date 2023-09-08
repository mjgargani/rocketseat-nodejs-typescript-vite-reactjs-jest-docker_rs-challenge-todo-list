import { ChangeEvent, MouseEvent, useState } from "react";

import styles from './InputTask.module.css'
interface InputTaskProps {
  addTask: (task: string) => void
}

export function InputTask({ addTask }: InputTaskProps) {
  const [inputValue, setInputValue] = useState<string>("")

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

  return (<div className={styles.taskAdd}>
    <input 
      type="text" 
      value={inputValue} 
      onChange={handleInputValue} 
      placeholder="Adicione uma nova tarefa" 
      required
      data-testid={`task_input`}
    />
    <button 
      onClick={handleAddTask} 
      disabled={!inputValue}
      data-testid={`task_submit`}
    >
      <strong>Criar</strong>
    </button>
  </div>)
}