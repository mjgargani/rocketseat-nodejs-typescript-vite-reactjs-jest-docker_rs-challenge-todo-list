import { newDate } from "../utils/date"

export interface ListItem {
  id: string,
  content: string,
  date: string,
  checked: boolean
}

export interface ListProps {
  items: ListItem[],
  handleItems: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function List({
  items,
  handleItems
}: ListProps) {
  return (<>
    <div data-testid={'list_completion_track'}>
      Completed: {items.filter(el => el.checked).length}/{items.length}
    </div>
    {
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
          >Remover</button>
        </div>
      ))
    }
  </>)
}