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
      label: 'customer',
      target: { value: 'customer', name: 'role' },
    },
    {
      value: 'vendor',
      label: 'vendor',
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
          toast.success('berhasil aktipkan akun', {
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
          toast.success('berhasil signup', {
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
      border: '1px solid #000', // Mengatur tebal border menjadi 2px dan warna hitam (#000)
      borderRadius: '14px', // Opsional: Mengatur radius border
      color: 'black'
    }),
  };

  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0">
      {keyword === 'otp' ? (
        <TextInput
          label={'otp'}
          type={'text'}
          value={otp}
          name="otp"
          placeholder="Enter otp here"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      ) : (
        <>
          <TextInput
            label={'Full Name'}
            type={'text'}
            name="nama"
            value={form.nama}
            placeholder="Full name here"
            onChange={handleChange}
          />

          <TextInput
            label={'Email'}
            type={'email'}
            name="email"
            value={form.email}
            placeholder={'semina@bwa.com'}
            onChange={handleChange}
          />

          <TextInput
            label={'Password (6 characters)'}
            type={'password'}
            value={form.password}
            name="password"
            placeholder="Type your password"
            onChange={handleChange}
          />

          <SelectBox
            className="form-search"
            placeholder={'Pilih role'}
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
          {keyword === 'code' ? 'Verification' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
}
