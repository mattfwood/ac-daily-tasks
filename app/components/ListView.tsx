import React, { useState } from 'react';
import Checklist from './Checklist';
import {
  Heading,
  Flex,
  Box,
  Icon,
  Image,
  Button,
  Input,
  Stack,
} from 'minerva-ui';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';
import { useQuery } from 'blitz';
import Cookie from 'cookie';
import { COOKIE_KEY } from 'app/utils/constants';
import { getToken } from './VillagerView';
import getCurrentUser from 'app/users/queries/getCurrentUser';
import resetTasks from 'app/tasks/mutations/resetTasks';
import createTask from 'app/tasks/mutations/createTask';

const DropdownArrow = ({ active }) => (
  <Box
    style={{
      transform: `rotate(${active ? -180 : 0}deg)`,
      transition: '180ms all ease',
    }}
  >
    <Icon name="chevron-down" color="#374151" size="24px" />
  </Box>
);

const DisclosureHeading = ({ children, active = false, ...props }) => (
  <Flex
    justifyContent="space-between"
    width="100%"
    fontFamily="BalooBold"
    alignItems="center"
    bg="#89C68A"
    borderRadius="lg"
    // borderBottom="2px dashed #86612D"
    p={3}
    my={2}
  >
    <Heading as="h2" fontSize="2xl" textTransform="capitalize" color="#fff">
      {children}
    </Heading>
    <DropdownArrow active={active} />
  </Flex>
);

const SectionHeading = ({ children, src, ...props }) => (
  <Flex alignItems="center">
    {!!src && (
      <Flex
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        height="40px"
        width="40px"
        bg="white"
        mr={2}
        // shadow="base"
      >
        <Image maxWidth="30px" src={src} {...props} />
      </Flex>
    )}
    {children}
  </Flex>
);

function CustomCategoryForm({ refetch }) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    const token = getToken();
    await createTask({
      data: {
        name: '',
        category: value,
      },
      token,
    });

    setIsLoading(false);
    setValue('');

    await refetch();
  }

  return (
    <>
      <Box as="hr" borderColor="#007d75" my={10} />
      <Stack as="form" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Category Name"
          disabled={isLoading}
        />
        <Button isLoading={isLoading} type="submit">
          Add Custom Category
        </Button>
      </Stack>
    </>
  );
}

const categoryIcons = {
  fossils: '/museum.png',
  locations: '/townhall.png',
  resources: '/apple.png',
  villagers: '/leaf.png',
};

export default function ListView() {
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const [user, { refetch, updatedAt }] = useQuery(getCurrentUser, token);
  const sortedTasks = user.tasks.sort((a, b) => {
    // @ts-ignore
    // return compareDesc(parseISO(b.created_at), parseISO(a.created_at));
    return a.id - b.id;
  });

  const groupedTasks = sortedTasks.reduce((result, task) => {
    // ignore villager tasks in this view
    if (task.category === 'villager') return result;

    if (result[task.category]) {
      result[task.category].push(task);
    } else {
      result[task.category] = [task];
    }

    return result;
  }, {});

  const [activeSections, setActiveSections] = useState([
    ...new Array(Object.keys(groupedTasks).length)
      .fill(null)
      .map((_, index) => index),
  ]);

  function toggleItem(toggledIndex: any) {
    if (activeSections.includes(toggledIndex)) {
      setActiveSections(
        activeSections.filter((currentIndex) => currentIndex !== toggledIndex)
      );
    } else {
      setActiveSections([...activeSections, toggledIndex].sort());
    }
  }

  return (
    <>
      <Button
        isLoading={isLoading}
        width="100%"
        my={2}
        onClick={async () => {
          const cookie = Cookie.parse(document.cookie);
          const token = cookie[COOKIE_KEY];
          setIsLoading(true);
          await resetTasks({ token });
          await refetch();
          setIsLoading(false);
        }}
      >
        Reset All Tasks
      </Button>
      {Object.entries(groupedTasks).map(([key, section], index) => (
        <Disclosure
          key={key}
          defaultOpen
          open={activeSections.includes(index)}
          onChange={() => toggleItem(index)}
        >
          <DisclosureButton style={{ width: '100%' }}>
            <DisclosureHeading active={activeSections.includes(index)}>
              <SectionHeading
                src={categoryIcons[key] ?? '/leaf.png'}
                alt="animal crossing leaf icon"
              >
                {key}
              </SectionHeading>
            </DisclosureHeading>
          </DisclosureButton>
          <DisclosurePanel>
            <Checklist
              // change key when data is refreshed to clear stale state
              key={updatedAt}
              initialItems={user.tasks}
              category={key}
              refetch={refetch}
            />
          </DisclosurePanel>
        </Disclosure>
      ))}
      <CustomCategoryForm refetch={refetch} />
    </>
  );
}
