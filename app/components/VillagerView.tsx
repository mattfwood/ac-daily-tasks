import React, { useState } from 'react';
import {
  Flex,
  Box,
  Icon,
  Image,
  Stack,
  Input,
  Button,
  Heading,
} from 'minerva-ui';
import Cookie from 'cookie';
import villagers from '../../formatted-villagers.json';
import createTask from 'app/tasks/mutations/createTask';
import { COOKIE_KEY } from 'app/utils/constants';
import CustomCheckbox from './CustomCheckbox';
import updateTask from 'app/tasks/mutations/updateTask';
import axios from 'axios';

// const villagers = Object.values(villagerData);

export const getToken = () => {
  const cookies = Cookie.parse(process.browser ? document.cookie : '');
  return cookies?.[COOKIE_KEY];
};

const HeaderButton = (props) => (
  <Button
    bg="transparent"
    borderBottom={0}
    variant="secondary"
    color="#FF524A"
    _hover={{ bg: 'transparent', textDecoration: 'underline' }}
    _active={{ bg: 'transparent' }}
    {...props}
  />
);

export default function VillagerView({ user, refetchUser }) {
  const [search, setSearch] = useState('');
  // const [hoverId, setHoverId] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const token = getToken();
  const activeVillagers = user.tasks
    .filter((task) => task.category === 'villager')
    .map((villagerTask) => {
      const data = villagers.find(
        (villager) => villager.name === villagerTask.name
      );
      return {
        ...data,
        ...villagerTask,
      };
    });

  async function addVillager(villager) {
    await createTask({
      data: {
        name: villager.name,
        category: 'villager',
      },
      token,
    });

    await refetchUser();
  }

  async function removeVillager(villager) {
    await axios.post('/api/tasks/delete', { id: villager.id });

    await refetchUser();
  }

  // @TODO: Fix this by refactoring the villager data
  const results = villagers.filter(
    (villager) =>
      search.length !== 0 &&
      !activeVillagers.some(
        (activeVillager) => activeVillager.name === villager.name
      ) &&
      villager.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Flex justifyContent="space-between" py={1}>
        <Heading as="h2" fontSize="2xl" fontFamily="BalooBold">
          My Villagers
        </Heading>
        {deleteMode ? (
          <HeaderButton onClick={() => setDeleteMode(false)}>Done</HeaderButton>
        ) : (
          <HeaderButton onClick={() => setDeleteMode(true)}>
            Remove Villagers
          </HeaderButton>
        )}
      </Flex>
      <Stack horizontal flexWrap="wrap" justifyContent="center">
        {activeVillagers.map((villager) => (
          <Flex
            key={villager.id}
            flexDirection="column"
            alignItems="center"
            p={2}
          >
            <Box
              borderRadius="9999px"
              width="80px"
              height="80px"
              position="relative"
            >
              <Image
                src={`/villagers/${villager.name}.png`}
                alt="villager icon"
              />
              {deleteMode ? (
                <HeaderButton
                  p={1}
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  bg="white"
                  color=""
                  borderRadius="full"
                  _hover={{ bg: 'white' }}
                  onClick={() => removeVillager(villager)}
                >
                  <Icon size="16px" name="x" color="#FF524A" />
                </HeaderButton>
              ) : (
                <CustomCheckbox
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  marginRight={0}
                  checked={!!villager.completed_at}
                  onChange={async () => {
                    await updateTask({
                      where: { id: villager.id },
                      data: {
                        completed_at: villager.completed_at
                          ? null
                          : new Date().toISOString(),
                      },
                      token,
                    });
                    await refetchUser();
                  }}
                />
              )}
            </Box>
            {villager.name}
          </Flex>
        ))}
      </Stack>
      {activeVillagers.length === 0 && (
        <Flex color="#007d75" opacity={0.6} justifyContent="center" py={6}>
          Search Below To Add Villagers
        </Flex>
      )}
      <Heading as="h2" fontSize="2xl" fontFamily="BalooBold" my={2}>
        Add Villagers
      </Heading>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Villager Name"
      />
      <Stack horizontal flexWrap="wrap" justifyContent="center">
        {results.map((villager) => (
          <Button
            key={villager.id}
            bg="transparent"
            borderBottom={0}
            flexDirection="column"
            alignItems="center"
            p={2}
            color="#374151"
            onClick={() => addVillager(villager)}
            _active={{
              bg: 'transparent',
            }}
            _hover={{
              bg: 'transparent',
            }}
          >
            <Box
              borderRadius="9999px"
              width="80px"
              height="80px"
              position="relative"
            >
              <Image
                src={`/villagers/${villager.name}.png`}
                alt="villager icon"
              />
              {/* {hoverId === villager.id && (
                <Button
                  top="0"
                  right="0"
                  position="absolute"
                  bg="rgba(0,0,0,0.3)"
                  borderBottom={0}
                  height="100%"
                  width="100%"
                  _hover={{ bg: 'rgba(0,0,0,0.4)' }}
                  _active={{ bg: 'rgba(0,0,0,0.5)' }}
                >
                  <Icon name="plus" color="#fff" />
                </Button>
              )} */}
            </Box>
            {villager.name}
          </Button>
        ))}
        {results.length === 0 && search.length > 0 && (
          <Flex color="#007d75" opacity={0.6} justifyContent="center" py={6}>
            No New Villagers Found
          </Flex>
        )}
      </Stack>
    </>
  );
}
