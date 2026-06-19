import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoogleMapSite from "../components/GoogleMapSite";

function About() {
  const supporters = [
    { name: "Aumann's", link: "https://www.aumanns.com.au/", logo: "/image/logo/aumanns.png" },
    { name: "Bunnings Doncaster", link: "https://www.bunnings.com.au/stores/vic/doncaster", logo: "/image/logo/BunningsDoncaster.png" },
    { name: "Beasleys Nursery", link: "https://www.beasleysnursery.com.au/", logo: "/image/logo/beasleys.png" },
    { name: "Bulleen Art & Garden", link: "https://baag.com.au", logo: "/image/logo/baag.png" },
    { name: "Manningham Gourmet", link: "https://www.manninghamgourmet.com.au", logo: "/image/logo/manningham-gourmet.png" },
    { name: "Ryset Australia", link: "https://ryset.com", logo: "/image/logo/ryset.png" },
    { name: "Donvale Flower Gallery", link: "https://donvaleflowergallery.com.au", logo: "/image/logo/donvale.png" },
    { name: "BottleMart Tunstall", link: "https://bottlemart.com.au", logo: "/image/logo/bottlemart.png" },
    { name: "The Greenery", link: "https://thegreenery.com.au", logo: "/image/logo/greenery.png" },
    { name: "Grill'd Tunstall Square", link: "https://grilld.com.au/restaurants/victoria/tunstall-square", logo: "/image/logo/grilld.png" },

    { name: "Captain Gummy Fish", type: "text" },   // only name

    { name: "Amcal North Balwyn", logo: "/image/logo/amcal.png", type: "image" },  // only image

    { name: "Nicole Werner", link: "https://www.nicolewerner.com.au/", logo: "/image/logo/nicole.png" }
  ];

  return (
    <div style={{ background: "#ffffff" }}>
      {/* Hero Section */}
      <div
        style={{
          padding: "60px 0 40px",
          background:
            "linear-gradient(180deg, rgba(20,83,45,0.08) 0%, rgba(255,255,255,1) 72%)",
        }}
      >
        <Container>
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "999px",
                background: "rgba(20,83,45,0.08)",
                border: "1px solid rgba(20,83,45,0.18)",
                color: "#14532d",
                fontWeight: 800,
                letterSpacing: "0.2px",
                marginBottom: "14px",
              }}
            >
              <span style={{ fontSize: "14px" }}>CELEBRATING 50 YEARS</span>
              <span style={{ opacity: 0.9, fontSize: "14px" }}>1976 — 2026</span>
            </div>

            <h1
              style={{
                fontSize: "42px",
                fontWeight: 900,
                letterSpacing: "-0.6px",
                marginBottom: "10px",
                color: "#0f172a",
              }}
            >
              About Doncaster Garden Club
            </h1>

            <p style={{ fontSize: "18px", color: "#475569", margin: 0 }}>
              A friendly gardening community since 1976
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "26px",
            }}
          >
            <img
              src="image/DGC_logo2.png"
              alt="Doncaster Garden Club logo"
              style={{
                maxWidth: "320px",
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 22px rgba(2,6,23,0.10))",
              }}
            />
          </div>

          <Row className="justify-content-center">
            <Col lg={9} style={{ fontSize: "18px", lineHeight: 1.85, color: "#334155" }}>
              <p>
                Doncaster Garden Club began in 1976 with a small group meeting in a home for an inaugural
                meeting to help would-be gardeners with knowledge for growing plants. A brief history is
                documented below.
              </p>



              <p>
                Today, almost 50 members meet monthly (except January) to hear expert speakers share
                knowledge on sustainable gardening topics including healthy soils, fertilisers and soil
                conditioners, grey water use, and growing flowers, fruit and vegetables.
              </p>

              <p style={{ marginBottom: 0 }}>
                Meetings are held on the 2nd Wednesday of each month from February to December at 7:30 pm
                at the Doncaster RSL Hall, Corner Doncaster Rd and Leeds St, Doncaster East.
              </p>
            </Col>
          </Row>

{/* History Section */}
<Row className="justify-content-center" style={{ marginTop: "40px" }}>
  <Col lg={9} style={{ fontSize: "18px", lineHeight: 1.8, color: "#334155" }}>
    
    <h2
      style={{
        fontSize: "30px",
        fontWeight: 800,
        marginBottom: "10px",
        color: "#0f172a"
      }}
    >
      A Brief History
    </h2>

    <p style={{ color: "#64748b", marginBottom: "20px" }}>
      From our earliest meetings to the official formation of the Club.
    </p>

    <p>
      “It is not generally recognised that Fred Jeffs was the initiator in the
      founding of the Doncaster Garden Club. Fred’s idea in the mid 70’s was to
      form a group called the Doncaster Horticultural Society. With this in mind
      he was able to convene a public meeting under the chairmanship of the late
      Councillor Muriel Green at the Doncaster and Templestowe Council Chambers
      in August 1976. At this first meeting Neil Williams and Cheree Blyth of
      the Waverley Garden Club spoke on the reasons for running a garden club to
      a small audience which included amongst others Maurie Kellett, Max
      McDowall (S.G.A.P.), and Fred himself.”
    </p>

    <p>
      “As a result of this initial gathering it was decided to hold regular
      monthly meetings at the Atheneum Hall which Fred advertised a number of
      times in the local papers under the heading ‘GROW WITH US’. These meetings
      were attended by some of our present members, including Maurie (who gave a
      talk on Mexico), Fred, Margaret Walton, Joe Orders, Ivy Johnston and the
      Mahlers.”
    </p>

    <p>
      “On the 27th November 1977 a meeting was held at Ivy Johnston’s, Kara
      Street, E. Doncaster, to officially form the Club. By a consensus of the
      opinions of the founding members, it was decided that a more appropriate
      name would be the Doncaster Garden Club. A committee was formed and the
      first minute’s record that Maurie Kellett was President, Ivy Johnston
      Secretary, Margaret Jones Treasurer, Margaret McCarthy Asst.
      Secy/Newsletter Editor, and some of the other elected committee members
      were Fred Jeffs and Dorothy Mahler.”
    </p>

    <p>
      “Fred Jeffs is to be commended for persevering over some years in his
      efforts to found a general gardening club in our municipality.”
      <p style={{ textAlign: "right", marginTop: "-10px" }}>
        <strong>D.J. Mahler</strong>
      </p>
    </p>

  </Col>
</Row>
        </Container>
      </div>

      {/* Map Section */}
      <div style={{ padding: "40px 0" }}>
        <Container>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 900,
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Location
          </h2>

          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(2,6,23,0.08)",
            }}
          >
            <GoogleMapSite />
          </div>
        </Container>
      </div>

      {/* Supporters Section */}
      <div style={{ padding: "50px 0", background: "#f8fafc" }}>
        <Container>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 900,
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            Supporters & Affiliations
          </h2>

          <p style={{ color: "#64748b", marginBottom: "30px" }}>
            We appreciate the support of our local partners and community organisations.
          </p>

          <Row className="g-4">
            {supporters.map((item, index) => (
  <Col
    key={index}
    xs={12}
    md={6}
    lg={4}
    className="d-flex align-items-center justify-content-center"
  >

    {/* TEXT ONLY */}
    {item.type === "text" && (
      <div
        style={{
          width: "100%",
          minHeight: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid rgba(2,6,23,0.06)",
          fontSize: "20px",
          fontWeight: 600
        }}
      >
        {item.name}
      </div>
    )}

    {/* IMAGE ONLY */}
    {item.type === "image" && (
      <div
        style={{
          width: "100%",
          minHeight: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid rgba(2,6,23,0.06)",
          padding: "20px"
        }}
      >
        <img
          src={item.logo}
          alt={item.name}
          style={{
            maxWidth: "100%",
            maxHeight: "90px",
            objectFit: "contain"
          }}
        />
      </div>
    )}

    {/* NORMAL LINK */}
    {!item.type && (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "140px",
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid rgba(2,6,23,0.06)",
          padding: "20px",
          textDecoration: "none"
        }}
      >
        <img
          src={item.logo}
          alt={item.name}
          style={{
            maxWidth: "100%",
            maxHeight: "90px",
            objectFit: "contain"
          }}
        />
      </a>
    )}

  </Col>
))}
          </Row>
        </Container>
      </div>

      {/* Rules Section */}
      <div style={{ padding: "60px 0" }}>
        <Container>
          <h2 style={{ fontSize: "30px", fontWeight: 900, marginBottom: "20px", color: "#0f172a" }}>
            Club Rules
          </h2>

          <details
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid rgba(2,6,23,0.08)",
              padding: "20px",
            }}
          >
            <summary style={{ fontWeight: 800, cursor: "pointer" }}>
              Doncaster Garden Club Inc RULES (Dec 2024)
            </summary>

            <div style={{ marginTop: "20px" }}>
              <iframe
                title="2024 Rules"
                src="/documentation/Doncaster Garden Club Inc RULES (Dec 2024).pdf"
                width="100%"
                height="800px"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </details>
        </Container>
      </div>
    </div>
  );
}

export default About;