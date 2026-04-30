import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Newsletters() {
  const newsletters = {
    2026: [
      "DGC Newsletter February 2026.pdf",
      "DGC Newsletter March 2026.pdf",
      "DGC Newsletter April 2026.pdf",
    ],
    2025: [
      "1. February 2025 Newsletter.pdf",
      "2. March 2025 Newsletter.pdf",
      "3. April 2025 Newsletter.pdf",
      "4. May 2025 Newsletter.pdf",
      "5. June 2025 Newsletter.pdf",
      "6. July 2025 Newsletter.pdf",
      "7. August 2025 Newsletter.pdf",
      "8. September 2025 Newsletter.pdf",
      "9. October 2025 Newsletter.pdf",
      "10. November 2025 Newsletter.pdf",
    ],
    2024: [
      "1. February 2024 Newsletter.pdf",
      "2. March 2024 Newsletter.pdf",
      "3. April 2024 Newsletter.pdf",
      "4. May 2024 Newsletter.pdf",
      "5. June 2024 Newsletter.pdf",
      "6. July 2024 Newsletter.pdf",
      "7. August 2024 Newsletter.pdf",
      "8. September 2024 Newsletter.pdf",
      "9. October 2024 Newsletter with Nomination Form.pdf",
      "10. November 2024 Newsletter.pdf",
    ],
    2023: [
      "DCG February 2023 Newsletter.pdf",
      "DCG March 2023 Newsletter.pdf",
      "DGC April 2023 newsletter with attachment.pdf",
      "DGC August 2023 Newsletter.pdf",
      "DGC December 2023 Newsletter.pdf",
      "DGC June 2024 Newsletter.pdf",
      "DGC July 2024 Newsletter.pdf",
      "DGC May 2023 Newsletter.pdf",
      "DGC November 2023 Newsletter.pdf",
      "DGC October 2023 Newsletter.pdf",
      "DGC September 2023 Newsletter.pdf",
    ],
    2022: [
      "Garden club newsletter February 2022 pub.pdf",
      "Garden club newsletter March 2022 pub.pdf",
      "Garden club newsletter April 2022 pub.pdf",
      "Garden club newsletter May 2022 pub.pdf",
      "Garden club newsletter June 2022 pub.pdf",
      "Garden club newsletter July 2022 pub.pdf",
      "Garden club newsletter August 2022.pdf",
      "Garden club newsletter September  2022.pdf",
      "Garden club newsletter October 2022.pdf",
      "Garden club newsletter November 2022.pdf",
      "Garden club newsletter NewsLetter Dec 2022.pdf",
    ],
    2021: [
      "Garden club newsletter February 2021 -.pdf",
      "Garden club newsletter March 2021.pdf",
      "Garden club newsletter April 2021.pdf",
      "Garden club newsletter May 2021.pdf",
      "Garden club newsletter June 2021.pdf",
      "Garden club newsletter July 2021.pdf",
      "Garden club newsletter August 2021.pdf",
      "Garden club newsletter September 2021.pdf",
      "Garden club newsletter October 2021.pdf",
      "Garden club newsletter November  2021.pdf",
      "Garden club newsletter December  2021.pdf",
    ],
  };

  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Newsletters</span>
            <h1>Newsletters</h1>
            <p>Read the latest Doncaster Garden Club newsletters and browse previous years.</p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <h2>April 2026 Newsletter</h2>

                <iframe
                  title="April 2026 Newsletter"
                  src="/documentation/newsletter/2026/DGC Newsletter April 2026.pdf"
                  className="dgc-pdf-frame"
                />

                <div className="dgc-details-list">
                  {Object.entries(newsletters).map(([year, files]) => (
                    <details key={year}>
                      <summary>{year} Newsletters</summary>

                      <div className="dgc-link-list">
                        {files.map((file) => (
                          <a
                            key={file}
                            target="_blank"
                            rel="noreferrer"
                            href={`/documentation/newsletter/${year}/${file}`}
                          >
                            {file}
                          </a>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Newsletters;