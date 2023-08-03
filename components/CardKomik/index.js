/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import CardTitle from '../CardTitle';
import Link from 'next/link';
import { formatDate } from '../../utils/formatDate';

export default function CardEvent({ dataKomik, title, subTitle }) {
  const [currentPage, setCurrentPage] = useState(0);

  const perPage = 8;
  const offset = currentPage * perPage;
  const currentPageData = dataKomik.slice(offset, offset + perPage);
  return (
    <section className="grow-today">
      <div className="container">
        <CardTitle title={title} subTitle={subTitle} />
        <div className="mt-5 row gap">
          <div className="col-12">
            <div className="card-container">
              {currentPageData.map((data, index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <div className="card-grow">
                    <span className="badge-pricing">
                      <div>
                        {data.price === 0 ? 'Gratis' : `Rp. ${data.price}`}
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
          </div>
        </div>
      </div>
    </section>
  );
}
