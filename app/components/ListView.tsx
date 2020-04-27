import React from "react"
import Checklist from "./Checklist"
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "minerva-ui"

const CustomTab = (props) => (
  <Tab
    fontWeight={800}
    fontSize="20px"
    _focus={{
      color: "primary",
      outline: 0,
      boxShadow: "0 0 0 3px rgba(118,169,250,.45)",
      borderWidth: "2px",
    }}
    _selected={{
      color: "primary",
      outline: 0,
      borderWidth: "2px",
      borderBottom: "2px solid currentColor",
    }}
    {...props}
  />
)

export default function ListView({ user }) {
  // console.log(user)
  return (
    <Tabs>
      <TabList>
        <CustomTab>Fossils</CustomTab>
        <CustomTab>Resources</CustomTab>
        <CustomTab>Rocks</CustomTab>
        <CustomTab>Other</CustomTab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Checklist initialItems={user.tasks} category="fossils" />
        </TabPanel>
        <TabPanel>
          <Checklist initialItems={user.tasks} category="resources" />
        </TabPanel>
        <TabPanel>
          <Checklist initialItems={user.tasks} category="rocks" />
        </TabPanel>
        <TabPanel>
          <Checklist initialItems={user.tasks} category="other" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
