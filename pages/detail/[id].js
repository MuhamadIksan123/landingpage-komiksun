/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Button from '../../components/Button';
import CardEvent from '../../components/CardKomik';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Statistics from '../../components/Statistics';
import Stories from '../../components/Stories';
import { useRouter } from 'next/router';
import { getData } from '../../utils/fetchData';
import moment from 'moment';
import { formatDate } from '../../utils/formatDate';
import Cookies from 'js-cookie';

export default function DetailPage({ detailPageKomik, detailPageChapter, id }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData('api/v1/komik');

        setData(res.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  detailPageChapter.map((data) => {
    if (id === data.komik._id) {
      console.log('true');
    }
  });

  const router = useRouter();

  const handleSubmit = (komikId, vendor) => {
    const token = Cookies.get('token');
    if (!token) {
      return router.push('/signin');
    } else {
      router.push(`/checkout/${id}?komikId=${komikId}&vendor=${vendor}`);
    }
  };

  return (
    <>
      <Head>
        <title>Semina || Detail Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-navy">
        <Navbar />
      </section>

      <div className="preview-image bg-navy text-center">
        <img
          src={`${process.env.NEXT_PUBLIC_API}/${detailPageKomik?.image?.nama}`}
          className="img-content"
          alt="semina"
        />
      </div>
      <div className="details-content container">
        <div className="d-flex flex-wrap justify-content-lg-center gap">
          <div className="d-flex flex-column description">
            <div className="headline">{detailPageKomik.judul}</div>
            <br />
            <div className="event-details">
              <h6>Genre</h6>
              <p className="details-paragraph">{detailPageKomik.genre.nama}</p>
              <h6>Rilis</h6>
              <p className="details-paragraph">{detailPageKomik.genre.nama}</p>
              <h6>Sinopsis</h6>
              <p className="details-paragraph">{detailPageKomik.sinopsis}</p>
            </div>
          </div>

          <div className="d-flex flex-column card-event">
            <h6>Your Speaker</h6>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src={`${process.env.NEXT_PUBLIC_API}/${detailPageKomik?.vendor?.image?.nama}`}
                alt="semina"
                width="60"
              />
              <div>
                <div className="speaker-name">
                  {detailPageKomik?.vendor?.nama}
                </div>
                <span className="occupation">
                  {detailPageKomik?.vendor?.role}
                </span>
              </div>
            </div>
            <hr />

            <h6>Get Komik</h6>
            <div>
              <>
                <div className="price my-3">
                  {detailPageKomik.price === 0
                    ? 'free'
                    : `$${detailPageKomik.price}`}
                  <span>/person</span>
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-marker.svg" alt="semina" />{' '}
                  {detailPageKomik.vendor.role}
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-time.svg" alt="semina" />{' '}
                  {detailPageKomik.vendor.email}
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-calendar.svg" alt="semina" />{' '}
                  {detailPageKomik.vendor.nomor}
                </div>

                {detailPageKomik.stock !== 0 && (
                  <Button
                    variant={'btn-green'}
                    action={() =>
                      handleSubmit(
                        detailPageKomik._id,
                        detailPageKomik.vendor._id
                      )
                    }
                  >
                    Order Now
                  </Button>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-5">
        <div className="container">
          <div className=" row gap-y">
            {detailPageChapter.map((data, index) => {
              if (id === data.komik._id) {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-12 d-grid my-2"
                    key={index}
                  >
                    <Button variant="btn-green" action={() => handleSubmit()}>
                      {data.judul}
                    </Button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const reqKomik = await getData(`api/v1/komik/${context.params.id}`);
  const resKomik = reqKomik.data;

  const reqChapter = await getData(`api/v1/chapter`);
  const resChapter = reqChapter.data;

  return {
    props: {
      detailPageKomik: resKomik,
      detailPageChapter: resChapter,
      id: context.params.id,
    },
  };
}
