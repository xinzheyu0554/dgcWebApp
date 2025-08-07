import React from 'react'
import { Col, Row } from 'react-bootstrap'


function Newsletters() {
  const Newsletters2021 = [
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
  ]
  
  const Newsletters2022 = [
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
  ]

  const Newsletters2023 = [
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
  ]

  const Newsletters2024 = [
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
  ]

  const Newsletters2025 = [
    "1. February 2025 Newsletter.pdf",
    "2. March 2025 Newsletter.pdf",
    "3. April 2025 Newsletter.pdf",
    "4. May 2025 Newsletter.pdf",
    "5. June 2025 Newsletter.pdf",
    "6. July 2025 Newsletter.pdf"
  ]

  return (
    <div style={{margin:"10px"}}> 
    <div style={{padding:"10px"}}>
    <h1>Newsletters</h1> 
    <h2>July 2025 Newsletter</h2>
    <iframe title="2025" src="/documentation/newsletter/2025/6. July 2025 Newsletter.pdf" width="100%" height="800px"></iframe>
      <Row style={{ textAlign:"center"}}>
      <Col lg={12} style={{ marginTop:"20px"}}>
        <details>
        <summary>2025 Newsletters</summary>
          {Newsletters2025.map((a) => {
          return (
            <>
              <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/newsletter/2025/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
        </details>
      </Col>
      <Col lg={12} style={{ marginTop:"20px"}}>
        <details>
        <summary>2024 Newsletters</summary>
          {Newsletters2024.map((a) => {
          return (
            <>
              <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/newsletter/2024/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
        </details>
      </Col>

      <Col lg={12} style={{ marginTop:"20px"}}>
        <details>
        <summary>2023 Newsletters</summary>
          {Newsletters2023.map((a) => {
          return (
            <>
              <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/newsletter/2023/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
        </details>
      </Col>

      <Col lg={12} style={{ marginTop:"20px"}}>
        <details>
        <summary>2022 Newsletters</summary>
          {Newsletters2022.map((a) => {
          return (
            <>
              <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/newsletter/2022/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
        </details>
      </Col>

      <Col lg={12} style={{ marginTop:"20px"}}>
      
        <details>
          <summary>2021 Newsletters</summary>
          {Newsletters2021.map((a) => {
            return (
              <>
                <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/newsletter/2021/" + a}>{a}</a>
                <br/>
              </>
            )
          })}
        </details>
      </Col>
      </Row>
    </div>
     
    </div>
  )
}

export default Newsletters