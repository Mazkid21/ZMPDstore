import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/ProductScreen';
import OrderDetailsScreen from './screens/OrderScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShipppingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';
import AdminProductsScreen from './screens/ProductsScreen';
import AdminOrdersScreen from './screens/OrdersScreen';
import PrivateRoute from './components/PrivateRoute';
import LandingScreen from './screens/LandingScreen';


function App() {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { categories, loading, error } = productCategoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, []);
  const openSidebar = () =>
    document.querySelector('.sidebar').classList.add('open');
  const closeSidebar = () =>
    document.querySelector('.sidebar').classList.remove('open');

  return (
    <BrowserRouter>
    
          <PrivateRoute
            userInfo={userInfo}
            path="/shipping"
            component={ShippingScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/payment"
            component={PaymentScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/placeorder"
            component={PlaceOrderScreen}
          />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute
            userInfo={userInfo}
            path="/profile"
            component={ProfileScreen}
          />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={DetailsScreen} />
          <PrivateRoute
            userInfo={userInfo}
            path="/order/:id"
            component={OrderDetailsScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/products"
            component={AdminProductsScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/orders"
            component={AdminOrdersScreen}
          />
          <Route path="/category/:id" component={HomeScreen} />
          <Route path="/" exact component={LandingScreen} />
          <Route path="/store" component={HomeScreen} />
    </BrowserRouter> 
  );
}

export default App;
