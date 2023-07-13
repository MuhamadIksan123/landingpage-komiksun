import Head from 'next/head';
import Brand from '../components/Brand';
import CardKomik from '../components/CardKomik';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Statistics from '../components/Statistics';
import Stories from '../components/Stories';
import { getData } from '../utils/fetchData';

export default function HomePage({ data }) {
  return (
    <>
      <Head>
        <title>Semina || Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Brand />
      <CardKomik dataKomik={data} title="Rekomendasi" subTitle="Browse" />
      <Stories />
      <Statistics />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const req = await getData('api/v1/komik');
  const res = req.data;

  return {
    props: { data: res },
  };
}
