import React from 'react';

const Header = () => {
  return (
    <div style={{fontWeight: 'bold', backgroundColor: '#E1E7E6', color: 'black', padding: '10px', display: 'flex', justifyContent: 'space-between' , padding:"10px 10px"}}>
      <div></div>
      <div>
        <a href="/about" style={{ color: 'black', marginRight: '20px',fontFamily: '"DotGothic16", sans-serif' }}>About us...</a>
        <a href="/signup" style={{ color: 'black', marginRight: '20px',fontFamily: '"DotGothic16", sans-serif' }}>Sign Up</a>
        <a href="/guest-login" style={{ color: 'black', marginRight: '20px',fontFamily: '"DotGothic16", sans-serif' }}>Guest Login</a>
        <a href="/login" style={{ color: 'black', fontFamily: '"DotGothic16", sans-serif',}}>Login</a>
      </div>
    </div>
  );
};

export default Header;