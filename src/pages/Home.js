import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


function Home() {
  return (
    
      <div style={{margin:"10px"}}>
      <div style={{padding:"10px"}}>
        <h1>Welcome to Doncaster Garden Club!</h1>
        <Row style={{height: 'auto'}}>
            <Col lg={7} style={{position: "relative",fontSize: '20px'}}>
                <p>Doncaster Garden Club began more than 46 years ago to help would-be gardeners with knowledge for growing plants. We are Affiliated with Garden Clubs of Australia.   
                </p>
                <br/>
                <p>
                Up to 50 of us meet monthly (except January) to hear a Speaker teach us re healthy soils, fertilisers and soil conditioners, grey water use as well as growing flowers, fruit and vegetables. 
                </p>
                <a href="/about" style={{float:"right"}}>MORE</a>
                <br/>
                
                <div style={{margin:"10px", textAlign: "center"}}>
                  <a href="/becomeamember"><button  class="btn btn-lg btn-primary" type="button">Join Us Now</button></a> 
                </div>
                

            </Col>
            <Col lg={5} style={{textAlign: 'center', }}>
              
                <img style={{height: '30vh', }} src="image/DGC_logo2.png" alt="#" />
              
            </Col>
            
        </Row>
      </div>
      <br/>
      <br/>
   


      
      <hr style={{ width:"100%", color:"#987cb9"}}></hr>

      <div style={{margin:"10px"}}>
        <h1>Enjoy Gardening, Enjoy live!</h1>
          <Container className="showImage">
            <Row>
              <Col lg="3" >
                <Container className='asd'>
                <a href="/image/20200915_160139.jpg">
                  <img src="/image/20200915_160139.jpg" alt="#"></img>
                </a>
                  {/* <div class="desc">Add a description of the image here</div> */}
                </Container>
                
              </Col>
              <Col lg="3">
              <Container className='asd'>
              <a href="/image/20210623_122500.jpg">
              <img src="/image/20210623_122500.jpg" alt="#"></img>
              </a>
              {/* <div class="desc">Add a description of the image here</div> */}
                </Container >
                
              </Col>
              <Col lg="3">
              <Container className='asd'>
              <a href="/image/20220304_081057.jpg">
                  <img src="/image/20220304_081057.jpg" alt="#"></img>
                  </a>
                  {/* <div class="desc">Add a description of the image here</div> */}
                </Container>
                
              </Col>
              <Col lg="3">
              <Container className='asd'>
              <a href="/image/20211211_102813.jpg" >
                  <img src="/image/20211211_102813.jpg" alt="#"></img>
                  </a>
                  {/* <div class="desc">Add a description of the image here</div> */}
                </Container>
              </Col>
            </Row>
          </Container>
          <div style={{textAlign: 'center' }}>
            <h3>You can find more in the Gallery.</h3>
            <br/>
            <a href="/gallery"><button  class="btn btn-lg btn-primary" type="button">Go to Gardening Gallery</button></a> 
          </div>
          
          <br/>
      </div>
      

    </div>
  )
}

export default Home