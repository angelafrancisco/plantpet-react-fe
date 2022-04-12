import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Home/Register';
import Login from './components/Home/Login';
import Footer from './components/footer';
import './styles/App.css';
import './styles/header.css';
import './styles/home.css'
import './styles/plantBody.css';
import './styles/footer.css';

function App() {
  // user backend not complete, useState will act as temporary login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;