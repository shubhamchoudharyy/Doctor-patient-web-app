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
        <Link to="/menu" className="calculate-btn">
          Underweight
        </Link>
      );
    } else if (bmi >= 25 && bmi <= 29.9) {
      return (
        <Link to="/menu2" className="calculate-btn">
          Overweight
        </Link>
      );
    } else if (bmi >= 30) {
      return (
        <Link to="/menu2" className="calculate-btn">
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
      <div className="bmi-calculator-container">
        <h1>BMI Calculator</h1>
        <div className="input-container">
          <label>
            Weight (kg):
            <input
              className="input-field"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <label>
            Height (cm):
            <input
              className="input-field"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        </div>
        <button className="calculate-btn" onClick={calculateBmi}>
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
    </Layout>
  );
};

export default BmiCalculator;
