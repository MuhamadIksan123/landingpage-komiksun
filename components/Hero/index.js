/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero-headline">
          Expand Your <span className="text-gradient-blue">Knowledge</span>{' '}
          <br className="d-none d-lg-block" />
          by <span className="text-gradient-pink">Reading</span> Our Popular
          Comics
        </div>
        <p className="hero-paragraph">
          Temukan komik-komik terbaik yang akan membawa{' '}
          <br className="d-none d-lg-block" />
          imajinasimu menyusuri petualangan!
        </p>
        <a href="#grow-today" className="btn-green">
          Browse Now
        </a>
      </div>

      <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
        <img src="/images/anime3.jpg" alt="semina" className="img-1" />
        <img src="/images/anime.jpg" alt="semina" className="img-2" />
        <img src="/images/anime3.jpg" alt="semina" className="img-1" />
      </div>
    </>
  );
}
