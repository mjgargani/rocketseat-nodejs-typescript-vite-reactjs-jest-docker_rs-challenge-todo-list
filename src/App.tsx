import { List, ListItem } from './components/List';
import listMock from './__tests__/mock.json';
import { useEffect, useState } from 'react';
import { InputTask } from './components/InputTask';

import { v4 as uuid } from 'uuid';

import './global.css';
import styles from './App.module.css';

function App() {
	const [list, setList] = useState<ListItem[]>([]);

	useEffect(() => {
		if (import.meta?.env?.VITE_FILLED === 'true') {
			setList(listMock);
		} else {
			const newList = JSON.parse(localStorage.getItem('todo-list') || '[]') as ListItem[];
			if (newList.length) {
				setList(newList);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todo-list', JSON.stringify(list));
	}, [list]);

	const handleListItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		const id = target.value;
		const { checked } = target;

		const newList = list.map((el) => (el.id === id ? { ...el, checked } : el));

		setList(newList);
	};

	const deleteListItem = (id: string) => {
		const newList = list.filter((el) => el.id !== id);

		setList(newList);
	};

	const addTask = (task: string) => {
		const newList = [
			{
				id: uuid(),
				content: task,
				checked: false,
				date: new Date(Date.now()).toISOString(),
			},
			...list,
		];

		setList(newList);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<InputTask addTask={addTask} />
			</div>
			<div className={styles.footer}>
				<List items={list} handleItems={handleListItem} deleteItem={deleteListItem} />
			</div>
			<div className={styles.author}>
				<p>
					2023 -{' '}
					<a href="https://gargani.dev" target="_blank">
						@mjgargani
					</a>{' '}
					-{' '}
					<a
						href="https://github.com/mjgargani/rocketseat-nodejs-typescript-vite-reactjs-jest-docker_rs-challenge-todo-list"
						target="_blank"
					>
						repo
					</a>
				</p>
			</div>
		</div>
	);
}

export default App;
