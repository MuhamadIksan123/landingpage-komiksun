/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CardTitle from '../CardTitle';
import Link from 'next/link';
// import { formatDate } from '../../utils/formatDate';

export default function CardEvent({ data, title, subTitle }) {
  return (
    <section className="grow-today">
      <div className="container">
        <CardTitle title={title} subTitle={subTitle} />
        <div className="mt-5 row gap">
          {data.map((data, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="card-grow h-100">
                <span className="badge-pricing">
                  <div>{data.price === 0 ? 'free' : `Rp. ${data.price}`}</div>
                  {/* {data.tickets.map((t) => (
                    <div key={t._id}>
                      {t.statusTicketCategories
                        ? t.price === 0
                          ? 'free'
                          : `$ ${t.price}`
                        : ''}
                    </div>
                  ))} */}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/${data.image.nama}`}
                  alt="semina"
                />
                <div className="card-content">
                  <div className="card-title">{data.judul}</div>
                  <div className="card-subtitle">{data.genre.nama}</div>
                  <div className="description">
                    {data.status}
                     {/* {formatDate(data.date)} */}
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
    </section>
  );
}
