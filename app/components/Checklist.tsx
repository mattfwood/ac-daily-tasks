import React, { useState } from 'react'
import { Flex, Checkbox, Stack } from 'minerva-ui'

export default function Checklist({ initialItems = [{ name: 'Fossil 1', checked: false }, { name: 'Fossil 2', checked: false }, { name: 'Fossil 3', checked: false }, { name: 'Fossil 4', checked: false }] }) {
  const [items, setItems] = useState(initialItems)

  function handleChange(index) {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], checked: !updatedItems[index].checked }
    setItems(updatedItems);
  }

  return (
    <Stack>
      {items.map((item, index) => (
        <Flex key={index}>
          <Checkbox fontSize="18px" onChange={() => handleChange( index)} checked={item.checked} lineHeight="1">
            {item.name}
          </Checkbox>
        </Flex>
      ))}
    </Stack>
  )
}
