import React, { useEffect, useState } from 'react';
import CardKomikNoTitle from '../CardKomikNoTitle';
import SearchInput from '../SearchInput';
import SelectBox from '../SelectBox';
/* eslint-disable @next/next/no-img-element */

export default function CardKomikWithSearch({ dataKomik, dataGenre }) {
  const [filteredKomikData, setFilteredKomikData] = useState(dataKomik);
  const [nameFilter, setNameFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState(null);
  const [jenisFilter, setJenisFilter] = useState(null);
  const [_temp, setTemp] = useState([]);

  // Initially set the filteredKomikData to the entire dataKomik
  useEffect(() => {
    setFilteredKomikData(dataKomik);
  }, []);

  // Handle filter changes
  useEffect(() => {
    let filteredData = dataKomik;

    if (nameFilter) {
      filteredData = filteredData.filter((item) =>
        item.judul.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (genreFilter) {
      filteredData = filteredData.filter(
        (item) => item.genre._id === genreFilter.value
      );
    }

    if (jenisFilter) {
      filteredData = filteredData.filter(
        (item) => item.jenis.toLowerCase() === jenisFilter.value.toLowerCase()
      );
    }

    setFilteredKomikData(filteredData);
  }, [nameFilter, genreFilter, jenisFilter]);

  // useEffect(() => {
  //   if (!nameFilter || !genreFilter || !jenisFilter)
  //     setFilteredKomikData(dataKomik);
  //   if (nameFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter((item) =>
  //         item.judul.toLowerCase().includes(nameFilter.toLowerCase())
  //       )
  //     );
  //   if (genreFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter((item) => item.genre._id === genreFilter.value)
  //     );
  //   if (jenisFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter(
  //         (item) => item.jenis.toLowerCase() === jenisFilter.value.toLowerCase()
  //       )
  //     );

  //   if (nameFilter && genreFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter(
  //         (item) =>
  //           item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
  //           item.genre._id === genreFilter.value
  //       )
  //     );

  //   if (nameFilter && jenisFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter(
  //         (item) =>
  //           item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
  //           item.jenis.toLowerCase() === jenisFilter.value.toLowerCase()
  //       )
  //     );

  //   if (genreFilter && jenisFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter(
  //         (item) =>
  //           item.genre._id === genreFilter.value &&
  //           item.jenis.toLowerCase() === jenisFilter.value.toLowerCase()
  //       )
  //     );

  //   if (nameFilter && genreFilter && jenisFilter)
  //     setFilteredKomikData(
  //       dataKomik.filter(
  //         (item) =>
  //           item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
  //           item.genre._id === genreFilter.value &&
  //           item.jenis.toLowerCase() === jenisFilter.value.toLowerCase()
  //       )
  //     );
  // }, [nameFilter, genreFilter, jenisFilter]);


  let jenisKomik = [
    {
      value: 'Manga',
      label: 'Manga (Jepang)',
      target: { value: 'Manga', name: 'jenis' },
    },
    {
      value: 'Manhwa',
      label: 'Manhwa (Korea Selatan)',
      target: { value: 'Manhwa', name: 'jenis' },
    },
    {
      value: 'Manhua',
      label: 'Manhua (China)',
      target: { value: 'Manhua', name: 'jenis' },
    },
    {
      value: 'Komik Indo',
      label: 'Komik Indo (Indonesia)',
      target: { value: 'Komik Indo', name: 'jenis' },
    },
  ];

  useEffect(() => {
    const transformedData = dataGenre.map((item) => ({
      value: item._id,
      label: item.nama,
      target: { value: item._id, name: 'genre' },
    }));

    setTemp(transformedData);
  }, [dataGenre]);
  return (
    <>
      <div className="container mt-5">
        <div className="row row-cols-lg-8 row-cols-md-1 row-cols-1 justify-content-lg-center">
          <div>
            <SearchInput
              className="form-search"
              name="keyword"
              handleChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="col">
            <SelectBox
              className="form-search"
              placeholder={'Pilih genre (alur cerita)'}
              name="genre"
              value={genreFilter}
              options={_temp}
              isClearable={true}
              handleChange={(e) => setGenreFilter(e)}
            />
          </div>
          <div className="col">
            <SelectBox
              className="form-search"
              placeholder={'Pilih jenis (asal produksi)'}
              name="jenis"
              value={jenisFilter}
              options={jenisKomik}
              isClearable={true}
              handleChange={(e) => setJenisFilter(e)}
            />
          </div>
        </div>
      </div>
      <CardKomikNoTitle
        dataKomik={filteredKomikData}
        allDataKomik={dataKomik}
      />
    </>
  );
}
