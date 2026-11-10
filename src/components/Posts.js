import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Button, CircularProgress, Input, SimpleGrid, Text, Image,
  AspectRatio, Link, Collapse, useToast, FormControl, FormLabel, Textarea,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalCloseButton, useDisclosure,
} from "@chakra-ui/react";
import useQuery from "../hooks/useQuery";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

const LEGACY_URL = "/images";
const MAX_BYTES = 2 * 1024 * 1024;
const normalizeUrl = (url) => typeof url === "string" ? url.trim() : "";

function PhotoCard({ url, album, photo, onError }) {
  const page = photo?.asset_id
    ? `/gallery/photo/${encodeURIComponent(photo.asset_id)}?album=${encodeURIComponent(album.key)}`
    : `/gallery/photo/view?album=${encodeURIComponent(album.key)}&url=${encodeURIComponent(url)}`;
  return <Box border="1px solid" borderColor="blackAlpha.200" borderRadius="16px" overflow="hidden"
    bg="white" boxShadow="sm" _hover={{ boxShadow:"md", transform:"translateY(-2px)" }} transition="all .2s">
    <Link as={RouterLink} to={page} display="block" _hover={{textDecoration:"none"}} aria-label={`View ${photo?.title || album.albumTitle} photo`}>
      <AspectRatio ratio={4 / 3}>
        <Image src={url} alt={photo?.title || `${album.albumTitle} photo`} loading="lazy" objectFit="cover" width="100%" height="100%" onError={()=>onError(url)}/>
      </AspectRatio>
      <Box p={3} height="112px" overflow="hidden" boxSizing="border-box">
        <Text fontWeight="semibold" fontSize="sm" lineHeight="20px" color="gray.800"
          height="40px" overflowWrap="anywhere"
          sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
          {photo?.title || "\u00a0"}
        </Text>
        <Text fontSize="xs" lineHeight="18px" color="gray.600" mt={2} height="36px"
          overflowWrap="anywhere"
          sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
          {photo?.description || "\u00a0"}
        </Text>
      </Box>
    </Link>
  </Box>;
}

function toDataUrl(file) {
  return new Promise((resolve,reject) => {
    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result));
    reader.onerror=()=>reject(new Error('Could not read image.'));
    reader.readAsDataURL(file);
  });
}

export default function Posts({ album }) {
  const { user } = useAuth();
  const toast=useToast();
  const {isOpen,onOpen,onClose}=useDisclosure();
  const [refetch,setRefetch]=useState(0);
  const [metadata,setMetadata]=useState({images:[],suppressed:[]});
  const [metadataLoaded,setMetadataLoaded]=useState(false);
  const [error,setError]=useState("");
  const [uploading,setUploading]=useState(false);
  const [file,setFile]=useState(null);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [showArchive,setShowArchive]=useState(false);
  const [failed,setFailed]=useState(()=>new Set());
  const {data:legacyUrls=[],isLoading:legacyLoading,error:legacyError}=useQuery(LEGACY_URL,{userId:album.userId,refetch});

  const refreshMetadata=useCallback(async()=>{
    const response=await fetch(`/api/gallery?album=${encodeURIComponent(album.key)}`,{credentials:'same-origin',cache:'no-store'});
    if (!response.ok) throw new Error('Gallery metadata unavailable.');
    const data=await response.json();
    setMetadata({images:data.images||[],suppressed:data.suppressed||[]});
    setMetadataLoaded(true);
  },[album.key]);
  useEffect(()=>{let active=true;setMetadataLoaded(false);
    fetch(`/api/gallery?album=${encodeURIComponent(album.key)}`,{credentials:'same-origin'})
      .then(r=>r.ok?r.json():Promise.reject(new Error('Metadata unavailable')))
      .then(data=>{if(active){setMetadata({images:data.images||[],suppressed:data.suppressed||[]});setMetadataLoaded(true);}})
      .catch(()=>{if(active)setMetadataLoaded(true);});
    return()=>{active=false;};
  },[album.key,refetch]);
  const photosByUrl=useMemo(()=>new Map(metadata.images.map(p=>[p.secure_url,p])),[metadata]);
  const hiddenUrls=useMemo(()=>new Set(metadata.suppressed),[metadata]);
  const urls=useMemo(()=>{
    const urlsFromDb=metadata.images.map(x=>x.secure_url);
    const old=(Array.isArray(legacyUrls)?legacyUrls:[]).map(normalizeUrl).filter(Boolean).reverse();
    return [...new Set([...urlsFromDb,...old])].filter(u=>!hiddenUrls.has(u)&&!failed.has(u));
  },[metadata,legacyUrls,hiddenUrls,failed]);
  const latest=urls.slice(0,16);
  const archive=urls.slice(16);
  const onImageError=(url)=>setFailed(old=>new Set([...old,url]));
  function closeForm(){if(uploading)return;onClose();setFile(null);setTitle('');setDescription('');setError('');}
  async function submit(event){
    event.preventDefault();
    if (!user) return setError('Please sign in to upload.');
    if(!file||!['image/jpeg','image/png'].includes(file.type))return setError('Select a JPG or PNG image.');
    if(file.size>MAX_BYTES)return setError('Images must be 2 MB or smaller.');
    if(!title.trim()||title.trim().length>160)return setError('Enter a title (up to 160 characters).');
    setUploading(true);setError('');
    try{
      const image=await toDataUrl(file);
      await api('/gallery/upload',{method:'POST',body:JSON.stringify({album:album.key,title:title.trim(),description:description.trim(),image})});
      await refreshMetadata();setRefetch(x=>x+1);setFile(null);setTitle('');setDescription('');onClose();
      toast({title:'Photo uploaded with details',status:'success',duration:3000,position:'top'});
    }catch(e){setError(e.message||'Upload failed.');}
    finally{setUploading(false);}
  }
  const renderGrid=(items)=><SimpleGrid columns={{base:1,sm:2,md:3}} spacing={4}>
    {items.map(url=><PhotoCard key={url} url={url} photo={photosByUrl.get(url)} album={album} onError={onImageError}/>)}
  </SimpleGrid>;

  return <Box>
    <Box display="flex" alignItems="center" gap={3} mb={4} flexWrap="wrap">
      {user ? <Button onClick={onOpen} colorScheme="green" borderRadius="12px">Upload Image</Button>
        : <Text fontSize="sm" color="gray.600"><Link as={RouterLink} to="/login" color="green.600">Sign in</Link> to upload a photo.</Text>}
      <Text fontSize="sm" color="gray.600">{album.albumTitle} · Newest first · JPG / PNG only</Text>
    </Box>
    {legacyError && !urls.length && <Text color="red.500">Unable to load photos.</Text>}
    {metadataLoaded && !legacyLoading && urls.length===0 && <Text color="gray.500">No images found</Text>}
    {!metadataLoaded || legacyLoading ? <Box display="flex" alignItems="center" gap={2} py={4}><CircularProgress isIndeterminate size="24px"/> Loading photos…</Box> : null}
    {metadataLoaded && !legacyLoading && latest.length>0 && <><Text fontSize="lg" fontWeight="800" mb={3}>Latest</Text>{renderGrid(latest)}</>}
    {metadataLoaded && !legacyLoading && archive.length>0 && <Box mt={8}>
      <Button size="sm" onClick={()=>setShowArchive(v=>!v)} variant="outline" colorScheme="green" borderRadius="12px">
        {showArchive?'Hide Archive':`View Archive (${archive.length})`}
      </Button>
      <Collapse in={showArchive} animateOpacity><Box mt={4}><Text fontSize="lg" fontWeight="800" mb={3}>Archive</Text>{renderGrid(archive)}</Box></Collapse>
    </Box>}
    <Modal isOpen={isOpen} onClose={closeForm} size="lg" isCentered>
      <ModalOverlay/><ModalContent as="form" onSubmit={submit} color="gray.800">
        <ModalHeader>Upload {album.albumTitle} photo</ModalHeader><ModalCloseButton isDisabled={uploading}/>
        <ModalBody display="grid" gap={4}>
          <FormControl isRequired><FormLabel>Image (JPG / PNG, up to 2 MB)</FormLabel>
            <Input type="file" accept="image/jpeg,image/png" p={1} onChange={e=>setFile(e.target.files?.[0]||null)}/>
          </FormControl>
          <FormControl isRequired><FormLabel>Title</FormLabel><Input maxLength={160} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter a photo title"/></FormControl>
          <FormControl><FormLabel>Description</FormLabel><Textarea rows={4} maxLength={1000} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe this photo (optional)"/></FormControl>
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
        </ModalBody>
        <ModalFooter gap={2}><Button onClick={closeForm} isDisabled={uploading} variant="ghost">Cancel</Button><Button type="submit" isLoading={uploading} colorScheme="green">Upload and save</Button></ModalFooter>
      </ModalContent>
    </Modal>
  </Box>;
}
