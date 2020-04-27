import React, { useState } from "react"
import { Flex, Checkbox, Stack, Button, Input, Icon, Heading } from "minerva-ui"
import axios from "axios"

export default function Checklist({ initialItems = [], category }) {
  const [items, setItems] = useState(initialItems.filter((item) => item.category === category))

  function handleChange(index, changes) {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      ...changes,
    }
    setItems(updatedItems)
  }

  async function updateTask(task) {
    await axios.post("/api/tasks/update", task)
  }

  async function addItem() {
    // optimistic updating
    const tempId = Date.now()
    const updatedItems = [...items, { id: tempId, name: "", category }]
    setItems(updatedItems)

    const res = await axios.post("/api/tasks/new", {
      name: "",
    })

    const itemIndex = updatedItems.findIndex((item) => item.id === tempId)
    // fix ID on response
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], id: res.data.id }
    setItems([...updatedItems])
  }

  async function removeTask(task) {
    const updatedItems = [...items].filter((item) => item.id !== task.id)
    setItems(updatedItems)
    await axios.post("/api/tasks/delete", { id: task.id })
  }

  return (
    <Stack>
      <Heading as="h2" fontSize="3xl" textTransform="capitalize">
        {category}
      </Heading>
      {items.map((item, index) => (
        <Flex key={index}>
          <Checkbox
            fontSize="18px"
            onChange={() => {
              const changes = {
                completed_at: item.completed_at ? null : new Date().toISOString(),
              }
              handleChange(index, changes)
              updateTask({ ...item, ...changes })
            }}
            checked={!!item.completed_at}
            lineHeight="1"
          />
          <Input
            value={item.name}
            onChange={(e) => handleChange(index, { name: e.target.value })}
            onBlur={() => updateTask(item)}
            py={1}
          />
          <Button
            p={2}
            bg="transparent"
            borderBottom={0}
            borderRadius="full"
            ml={1}
            _hover={{ bg: "cool-gray.200" }}
            _active={{ bg: "cool-gray.300" }}
            onClick={() => removeTask(item)}
          >
            <Icon name="x" size="18px" />
          </Button>
        </Flex>
      ))}
      <Button onClick={addItem}>Add Task</Button>
    </Stack>
  )
}
