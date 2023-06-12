/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Stories() {
  return (
    <section className="stories">
      <div className="d-flex flex-row justify-content-center align-items-center container">
        <img
          src="/images/baca4.jpeg"
          alt="semina"
          className="d-none d-lg-block"
          width="515"
        />
        <div className="d-flex flex-column">
          <div>
            <div className="sub-title">
              <span className="text-gradient-pink">About</span>
            </div>
            <div className="title">
              By reading you know the world.{' '}
              <br className="d-none d-lg-block" />
              By writing you are known to the world.
            </div>
          </div>
          <p className="paragraph">
            Website ini didirikan dengan tujuan untuk mempercepat dan
            mempermudah penikmat komik dalam membaca dan publikasi komik.
            Tanpa perlu memikirkan biaya yang mahal, keterbatasan stok, waktu
            pembelian, keterbatasan ruang penyimpanan, sulitnya perawatan dan biaya
            produksi serta distribusi yang mahal.
          </p>
          <a href="#" className="btn-navy">
            Read
          </a>
        </div>
      </div>
    </section>
  );
}
