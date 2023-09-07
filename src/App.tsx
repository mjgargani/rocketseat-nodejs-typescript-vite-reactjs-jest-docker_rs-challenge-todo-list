import { List } from "./components/List"
import listMock from "./__tests__/mock.json"

function App() {
  return (
    <>
      <div>Input</div>
      <List items={listMock}/>
    </>
  )
}

export default App
