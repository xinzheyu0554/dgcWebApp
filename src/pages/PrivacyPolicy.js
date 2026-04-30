import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function PrivacyPolicy() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          padding: "60px 0 40px",
          background:
            "linear-gradient(180deg, rgba(20,83,45,0.06) 0%, rgba(255,255,255,1) 70%)",
        }}
      >
        <Container>
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(20,83,45,0.08)",
                color: "#14532d",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.2px",
                marginBottom: "14px",
              }}
            >
              Policy
            </div>

            <h1
              style={{
                fontSize: "42px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: "10px",
                color: "#0f172a",
              }}
            >
              Privacy Policy — Doncaster Garden Club Inc.
            </h1>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background: "rgba(2,6,23,0.04)",
                  border: "1px solid rgba(2,6,23,0.06)",
                  fontSize: "14px",
                  color: "#334155",
                  fontWeight: 600,
                }}
              >
                Effective: July 2024
              </div>

              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background: "rgba(2,6,23,0.04)",
                  border: "1px solid rgba(2,6,23,0.06)",
                  fontSize: "14px",
                  color: "#334155",
                  fontWeight: 600,
                }}
              >
                Applies to: Doncaster Garden Club Inc.
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 0 70px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid rgba(2,6,23,0.08)",
                  boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
                  padding: "28px",
                }}
              >
                {/* Intro */}
                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  <em>This Privacy Policy is solely for the purposes of Doncaster Garden Club Inc.</em>
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  As an incorporated body, Doncaster Garden Club Inc (DGC) is bound by the Australian Privacy Act 1988 and its amendments.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  DGC is committed to the right to privacy and the protection of personal information, and this policy sets out how DGC may
                  collect and use personal information.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "18px" }}>
                  Personal information in this policy means any information from which your identity is apparent or can be reasonably
                  ascertained.
                </p>

                <div
                  style={{
                    borderRadius: "14px",
                    padding: "16px",
                    background: "rgba(20,83,45,0.06)",
                    border: "1px solid rgba(20,83,45,0.14)",
                    marginBottom: "28px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "15px", color: "#14532d", lineHeight: 1.7, fontWeight: 600 }}>
                    By providing your personal information to DGC, you consent to its use, storage, and disclosure in accordance with this
                    Privacy Policy.
                  </p>
                </div>

                {/* Section 1 */}
                <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  1. What information do we collect about you?
                </h2>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  Personal information collected by DGC about a particular person will vary depending on the circumstances of collection. It
                  may include, but is not limited to, a person's contact details (name, email and/or postal address, phone number), date of
                  birth, gender, credit card details, qualifications, membership of organisations, medical needs or disabilities, dietary
                  requirements, photographic depictions, or communication history.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  DGC will assume consent to the collection of all sensitive information that is provided in accordance with this Privacy
                  Policy, unless told otherwise.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "10px" }}>
                  Information may be collected when you:
                </p>

                <ul style={{ paddingLeft: "18px", color: "#334155", lineHeight: 1.9, marginBottom: "18px" }}>
                  <li>are elected or appointed to the DGC Committee or Sub Committee of DGC</li>
                  <li>provide details to DGC in an application, survey, feedback form or incident</li>
                  <li>access the DGC website</li>
                  <li>contact DGC via email, telephone, or engage with DGC via social media</li>
                  <li>register or participate in any activity, social event</li>
                  <li>apply for a volunteer position with DGC</li>
                </ul>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "26px" }}>
                  DGC may be required by law to collect personal information for education, work health and safety laws, medical treatment,
                  or other legislation in Australia.
                </p>

                {/* Section 2 */}
                <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  2. How is this information used by DGC
                </h2>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "10px" }}>
                  DGC may disclose your personal information to a range of organisations which include, but are not limited to:
                </p>

                <ul style={{ paddingLeft: "18px", color: "#334155", lineHeight: 1.9, marginBottom: "18px" }}>
                  <li>our professional advisers, including Garden Clubs Australia</li>
                  <li>relevant organisations such as competition sponsors, function centres</li>
                  <li>in other circumstances permitted by law</li>
                </ul>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  Where personal information is disclosed outside of Australia, DGC will use its best endeavours to ensure such parties are
                  subject to a law, binding scheme or contract which effectively upholds principles for fair handling of the information that
                  are suitably like the Australian Privacy Principles.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  Every person whose data is collected by DGC has the option to refuse email, SMS or posted offers by making a request in
                  writing to DGC’s Secretary (designated Privacy Officer) via the contact details set out below or by making use of the
                  opt-out procedures included in any communications from DGC - however, information relating to the option to unsubscribe
                  from those communications may be retained.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "10px" }}>
                  DGC may also disclose personal information:
                </p>

                <ul style={{ paddingLeft: "18px", color: "#334155", lineHeight: 1.9, marginBottom: "18px" }}>
                  <li>with your express or implied consent</li>
                  <li>when required or authorised by law</li>
                  <li>to an enforcement body when reasonably necessary; or</li>
                  <li>to lessen or prevent a threat to an individual or public health or safety</li>
                </ul>

                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  How is the information we collect stored?
                </h3>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  DGC stores information in different ways, including in both paper and electronic form. Much of the information collected is
                  compiled for usage by a DGC committee member for their stated role or included on the DGC data base.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "22px" }}>
                  Security of personal information is important to DGC and steps to protect the information we hold include security measures
                  for access to our database and security measures for our website.
                </p>

                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  DGC website
                </h3>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  When users visit the DGC website, our systems may record certain information about their use of the site, including the web
                  pages visited and the time and date of their visit to analyse and improve the performance of the DGC website.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "18px" }}>
                  In addition, we may use “cookies” on the DGC website. Cookies are small text files that help a website to remember the
                  preferences of users to improve the experience of using that website. In some cases, the cookies that we use may collect
                  some personal information. DGC will treat this information in the same way as other personal information we collect. You
                  may wish to disable cookies on your internet browser to prevent this information being collected.
                </p>

                <div
                  style={{
                    borderRadius: "14px",
                    padding: "16px",
                    background: "rgba(2,6,23,0.03)",
                    border: "1px solid rgba(2,6,23,0.08)",
                    marginBottom: "28px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "15px", color: "#334155", lineHeight: 1.8 }}>
                    Websites linked to the DGC website are not subject to DGC's privacy standards, policies, or procedures.
                  </p>
                  <p style={{ margin: "10px 0 0", fontSize: "15px", color: "#334155", lineHeight: 1.8 }}>
                    DGC cannot take any responsibility for the collection, use, disclosure, or security of any personal information that you
                    provide to a third-party website.
                  </p>
                </div>

                {/* Section 3 */}
                <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  3. How can you access, update, or correct your personal information that DGC holds?
                </h2>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  Every person whose data is collected by DGC has the option to refuse email, SMS or posted mail by making a request to DGC’s
                  Secretary (designated Privacy Officer) via the contact details set out below.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  If you find that the personal information we hold about you is inaccurate, incomplete, or out of date, please contact us
                  immediately and we will arrange for it to be corrected.
                </p>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "26px" }}>
                  Individuals may also request access to their personal information by making a request via the contact details set out
                  below.
                </p>

                {/* Section 4 */}
                <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
                  4. Resolving Privacy Issues and Complaints
                </h2>

                <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.8, marginBottom: "18px" }}>
                  Any issues or complaints in relation to the collection, use, disclosure, quality, security of and access to your personal
                  information may be made to the DGC Secretary (designated Privacy Officer).
                </p>

                <div style={{ borderTop: "1px solid rgba(2,6,23,0.08)", paddingTop: "18px" }}>
                  <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>
                    <em>
                      From time to time, DGC may review and amend this Privacy Policy to consider new laws and technology, changes to our
                      operations and practices and the changing business environment.
                    </em>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default PrivacyPolicy;