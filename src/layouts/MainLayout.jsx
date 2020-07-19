import React from 'react';
import { Box, Flex } from 'rebass';

const MainLayout = ({ header, footer, children, sx, ...props }) => (
  <Box
    width={1}
    sx={{
      height: '100%',
      ...sx,
    }}
    {...props}
  >
    <Flex width={1} height="100vh" justifyContent="space-between" alignItems="center" flexDirection="column">
      <Flex width={1} p="1em">
        {header}
      </Flex>

      <Flex p="1em" width={[1]} flexDirection="column" justifyContent="center" alignItems="center">
        {children}
      </Flex>

      <Flex width={1} p="1em">
        {footer}
      </Flex>
    </Flex>
  </Box>
);

export { MainLayout };
