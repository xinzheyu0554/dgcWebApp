import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import GoogleMapSite from '../components/GoogleMapSite';

function About() {
  return (
    <Container style={{margin:"10px"}} className="justify-content-md-center">
           
    <div style={{padding:"10px"}}>
        <h1>About</h1>
        <div style={{textAlign:'center'}}>
            <img style={{height: '50vh'}} src="image/DGC_logo2.png" alt="#" />
            
        </div>
        <Row style={{height: 'auto'}}>

            <Col lg={12} style={{fontSize: '20px'}}>
                <p>Doncaster Garden Club began in 1976 with a small group meeting in a home for an inaugural meeting to help would-be gardeners with knowledge for growing plants.  Our Senior members in their 80s and 90s have a huge reservoir of knowledge to share. The Club grew from there.   
                </p>
                <p>Historically our members, almost 50 of us, meet monthly (except January) to hear an expert speaker share knowledge on sustainable gardening topics including healthy soils, fertilisers and soil conditioners, grey water use, growing flowers, fruit and vegetables. The information sharing session is followed by supper - a friendly time together.</p>

                <p>Our meeting is on the 2nd Wednesday of each month from February to December starting at 8pm. We meet at the Doncaster RSL Hall, Corner Doncaster Rd and Leeds St, Doncaster East just east of the Jackson Court Shopping Centre. There is ample parking at the rear of the Hall.</p>
                <GoogleMapSite />
            </Col>

            <Col style={{fontSize: '20px'}}>
                <br/>
                <strong><p>Affiliations:</p></strong>
                <p>Garden Clubs of Australia Inc.</p>
                <p>Ivanhoe Garden Club</p>
                <p>Preston Garden Club Inc.</p>
                <p>Kevin Heinze Grow</p>
                <p>Doncaster RSL</p>
            </Col>
        </Row>
        </div>
        <h2>Doncaster Garden Club Inc RULES</h2>
        
        <details>
        <summary>Doncaster Garden Club Inc RULES</summary>
            <iframe title="2023" src="/documentation/Doncaster Garden Club Inc RULES (Dec 2024).pdf" width="100%" height="800px"></iframe>
        </details>
        
    </Container>
  )
}

export default About