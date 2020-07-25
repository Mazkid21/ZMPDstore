import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShipping } from '../actions/cartActions';
import { listProductCategories } from '../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

function ShippingScreen(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({
      address, city, postalCode, country,
    }));
    props.history.push('/payment');
  };

///////

const productCategoryList = useSelector((state) => state.productCategoryList);
const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
  
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const { categories, loading: loadingCat, error: errorCat } = productCategoryList;

useEffect(() => {
  dispatch(listProductCategories());
  return () => {
    //
  };
}, []);
const openSidebar = () =>
  document.querySelector('.sidebar-homescreen').classList.add('open');
const closeSidebar = () =>
  document.querySelector('.sidebar-homescreen').classList.remove('open');

  return (
    <div className="cart-container">
    <header className="header">
          <div className="brand">
            <button type="button" onClick={openSidebar}>
              &#9776;
            </button>
            <Link to="/">ZMPD</Link>
          </div>
          <div className="header-links">
            {cartItems.length !== 0 && (
              <div className="badge">{cartItems.length}</div>
            )}
            <Link className="header-link" to="/cart">
              Cart
            </Link>

            {userInfo ? (
              <>
                <Link className="header-link" to="/profile">
                  {userInfo.name}
                </Link>
                {userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link className="header-link" to="#admin">
                      Admin
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link className="header-link" to="/products">
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link className="header-link" to="/orders">
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link className="header-link" to="/signin">
                {' '}
                Sign in
              </Link>
            )}
          </div>
        </header>
        <aside className="sidebar-homescreen">
          <ul className="categories">
            <li>
              <h3>Shopping Categories</h3>
              <button
                type="button"
                className="sidebar-homescreen-menu-close"
                onClick={closeSidebar}
              >
                x
              </button>
            </li>
            {loadingCat ? (
              <li>
                <LoadingBox />
              </li>
            ) : errorCat ? (
              <li>
                <ErrorBox message={errorCat} />
              </li>
            ) : categories.length === 0 ? (
              <li className="empty-list">There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li key={x}>
                  <Link onClick={closeSidebar} to={`/category/${x}`}>
                    {x}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">City </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="postalCode">Postal Code </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="country">Country </label>
              <input
                type="text"
                name="country"
                id="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>
            <li>
              <button
                type="submit"
                className="button primary"
              >
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    </div>
  );
}
export default ShippingScreen;
