import { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.css';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
  const head = () => (
    <Fragment>
      {/* <link
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
        rel='stylesheet'
        integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
        crossOrigin='anonymous'
      /> */}
      {/* <link rel='stylesheet' href='/static/css/styles.css' /> */}
    </Fragment>
  );
  const nav = () => (
    <ul className='nav nav-tabs bg-warning'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link text-dark'>Home</a>
        </Link>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link href='/login'>
              <a className='nav-link text-dark'>Login</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/register'>
              <a className='nav-link text-dark'>Register</a>
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item ms-auto'>
          <Link href='/admin'>
            <a className='nav-link text-dark'>{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === 'subscriber' && (
        <li className='ms-auto nav-item'>
          <Link href='/user'>
            <a className='nav-link text-dark'>{isAuth().name}</a>
          </Link>
        </li>
      )}
      {isAuth() && (
        <li className='nav-item'>
          <a onClick={logout} className='nav-link text-dark'>
            Logout
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {head()}
      {nav()} <div className='container pt-5 pb-5'>{children}</div>
    </Fragment>
  );
};

export default Layout;
