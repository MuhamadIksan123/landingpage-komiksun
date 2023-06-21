import React from 'react';
import Hero from '../Hero';
import Navbar from '../Navbar';

export default function Header({dataUser}) {
  return (
    <header className="header bg-navy">
      <Navbar dataUser={dataUser} />
      <Hero />
    </header>
  );
}
