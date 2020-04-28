import React from "react";
import { Box, Flex } from "minerva-ui";

export default function Page(props) {
  return (
    <Flex p={4} pt={2} justifyContent="center" bg="#CDDDC0" minHeight="100vh">
      <Box width="100%" maxWidth="600px" {...props} />
    </Flex>
  );
}
