/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { getData, postData } from '../../utils/fetchData';
import moment from 'moment';
import { formatDate } from '../../utils/formatDate';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Rating from 'react-rating-stars-component';

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  const [komikUser, setKomikUser] = useState('');

  const [checkRating, setCheckRating] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);

  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataChapter, setDataChapter] = useState([]);
  const [dataKomik, setDataKomik] = useState([]);
  const [dataRating, setDataRating] = useState([]);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchDataCustomer = async () => {
      try {
        const idUser = Cookies.get('idUser');
        if (idUser) {
          const resCustomer = await getData(`api/v1/customer/${idUser}`);
          setDataCustomer(resCustomer.data);
        }
      } catch (err) {
        // Tangani kesalahan jika ada
        console.error('Error fetching customer data:', err);
      }
    };

    const fetchDataKomik = async () => {
      try {
        const resKomik = await getData(`api/v1/komik/${id}`);
        setDataKomik(resKomik.data);
      } catch (err) {
        // Tangani kesalahan jika ada
        console.error('Error fetching komik data:', err);
      }
    };

    const fetchDataChapter = async () => {
      try {
        const resChapter = await getData('api/v1/chapter');
        setDataChapter(resChapter.data);
      } catch (err) {
        // Tangani kesalahan jika ada
        console.error('Error fetching chapter data:', err);
      }
    };

    const fetchDataRating = async () => {
      try {
        const resRating = await getData('api/v1/rating');
        setDataRating(resRating.data);
      } catch (err) {
        // Tangani kesalahan jika ada
        console.error('Error fetching rating data:', err);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchDataCustomer(),
          fetchDataKomik(),
          fetchDataChapter(),
          fetchDataRating(),
        ]);
        setIsLoading(false);
      } catch (err) {
        // Tangani kesalahan jika ada
        setIsLoading(false);
        console.error('Error:', err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const idUser = Cookies.get('idUser');
    if (dataCustomer && dataCustomer.komik) {
      // Fetch data customer.komik setelah mendapatkan dataCustomer
      dataCustomer.komik.map((item) =>
        item.value === id ? setKomikUser(item.value) : null
      );
    }

    if (idUser && dataRating) {
      // Check if the user has rated the comic
      const hasRated = dataRating.some(
        (item) => item.customer === idUser && item.komik === id
      );

      setCheckRating(hasRated);
    }

    if (idUser && dataRating) {
      // Fetch data customer.komik setelah mendapatkan dataCustomer
      dataRating.filter((item) =>
        item.customer === idUser && item.komik === id
          ? setUserRating(item.rating) && setHasUserRated(true)
          : 0
      );
    }
  }, [dataCustomer, id, dataRating, dataKomik]);

  const handleRatingSubmit = async () => {
    const token = Cookies.get('token');

    if (!token) {
      return router.push('/signin');
    }

    const roundedRating = Math.round(userRating);

    if (
      dataKomik.price === 0 ||
      dataCustomer.komik.some((item) => item.value === id)
    ) {
      try {
        const res = await postData(`api/v1/komik/${id}/rating`, {
          rating: roundedRating,
          customer: dataCustomer._id,
        });
        setDataKomik({ ...dataKomik, rating: res.rating });
        setHasUserRated(true);
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    } else {
      router.push(
        `/checkout/${id}?komikId=${id}&vendor=${dataKomik.vendor._id}`
      );
    }
  };

  const handleChapter = (chapterId, komikId, vendor, dataCustomer) => {
    const token = Cookies.get('token');
    if (!token) {
      return router.push('/signin');
    } else {
      if (dataKomik.price === 0) {
        router.push(`/baca/${chapterId}`);
      } else {
        if (dataCustomer.komik.length === 0) {
          router.push(`/checkout/${id}?komikId=${komikId}&vendor=${vendor}`);
        } else {
          dataCustomer.komik.map((item) => {
            item.value === komikId
              ? router.push(`/baca/${chapterId}`)
              : router.push(
                  `/checkout/${id}?komikId=${komikId}&vendor=${vendor}`
                );
          });
        }
      }
    }
  };

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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="preview-image bg-navy text-center">
            <img
              src={`${process.env.NEXT_PUBLIC_API}/${dataKomik?.image?.nama}`}
              className="img-content"
              alt="semina"
            />
          </div>
          <div className="details-content container">
            <div className="d-flex flex-wrap justify-content-lg-center gap">
              <div className="d-flex flex-column description">
                <div className="headline">{dataKomik.judul}</div>
                <br />
                <div className="event-details">
                  <h6>Penilaianmu</h6>
                  {/* Tampilkan pesan rating setelah pengguna memberikan rating */}
                  {hasUserRated || checkRating ? (
                    <p>
                      Terima kasih telah memberi rating pada komik ini:{' '}
                      {userRating} bintang
                    </p>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-md-3">
                          <Rating
                            value={userRating}
                            edit={true} // Enable user input to submit their rating
                            onChange={(rating) => setUserRating(rating)}
                            isHalf={true} // Allow half-star rating
                            size={30}
                          />
                        </div>
                        <div className="col-md-9 text-left">
                          <Button
                            variant={'btn-green'}
                            action={handleRatingSubmit}
                          >
                            Berikan Penilaian
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  <h6>Genre</h6>
                  <p>{dataKomik.genre.nama}</p>
                  <h6>Rilis</h6>
                  <p>{moment(dataKomik.rilis).format('DD-MM-YYYY')}</p>
                  <h6>Sinopsis</h6>
                  <p className="details-paragraph">{dataKomik.sinopsis}</p>
                </div>
              </div>

              {dataKomik.price === 0 || komikUser === id ? null : (
                <div className="d-flex flex-column card-event">
                  <h6>Penerbit Komik</h6>
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}/${dataKomik?.vendor?.image?.nama}`}
                      alt="semina"
                      width="60"
                    />
                    <div>
                      <div className="speaker-name">
                        {dataKomik?.vendor?.nama}
                      </div>
                      <span className="occupation">
                        {dataKomik?.vendor?.role}
                      </span>
                    </div>
                  </div>
                  <hr />

                  <h6>Dapatkan Komik</h6>
                  <div>
                    <>
                      <div className="price my-3">
                        {dataKomik.price === 0
                          ? 'free'
                          : `Rp. ${dataKomik.price}`}
                        <span>/orang</span>
                      </div>
                      <div className="d-flex gap-3 align-items-center card-details">
                        <img src="/icons/ic-marker.svg" alt="semina" />{' '}
                        {dataKomik.vendor.role}
                      </div>
                      <div className="d-flex gap-3 align-items-center card-details">
                        <img src="/icons/ic-time.svg" alt="semina" />{' '}
                        {dataKomik.vendor.email}
                      </div>
                      <div className="d-flex gap-3 align-items-center card-details">
                        <img src="/icons/ic-calendar.svg" alt="semina" />{' '}
                        {dataKomik.vendor.nomor}
                      </div>

                      <Button
                        variant={'btn-green'}
                        action={() =>
                          handleSubmit(dataKomik._id, dataKomik.vendor._id)
                        }
                      >
                        Pesan sekarang
                      </Button>
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
          <section className="pb-5">
            <div className="container">
              <div className=" row gap-y">
                {dataChapter.map((data, index) => {
                  if (id === data.komik._id) {
                    return (
                      <div
                        className="col-lg-3 col-md-6 col-12 d-grid my-2"
                        key={index}
                      >
                        <Button
                          variant={'btn-green'}
                          action={() =>
                            handleChapter(
                              data._id,
                              dataKomik._id,
                              dataKomik.vendor._id,
                              dataCustomer
                            )
                          }
                        >
                          {data.judul}
                        </Button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
