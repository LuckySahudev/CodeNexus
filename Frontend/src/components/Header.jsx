import React from 'react'
import { BellRing , Moon} from 'lucide-react';
import HeaderLeft from './HeaderLeft';
import HeaderCenter from './HeaderCenter';
import HeaderRight from './HeaderRight';

const Header = (props) => {
  return (
    <header className="w-full px-5 py-3 flex items-center justify-between bg-mist-950 text-white">

      <HeaderLeft />

      { props.isHome && (< HeaderCenter {...props} />)} 
      
      <HeaderRight {...props}/>

    </header>
  )
}

export default Header
