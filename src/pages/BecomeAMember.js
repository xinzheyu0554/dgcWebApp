import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function BecomeAMember() {
  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Membership</span>
            <h1>How to become a member?</h1>
            <p>Please follow the instructions and finish the application form.</p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <iframe
                  title="Membership application"
                  src="/documentation/Membership application.pdf"
                  className="dgc-pdf-frame"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default BecomeAMember;