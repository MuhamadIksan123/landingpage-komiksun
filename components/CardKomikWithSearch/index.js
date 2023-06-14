import React, { useEffect, useState } from 'react'
import CardKomikNoTitle from '../CardKomikNoTitle';
import SearchInput from '../SearchInput';
import SelectBox from '../SelectBox';
import Pagination from '../Pagination';
/* eslint-disable @next/next/no-img-element */

export default function CardKomikWithSearch({dataKomik, dataGenre}) {
    const [filteredKomikData, setFilteredKomikData] = useState(dataKomik);
    const [nameFilter, setNameFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);

    useEffect(() => {
      if (!nameFilter || !genreFilter || !statusFilter)
        setFilteredKomikData(dataKomik);
      if (nameFilter)
        setFilteredKomikData(
          dataKomik.filter((item) =>
            item.judul.toLowerCase().includes(nameFilter.toLowerCase())
          )
        );
      if (genreFilter)
        setFilteredKomikData(
          dataKomik.filter((item) => item.genre._id === genreFilter.value)
        );
      if (statusFilter)
        setFilteredKomikData(
          dataKomik.filter(
            (item) =>
              item.status.toLowerCase() === statusFilter.value.toLowerCase()
          )
        );

      if (nameFilter && genreFilter)
        setFilteredKomikData(
          dataKomik.filter(
            (item) =>
              item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
              item.genre._id === genreFilter.value
          )
        );

      if (nameFilter && statusFilter)
        setFilteredKomikData(
          dataKomik.filter(
            (item) =>
              item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
              item.status.toLowerCase() === statusFilter.value.toLowerCase()
          )
        );

      if (genreFilter && statusFilter)
        setFilteredKomikData(
          dataKomik.filter(
            (item) =>
              item.genre._id === genreFilter.value &&
              item.status.toLowerCase() === statusFilter.value.toLowerCase()
          )
        );

      if (nameFilter && genreFilter && statusFilter)
        setFilteredKomikData(
          dataKomik.filter(
            (item) =>
              item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
              item.genre._id === genreFilter.value &&
              item.status.toLowerCase() === statusFilter.value.toLowerCase()
          )
        );
    }, [nameFilter, genreFilter, statusFilter]);

    let stat = [
      {
        value: 'Ongoing',
        label: 'Ongoing',
        target: { value: 'Ongoing', name: 'status' },
      },
      {
        value: 'Tamat',
        label: 'Tamat',
        target: { value: 'Tamat', name: 'status' },
      },
    ];

    let res = dataGenre;

    let _temp = [];

    res.forEach((res) => {
      _temp.push({
        value: res._id,
        label: res.nama,
        target: { value: res._id, name: 'genre' },
      });
    });
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
          <div className='col'>
            <SelectBox
              className="form-search"
              placeholder={'Pilih genre'}
              name="genre"
              value={genreFilter}
              options={_temp}
              isClearable={true}
              handleChange={(e) => setGenreFilter(e)}
            />
          </div>
          <div className='col'>
            <SelectBox
              className="form-search"
              placeholder={'Pilih status'}
              name="status"
              value={statusFilter}
              options={stat}
              isClearable={true}
              handleChange={(e) => setStatusFilter(e)}
            />
          </div>
        </div>
      </div>
      <CardKomikNoTitle data={filteredKomikData} />
      {/* <Pagination pages={pages} handlePageClick={handlePageClick} /> */}
    </>
  );
}
