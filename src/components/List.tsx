import { newDate } from "../utils/date"

export interface ListItem {
  id: string,
  content: string,
  date: string,
  checked: boolean
}

export interface ListProps {
  items: ListItem[],
  handleItems: (event: React.ChangeEvent<HTMLInputElement>) => void,
  deleteItem: (id: string) => void,
}

export function List({
  items,
  handleItems,
  deleteItem
}: ListProps) {
  return (<div data-testid={'task_list_container'}>
    <div data-testid={'list_item_length'}>
      <p>Tarefas criadas <span>{items.length}</span></p>
    </div>
    <div data-testid={'list_completion_track'}>
      <p>Concluídas <span>{items.filter(el => el.checked).length} de {items.length}</span></p>
    </div>
    {
      items.length ?
        items.map(el => (
          <div 
            key={el.id}
            data-testid={`list_item_container_${el.id}`}
          >
            <div>
              <input 
                type="checkbox" 
                value={el.id} 
                name={el.id}
                defaultChecked={el.checked}
                data-testid={`list_item_check_${el.id}`}
                onChange={handleItems}
              />
              <label htmlFor={el.id}>{el.content}</label>
            </div>
            <time
                title={newDate(new Date(el.date)).dateFormat}
                dateTime={el.date}
                data-testid={`list_item_date_${el.id}`}
            >
                ({newDate(new Date(el.date)).relativeDate})
            </time>
            <button 
              data-testid={`list_item_rm_btn_${el.id}`}
              onClick={() => deleteItem(el.id)}
            >Remover</button>
          </div>
        ))
      : (<>
        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </>)
    }
  </div>)
}