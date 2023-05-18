import React from 'react'

const Navbar = ({filterItem,menuList}) => {
  return (
    <>
      <nav className="navbar">
        <div className='"btn-group'>
            {
                menuList.map((currelem)=>{
                    return (
                        <button
                        className='btn-group__item'
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
