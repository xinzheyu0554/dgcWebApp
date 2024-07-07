import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from './components/NavBar';
import { router } from './router/index';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div>

      <Router>
          <Container style={{marginTop: '5vh'}} >
            <NavBar />
            <div className="main-body">
            <div className="mask">
              <img src="/image/Screenshot 2023-02-24 at 13.43.37.png" alt="#" style={{width: "100%",}}></img>
            </div>
              <React.Suspense>
                
                <Routes>
                    {router.map((e,i) => (
                      <Route path={e.path} element={<e.element/>} key={i} ></Route>
                    )
                    )}
                </Routes>
              </React.Suspense>
              <div className="mask1">
              <img src="/image/Screenshot 2023-02-24 at 13.43.37.png" alt="#" style={{width: "100%",}}></img>
            </div>
            </div>
          </Container>
      </Router>
      <section id="social-media">
        <div className="box">
            <a href="/"><i className="fa-brands fa-facebook"></i></a>
            <a href="/"><i className="fa-brands fa-twitter-square"></i></a>
            <a href="/"><i className="fa-brands fa-instagram-square"></i></a>
        </div>
      </section>
      <Footer/>
    </div>

  );
}

export default App;
