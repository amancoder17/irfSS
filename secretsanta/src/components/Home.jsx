import React from "react";
import './css/home.css';
import QR from '../components/assets/QR.jpg'
import emp from '../components/assets/emp.png'
import rec from '../components/assets/record.png'
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <div className="badi">
        <Navbar/>
        
            <div className="maino">
            
                <div className="k1 w-75">

                    <div className="card">
                        <img src={QR} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Generate a QR to become a Secret Santa</p>
                            <Link to='/empqr'>
                            <a href="#" className="btn  ">Generate QR</a>
                            </Link>
                            
                        </div>
                    </div>
                    <div className="card">
                        <img src={emp} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text d-flex">View/ Add/ Delete/ Update Employee List</p>
                            <Link to='/emplist'>
                            <a href="#" className="btn  ">Go</a>
                            </Link>
                            
                        </div>
                    </div>
                    <div className="card">
                        <img src={rec} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Records of secret santa</p>
                            <br />
                            <Link to='/records'>
                            <a href="#" className="btn ">View</a>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>

            </div>
    )
}
export default Home;