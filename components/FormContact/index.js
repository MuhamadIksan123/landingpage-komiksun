import React, { useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import { useRouter } from 'next/router';
import { postData } from '../../utils/fetchData';
import { toast } from 'react-toastify';

export default function FormContact() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    email: '',
    isiPesan: '',
    date: new Date(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await postData('api/v1/contact', form);

      if (res?.data) {
        toast.success('Berhasil mengirim pesan', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setForm({
          ...form,
          nama: '',
          email: '',
          isiPesan: '',
        });
        router.push('/contact');
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="container">
        <form className="d-flex flex-column mt-4 mt-md-0 p-30">
          <TextInput
            label={'Nama Lengkap'}
            type={'text'}
            name="nama"
            value={form.nama}
            placeholder="Masukan nama lengkap"
            onChange={handleChange}
          />

          <TextInput
            label={'Email'}
            type={'email'}
            name="email"
            value={form.email}
            placeholder={'Masukan email'}
            onChange={handleChange}
          />

          <TextArea
            label={'Isi Pesan'}
            name="isiPesan"
            value={form.isiPesan}
            placeholder={'Bantuan atau Saran'}
            onChange={handleChange}
          />

          <div className="d-grid mt-2 gap-4">
            <Button variant={'btn-green'} action={() => handleSubmit()}>
              Kirim Pesan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
