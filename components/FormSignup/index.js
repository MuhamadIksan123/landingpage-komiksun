import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import { useRouter } from 'next/router';
import { postData, putData } from '../../utils/fetchData';
import { toast } from 'react-toastify';
import SelectBox from '../SelectBox';

export default function FormSignup() {
  const router = useRouter();
  const { keyword } = router.query;
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    nama: '',
    role: '',
    image: '649fa4e9dde518a6eed4b98e',
  });

  let roles = [
    {
      value: 'customer',
      label: 'Customer',
      target: { value: 'customer', name: 'role' },
    },
    {
      value: 'vendor',
      label: 'Vendor',
      target: { value: 'vendor', name: 'role' },
    },
  ];

  const handleChange = (e) => {
    if ( e.target.name === 'role' ) {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (keyword === 'otp') {
      putData('api/v1/active', {
        otp: otp,
        email: form.email,
      }).then((res) => {
        if (res.data) {
          toast.success('berhasil aktifkan akun', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push('/signin');
        }
      });
    } else {
      const payload = {
        nama: form.nama,
        email: form.email,
        password: form.password,
        role: form.role.value,
        image: form.image,
      };

      postData('api/v1/auth/signup', payload).then((res) => {
        if (res.data) {
          toast.success('berhasil mendaftar', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push({ pathname: '/signup', query: { keyword: 'otp' } });
        }
      });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '5px 0px',
      border: '1px solid #000', 
      borderRadius: '14px',
      color: 'black'
    }),
  };

  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0">
      {keyword === 'otp' ? (
        <TextInput
          label={'Kode otp'}
          type={'text'}
          value={otp}
          name="otp"
          placeholder="Masukan otp di sini"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      ) : (
        <>
          <TextInput
            label={'Nama Lengkap'}
            type={'text'}
            name="nama"
            value={form.nama}
            placeholder="Nama lengkap di sini"
            onChange={handleChange}
          />

          <TextInput
            label={'Email'}
            type={'email'}
            name="email"
            value={form.email}
            placeholder={'komiksun@gmail.com'}
            onChange={handleChange}
          />

          <TextInput
            label={'Password (6 karakter)'}
            type={'password'}
            value={form.password}
            name="password"
            placeholder="Ketik password anda"
            onChange={handleChange}
          />

          <SelectBox
            className="form-search"
            placeholder={'Pilih peran'}
            name="role"
            value={form.role}
            options={roles}
            isClearable={false}
            handleChange={handleChange}
            styles={customStyles}
          />
        </>
      )}

      <div className="d-grid mt-2">
        <Button variant={'btn-green'} action={() => handleSubmit()}>
          {keyword === 'otp' ? 'Verifikasi' : 'Mendaftar'}
        </Button>
      </div>
    </form>
  );
}
