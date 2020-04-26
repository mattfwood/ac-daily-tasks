import React, { useState } from 'react'
import { Flex, Checkbox, Stack, Button, Input } from 'minerva-ui'
import axios from 'axios'

export default function Checklist({
  initialItems = [],
}) {
  const [items, setItems] = useState(initialItems)

  function handleChange(index, changes) {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      ...changes,
      // checked: !updatedItems[index].checked,
    }
    setItems(updatedItems)
  }

  async function updateTask(task) {
    const res = await axios.post('/api/tasks/update', task);
    console.log({ res })
  }

  async function addItem() {
    const res = await axios.post('/api/tasks/new', {
      name: '',
    });
  }

  return (
    <Stack>
      {items.map((item, index) => (
        <Flex key={index}>
          <Checkbox
            fontSize="18px"
            onChange={() => handleChange(index, { checked: !item.checked })}
            checked={item.checked}
            lineHeight="1"
          />
          <Input value={item.name} onChange={e => handleChange(index, { name: e.target.value })} onBlur={() => updateTask(item)} py={1} />
        </Flex>
      ))}
      <Button onClick={addItem}>Add Task</Button>
    </Stack>
  )
}
