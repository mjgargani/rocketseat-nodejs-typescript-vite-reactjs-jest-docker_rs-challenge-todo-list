import '@testing-library/jest-dom'
import { screen, render, cleanup, fireEvent } from "@testing-library/react"
import { List, ListItem } from "../components/List"

import listMock from "./mock.json";

let list: ListItem[];
const handleListItem = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;
  const id = target.value;
  const { checked } = target;

  const newList = list.map(el => el.id === id ? {...el, checked} : el);
  
  list = newList;
})

afterAll(cleanup);
beforeEach(() => list = listMock);

describe("List test", () =>{
  it("Returns all list items from mock, depending on list state", async () =>{
    const { rerender } = render(<List items={list} handleItems={handleListItem}/>)

    const listItems = await screen.findAllByTestId(/list_item_container_\w/);

    expect(listItems).toHaveLength(list.length);

    for (const [i, el] of listItems.entries()){
      expect(el).toBeInTheDocument()
      expect(el).toHaveTextContent(list[i].content)
    }

    list = [{
      id: "237c70ce-2bbd-4ebc-99d0-ba54f25ec987",
      content: "Terminar projeto do Ignite",
      checked: false,
      date: new Date(Date.now()).toISOString()
    }, ...list];

    rerender(<List items={list} handleItems={handleListItem}/>)

    const listItemContent = screen.getByTestId(`list_item_container_${list[0].id}`);

    expect(listItemContent).toHaveTextContent(list[0].content);
    expect(listItemContent).toHaveTextContent("há menos de um minuto");
    
    const listItemCheck = screen.getByTestId(`list_item_check_${list[0].id}`);
    expect(listItemCheck).toHaveProperty("checked", list[0].checked);
  })
  it("Changes the 'Complete' tracker after check the items", async () => {
    const { rerender } = render(<List items={list} handleItems={handleListItem}/>)

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

    expect(afterCompletedTasks).toBe(3)
    
    rerender(<List items={list} handleItems={handleListItem}/>)

    const afterCompletionTrack = screen.getByTestId(/list_completion_track/);
    expect(afterCompletionTrack)
      .toHaveTextContent(`${afterCompletedTasks}/${list.length}`);
  })
})