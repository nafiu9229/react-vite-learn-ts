import React from 'react';

interface Props{
    cartItemCount: number
}

const NavBar = ( { cartItemCount } : Props) =>{
    return <div>Nav bar: {cartItemCount}</div>
}

export default NavBar;