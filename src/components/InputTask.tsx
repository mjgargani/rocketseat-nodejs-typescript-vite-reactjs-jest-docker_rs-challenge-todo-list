import { ChangeEvent, MouseEvent, useState } from 'react';

import styles from './InputTask.module.css';

import plusSignIcon from '../assets/circle-plus-sign.svg';

interface InputTaskProps {
	addTask: (task: string) => void;
}

const inputLimit = 100;

export function InputTask({ addTask }: InputTaskProps) {
	const [inputValue, setInputValue] = useState<string>('');

	const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (newValue.length <= inputLimit) {
			setInputValue(newValue);
		}
	};

	const handleAddTask = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (inputValue) {
			addTask(inputValue);
			setInputValue('');
		}
	};

	return (
		<div className={styles.taskAdd}>
			<div className={styles.inputLimitDisplay}>
				<p>
					<span>
						{inputValue.length}/{inputLimit}
					</span>
				</p>
			</div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputValue}
				placeholder="Adicione uma nova tarefa"
				required
				data-testid={`task_input`}
			/>
			<button onClick={handleAddTask} disabled={!inputValue} data-testid={`task_submit`}>
				<strong>Criar</strong>
				<img src={plusSignIcon} alt="Criar" />
			</button>
		</div>
	);
}
