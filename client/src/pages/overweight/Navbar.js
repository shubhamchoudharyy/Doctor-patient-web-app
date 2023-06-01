import React from 'react'

const Navbar = ({filterItem,menuList}) => {
  return (
    <>
      <nav className="navbars">
        <div className='"btns-groups'>
            {
                menuList.map((currelem)=>{
                    return (
                        <button
                        className='btns-groups__item'
                        onClick={()=> filterItem(currelem)}>{currelem}</button>
                    );
                })
            }
        </div>
    </nav>
    </>
  );
};

export default Navbar;
