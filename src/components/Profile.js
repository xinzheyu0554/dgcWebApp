import { Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';

const Profile = () => {
  return (
    <div style={{padding:"10px"}}>
      <h1>Gallery</h1>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="green.300">
        <Text fontSize="lg">Hi, this is DGC Gallery image upload</Text>
        <Text fontSize="lg">
          Click the 'Upload button' and select the image to upload
        </Text>
      </VStack>
      <Posts />
    </div>
  );
};
export default Profile;