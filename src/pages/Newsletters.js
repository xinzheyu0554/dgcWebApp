import React from 'react'
import { Col, Row } from 'react-bootstrap'


function Newsletters() {

  const Newsletters2022 = [
    "Garden club newsletter February 2022 pub.pdf",
    "Garden club newsletter March 2022 pub.pdf",
    "Garden club newsletter april 2022 pub.pdf",
    "Garden club newsletter May 2022 pub.pdf",
    "Garden club newsletter jUNE 2022 pub.pdf",
    "Garden club newsletter July 2022 pub.pdf",
    "Garden club newsletter August 2022.pdf",
    "Garden club newsletter September  2022.pdf",
    "Garden club newsletter October 2022.pdf",
    "Garden club newsletter November 2022.pdf",
    "Garden club newsletter NewsLetter Dec 2022.pdf",
  ]

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

  return (
    <div style={{margin:"10px"}}> 
    <div style={{padding:"10px"}}>
    <h1>Newsletters</h1> 
      <Row style={{ textAlign:"center"}}>
      <Col lg={6}>
        <h2>2022</h2>
        {Newsletters2022.map((a) => {
          return (
            <>
              <a target="_blank" rel="noreferrer" href={"/documentation/newsletter/2022/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
      </Col>
      
      
      <br/>
      <Col lg={6}>
        <h2>2021</h2>
        {Newsletters2021.map((a) => {
          return (
            <>
              <a target="_blank" rel="noreferrer" href={"/documentation/newsletter/2021/" + a}>{a}</a>
              <br/>
            </>
          )
        })}
      </Col>
      </Row>
    </div>
     
    </div>
  )
}

export default Newsletters