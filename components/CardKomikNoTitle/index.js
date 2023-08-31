/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
import { formatDate } from '../../utils/formatDate';

export default function CardKomikNoTitle({ dataKomik, allDataKomik }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // New state to track initial data load

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // When dataKomik changes, it means the initial data has been loaded
    // So, set isInitialLoad to false
    if (dataKomik.length > 0) {
      setIsInitialLoad(false);
    }
  }, [dataKomik]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const perPage = 12;
  const offset = currentPage * perPage;
  const data = isInitialLoad ? allDataKomik : dataKomik;
  const pageCount = data ? Math.ceil(data.length / perPage) : [];
  const currentPageData = data ? data.slice(offset, offset + perPage) : [];

  return (
    <section className="grow-komik">
      <div className="container">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '200px' }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-5 row gap">
            {currentPageData.map((data, index) => (
              <div className="col-lg-3 col-md-6 col-12" key={index}>
                <div className="card-grow h-100 card">
                  <span className="badge-pricing">
                    <div>
                      ⭐️
                      {data.averageRating === '0.0'
                        ? '-'
                        : `${data.averageRating}`}
                    </div>
                  </span>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API}/${data.image.nama}`}
                    alt="semina"
                  />
                  <div className="card-content">
                    <div className="card-title">{data.judul}</div>
                    <div className="card-subtitle">{data.genre.nama}</div>
                    <div className="description">
                      {data.price === 0 ? 'Gratis' : `Rp. ${data.price}`}
                      {/* {data.jenis}, {formatDate(data.rilis)} */}
                    </div>
                    <Link href={`/detail/${data._id}`}>
                      <a className="stretched-link"></a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </section>
  );
}
