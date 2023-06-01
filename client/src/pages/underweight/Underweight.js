import React, { useState } from 'react';
import Menu from './menuApi';
import "./style.css";
import Navbar from './Navbar';
import MenuCard from './MenuCard';
const uniqueList=[
    ...new Set(Menu.map((currelem)=>{
    return currelem.category;
})
),"All",
];

const Underweight = () => {
    const [menuData,setMenuData]=useState(Menu);
    const [menuList,setMenuList]=useState(uniqueList);

const filterItem=(category)=>{
    if(category==="All"){
      setMenuData(Menu);
      return;
    }
    const updatedList=Menu.filter((currelem)=>{
        return currelem.category===category;
    });
    setMenuData(updatedList);
};

    
  return (
    <>
          
      <Navbar filterItem={filterItem} menuList={menuList}/>
      <MenuCard menuData={menuData}/>

      
    </>
  )
}

export default Underweight
