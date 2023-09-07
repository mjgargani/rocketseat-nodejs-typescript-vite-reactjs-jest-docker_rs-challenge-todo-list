import '@testing-library/jest-dom'
import { screen, render, waitFor } from "@testing-library/react"
import { List } from "../components/List"

import listMock from "./mock.json";

describe("List test", () =>{
  it("Return all list items from mock", async () =>{
    render(<List items={listMock}/>)

    const listItems = await screen.findAllByTestId(/list_item_\w/);

    expect(listItems).toHaveLength(10);

    waitFor(() => {
      for (const [i, el] of listItems.entries()){
        expect(el).toBeInTheDocument()
        expect(el).toHaveTextContent(listMock[i].content)
      }
    })
  })
})