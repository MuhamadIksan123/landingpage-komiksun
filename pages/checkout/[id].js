/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Head from 'next/head';
import Footer from '../../components/Footer';
import FormCheckout from '../../components/FormCheckout';
import Navbar from '../../components/Navbar';
import { getData } from '../../utils/fetchData';
import { formatDate } from '../../utils/formatDate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Checkout() {
  const router = useRouter();
  const { id } = router.query;

  const [dataKomik, setDataKomik] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = Cookies.get('idUser');
      const token = Cookies.get('token');

      if (!token) {
        router.push('/signin');
        return;
      }

      const reqCustomer = await getData(`api/v1/customer/${idUser}`);
      const resCustomer = reqCustomer.data;

      let komikUser;

      resCustomer.komik.map((item) =>
        item.value === router.query.id ? (komikUser = item.value) : null
      );

      if (komikUser === router.query.id) {
        router.push(`/detail/${router.query.id}`);
        return;
      }

      const resKomik = await getData(`api/v1/komik/${router.query.id}`);
      setDataKomik(resKomik.data);
    };

    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchData()]);
        setIsLoading(false);
      } catch (err) {
        // Tangani kesalahan jika ada
        setIsLoading(false);
        console.error('Error:', err);
      }
    };

    if (id) {
      fetchAllData();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Semina || Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy">
        {isLoading ? ( // Tampilkan loader jika isLoading atau isDataLoaded bernilai true
          <div className="loader">Loading...</div>
        ) : (
          <div className="checkout container">
            <div className="text-center checkout-title">
              Berinvestasi pada Diri Sendiri
            </div>

            <div className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
              <img
                src={`${process.env.NEXT_PUBLIC_API}/${dataKomik?.image?.nama}`}
                className="event-image"
                alt="semina"
              />
              <div className="d-flex flex-column gap-3">
                <h5>{dataKomik.judul}</h5>

                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-marker-white.svg" alt="" />
                  <span>{dataKomik.jenis}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-time-white.svg" alt="" />
                  <span> {moment(new Date()).format('HH.MM A')}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-calendar-white.svg" alt="" />
                  <span>{formatDate(new Date())}</span>
                </div>
              </div>
              <div className="total-price">Rp. {dataKomik.price}</div>
            </div>

            {/* form */}
            <FormCheckout dataKomik={dataKomik} />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { token, idUser } = context.req.cookies;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       },
//     };
//   }
//   const reqCustomer = await getData(`api/v1/customer/${idUser}`);
//   const resCustomer = reqCustomer.data;

//   let komikUser;

//   resCustomer.komik.map((item) =>
//     item.value === context.params.id ? (komikUser = item.value) : null
//   );
//   if(komikUser === context.params.id) {
//     return {
//       redirect: {
//         destination: `/detail/${context.params.id}`,
//         permanent: false,
//       },
//     };
//   }

//   const req = await getData(`/api/v1/komik/${context.params.id}`);

//   const res = req.data;
//   return {
//     props: { detailPage: res },
//   };
// }
