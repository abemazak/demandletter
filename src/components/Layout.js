import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ 
  children, 
  title,
  appName = 'HandyLaw',
  description = 'Generate strategic, data-driven legal documents'
}) => {
  const pageTitle = title ? `${title} | ${appName}` : appName;
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.layoutContainer}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 