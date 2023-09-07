import { List, ListItem } from "./components/List"
import listMock from "./__tests__/mock.json"
import { useEffect, useState } from "react"
import { InputTask } from "./components/InputTask"

import { v4 as uuid } from 'uuid';

function App() {
  const [list, setList] = useState<ListItem[]>([])

  useEffect(() => {
    setList(listMock);
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
    <>
      <InputTask addTask={addTask} />
      <List items={list} handleItems={handleListItem} deleteItem={deleteListItem}/>
    </>
  )
}

export default App
