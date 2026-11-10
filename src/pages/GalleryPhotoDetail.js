import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link as RouterLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Box, Heading, Image, Text, Button, Spinner } from "@chakra-ui/react";

export default function GalleryPhotoDetail() {
  const { assetId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const album = query.get("album") === "events" ? "events" : "plants";
  const requestedUrl = query.get("url") || "";
  const backLink = album === "events" ? "/eventgallery" : "/gallery";
  const [state, setState] = useState({ loading: true, photo: null, error: "" });

  useEffect(() => {
    let active = true;
    setState({ loading: true, photo: null, error: "" });
    fetch(`/api/gallery?album=${encodeURIComponent(album)}`, { credentials: "same-origin" })
      .then((r) => { if (!r.ok) throw new Error("Photo information is unavailable."); return r.json(); })
      .then((data) => {
        if (!active) return;
        const photo = (data.images || []).find((item) =>
          (assetId !== "view" && item.asset_id === assetId) ||
          (assetId === "view" && item.secure_url === requestedUrl)
        );
        // Legacy uploads can appear in the original gallery before a metadata sync.
        // Only allow Cloudinary image URLs as a display-only fallback.
        let legacy = null;
        if (!photo && assetId === "view" && requestedUrl) {
          try {
            const url = new URL(requestedUrl);
            if (url.protocol === "https:" && url.hostname === "res.cloudinary.com" && url.pathname.includes("/image/upload/")) {
              legacy = { secure_url: requestedUrl, title: "", description: "" };
            }
          } catch { /* invalid URL */ }
        }
        setState({ loading: false, photo: photo || legacy, error: photo || legacy ? "" : "This photo is unavailable or hidden." });
      })
      .catch(() => { if (active) setState({ loading: false, photo: null, error: "Unable to load this photo." }); });
    return () => { active = false; };
  }, [album, assetId, requestedUrl]);

  const photo = state.photo;
  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Gallery</span>
            <h1>Photo details</h1>
            <p>{album === "plants" ? "Plants" : "Events"} · Doncaster Garden Club</p>
          </div>
        </Container>
      </section>
      <section className="dgc-section">
        <Container style={{ maxWidth: "980px" }}>
          <Button as={RouterLink} to={backLink} variant="outline" colorScheme="green" mb={5}>
            ← Back to {album === "plants" ? "Plants" : "Events"}
          </Button>
          {state.loading ? (
            <Box py={12} textAlign="center"><Spinner color="green.500"/><Text mt={3}>Loading photo…</Text></Box>
          ) : !photo ? (
            <Box bg="white" borderRadius="xl" borderWidth="1px" p={8}><Text color="gray.700">{state.error}</Text></Box>
          ) : (
            <Box bg="white" borderWidth="1px" borderColor="blackAlpha.200" borderRadius="20px" overflow="hidden" boxShadow="sm">
              <Box bg="gray.50" p={{ base: 3, md: 6 }} display="flex" justifyContent="center">
                <Image src={photo.secure_url} alt={photo.title || "Garden club photo"} maxH="75vh" w="auto" maxW="100%" objectFit="contain" borderRadius="lg" />
              </Box>
              {(photo.title || photo.description) && (
                <Box p={{ base: 5, md: 8 }}>
                  {photo.title && <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} overflowWrap="anywhere" color="gray.900" mb={photo.description ? 4 : 0}>{photo.title}</Heading>}
                  {photo.description && <Text color="gray.700" fontSize="md" lineHeight="tall" whiteSpace="pre-wrap" overflowWrap="anywhere">{photo.description}</Text>}
                </Box>
              )}
            </Box>
          )}
        </Container>
      </section>
    </div>
  );
}
