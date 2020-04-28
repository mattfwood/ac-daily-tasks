import React, { useState } from "react";
import { Flex, Stack, Button, Input, Icon, Box } from "minerva-ui";
import axios from "axios";
import updateTask from "app/tasks/mutations/updateTask";
import Cookie from "cookie";
import { COOKIE_KEY } from "app/utils/constants";
import CustomCheckbox from "./CustomCheckbox";

export default function Checklist({ initialItems = [], category }) {
  const [items, setItems] = useState(
    initialItems.filter((item) => item.category === category)
  );

  function handleChange(index, changes) {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      ...changes,
    };
    setItems(updatedItems);
  }

  async function handleUpdate(task) {
    // await axios.post("/api/tasks/update", task)
    // const res = await updateTask(, document.cookie)
    delete task.userId;
    const cookie = Cookie.parse(document.cookie);
    // const token = cookie['ac-tasks'];
    const token = cookie[COOKIE_KEY];
    await updateTask({ where: { id: task.id }, data: { ...task }, token });
  }

  async function addItem() {
    // optimistic updating
    const tempId = Date.now();
    const updatedItems = [...items, { id: tempId, name: "", category }];
    setItems(updatedItems);

    const res = await axios.post("/api/tasks/new", {
      name: "",
    });

    const itemIndex = updatedItems.findIndex((item) => item.id === tempId);
    // fix ID on response
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], id: res.data.id };
    setItems([...updatedItems]);
  }

  async function removeTask(task) {
    const updatedItems = [...items].filter((item) => item.id !== task.id);
    setItems(updatedItems);
    await axios.post("/api/tasks/delete", { id: task.id });
  }

  // console.log(items);

  // const sortedItems = items.sort((a, b) => getTime(new Date(b.created_at)) - getTime(new Date(a.created_at)))
  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <Stack>
      {sortedItems.map((item, index) => (
        <Flex key={index}>
          <CustomCheckbox
            onChange={() => {
              const changes = {
                completed_at: item.completed_at
                  ? null
                  : new Date().toISOString(),
              };
              handleChange(index, changes);
              handleUpdate({ ...item, ...changes });
            }}
            checked={!!item.completed_at}
            height="20px"
            width="20px"
            lineHeight="1"
          />
          {/* <Checkbox
            onChange={() => {
              const changes = {
                completed_at: item.completed_at ? null : new Date().toISOString(),
              }
              handleChange(index, changes)
              handleUpdate({ ...item, ...changes })
            }}
            checked={!!item.completed_at}
            height="20px"
            width="20px"
            lineHeight="1"
          /> */}
          <Input
            value={item.name}
            onChange={(e) => handleChange(index, { name: e.target.value })}
            onBlur={() => handleUpdate(item)}
            borderColor="transparent"
            py={1}
            paddingLeft={1}
            // @ts-ignore
            _focus={{
              borderColor: "inherit",
            }}
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
      {sortedItems.length === 0 && (
        <Box color="gray.400" textAlign="center" py={2}>
          No Tasks Yet
        </Box>
      )}
      <Button onClick={addItem}>Add Task</Button>
    </Stack>
  );
}
