import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts, listProductCategories } from '../actions/productActions';
import { Link } from 'react-router-dom';

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : '';
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder));
    return () => {
      //
    };
  }, [dispatch, category]);
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, e.target.value));
  };
  const { loading, products, error } = productList;


  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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
   
      <div className="grid-container">
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
        <main onClick={closeSidebar} className="main">
        <div className="content">
      {category
        && (
          <h1>
            {category}
          </h1>
        )}
      <ul className="filter">
        <li>
          <form onSubmit={searchHandler}>
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

        </li>
        <li>
          Sort by
          {' '}
          <select value={sortOrder} onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>

      {loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
        : products.length === 0 ? (
          <div className="empty-list">
            There is no products.
          </div>
        )
          : (
            <ul className="products">
              {products.map((product) => (
                <Product key={product._id} {...product} />
              ))}
            </ul>
          )}
    </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div> 
    
    
  );
}
export default HomeScreen;
