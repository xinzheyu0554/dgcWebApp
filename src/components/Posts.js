import {
    Button,
    CircularProgress,
    Input,
    Text,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import useMutation from '../hooks/useMutation';
  import useQuery from '../hooks/useQuery';
  
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const URL = '/images';
  let images = [];
  const ErrorText = ({ children, ...props }) => (
    <Text fontSize="lg" color="red.300" {...props}>
      {children}
    </Text>
  );
  
  const Posts = () => {
    const [refetch, setRefetch] = useState(0);
    const {
      mutate: uploadImage,
      isLoading: uploading,
      error: uploadError,
    } = useMutation({ url: URL });
  
    const {
      data: imageUrls = [],
      isLoading: imagesLoading,
      error: fetchError,
    } = useQuery(URL, refetch);
  
    const [error, setError] = useState('');
  
    const handleUpload = async e => {
      const file = e.target.files[0];
  
      if (!validFileTypes.find(type => type === file.type)) {
        setError('File must be in JPG/PNG format');
        return;
      }
  
      const form = new FormData();
      form.append('image', file);
  
      await uploadImage(form);
      setTimeout(() => {
        setRefetch(s => s + 1);
      }, 1000);
    };
  
    return (
      <div style={{margin:"10px", textAlign:"center"}}>
          <Input id="imageInput" type="file" hidden onChange={handleUpload} />
          <Button
            as="label"
            htmlFor="imageInput"
            colorScheme="green"
            variant="outline"
            mb={4}
            cursor="pointer"
            isLoading={uploading}
          >
            Upload
          </Button>
          {error && <ErrorText>{error}</ErrorText>}
          {uploadError && <ErrorText>{uploadError}</ErrorText>}
          {imagesLoading && (
            <CircularProgress
              color="gray.600"
              trackColor="blue.300"
              size={7}
              thickness={10}
              isIndeterminate
            />
          )}
          {fetchError && (
            <ErrorText textAlign="left">Failed to load images</ErrorText>
          )}
          {!fetchError && imageUrls?.length === 0 && (
            <Text textAlign="left" fontSize="lg" color="gray.500">
              No images found
            </Text>
          )}
          <div className="pp-gallery">
            <div className="card-columns">     
                {imageUrls?.length > 0 && imageUrls.map((a) => {
                  // images.push(`<div className="card" ><figure className="pp-effect"><a href=${a} target="_blank" rel="noreferrer"><img className="img-fluid" src=${a} alt=${a}/></a></figure></div>`)
                    return (
                        <div className="card" key={a}>
                            <figure className="pp-effect">
                                <a href={a} target="_blank" rel="noreferrer"><img className="img-fluid" src={a} alt={a}/></a>
                            </figure>
                        </div>
                    )
                })}
            </div>
          </div>
          <p>{console.log(images)}</p>
      </div>
    );
  };
  export default Posts;