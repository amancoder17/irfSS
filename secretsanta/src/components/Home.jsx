import React from "react";
import './css/home.css';
import QR from '../components/assets/QR.jpg'
import emp from '../components/assets/emp.png'
import rec from '../components/assets/record.png'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="maino">
                <div className="head">
                    <h1 className="ms-4">Secret Santa</h1>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>
                <div className="k1 w-75">

                    <div className="card">
                        <img src={QR} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Generate a QR to become a Secret Santa</p>
                            <Link to='/empqr'>
                            <a href="#" className="btn btn-primary">Generate QR</a>
                            </Link>
                            
                        </div>
                    </div>
                    <div className="card">
                        <img src={emp} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">View/Add/Delete/Update Employee List</p>
                            <Link to='/emplist'>
                            <a href="#" className="btn btn-primary">Go</a>
                            </Link>
                            
                        </div>
                    </div>
                    <div className="card">
                        <img src={rec} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Records of secret santa</p>
                            <br />
                            <Link to='/records'>
                            <a href="#" className="btn btn-primary">View</a>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Home;