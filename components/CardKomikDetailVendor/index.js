import React, { useEffect, useState } from 'react'
import SearchInput from '../SearchInput';
import SelectBox from '../SelectBox';
import CardKomikNoTitle from '../CardKomikNoTitle';

export default function CardKomikDetailVendor({dataKomik, dataGenre, idVendor}) {
    const [dataKomikFilter, setDataKomikFilter] = useState(dataKomik);
    const [nameFilter, setNameFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [_temp, setTemp] = useState([]);

     useEffect(() => {
       if (!nameFilter || !genreFilter || !statusFilter)
         setDataKomikFilter(dataKomik);
       if (nameFilter)
         setDataKomikFilter(
           dataKomik.filter((item) =>
             item.judul.toLowerCase().includes(nameFilter.toLowerCase())
           )
         );
       if (genreFilter)
         setDataKomikFilter(
           dataKomik.filter((item) => item.genre._id === genreFilter.value)
         );
       if (statusFilter)
         setDataKomikFilter(
           dataKomik.filter(
             (item) =>
               item.status.toLowerCase() === statusFilter.value.toLowerCase()
           )
         );

       if (nameFilter && genreFilter)
         setDataKomikFilter(
           dataKomik.filter(
             (item) =>
               item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
               item.genre._id === genreFilter.value
           )
         );

       if (nameFilter && statusFilter)
         setDataKomikFilter(
           dataKomik.filter(
             (item) =>
               item.judul.toLowerCase().includes(nameFilter.toLowerCase()) &&
               item.status.toLowerCase() === statusFilter.value.toLowerCase()
           )
         );

       if (genreFilter && statusFilter)
         setDataKomikFilter(
           dataKomik.filter(
             (item) =>
               item.genre._id === genreFilter.value &&
               item.status.toLowerCase() === statusFilter.value.toLowerCase()
           )
         );

       if (nameFilter && genreFilter && statusFilter)
         setDataKomikFilter(
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

     useEffect(() => {
       const transformedData = dataGenre.map((item) => ({
         value: item._id,
         label: item.nama,
         target: { value: item._id, name: 'genre' },
       }));

       setTemp(transformedData);
     }, [dataGenre]);

     useEffect(() => {
       setDataKomikFilter(
         dataKomikFilter.filter((item) => item.vendor._id === idVendor)
       );
     }, []);

     
  return (
    <>
      <div className="container mt-4">
        <div className="row row-cols-lg-8 row-cols-md-1 row-cols-1 justify-content-lg-center">
          <div className="col">
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
              placeholder={'Pilih genre'}
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
      <CardKomikNoTitle dataKomik={dataKomikFilter} />
    </>
  );
}
