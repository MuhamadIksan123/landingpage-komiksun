import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import { Col, Container, Row } from 'react-bootstrap';
import CardVendor from '../CardVendor';


/* eslint-disable @next/next/no-img-element */

export default function CardVendorWithSearch({ data }) {
  const [filteredKomikData, setFilteredKomikData] = useState(data);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    if (!nameFilter) setFilteredKomikData(data);
    if (nameFilter)
      setFilteredKomikData(
        data.filter((item) =>
          item.nama.toLowerCase().includes(nameFilter.toLowerCase())
        )
      );
  }, [nameFilter]);

  const handleChange = (e) => {
    setNameFilter(e.target.value);
  };

  return (
    <>
      <Container className="mt-5">
        <div className="row row-cols-lg-8 row-cols-md-1 row-cols-1 justify-content-lg-center">
          <Col>
            <SearchInput
              className="form-search"
              name="keyword"
              handleChange={handleChange}
            />
          </Col>
        </div>
      </Container>
      <CardVendor dataVendor={filteredKomikData} allDataVendor={data} />
    </>
  );
}
