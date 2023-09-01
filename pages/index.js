import { setCookie } from '@/lib/session';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Head from 'next/head';

const Index = () => {
  const router = useRouter();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ error, setError ] = useState({ name: false, email: false });

  useEffect(() => {
    removeCookies();  // remove already existing auth cookie
  }, [])

  const removeCookies = async () => {
    const { deleteCookie } = await import('../lib/session');
    deleteCookie('isAuth');
  }

  const handleOnClick = () => {
    if(!name || !email) {
      setError({ ...error, ...!name ? { name: true } : { name: false }, ...!email ? { email: true } : { email: false } });
      return;
    }
    setCookie('isAuth', true);
    router.push(`/quiz?name=${name.toLowerCase()}`);
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <title>MindMingle - A Quiz App</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.userIcon}>
            <i className="fa-regular fa-user"></i>
          </span>
          <h1>MindMingle</h1>
          <label className={styles.label} htmlFor='name'>Name</label>
          <input className={`${styles.input} ${error.name ? styles.error : ''}`} name='name' type='text' placeholder='Enter your name' onChange={({ target }) => setName(target.value)} />

          <label className={styles.label} htmlFor='email'>Email</label>
          <input className={`${styles.input} ${error.email ? styles.error : ''}`} name='email' type='email' placeholder='Enter your email' onChange={({ target }) => setEmail(target.value)} />
          
          <button type='submit' onClick={handleOnClick}>
            Take me to the quiz <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default Index;