/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer bg-navy">
      <div className="container">
        <a>
          <h1
            style={{
              fontFamily: 'Comic Sans MS',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            KOMIKSUN
          </h1>
        </a>
        <div className="mt-3 d-flex flex-row flex-wrap footer-content align-items-baseline">
          <p className="paragraph">
            Komiksun adalah tempat di mana <br className="d-md-block d-none" />{' '}
            anda dapat mencari dan membaca komik{' '}
            <br className="d-md-block d-none" /> bahasa indonesia sesuai dengan
            minat.
          </p>
          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Fitur</div>
            <a href="#">Beranda</a>
            <a href="#">Cari</a>
            <a href="#">Penerbit</a>
            <a href="#">Kontak</a>
          </div>
          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Perusahaan</div>
            <a href="#">Lowongan</a>
            <a href="#">API</a>
            <a href="#">Pers</a>
            <a href="#">Peta Situs</a>
          </div>
          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Pelajari</div>
            <a href="#">Buku Panduan</a>
            <a href="#">Inspirasi</a>
            <a href="#">Komunitas</a>
            <a href="#">Alat</a>
          </div>
        </div>
        <div className="d-flex justify-content-center paragraph all-rights">
          Seluruh Hak Dilindungi. Muhamad Iksan 2023.
        </div>
      </div>
    </footer>
  );
}
