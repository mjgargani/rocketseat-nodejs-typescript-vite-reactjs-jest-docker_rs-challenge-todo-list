import { List, ListItem } from "./components/List"
import listMock from "./__tests__/mock.json"
import { useEffect, useState } from "react"

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

  return (
    <>
      <div>Input</div>
      <List items={list} handleItems={handleListItem} deleteItem={deleteListItem}/>
    </>
  )
}

export default App
