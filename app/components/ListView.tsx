import React, { useState } from "react";
import Checklist from "./Checklist";
import { Heading, Flex, Box, Icon } from "minerva-ui";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";

const DropdownArrow = ({ active }) => (
  <Box
    style={{
      transform: `rotate(${active ? -180 : 0}deg)`,
      transition: "180ms all ease",
    }}
  >
    <Icon name="chevron-down" color="gray.400" size="24px" />
  </Box>
);

const AccordionHeading = ({ children, active = false, ...props }) => (
  <Flex
    as={AccordionButton}
    justifyContent="space-between"
    width="100%"
    alignItems="center"
    py={2}
  >
    <Heading as="h2" fontSize="2xl" textTransform="capitalize">
      {children}
    </Heading>
    <DropdownArrow active={active} />
  </Flex>
);

const SECTION_COUNT = 4;

const sections = ["fossils", "locations", "resources", "other"];

export default function ListView({ user }) {
  const [activeSections, setActiveSections] = useState([
    ...new Array(SECTION_COUNT).fill(null).map((_, index) => index),
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
        <AccordionItem key={section}>
          <AccordionHeading active={activeSections.includes(index)}>
            {section}
          </AccordionHeading>
          <AccordionPanel>
            <Checklist initialItems={user.tasks} category={section} />
          </AccordionPanel>
        </AccordionItem>
      ))}
      {/* <AccordionItem>
        <AccordionHeading active={activeSections.includes(0)}>
          Fossils
        </AccordionHeading>
        <AccordionPanel>
          <Checklist initialItems={user.tasks} category="fossils" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeading>
            Resources
        </AccordionHeading>
        <AccordionPanel>
          <Checklist initialItems={user.tasks} category="resources" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeading>
            Rocks
        </AccordionHeading>
        <AccordionPanel>
          <Checklist initialItems={user.tasks} category="rocks" />
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>
  );
}
