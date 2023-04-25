import React from 'react';
import './Header.css'


const Header: React.FC<{title:string}> = ({title}) => {
    return (
        <header className='Header'>
            {title}
        </header>
    )
} 

export default Header;