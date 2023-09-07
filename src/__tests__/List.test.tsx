import '@testing-library/jest-dom'
import { screen, render, cleanup, fireEvent } from "@testing-library/react"
import { List, ListItem } from "../components/List"

import listMock from "./mock.json";

afterAll(cleanup);

let list: ListItem[] = [];

const handleListItem = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;
  const id = target.value;
  const { checked } = target;

  const newList = list.map(el => el.id === id ? {...el, checked} : el);
  
  list = newList;
}

describe("List test", () =>{
  it("Returns all list items from mock", async () =>{
    list = listMock;

    render(<List items={list} handleItems={handleListItem}/>)

    const listItems = await screen.findAllByTestId(/list_item_container_\w/);

    expect(listItems).toHaveLength(list.length);

    for (const [i, el] of listItems.entries()){
      expect(el).toBeInTheDocument()
      expect(el).toHaveTextContent(list[i].content)
    }
  })
  it("Changes the 'Complete' tracker after check the items", async () => {
    list = listMock;

    render(<List items={list} handleItems={handleListItem}/>)

    const checkItems = await screen.findAllByTestId(/list_item_check_\w/);

    expect(checkItems).toHaveLength(list.length);

    for (const [i, el] of checkItems.entries()){
      expect(el).toBeInTheDocument()
      expect(el).toHaveProperty("checked", list[i].checked)
    }

    const defaultCompletedTasks = list.reduce(
      (acc, curr) => curr.checked ? acc + 1 : acc
    ,0)

    const completionTrack = await screen.findByTestId(/list_completion_track/);
    expect(completionTrack).toHaveTextContent(`${defaultCompletedTasks}/${listMock.length}`)

    fireEvent.click(checkItems[0])

    const afterCompletedTasks = list.reduce(
      (acc, curr) => curr.checked ? acc + 1 : acc
    ,0)

    expect(afterCompletedTasks).toBe(3);
  })
})