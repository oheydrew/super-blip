import React from 'react';
import { Box, Flex } from 'rebass';

const MainLayout = ({ children, sx, ...props }) => (
  <Box
    width={1}
    sx={{
      height: '100vh',
      p: '16px',
      background: 'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
      backgroundColor: '#08AEEA',
      ...sx
    }}
    {...props}
  >
    <Flex width={1} height="80%" justifyContent="center" alignItems="center">
      <Flex width={[1, 1, 7 / 8, 5 / 8]} flexDirection="column" justifyContent="center" alignItems="center">
        {children}
      </Flex>
    </Flex>
  </Box>
);

export { MainLayout };
