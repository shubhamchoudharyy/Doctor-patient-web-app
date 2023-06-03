import React, { useState } from "react";
import "../styles/bodyMass.css"; // Import CSS file for styling
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(0);

  const calculateBmi = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height to meters
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(bmiValue.toFixed(2)); // Round BMI value to 2 decimal places
  };

  const renderButton = () => {
    if (bmi < 18.5) {
      return (
        <Link to="/menu" className="cal-btn">
          Underweight
        </Link>
      );
    } else if (bmi >= 25 && bmi <= 29.9) {
      return (
        <Link to="/menu2" className="cal-btn">
          Overweight
        </Link>
      );
    } else if (bmi >= 30) {
      return (
        <Link to="/menu2" className="cal-btn">
          Obese
        </Link>
      );
    } else {
      return (
        <p className="bmi-message">You are fit! You can continue following your own diet.</p>
      );
    }
  };

  return (
    <Layout>
      
      <div className="text-center" style={{marginTop:'' ,color:'white',width:'170vh'}}>
        <div className="bmi-container">
        <h2 className="text-center m-10" >BMI <sapn>Calculator</sapn></h2>
        <div className="input-container">
            <div className="inputbox" style={{marginBottom:'3%'}}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span>Weight (kgs)</span>
            <i></i>
            </div>
            <div className="inputbox">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <span>Height (cms)</span>
            <i></i>
            </div>
        </div>
        <button className="cal-btn" onClick={calculateBmi}>
          Calculate BMI
        </button>
        {bmi > 0 && (
          <div className="result-container">
            <h2>BMI: {bmi}</h2>
            <div className="graph-container">
              <div
                className="graph-bar"
                style={{ width: `${(bmi / 40) * 100}%` }}
              />
            </div>
            <p className="bmi-range">
              Underweight: 18.5 | Normal: 18.5-24.9 | Overweight: 25-29.9 |
              Obese: 30+
            </p>
            {renderButton()}
          </div>
        )}
        </div>
        
      </div>
      
    </Layout>
  );
};

export default BmiCalculator;
