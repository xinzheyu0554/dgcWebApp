import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Profile from './Profile';
import theme from '../config/theme';

function UploadImage() {
  return (
    <ChakraProvider theme={theme}>
        <Profile />
    </ChakraProvider>
  );
}

export default UploadImage;