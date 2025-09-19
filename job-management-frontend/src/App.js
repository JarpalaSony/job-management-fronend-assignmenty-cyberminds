import Navbar from './components/Navbar';
import JobListingPage from './pages/JobListing';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from './auth/SignUp';
import React,{useState,createContext} from "react";
export const store=createContext();
function App() {
  const [token,setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <store.Provider value={[token,setToken,user,setUser]}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<JobListingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </store.Provider>
  );
}
export default App;
