import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import GalleryAlbumCard from "../components/GalleryAlbumCard";
import { GALLERY_ALBUMS, getGalleryAlbum } from "../config/galleryAlbums";

function GalleryPage({ initialAlbumKey = "plants" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialAlbum = useMemo(
    () => getGalleryAlbum(initialAlbumKey),
    [initialAlbumKey]
  );

  const albums = useMemo(
    () => [GALLERY_ALBUMS.plants, GALLERY_ALBUMS.events],
    []
  );

  const activeIndex = useMemo(() => {
    const match = albums.findIndex((a) => a.route === location.pathname);
    if (match >= 0) return match;
    return albums.findIndex((a) => a.key === initialAlbum.key);
  }, [albums, initialAlbum.key, location.pathname]);

  const tabStyle = {
    borderRadius: "14px",
    fontWeight: 800,
    color: "gray.600",
    _selected: {
      bg: "white",
      color: "green.600",
      boxShadow: "sm",
    },
    _hover: {
      color: "green.500",
    },
  };

  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Gallery</span>
            <h1>{initialAlbum.heroTitle}</h1>
            <p>{initialAlbum.heroSubtitle}</p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={11} xl={10}>
              <Box
                border="1px solid"
                borderColor="blackAlpha.200"
                bg="white"
                borderRadius="22px"
                boxShadow="0 24px 70px rgba(15, 23, 42, 0.08)"
                overflow="hidden"
              >
                <Tabs
                  index={activeIndex}
                  onChange={(i) => navigate(albums[i].route)}
                  variant="unstyled"
                  isFitted
                >
                  <TabList bg="gray.100" p={2} gap={2}>
                    <Tab {...tabStyle}>Plants</Tab>
                    <Tab {...tabStyle}>Events</Tab>
                  </TabList>

                  <TabPanels p={{ base: 4, md: 6 }}>
                    <TabPanel p={0}>
                      <Text fontSize="sm" color="gray.500" mb={4}>
                        Album: Plants
                      </Text>
                      <GalleryAlbumCard album={GALLERY_ALBUMS.plants} />
                    </TabPanel>

                    <TabPanel p={0}>
                      <Text fontSize="sm" color="gray.500" mb={4}>
                        Album: Events
                      </Text>
                      <GalleryAlbumCard album={GALLERY_ALBUMS.events} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default GalleryPage;