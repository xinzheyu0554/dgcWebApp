import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Contacts() {
  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Contact</span>
            <h1>Contacts</h1>
            <p>Get in touch with Doncaster Garden Club.</p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <div className="dgc-contact-list">
                  <div className="dgc-contact-item">
                    <p className="dgc-contact-label">Hon. President</p>
                    <h3>Avril Clark</h3>
                    <p>Phone: 0402 478 302</p>
                  </div>

                  <div className="dgc-contact-item">
                    <p className="dgc-contact-label">Hon. Secretary</p>
                    <h3>Connie Lee &amp; Virginia Roberts</h3>
                    <p>
                      Email:{" "}
                      <a href="mailto:doncastergardenclubinc@gmail.com">
                        doncastergardenclubinc@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Contacts;