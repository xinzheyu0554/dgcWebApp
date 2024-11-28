import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ProfileEvent from './ProfileEvent';
import theme from '../config/theme';
function UploadEventImage() {
  return (
    <ChakraProvider theme={theme}>
        <ProfileEvent />
    </ChakraProvider>
  )
}

export default UploadEventImage