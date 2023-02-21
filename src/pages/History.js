import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

function History() {
  return (
    <Container className="justify-content-md-center">
        <h1>History</h1>
        <Row style={{height: 'auto'}}>
            <Col lg={4} style={{textAlign: 'center', }}>
                <img style={{height: '30vh', }} src="image/DGC_logo.png" alt="#" />
            </Col>
            <Col lg={8} style={{fontSize: '20px'}}>
                <p>Doncaster Garden Club  started in 1976 with a small group meeting in a home for an inaugural meeting. The Club grew from there. </p>
                <p>It has a history of eleven monthly meetings  a year with a Speaker on a gardeing topic, bus trips and past prizes in bench and Garden Show Competitions.  </p>
                
            </Col>

        </Row>
    </Container>
  )
}

export default History