import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import ListGroupKomik from '../../components/ListGroupKomik';
import CardKomikDetailVendor from '../../components/CardKomikDetailVendor';
import Button from '../../components/Button';


export default function DetailVendor({detailPage, dataKomik, dataGenre, id}) {
    const [isCardVisible, setIsCardVisible] = useState(true);

    const handleCardClick = () => {
      setIsCardVisible(true);
    };

    const handleListClick = () => {
      setIsCardVisible(false);
    };
  return (
    <>
      <section>
        <div className="container">
          <div className="row my-3">
            <div className="col-lg-6 col-12 justify-content-center align-items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_API}/${detailPage?.image?.nama}`}
                alt="semina"
                className="img-responsive"
              />
            </div>
            <div className="col-lg-6 col-12 mt-4">
              <div className="d-flex flex-column">
                <div>
                  <div className="sub-title">
                    <span className="text-gradient-pink">Profile</span>
                  </div>
                  <div className="title">{detailPage.nama}</div>
                </div>
                <ListGroup variant="flush" className="mt-2">
                  <ListGroup.Item>
                    <b>Email:</b> {detailPage.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>No Handphone:</b> {detailPage.nomor}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Role:</b> {detailPage.role}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Status: </b>
                    {detailPage.statusUser}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>About: </b> <br /> {detailPage.biodata}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 d-grid gap-2 my-1">
              <Button variant="btn-green" action={handleCardClick}>
                Search
              </Button>
            </div>
            <div className="col-md-6 d-grid gap-2 my-1">
              <Button variant="btn-green" action={handleListClick}>
                All Produk
              </Button>
            </div>
          </div>
        </div>
      </section>
      {isCardVisible ? (
        <CardKomikDetailVendor
          dataKomik={dataKomik}
          dataGenre={dataGenre}
          idVendor={id}
        />
      ) : (
        <ListGroupKomik dataKomik={dataKomik} idVendor={id} />
      )}
    </>
  );
}
