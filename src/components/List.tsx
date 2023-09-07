import { useEffect, useState } from "react"

type Completed = [current: number, total: number]

export interface ListItem {
  id: string,
  content: string,
  date: Date | string,
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
  const [completed, setCompleted] = useState<Completed>([0, 0]);

  useEffect(() => {
    if(items.length){
      const newCompleted: Completed = [
        items.filter(el => el.checked).length, 
        items.length
      ];
      setCompleted(newCompleted);
    }
  }, [items])

  return (<>
    <div data-testid={'list_completion_track'}>
      Completed: {completed[0]}/{completed[1]}
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
          <button 
            data-testid={`list_item_rm_btn_${el.id}`}
          >Remover</button>
        </div>
      ))
    }
  </>)
}