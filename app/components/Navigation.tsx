import React, { useState } from "react";
import NextLink from "next/link";
import {
  Flex,
  Box,
  Image,
  Button,
  Modal,
  ModalBody,
  Icon,
  Text,
} from "minerva-ui";
import Cookies from "js-cookie";
import { useRouter } from "blitz";
import { COOKIE_KEY } from "app/utils/constants";

const NavLink = ({ children, ...props }: any) => (
  <NextLink {...props}>
    <Box as="a" color="white" cursor="pointer">
      {children}
    </Box>
  </NextLink>
);

const MenuLink = ({ children, iconName, href, ...props }: any) => (
  <Flex flexDirection="column" alignItems="center">
    <NextLink href={href}>
      <Button
        as="a"
        borderRadius="30px"
        width="80px"
        height="80px"
        borderBottom={0}
        _hover={{
          bg: props.bg,
          opacity: 0.7,
        }}
        _active={{
          bg: props.bg,
        }}
        {...props}
      >
        <Icon name={iconName} color="#4C3E35" />
      </Button>
    </NextLink>
    <Text fontFamily="BalooBold" mt={2} color="#736653">
      {children}
    </Text>
  </Flex>
);

export default function Navigation({ user }: any) {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
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
        </Flex>
        {!!user && (
          <Button
            onClick={() => setModalOpen(true)}
            bg="transparent"
            border={0}
            borderBottom={0}
            p={2}
          >
            <Icon name="menu" color="#fff" />
          </Button>
        )}
      </Flex>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        overflow="hidden"
        style={{
          backgroundColor: "transparent",
          marginTop: "10px",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          margin={3}
          bg="#F6F3E4"
          borderRadius="90px"
          height="100%"
          maxHeight="500px"
          maxWidth="315px"
          width="100%"
          py="70px"
          position="relative"
        >
          <Box
            color="#736653"
            textAlign="center"
            position="absolute"
            top="25px"
            width="100%"
            fontFamily="BalooBold"
          >
            {user && user.email}
          </Box>
          <Button
            onClick={() => setModalOpen(false)}
            bg="transparent"
            border={0}
            borderBottom={0}
            position="absolute"
            top="-15px"
            right="-15px"
            p={2}
            _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
            _active={{ bg: "rgba(0, 0, 0, 0.3)" }}
          >
            <Icon name="x" />
          </Button>
          <ModalBody>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <MenuLink href="/" iconName="check-square" bg="#8998F3">
                Tasks
              </MenuLink>
              <MenuLink href="/villagers" iconName="users" bg="#BF91F3">
                Villagers
              </MenuLink>
              <MenuLink
                href="/"
                onClick={() => {
                  Cookies.remove(COOKIE_KEY);
                  router.push("/");
                }}
                iconName="log-out"
                bg="#89C68A"
              >
                Sign Out
              </MenuLink>
            </Flex>
          </ModalBody>
        </Box>
      </Modal>
    </Box>
  );
}
