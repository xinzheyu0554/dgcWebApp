import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const membershipPdf =
  "/documentation/DGC%20Membership%20Application%20Form(16%20Nov%202026).pdf";

const membershipExcel =
  "/documentation/Garden%20Club%20Membership%20Application%20(16%20Nov%202026).xlsx";

function BecomeAMember() {
  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Membership</span>
            <h1>How to become a member?</h1>
            <p>
              Please follow the instructions and finish the application form.
            </p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <h2>Membership Application Form</h2>
                <p>
                  View the latest membership application form below,
                  or download the PDF or Excel version.
                </p>

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <a
                    href={membershipPdf}
                    download
                    className="btn btn-success"
                  >
                    Download PDF
                  </a>

                  <a
                    href={membershipExcel}
                    download
                    className="btn btn-outline-success"
                  >
                    Download Excel
                  </a>
                </div>

                <iframe
                  title="DGC Membership Application Form - November 2026"
                  src={membershipPdf}
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
