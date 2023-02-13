import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{
      height: '50px',
      marginTop: '-50px'
    }}>
        <Container>
            <Row>
                <Col className="text-center py-3" style={{color: 'white'}}>&copy; Doncaster Garden Club</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer