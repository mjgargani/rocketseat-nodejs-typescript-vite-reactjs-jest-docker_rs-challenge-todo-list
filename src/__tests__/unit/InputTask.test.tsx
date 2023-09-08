import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { InputTask } from "../../components/InputTask";

const addTask = jest.fn()

beforeAll(cleanup);

describe("InputTask tests", ()=> {
  it("Verify components", async () => {
    render(<InputTask addTask={addTask}/>)

    const taskInput = await screen.findByTestId(/task_input/)
    expect(taskInput).toBeInTheDocument()
    expect(taskInput).toHaveAttribute("value", "")

    const taskSubmit = await screen.findByTestId(/task_submit/)
    expect(taskSubmit).toBeInTheDocument()
    expect(taskSubmit).toBeDisabled()
  })
  it("Changes the disabled attr from button, after insert some text on input", async () => {
    render(<InputTask addTask={addTask}/>)

    const taskInput = await screen.findByTestId(/task_input/)
    const taskSubmit = await screen.findByTestId(/task_submit/)

    fireEvent.change(taskInput, { target: { value: "Minha nova task"} })
    expect(taskInput).toHaveAttribute("value", "Minha nova task")
    expect(taskSubmit).not.toBeDisabled()
  })
  it("Clears the input and disable the button, after click on submit button", async () => {
    render(<InputTask addTask={addTask}/>)

    const taskInput = await screen.findByTestId(/task_input/)
    const taskSubmit = await screen.findByTestId(/task_submit/)

    fireEvent.change(taskInput, { target: { value: "Minha nova task"} })
    fireEvent.click(taskSubmit)

    expect(taskInput).toHaveAttribute("value", "")
    expect(taskSubmit).toBeDisabled()
  })
})