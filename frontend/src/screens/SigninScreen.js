import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProductCategories } from '../actions/productActions';

function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const productCategoryList = useSelector((state) => state.productCategoryList);

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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          {error && (
            <li>
              <ErrorBox message={error} />
            </li>
          )}
          {loading && (
            <li>
              <LoadingBox />
            </li>
          )}

          <li>
            <label htmlFor="email">Email </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">Sign in</button>
          </li>
          <li>New to ZMPD?</li>
          <li>
            <Link
              to={redirect === '/' ? '/register' : `/register?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Create Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
    </div>
  );
}
export default SigninScreen;
