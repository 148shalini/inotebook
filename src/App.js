// import logo from './logo.svg';
// npm i react-router-dom concurrently ==we can run diff surver
//  cd .\backend\
// nodemon .\index.js
// npm run both front m
import './App.css';
import Home from './component.js/Home';
import Navbar from './component.js/Navbar';
import About from './component.js/About';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component.js/Alert';

function App() {
  return (
    <>
    <NoteState>
    <Router>
   < Navbar/>
   <Alert message="This is amazing react course"/>
     {/* <Home/> */}
     {/* <About/>  */}
     <div className="container">

    

     <Routes>
          <Route exact path="/home" element={<Home/> }  > </Route>
          <Route exact path="/about" element={<About/> }> </Route>
        </Routes>
        </div>
            </Router>
            </NoteState>
    </>
  );
}

export default App;
