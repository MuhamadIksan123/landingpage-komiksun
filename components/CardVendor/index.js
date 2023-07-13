/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
// import { formatDate } from '../../utils/formatDate';

export default function CardVendor({ dataVendor, data }) {
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const perPage = 12;
  const offset = currentPage * perPage;
  const pageCount = dataVendor ? Math.ceil(dataVendor.length / perPage) : [];
  const currentPageData = dataVendor
    ? dataVendor.slice(offset, offset + perPage)
    : [];



  return (
    <section className="grow-komik">
      <div className="container">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
        <div className="mt-5 row gap">
          {dataVendor.length === 0
            ? data.map((data, index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <div className="card-grow h-100">
                    {/* <span className="badge-pricing">
                  <div>{data.price === 0 ? 'free' : `Rp. ${data.price}`}</div>
                </span> */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}/${data?.image?.nama}`}
                      alt="semina"
                    />
                    <div className="card-content">
                      <div className="card-title">{data.nama}</div>
                      <div className="card-subtitle">{data.email}</div>
                      <div className="description">
                        {data.statusUser}
                        {/* {formatDate(data.date)} */}
                      </div>
                      <Link href={`/profile/${data._id}`}>
                        <a className="stretched-link"></a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : dataVendor.map((data, index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <div className="card-grow h-100">
                    {/* <span className="badge-pricing">
                  <div>{data.price === 0 ? 'free' : `Rp. ${data.price}`}</div>
                </span> */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}/${data?.image?.nama}`}
                      alt="semina"
                    />
                    <div className="card-content">
                      <div className="card-title">{data.nama}</div>
                      <div className="card-subtitle">{data.email}</div>
                      <div className="description">
                        {data.statusUser}
                        {/* {formatDate(data.date)} */}
                      </div>
                      <Link href={`/profile/${data._id}`}>
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
