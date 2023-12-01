
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

import './App.css'


function App() {
  return (
    <BrowserRouter >
     <Header />
     <Routes>

      <Route path='/' element={<Home />}/>
     </Routes>
    </BrowserRouter>
 
  );
}

export default App;
