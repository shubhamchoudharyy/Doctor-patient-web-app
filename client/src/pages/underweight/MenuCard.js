import React from 'react';

const MenuCard = ({ menuData }) => {
  console.log(menuData);
  return (
    <>
      <section className="main-card--container">
        {menuData.map((currelem) => {
          const { id, name, category, image, description, nutrients } = currelem;
          return (
            <div className='card-container' key={currelem.id}>
              <div className="cards">
                <div className='card-body'>
                  <span className='card-number card-circle subtle'>{id}</span>
                  <span className='card-author subtle'>{name}</span>
                  <h2 className='card-title'>{name}</h2>
                  <span className='card-description subtle'>
                    {description}
                  </span>
                  <div className='card-nutrients'>
                    <h4>Nutrients:</h4>
                    <ul>
                      <li>Calories: {nutrients.calories}</li>
                      <li>Carbohydrates: {nutrients.carbohydrates}</li>
                      <li>Protein: {nutrients.protein}</li>
                      <li>Fat: {nutrients.fat}</li>
                      <li>Fiber: {nutrients.fiber}</li>
                      <li>Calcium: {nutrients.calcium}</li>
                      <li>Iron: {nutrients.iron}</li>
                      <li>Vitamin A: {nutrients.vitaminA}</li>
                      <li>Vitamin C: {nutrients.vitaminC}</li>
                    </ul>
                  </div>
                </div>
                {/* <img src={image} alt="images" className='card-media' /> */}
                {/* <span className='card-tag subtle'>Order Now</span> */}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
