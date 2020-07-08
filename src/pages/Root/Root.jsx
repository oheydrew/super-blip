import React from 'react';

import { MainLayout } from 'layouts';
import { Flex } from 'rebass';

const Root = () => (
  <MainLayout>
    <Flex width={1} p="8px" justifyContent="center">
      Hello, there!
    </Flex>

    <Flex width={1} p="8px" justifyContent="center" bg={['red', 'blue', 'pink', 'purple', 'green']}>
      Let's try a thing...
    </Flex>

    <Flex></Flex>
  </MainLayout>
);

export { Root };
