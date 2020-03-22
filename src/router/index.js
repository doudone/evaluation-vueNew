import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import AppIndex from '../components/home/AppIndex'
import Home from '../components/Home'
import ProductList from '../components/home/ProductList'
import Banner__ from "../components/banner/Banner__";
import Page from "../components/util/Page";
import SlideButton from "../components/util/SlideButton";
import ImgUpload from "../components/util/ImgUpload";
import OrderDemo from "../components/home/OrderDemo";
import SolveProject from "../components/home/SolveProject";
import BusinessConsulting from "../components/banner/BusinessConsulting";
import Personage from "../components/home/Personage";
import Slider from '../components/util/Slider'
// 导入刚才编写的组件
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex
    },
    {
      path: '/home/productList',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/banner',
      name: 'Banner__',
      component: Banner__
    },
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/slideButton',
      name: 'SlideButton',
      component: SlideButton
    },{
      path: '/util/imgUpload',
      name: 'ImgUpload',
      component: ImgUpload
    },{
      path: '/home/orderDemo',
      name: 'OrderDemo',
      component: OrderDemo
    },{path: '/home/solveProject',
      name: 'SolveProject',
      component:SolveProject
    },{
      path: '/banner/businessConsulting',
      name: 'BusinessConsulting',
      component:BusinessConsulting
  },{
      path: '/home/personage',
      name: 'Personage',
      component:Personage
    },{
      path: '/util/slider',
      name: 'Slider',
      component:Slider
    }
  ]
})
