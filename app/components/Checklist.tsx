import React, { useState, useRef } from 'react';
import { Flex, Stack, Button, Input, Icon, Box } from 'minerva-ui';
import axios from 'axios';
import updateTask from 'app/tasks/mutations/updateTask';
import createTask from 'app/tasks/mutations/createTask';
import Cookie from 'cookie';
import { COOKIE_KEY } from 'app/utils/constants';
import CustomCheckbox from './CustomCheckbox';
import { getToken } from './VillagerView';

export interface ChecklistProps {
  category: string;
  initialItems: any;
  refetch: () => void;
}

export default function Checklist({
  initialItems = [],
  category,
  refetch,
}: ChecklistProps) {
  const [items, setItems] = useState(
    initialItems.filter((item) => item.category === category)
  );

  const lastItemRef = useRef();

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
    // @TODO: This causes issues like losing input focus, look into this later
    // refetch();
  }

  async function addItem() {
    // optimistic updating
    const tempId = Date.now();
    const updatedItems = [...items, { id: tempId, name: '', category }];
    setItems(updatedItems);

    const token = getToken();
    const task = await createTask({
      data: {
        name: '',
        category: category,
      },
      token,
    });

    const itemIndex = updatedItems.findIndex((item) => item.id === tempId);
    // fix ID on response
    updatedItems[itemIndex] = { ...task };
    setItems([...updatedItems]);

    // focus newly added item
    if (!!lastItemRef && !!lastItemRef.current) {
      setTimeout(() => {
        // @ts-ignore
        lastItemRef.current.focus();
      }, 1);
    }
  }

  async function removeTask(task) {
    const updatedItems = [...items].filter((item) => item.id !== task.id);
    setItems(updatedItems);
    await axios.post('/api/tasks/delete', { id: task.id });
  }

  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <Stack mb={4}>
      {sortedItems.map((item, index) => (
        <Flex key={index} py={1}>
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
            lineHeight="1"
          />
          <Input
            value={item.name}
            onChange={(e) => handleChange(index, { name: e.target.value })}
            onBlur={() => handleUpdate(item)}
            borderColor="transparent"
            py={1}
            mx={1}
            fontSize="16px"
            paddingLeft={1}
            backgroundColor="transparent"
            ref={index === sortedItems.length - 1 ? lastItemRef : null}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            // @ts-ignore
            _focus={{
              backgroundColor: 'white',
              borderColor: 'inherit',
            }}
          />
          <Button
            p={2}
            bg="transparent"
            borderBottom={0}
            borderRadius="full"
            ml={1}
            _hover={{ bg: '#89C68A' }}
            _active={{ bg: '#89C68A' }}
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
