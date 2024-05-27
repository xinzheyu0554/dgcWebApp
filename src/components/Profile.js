import { Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';

const Profile = () => {
  return (
    <div style={{padding:"10px"}}>
      <h1>Gallery</h1>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="green.500">
        <Text>Hi, this is DGC Gallery image upload</Text>
        <Text fontSize="lg" color="yellow.200">
          Click the 'Upload button' and select the image to upload
        </Text>
      </VStack>
      <Posts />
    </div>
  );
};
export default Profile;