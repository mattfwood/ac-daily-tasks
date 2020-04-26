import React from 'react'
import NextLink from 'next/link'
import { Flex, Box, Stack } from 'minerva-ui'

const NavLink = ({ children, ...props }: any) => (
  <NextLink {...props}>
    <Box as="a" color="white">
      {children}
    </Box>
  </NextLink>
)

export default function Navigation({ user }: any) {
  return (
    <Flex
      bg="primary"
      color="#fff"
      p={3}
      alignItems="center"
      justifyContent="space-between"
      as="header"
    >
      <Flex>
        <NavLink href="/">
          <Box
            fontWeight="bold"
            color="#fff"
            m={0}
            fontSize="xl"
            mr={3}
            minWidth="initial"
            flex="0 0 auto"
          >
            AC Daily Tasks
          </Box>
        </NavLink>
        <Flex
          flexGrow={1}
          flex={1}
          width="auto"
          alignItems="stretch"
          minWidth="initial"
          overflowX="auto"
        >
          <Stack horizontal>
            {/* <NavLink href="#">Collections</NavLink> */}
            {/* <NavLink href="/villagers">Villagers</NavLink> */}
          </Stack>
        </Flex>
      </Flex>
      <Flex color="white">{user?.email}</Flex>
    </Flex>
  )
}
