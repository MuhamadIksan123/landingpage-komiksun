/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getData } from '../../utils/fetchData';
import PDFViewer from '../../components/PDFViewer';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  const [dataChapter, setDataChapter] = useState([]);
  const [detailChapter, setDetailChapter] = useState([]);

  console.log(detailChapter);

  useEffect(() => {
    const fetchDetailChapter = async () => {
      try {
        const resKomik = await getData(`api/v1/chapter/${id}`);
        setDetailChapter(resKomik.data);
      } catch (err) {
        // Tangani kesalahan jika ada
        console.error('Error fetching chapter data:', err);
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

    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchDetailChapter(), fetchDataChapter()]);
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

  const handleChapter = (id) => {
    router.push(`/baca/${id}`);
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
          <div className="container my-4">
            <div className="row">
              <div className="col">
                <h2
                  className=" d-inline-block py-3 my-2"
                  style={{
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Comic Sans MS',
                      fontWeight: 'bold',
                    }}
                  >
                    {detailChapter.komik.judul}:
                  </span>{' '}
                  {detailChapter.judul}
                </h2>
                {/* Add this line */}
                <PDFViewer detailChapter={detailChapter} />
              </div>
            </div>
          </div>
          <section className="pb-5">
            <div className="container">
              <div className=" row gap-y">
                {dataChapter.map((data, index) => {
                  if (detailChapter.komik._id === data.komik._id) {
                    return (
                      <div
                        className="col-lg-3 col-md-6 col-12 d-grid my-2"
                        key={index}
                      >
                        <Button
                          variant={'btn-green'}
                          action={() => handleChapter(data._id)}
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
