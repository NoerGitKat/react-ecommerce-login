import Router from 'next/router';
import NProgress from 'nprogress';

const showProgressBar = () => {
  Router.onRouteChangeStart = () => NProgress.start();
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();
};

export default showProgressBar;
