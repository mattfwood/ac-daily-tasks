import React, { useState } from 'react'
import { Flex, Checkbox, Stack, Button, Input } from 'minerva-ui'
import axios from 'axios'

export default function Checklist({
  initialItems = [],
}) {
  const [items, setItems] = useState(initialItems)
  console.log({ items })

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
    setItems([...items, res.data]);
  }

  return (
    <Stack>
      {items.map((item, index) => (
        <Flex key={index}>
          <Checkbox
            fontSize="18px"
            onChange={() => {
              const changes = { completed_at: item.completed_at ? null : new Date().toISOString() }
              handleChange(index, changes);
              updateTask({ ...item, ...changes });
            }}
            checked={!!item.completed_at}
            lineHeight="1"
          />
          <Input value={item.name} onChange={e => handleChange(index, { name: e.target.value })} onBlur={() => updateTask(item)} py={1} />
        </Flex>
      ))}
      <Button onClick={addItem}>Add Task</Button>
    </Stack>
  )
}
