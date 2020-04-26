import React from 'react'
import { Box, Flex } from 'minerva-ui'

export default function Page(props) {
  return (
    <Flex p={6} justifyContent="center">
      <Box  width="100%" maxWidth="400px" {...props} />
    </Flex>
  )
}
