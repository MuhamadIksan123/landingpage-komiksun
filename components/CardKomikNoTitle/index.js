/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
import { formatDate } from '../../utils/formatDate';

export default function CardEvent({ dataKomik }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  // const handlePageClick = (data) => {
  //   setCurrentPage(data.selected);
  // };

  // const perPage = 12;
  // const offset = currentPage * perPage;
  // const pageCount = Math.ceil(dataKomik.length / perPage);
  // const currentPageData = dataKomik.slice(offset, offset + perPage);

  return (
    <section className="grow-komik">
      <div className="container">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="mt-5 row gap">
            {dataKomik.map((data, index) => (
              <div className="col-lg-3 col-md-6 col-12" key={index}>
                <div className="card-grow h-100 card">
                  <span className="badge-pricing">
                    <div>{data.price === 0 ? 'free' : `Rp. ${data.price}`}</div>
                  </span>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API}/${data.image.nama}`}
                    alt="semina"
                  />
                  <div className="card-content">
                    <div className="card-title">{data.judul}</div>
                    <div className="card-subtitle">{data.genre.nama}</div>
                    <div className="description">
                      {data.jenis}, {formatDate(data.rilis)}
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

      {/* <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div> */}
    </section>
  );
}
