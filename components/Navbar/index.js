/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLink from '../NavLink';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { getData } from '../../utils/fetchData';

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [foto, setFoto] = useState('');
  const [idUser, setIdUser] = useState('');


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return setToken(Cookies.get('token'));
  });

  useEffect(() => {
    return setUser(Cookies.get('namaUser'));
  });

  useEffect(() => {
    return setFoto(Cookies.get('fotoUser'));
  });

  useEffect(() => {
    return setIdUser(Cookies.get('idUser'));
  });

  const handleLogout = () => {
    console.log('click');
    Cookies.remove('token');
    Cookies.remove('namaUser');
    Cookies.remove('fotoUser');
    Cookies.remove('idUser');
    router.push('/');
  };

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href={'/'}>
          <a className="navbar-brand">
            <img src="/images/logo.svg" alt="semina" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className={`navbar-nav ${
              router.pathname !== '/signin' ? 'mx-auto' : 'ms-auto'
            } my-3 my-lg-0`}
          >
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/browse'}>Browse</NavLink>
            <NavLink href={'/vendor'}>Vendor</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>
          </div>

          {router.pathname !== '/signin' && (
            <>
              {token ? (
                <div className="navbar-nav ms-auto">
                  <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3">
                    <span className="text-light d-none d-lg-block">{user}</span>

                    <a
                      className="nav-link dropdown-toggle mx-0 d-none d-lg-block"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API}/${foto}`}
                        alt="semina"
                        width="60"
                        className="img-profile"
                      />
                    </a>

                    <a
                      className="d-block d-lg-none dropdown-toggle text-light text-decoration-none"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API}/${foto}`}
                        alt="semina"
                        width="60"
                        className="img-profile"
                      />
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link href={'/order'}>
                          <a className="dropdown-item">Order</a>
                        </Link>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <a className="dropdown-item">Sign Out</a>
                      </li>
                    </ul>

                    <div className="collapse" id="collapseExample">
                      <ul className="list-group">
                        <li>
                          <a className="list-group-item" href="#">
                            Order
                          </a>
                        </li>
                        <li onClick={() => handleLogout()}>
                          <a className="list-group-item">Sign Out</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-grid">
                  <Link href={'/signin'}>
                    <a className="btn-navy">Sign In</a>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export async function getServerSideProps(context) {
  const req = await getData('api/v1/vendor');
  const res = req.data;

  return {
    props: { data: res },
  };
}
