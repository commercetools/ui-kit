import { useState } from 'react';
import QuickFilters from '@commercetools-uikit/quick-filters';

const App = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      label: 'Accepted',
      isActive: true,
    },
    {
      id: '2',
      label: 'Rejected',
      isActive: false,
    },
  ]);

  const onItemClick = (clickedItem) => {
    const updatedItems = items.map((item) => {
      return {
        ...item,
        isActive: item.id === clickedItem.id ? !item.isActive : false,
      };
    });
    setItems(updatedItems);
  };

  return <QuickFilters items={items} onItemClick={onItemClick} />;
};

export default App;
