
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
    }],
}];
export default pathList;
