import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Newsletters() {
  const [records, setRecords] = useState(null);
  useEffect(() => {
    let active = true;
    fetch("/api/newsletters")
      .then(response => {
        if (!response.ok) throw new Error("Newsletter service unavailable");
        return response.json();
      })
      .then(data => { if (active) setRecords(data.newsletters || []); })
      .catch(() => { /* Legacy PDFs remain visible if the API is unavailable. */ });
    return () => { active = false; };
  }, []);
  const newsletters = {
    2026: [
      "DGC Newsletter November 2026.pdf",
      "DGC Newsletter October 2026.pdf",
      "DGC Newsletter September 2026.pdf",
      "DGC Newsletter August 2026.pdf",
      "DGC July 2026 newsletter.pdf",
      "DGC Newsletter June 2026.pdf",
      "DGC Newsletter May 2026.pdf",
      "DGC Newsletter April 2026.pdf",
      "DGC Newsletter March 2026.pdf",
      "DGC Newsletter February 2026.pdf"      
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

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const fallback = Object.entries(newsletters).flatMap(([year, files]) => files.map((filename, index) => {
    const name = filename.toLowerCase();
    const monthIndex = monthNames.findIndex(month => new RegExp(`\\b${month.toLowerCase()}\\b`, "i").test(name));
    const abbreviation = monthIndex < 0 ? monthNames.findIndex(month => name.includes(month.slice(0, 3).toLowerCase())) : monthIndex;
    return { id: `${year}-${index}`, year: Number(year), month: abbreviation + 1,
      title: filename.replace(/\.pdf$/i, ""), url: `/documentation/newsletter/${year}/${filename}` };
  }));
  const sorted = [...(records === null ? fallback : records)]
    .sort((a, b) => b.year - a.year || b.month - a.month || String(a.title).localeCompare(String(b.title)));
  const latest = sorted[0];
  const previewTitle = latest ? latest.title : "No newsletters available";
  const previewUrl = latest?.url;
  const grouped = sorted.reduce((byYear, item) => {
    (byYear[item.year] ||= []).push(item);
    return byYear;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero">
        <Container>
          <div className="dgc-simple-hero__inner">
            <span className="dgc-badge">Newsletters</span>
            <h1>Newsletters</h1>
            <p>
              Read the latest Doncaster Garden Club newsletters and browse previous years.
            </p>
          </div>
        </Container>
      </section>

      <section className="dgc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className="dgc-document-card">
                <h2>{previewTitle}</h2>

                {previewUrl && <iframe
                  title={previewTitle}
                  src={previewUrl}
                  className="dgc-pdf-frame"
                />}

                <div className="dgc-details-list">
                  {years.map(year => (
                    <details key={year} open={year === years[0]}>
                      <summary>{year} Newsletters</summary>

                      <div className="dgc-link-list">
                        {grouped[year].map(file => (
                          <a key={file.id} target="_blank" rel="noreferrer" href={file.url}>
                            {file.title}
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
