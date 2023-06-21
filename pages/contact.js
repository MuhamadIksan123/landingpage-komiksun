import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

export default function contact() {
  useEffect(() => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const url = e.target.action;
      const formData = new FormData(e.target);

      fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
        .then(() => {
          // url thank you
          window.location.href = '/contact';
        })
        .catch((e) => alert('Error occurred'));
    };

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleSubmit);

    return () => {
      contactForm.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Semina || Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-navy">
        <Navbar />
      </header>
      <Container className="my-5">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="row row-cols-8 justify-content-lg-center">
              <Form
                action="https://formspree.io/f/xdovqnrw"
                method="post"
                id="contact-form"
              >
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama"
                    name="nama"
                    id="nama"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukan email"
                    name="email"
                    id="email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Isi Pesan</Form.Label>
                  <FloatingLabel label="Bantuan atau Saran">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '200px' }}
                      name="message"
                      id="message"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Button variant="custom" type="submit">
                  Kirim
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
