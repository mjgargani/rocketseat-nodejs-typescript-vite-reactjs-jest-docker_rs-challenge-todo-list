import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../../App'

describe("App test", () => {
  it("Can add some tasks on the current list", async () => {
    render(<App />)

    const taskInput = await screen.findByTestId(/task_input/)
    const taskSubmit = await screen.findByTestId(/task_submit/)
    const taskList = await screen.findByTestId(/task_list_container/);

    const firstTask = "Minha nova task 1";

    fireEvent.change(taskInput, { target: { value: firstTask} })
    fireEvent.click(taskSubmit)

    expect(taskList).toHaveTextContent(firstTask);

    const secondTask = "Minha nova task 2";

    fireEvent.change(taskInput, { target: { value: secondTask} })
    fireEvent.click(taskSubmit)

    expect(taskList).toHaveTextContent(secondTask);
  })
})