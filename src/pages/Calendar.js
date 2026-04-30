import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Calendar() {
  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Events</span>
            <h1>Calendar</h1>
            <p>Welcome to 2026! View our latest club events calendar.</p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <h2>2026 Calendar</h2>

                <iframe
                  title="2026 Calendar"
                  src="/documentation/Calendar of Events DGC 2026.pdf"
                  className="dgc-pdf-frame"
                />

                <div className="dgc-details-list">
                  <details>
                    <summary>2025 Calendar</summary>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="/documentation/Calendar of Events 2025 (29 May 2025).pdf"
                    >
                      Calendar of Events 2025
                    </a>
                  </details>

                  <details>
                    <summary>2024 Calendar</summary>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="/documentation/Calander of Events 2024 (updated).pdf"
                    >
                      Calendar of Events 2024
                    </a>
                  </details>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Calendar;