
import { AppEnv } from '@utils/AppEnv';

const pathList = [{
  path: '/',
  name: 'LayOut',
  meta: { title: AppEnv.title, keepAlive: false },
  component: () => import(/* webpackChunkName: "LayOut" */'@/pages/Layout.vue'),
  // eslint-disable-next-line array-bracket-newline
  children: [
    {
      path: '/home/index',
      name: 'HomeIndex',
      meta: { title: 'home', keepAlive: false },
      component: () => import(/* webpackChunkName: "HomeIndex" */'@/pages/home/index.vue'),
    },
    {
      path: '/SinglePage/liffBanner',
      name: 'SinglePageLiffBanner',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageLiffBanner" */'@/pages/SinglePage/liffBanner.vue'),
    },
    {
      path: '/SinglePage/liffInterface',
      name: 'SinglePageLiffInterface',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageLiffInterface" */'@/pages/SinglePage/liffInterface.vue'),
    },
    {
      path: '/SinglePage/liffInteractive',
      name: 'SinglePageLiffInteractive',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageLiffInteractive" */'@/pages/SinglePage/liffInteractive.vue'),
    },
    {
      path: '/SinglePage/web3Provider',
      name: 'SinglePageWeb3Provider',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWeb3Provider" */'@/pages/SinglePage/web3Provider.vue'),
    },
    {
      path: '/SinglePage/web3Api',
      name: 'SinglePageWeb3Api',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWeb3Api" */'@/pages/SinglePage/web3Api.vue'),
    },
    {
      path: '/SinglePage/webApi',
      name: 'SinglePageWebApi',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWebApi" */'@/pages/SinglePage/webApi.vue'),
    },
  ],
}];
export default pathList;
