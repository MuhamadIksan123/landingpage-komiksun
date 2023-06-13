import Link from 'next/link';
import React from 'react'
import { ListGroup } from 'react-bootstrap';

export default function ListGroupKomik({data}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ListGroup variant="flush" as="ol" numbered>
            {data.map((data) => (
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
