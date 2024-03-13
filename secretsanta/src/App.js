import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Emplist from "./components/Emplist";
import Qrscan from "./components/Qrscan";
import UpdateEmp from "./components/UpdateEmp";
import ShowQr from "./components/ShowQr";
import Santaform from "./components/Santaform";
import Empname from "./components/Empname";
import Records from "./components/Records";
function App() {


  return (

    <Router>
      <Routes>
        

      <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>}/>  
        <Route path="/register" element={<Register/>}/>
        <Route path="/emplist" element={<Emplist/>}/>
        <Route path="/empqr" element={<Qrscan/>}/>
        <Route path="/updemp" element={<UpdateEmp/>}/>
        <Route path="/secretSanta" element={<ShowQr/>}/>
        <Route path="/santaform/:id" element={<Santaform/>}/>
        <Route path="/empname" element={<Empname/>}/>
        <Route path="/records" element={<Records/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;