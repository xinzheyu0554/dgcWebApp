// src/components/Posts.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  SimpleGrid,
  Text,
  Image,
  AspectRatio,
  Link,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import useMutation from "../hooks/useMutation";
import useQuery from "../hooks/useQuery";

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const URL = "/images";

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="sm" color="red.400" {...props}>
    {children}
  </Text>
);

const normalizeUrl = (u) => (typeof u === "string" ? u.trim() : "");

const Posts = ({ album }) => {
  const [refetch, setRefetch] = useState(0);
  const [error, setError] = useState("");
  const [showArchive, setShowArchive] = useState(false);
  const [hidden, setHidden] = useState(() => new Set());
  const toast = useToast();

  const inputId = `${album.key}ImageInput`;

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL, userId: album.userId });

  const {
    data: imageUrlsRaw = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, { userId: album.userId, refetch });

  const imageUrls = useMemo(() => {
    const arr = Array.isArray(imageUrlsRaw) ? imageUrlsRaw : [];
    return arr
      .map(normalizeUrl)
      .filter((u) => !!u)
      .reverse(); // newest first
  }, [imageUrlsRaw]);

  const visibleUrls = useMemo(() => {
    if (!imageUrls.length) return [];
    if (!hidden.size) return imageUrls;
    return imageUrls.filter((u) => !hidden.has(u));
  }, [imageUrls, hidden]);

  const latest = useMemo(() => visibleUrls.slice(0, 16), [visibleUrls]);
  const archive = useMemo(() => visibleUrls.slice(16), [visibleUrls]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validFileTypes.includes(file.type)) {
      setError("File must be in JPG/PNG format");
      return;
    }

    setError("");

    const form = new FormData();
    form.append("image", file);

    const ok = await uploadImage(form);

    if (ok) {
      toast({
        title: "Successfully added image",
        status: "success",
        duration: 2000,
        position: "top",
      });

      setTimeout(() => setRefetch((s) => s + 1), 700);
    }
  };

  const hideUrl = (url) => {
    setHidden((prev) => {
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={3} mb={4} flexWrap="wrap">
        <Input id={inputId} type="file" hidden onChange={handleUpload} />
        <Button
          as="label"
          htmlFor={inputId}
          colorScheme="green"
          variant="solid"
          cursor="pointer"
          isLoading={uploading}
          borderRadius="12px"
        >
          Upload Image
        </Button>

        <Text fontSize="sm" color="gray.600">
          {album.albumTitle} • Newest first • JPG / PNG only
        </Text>
      </Box>

      {error && <ErrorText mb={3}>{error}</ErrorText>}
      {uploadError && <ErrorText mb={3}>{String(uploadError)}</ErrorText>}

      {imagesLoading && (
        <Box display="flex" alignItems="center" gap={3} py={4}>
          <CircularProgress isIndeterminate />
          <Text color="gray.600">Loading images…</Text>
        </Box>
      )}

      {fetchError && <ErrorText>Failed to load images</ErrorText>}

      {!fetchError && !imagesLoading && visibleUrls.length === 0 && (
        <Text fontSize="sm" color="gray.500">
          No images found
        </Text>
      )}

      {latest.length > 0 && (
        <>
          <Text fontSize="lg" fontWeight="800" mb={3}>
            Latest
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {latest.map((url) => (
              <Box
                key={url}
                border="1px solid"
                borderColor="blackAlpha.200"
                borderRadius="16px"
                overflow="hidden"
                bg="white"
                boxShadow="sm"
                transition="transform 0.2s ease, box-shadow 0.2s ease"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              >
                <AspectRatio ratio={4 / 3}>
                  <Link href={url} isExternal>
                    <Image
                      src={url}
                      alt={`${album.albumTitle} image`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      onError={() => hideUrl(url)}
                    />
                  </Link>
                </AspectRatio>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}

      {archive.length > 0 && (
        <Box mt={8}>
          <Button
            size="sm"
            onClick={() => setShowArchive((v) => !v)}
            variant="outline"
            colorScheme="green"
            borderRadius="12px"
          >
            {showArchive ? "Hide Archive" : `View Archive (${archive.length})`}
          </Button>

          <Collapse in={showArchive} animateOpacity>
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="800" mb={3}>
                Archive
              </Text>

              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {archive.map((url) => (
                  <Box
                    key={url}
                    border="1px solid"
                    borderColor="blackAlpha.200"
                    borderRadius="16px"
                    overflow="hidden"
                    bg="white"
                    boxShadow="sm"
                    transition="transform 0.2s ease, box-shadow 0.2s ease"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                  >
                    <AspectRatio ratio={4 / 3}>
                      <Link href={url} isExternal>
                        <Image
                          src={url}
                          alt={`${album.albumTitle} archive image`}
                          objectFit="cover"
                          width="100%"
                          height="100%"
                          onError={() => hideUrl(url)}
                        />
                      </Link>
                    </AspectRatio>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default Posts;