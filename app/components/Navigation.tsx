import React from "react";
import NextLink from "next/link";
import { Flex, Box, Image } from "minerva-ui";

const NavLink = ({ children, ...props }: any) => (
  <NextLink {...props}>
    <Box as="a" color="white" cursor="pointer">
      {children}
    </Box>
  </NextLink>
);

export default function Navigation({ user }: any) {
  return (
    <Box>
      <Flex
        bg="primary"
        color="#fff"
        p={3}
        alignItems="center"
        justifyContent="space-between"
        as="header"
      >
        <Flex alignItems="center">
          <NavLink href="/">
            <Flex
              // fontWeight="bold"
              fontFamily="BalooBold"
              color="#fff"
              m={0}
              fontSize="xl"
              mr={3}
              minWidth="initial"
              alignItems="center"
              flex="0 0 auto"
            >
              <Image
                src="/chair.png"
                alt="froggy chores logo"
                maxWidth="40px"
              />
              Froggy Chores
            </Flex>
          </NavLink>

          {/* <Flex
          flexGrow={1}
          flex={1}
          width="auto"
          alignItems="stretch"
          minWidth="initial"
          overflowX="auto"
        >
          <Stack horizontal>
            <NavLink href="#">Collections</NavLink>
            <NavLink href="/villagers">Villagers</NavLink>
          </Stack>
        </Flex> */}
          <NavLink href="/villagers">Villagers</NavLink>
        </Flex>
        <Flex color="white">{user ? "Sign Out" : ""}</Flex>
      </Flex>
      <Flex justifyContent="flex-end" bg="#CDDDC0" p={2}>
        {user && user.email}
      </Flex>
    </Box>
  );
}
