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
            <Container className="main-body">
              <React.Suspense>
                <Routes>
                    {router.map((e,i) => (
                      <Route path={e.path} element={<e.element/>} key={i} ></Route>
                    )
                    )}
                </Routes>
              </React.Suspense>
            </Container>
          </Container>
      </Router>
    </div>

  );
}

export default App;
