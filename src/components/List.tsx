interface ListItem {
  id: string,
  content: string,
  date: Date | string,
  checked: boolean
}

export interface ListProps {
  items: ListItem[]
}

export function List({
  items
}: ListProps) {
  return (<>
    {
      items.map(el => (
        <div key={el.id}>
          <div data-testid={`list_item_${el.id}`}>
            <input 
              type="checkbox" 
              value={el.id} 
              name={el.id}
              defaultChecked={el.checked}
            />
            <label htmlFor={el.id}>{el.content}</label>
          </div>
          <button>Remover</button>
        </div>
      ))
    }
  </>)
}