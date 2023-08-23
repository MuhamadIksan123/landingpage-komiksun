import React, { useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import { useRouter } from 'next/router';
import { postData } from '../../utils/fetchData';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function FormSignin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await postData('/api/v1/auth/signin', form);

    if (res.data.role === 'customer') {
      toast.success('berhasil signin', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      Cookies.set('token', res.data.token);
      // Cookies.set('email', res.data.email);
      // Cookies.set('user', JSON.stringify(res.data.dataUser));
      Cookies.set('idUser', res.data.dataUser._id);
      Cookies.set('namaUser', res.data.dataUser.nama);
      Cookies.set('fotoUser', res.data.dataUser.image.nama);
      router.push('/');
    }

    if (res.data.role === 'vendor' || res.data.role === 'admin') {
      const authData = {
        token: res.data.token,
        email: res.data.email,
        role: res.data.role,
        refreshToken: res.data.refreshToken,
      };

      if (process.env.NEXT_PUBLIC_API === 'http://localhost:9000') {
        const params = new URLSearchParams(authData).toString();
        router.push(`http://localhost:3000/login?${params}`);
      } else {
        const params = new URLSearchParams(authData).toString();
        router.push(`https://client-komiksun.vercel.app/login?${params}`);
      }
    }
  };

  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
      <TextInput
        label={'Email'}
        type={'email'}
        name="email"
        value={form.email}
        placeholder={'semina@bwa.com'}
        onChange={handleChange}
      />

      <TextInput
        label={'Password (6 karakter)'}
        type={'password'}
        name="password"
        value={form.password}
        placeholder="Type your password"
        onChange={handleChange}
      />

      <div className="d-grid mt-2 gap-4">
        <Button variant={'btn-green'} action={() => handleSubmit()}>
          Masuk
        </Button>

        <Button action={() => router.push('/signup')} variant="btn-navy">
          Buat Akun Baru
        </Button>
      </div>
    </form>
  );
}
