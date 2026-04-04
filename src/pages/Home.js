import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div style={{ background: "#ffffff" }}>
      <div
        style={{
          padding: "48px 0 24px",
          background:
            "linear-gradient(180deg, rgba(20,83,45,0.06) 0%, rgba(255,255,255,1) 60%)",
        }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <div style={{ maxWidth: "720px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "rgba(20,83,45,0.08)",
                    color: "#14532d",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.2px",
                    marginBottom: "14px",
                  }}
                >
                  Doncaster Garden Club • Since 1976
                </div>

                <h1
                  style={{
                    fontSize: "44px",
                    lineHeight: 1.1,
                    fontWeight: 800,
                    letterSpacing: "-0.6px",
                    marginBottom: "14px",
                    color: "#0f172a",
                  }}
                >
                  Welcome to Doncaster Garden Club
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "#334155",
                    marginBottom: "14px",
                  }}
                >
                  Doncaster Garden Club began 50 years ago to help
                  would-be gardeners with knowledge for growing plants. We are
                  affiliated with Garden Clubs of Australia.
                </p>
                
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "#334155",
                    marginBottom: "22px",
                  }}
                >
                  Up to 50 of us meet monthly (except January) to hear a speaker
                  teach us about healthy soils, fertilisers and soil
                  conditioners, grey water use, and growing flowers, fruit and
                  vegetables.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a
                    href="/becomeamember"
                    style={{ textDecoration: "none" }}
                    aria-label="Join Doncaster Garden Club"
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        boxShadow:
                          "0 10px 20px rgba(2, 6, 23, 0.12), 0 1px 0 rgba(255,255,255,0.3) inset",
                      }}
                    >
                      Join Us Now
                    </button>
                  </a>

                  <a
                    href="/about"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      background: "rgba(2, 6, 23, 0.04)",
                      color: "#0f172a",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                    aria-label="Learn more about Doncaster Garden Club"
                  >
                    Learn More
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    fontSize: "14px",
                    color: "#64748b",
                  }}
                >
                  Monthly meetings • Friendly community • Practical gardening
                  knowledge
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div
                style={{
                  borderRadius: "18px",
                  padding: "22px",
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.02) 0%, rgba(15,23,42,0.04) 100%)",
                  border: "1px solid rgba(2,6,23,0.08)",
                }}
              >
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#ffffff",
                    border: "1px solid rgba(2,6,23,0.06)",
                    padding: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "260px",
                  }}
                >
                  <img
                    src="image/DGC_logo2.png"
                    alt="Doncaster Garden Club logo"
                    style={{
                      width: "100%",
                      maxWidth: "340px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "14px",
                      background: "#ffffff",
                      border: "1px solid rgba(2,6,23,0.06)",
                      padding: "14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        fontWeight: 700,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                      }}
                    >
                      Meetings
                    </div>
                    <div style={{ fontSize: "14px", color: "#0f172a" }}>
                      2nd Wednesday
                      <br />
                      7:30 pm
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "14px",
                      background: "#ffffff",
                      border: "1px solid rgba(2,6,23,0.06)",
                      padding: "14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        fontWeight: 700,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                      }}
                    >
                      Location
                    </div>
                    <div style={{ fontSize: "14px", color: "#0f172a" }}>
                      Doncaster RSL Hall
                      <br />
                      Doncaster East
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ padding: "10px 0 56px" }}>
        <Container>
          <div style={{ marginTop: "22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "34px",
                    fontWeight: 800,
                    letterSpacing: "-0.4px",
                    marginBottom: "6px",
                    color: "#0f172a",
                  }}
                >
                  Enjoy Gardening, Enjoy Life
                </h2>
                <div style={{ color: "#64748b", fontSize: "16px" }}>
                  A glimpse of our community garden moments.
                </div>
              </div>

            </div>

            <Row className="g-3">
              {["/image/1.jpeg", "/image/2.jpeg", "/image/3.jpeg", "/image/4.jpeg"].map(
                (src, i) => (
                  <Col key={i} xs={12} sm={6} lg={3}>
                    <a
                      href="/gallery"
                      style={{ textDecoration: "none", display: "block" }}
                      aria-label="Open gallery"
                    >
                      <div
                        style={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          border: "1px solid rgba(2,6,23,0.08)",
                          background: "#ffffff",
                          boxShadow: "0 10px 24px rgba(2,6,23,0.06)",
                          transform: "translateZ(0)",
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: "4 / 3",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={src}
                            alt="Gardening gallery preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                      </div>
                    </a>
                  </Col>
                )
              )}
            </Row>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                You can find more in the Gallery.
              </h3>

              <a href="/gallery" style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    boxShadow: "0 10px 20px rgba(2, 6, 23, 0.12)",
                  }}
                >
                  Go to Gardening Gallery
                </button>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;