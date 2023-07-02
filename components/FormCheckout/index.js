/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import { getData, postData } from '../../utils/fetchData';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import TextInput from '../TextInput';
import { Figure } from 'react-bootstrap';

export default function FormCheckout() {
  const router = useRouter();
  const { komikId, vendor, id } = router.query;

  const [form, setForm] = useState({
    email: '',
    lastName: '',
    firstName: '',
    role: '',
    payment: '',
    komik: id,
    file: '',
    avatar: '',
  });

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetctData = async () => {
      try {
        const res = await getData(
          `api/v1/payment/${vendor}`,
          {},
          Cookies.get('token')
        );
        res.data.forEach((res) => {
          res.isChecked = false;
        });
        setPayments(res.data);
      } catch (err) {}
    };

    fetctData();
  }, []);

  useEffect(() => {
    let paymentId = '';
    payments.filter((payment) => {
      if (payment.isChecked) {
        paymentId = payment._id;
      }
    });
    setForm({
      ...form,
      payment: paymentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('api/v1/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);
          console.log(res.data);

          setForm({
            ...form,
            file: res.data._id,
            [e.target.name]: res.data.nama,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      let payload = {
        komik: form?.komik,
        payment: form?.payment,
        image: form?.file,
        personalDetail: {
          lastName: form.lastName,
          firstName: form.firstName,
          email: form.email,
          role: form.role,
        },
      };

      console.log(payload);
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
        router.push('/order');
      }
    } catch (err) {}
  };

  const handleChangePayment = (e, i) => {
    const _temp = [...payments];

    _temp[i].isChecked = e.target.checked;

    _temp.forEach((t) => {
      if (t._id !== e.target.value) {
        t.isChecked = false;
      }
    });

    setPayments(_temp);
  };

  return (
    <form action="" className="container form-semina">
      <div className="personal-details">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>01</span>
            <div>Personal Details</div>
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
            <div>Pilih dan Transfer Terlebih Dahulu</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-2 gy-0">
          {payments.map((payment, i) => (
            <div className="col-lg-4" key={payment._id}>
              <label className="payment-radio h-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API}/${payment?.image?.nama}`}
                    alt=""
                    className="img-payment"
                  />
                  <div>
                    {payment.type} <br />
                    <span class="balance">{payment.nomor}</span>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={payment.isChecked}
                  name="isChecked"
                  value={payment._id}
                  onChange={(e) => handleChangePayment(e, i)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-method mt-4">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>03</span>
            <div>Upload Bukti Pembayaran</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-2 gy-0">
          <div className="col-lg-4">
            <TextInput
              placeholder={'Masukan Avatar'}
              name="avatar"
              // value={form.avatar}
              type="file"
              onChange={handleChange}
            />
            {form.avatar !== '' && (
              <div className="mt-3 text-center">
                <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={`${process.env.NEXT_PUBLIC_API}/${form.avatar}`}
                  />

                  <Figure.Caption>Perview image cover</Figure.Caption>
                </Figure>
              </div>
            )}
          </div>
          <div className="col-lg-4"></div>
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
