import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Container } from "@material-ui/core";
import Home from './components/Home/Home';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/details/:id' element={<Details/>}/>
            
          </Routes>
        </Container>
      </div>

      

  
    </BrowserRouter>
  );
}

export default App;
