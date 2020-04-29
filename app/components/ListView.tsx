import React, { useState } from 'react';
import Checklist from './Checklist';
import { Heading, Flex, Box, Icon, Image } from 'minerva-ui';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';

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

const AccordionHeading = ({ children, active = false, ...props }) => (
  <Flex
    as={AccordionButton}
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

const SectionHeading = ({ children, ...props }) => (
  <Flex alignItems="center">
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
      <Image maxWidth="30px" {...props} />
    </Flex>
    {children}
  </Flex>
);

const sections = [
  {
    key: 'fossils',
    label: (
      <SectionHeading src="/museum.png" alt="animal crossing museum">
        {' '}
        Fossils
      </SectionHeading>
    ),
  },
  {
    key: 'locations',
    label: (
      <SectionHeading src="/townhall.png" alt="animal crossing townhall">
        {' '}
        Locations
      </SectionHeading>
    ),
  },
  {
    key: 'resources',
    label: (
      <SectionHeading src="/apple.png" alt="animal crossing apple icon">
        {' '}
        Resources
      </SectionHeading>
    ),
  },
  {
    key: 'other',
    label: (
      <SectionHeading src="/leaf.png" alt="animal crossing leaf icon">
        {' '}
        Other
      </SectionHeading>
    ),
  },
];

export default function ListView({ user }) {
  const [activeSections, setActiveSections] = useState([
    ...new Array(sections.length).fill(null).map((_, index) => index),
  ]);

  function toggleItem(toggledIndex) {
    if (activeSections.includes(toggledIndex)) {
      setActiveSections(
        activeSections.filter((currentIndex) => currentIndex !== toggledIndex)
      );
    } else {
      setActiveSections([...activeSections, toggledIndex].sort());
    }
  }

  return (
    <Accordion index={activeSections} onChange={toggleItem}>
      {sections.map((section, index) => (
        <AccordionItem key={section.key}>
          <AccordionHeading active={activeSections.includes(index)}>
            {section.label}
          </AccordionHeading>
          <AccordionPanel>
            <Checklist initialItems={user.tasks} category={section.key} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
