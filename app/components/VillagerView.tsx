import React, { useState } from "react";
import {
  Flex,
  Box,
  Icon,
  Image,
  Stack,
  Input,
  Button,
  Heading,
} from "minerva-ui";
import Cookie from "cookie";
import villagerData from "../../villagers.json";
import createTask from "app/tasks/mutations/createTask";
import { COOKIE_KEY } from "app/utils/constants";
import CustomCheckbox from "./CustomCheckbox";
import updateTask from "app/tasks/mutations/updateTask";

const villagers = Object.values(villagerData);

const getToken = () => {
  const cookies = Cookie.parse(process.browser ? document.cookie : '');
  return cookies?.[COOKIE_KEY];
}

export default function VillagerView({ user, refetchUser }) {
  const [search, setSearch] = useState("");
  const [hoverId, setHoverId] = useState(null);
  const token = getToken();
  const activeVillagers = user.tasks
    .filter((task) => task.category === "villager")
    .map((villagerTask) => {
      const data = villagers.find(
        (villager) => villager.id === parseInt(villagerTask.name)
      );
      return {
        ...data,
        ...villagerTask,
        villagerName: data.name["name-en"],
      };
    });

  async function addVillager(villager) {
    await createTask({
      data: {
        name: villager.id.toString(),
        category: "villager",
      },
      token,
    });

    await refetchUser();

    // console.log({ res });
  }

  // async function removeVillager(villager) {
  //   const cookie = Cookie.parse(document.cookie);
  //   const token = cookie[COOKIE_KEY];

  //   const res = await createTask({
  //     data: {
  //       name: villager.id.toString(),
  //       category: 'villager',
  //     },
  //     token,
  //   });

  //   console.log({ res });
  // }

  const results = villagers.filter(
    (villager) =>
      search.length !== 0 &&
      !activeVillagers.some(activeVillager => activeVillager.villagerName === villager.name['name-en']) &&
      villager.name["name-en"].toLowerCase().includes(search.toLowerCase())
  );

  console.log({ villagers, activeVillagers })

  return (
    <>
      <Heading as="h2" fontSize="2xl" fontFamily="BalooBold">
        My Villagers
      </Heading>
      <Stack horizontal flexWrap="wrap" justifyContent="center">
        {activeVillagers.map((villager) => (
          <Flex
            flexDirection="column"
            alignItems="center"
            p={2}
            onMouseEnter={() => setHoverId(villager.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <Box
              borderRadius="9999px"
              width="80px"
              height="80px"
              position="relative"
            >
              <Image
                src={`/villagers/${villager.villagerName}.png`}
                alt="villager icon"
              />
              <CustomCheckbox
                position="absolute"
                top="-5px"
                right="-5px"
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
                  // console.log({ res });
                }}
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
                onClick={() => addVillager(villager)}
              >
                <Icon name="x" color="#fff" />
              </Button>
            )} */}
            </Box>
            {villager.name["name-en"]}
          </Flex>
        ))}
      </Stack>
      <Heading as="h2" fontSize="2xl" fontFamily="BalooBold">
        Add Villagers
      </Heading>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Villager Name"
      />
      <Stack>
        {results.map((villager) => (
          <Flex
            flexDirection="column"
            alignItems="center"
            p={2}
            onMouseEnter={() => setHoverId(villager.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <Box
              borderRadius="9999px"
              width="80px"
              height="80px"
              position="relative"
            >
              <Image
                src={`/villagers/${villager.name["name-en"]}.png`}
                alt="villager icon"
              />
              {hoverId === villager.id && (
                <Button
                  top="0"
                  right="0"
                  position="absolute"
                  bg="rgba(0,0,0,0.3)"
                  borderBottom={0}
                  height="100%"
                  width="100%"
                  _hover={{ bg: "rgba(0,0,0,0.4)" }}
                  _active={{ bg: "rgba(0,0,0,0.5)" }}
                  onClick={() => addVillager(villager)}
                >
                  <Icon name="plus" color="#fff" />
                </Button>
              )}
            </Box>
            {villager.name["name-en"]}
          </Flex>
        ))}
      </Stack>
    </>
  );
}
