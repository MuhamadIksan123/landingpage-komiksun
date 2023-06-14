import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';

export default function ListGroupKomik({dataKomik, idVendor}) {
    const [dataKomikFilter, setDataKomikFilter] = useState(dataKomik);
     useEffect(() => {
       setDataKomikFilter(
         dataKomik.filter((item) => item.vendor._id === idVendor)
       );
     }, []);
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <ListGroup variant="flush" as="ol" numbered>
            {dataKomikFilter.map((data) => (
              <ListGroup.Item as="li" key={data._id} action>
                {data.judul}
                <Link href={`/detail/${data._id}`}>
                  <a className="stretched-link"></a>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
