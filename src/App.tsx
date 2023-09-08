import { List, ListItem } from "./components/List"
import listMock from "./__tests__/mock.json"
import { useEffect, useState } from "react"
import { InputTask } from "./components/InputTask"

import { v4 as uuid } from 'uuid';

import './global.css'
import styles from './App.module.css'

function App() {
  const [list, setList] = useState<ListItem[]>([])

  useEffect(() => {
    console.log(import.meta.env)
    if(import.meta.env.VITE_FILLED === "true"){
      setList(listMock);
    }
  }, [])

  const handleListItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const id = target.value;
    const { checked } = target;

    const newList = list.map(el => el.id === id ? {...el, checked} : el);
    
    setList(newList);
  }

  const deleteListItem = (id: string) => {
    const newList = list.filter(el => el.id !== id);
    
    setList(newList);
  }

  const addTask = (task: string) => {
    const newList = [{
      id: uuid(),
      content: task,
      checked: false,
      date: new Date(Date.now()).toISOString()
    }, ...list]
    
    setList(newList);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <InputTask addTask={addTask} />
      </div>
      <div className={styles.footer}>
        <List items={list} handleItems={handleListItem} deleteItem={deleteListItem}/>
      </div>
    </div>
  )
}

export default App
