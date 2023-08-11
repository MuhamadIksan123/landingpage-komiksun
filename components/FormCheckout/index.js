/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import { getData, postData } from '../../utils/fetchData';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import TextInput from '../TextInput';
import { Figure } from 'react-bootstrap';

export default function FormCheckout({ dataKomik }) {
  const router = useRouter();
  const { komikId, vendor, id } = router.query;

  const [form, setForm] = useState({
    email: '',
    lastName: '',
    firstName: '',
    role: '',
    payment: '',
    komik: id,
  });

  const [pay, setPay] = useState([
    {
      type: 'BRI',
      img: '/images/bri.png',
      isChecked: false, // Add this property
    },
    {
      type: 'BNI',
      img: '/images/bni.png',
      isChecked: false, // Add this property
    },
    {
      type: 'BCA',
      img: '/images/bca.png',
      isChecked: false, // Add this property
    },
  ]);

  const generateRandomOrderId = () => {
    const randomOrderId = Math.floor(10000000 + Math.random() * 90000000); // Generates an 8-digit random number
    return `C${randomOrderId}`;
  };

  const handlePaymentChange = (e) => {
    const { value } = e.target;

    const updatedPay = pay.map((payment) => ({
      ...payment,
      isChecked: payment.type === value,
    }));

    setPay(updatedPay);
    setForm({ ...form, payment: value });
  };

  const handleChange = async (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Cek apakah ada inputan yang kosong
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.role ||
      !form.payment
    ) {
      toast.error('Harap lengkapi semua kolom yang diperlukan', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      let payload = {
        payment_type: 'bank_transfer',
        bank_transfer: {
          bank: form?.payment,
        },
        transaction_details: {
          order_id: generateRandomOrderId(),
          gross_amount: dataKomik.price,
        },
        komik: form?.komik,
        customer_details: {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
        },
        personalDetail: {
          lastName: form.lastName,
          firstName: form.firstName,
          email: form.email,
          role: form.role,
        },
      };

      const res = await postData(
        'api/v1/checkout',
        payload,
        Cookies.get('token')
      );

      if (res.data) {
        toast.success('berhasil checkout', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push(`/mutasi/${res.data.response_midtrans.order_id}`);
      }
    } catch (err) {}
  };

  return (
    <form action="" className="container form-semina">
      <div className="personal-details">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>01</span>
            <div>Detail Pribadi</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center">
          <div className="mb-4 col-lg-4">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              placeholder="First name here"
              className="form-control"
              id="first_name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 col-lg-4">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last name here"
              className="form-control"
              name="lastName"
              id="last_name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-12 justify-content-center">
          <div className="mb-4 col-lg-4">
            <label htmlFor="email_address" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email_address"
              placeholder="semina@bwa.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 col-lg-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              placeholder="Product Designer"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="payment-method mt-4">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>02</span>
            <div>Cara Pembayaran</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-2 gy-0">
          {pay.map((payment, index) => (
            <div className="col-lg-4" key={index}>
              <label className="payment-radio h-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={payment.img}
                    alt="Payment {payment.type}"
                    className="img-payment"
                  />
                  <div>{payment.type}</div>
                </div>
                <input
                  type="radio"
                  checked={payment.isChecked}
                  name="payment"
                  value={payment.type}
                  onChange={handlePaymentChange}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column align-items-center footer-payment gap-4">
        <Button variant="btn-green" action={() => handleSubmit()}>
          Pay Now
        </Button>
        <div>
          <img src="/icons/ic-secure.svg" alt="" />
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </form>
  );
}
