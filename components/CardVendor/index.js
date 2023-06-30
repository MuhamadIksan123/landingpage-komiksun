/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
// import { formatDate } from '../../utils/formatDate';

export default function CardVendor({ dataVendor }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const perPage = 12;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(dataVendor.length / perPage);
  const currentPageData = dataVendor.slice(offset, offset + perPage);

  return (
    <section className="grow-komik">
      <div className="container">
        <div className="mt-5 row gap">
          {currentPageData.map((data, index) => (
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
                    {data.status}
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
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </section>
  );
}
