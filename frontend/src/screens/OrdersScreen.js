import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { listProductCategories } from '../actions/productActions';

function AdminOrdersScreen() {
  const dispatch = useDispatch();

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order));
  };

  const orderList = useSelector((state) => state.orderList);
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const orderDelete = useSelector((state) => state.orderDelete);

  const { loading, orders, error } = orderList;
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  
  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);
  console.log(orders);

////////////////////////////////////
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

  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
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
      <div className="content content-margined">
        <h3>Orders</h3>
        {orders.length === 0 ? (
          <div className="empty-list">
            There is no orders.
          </div>
        )
          : (
           
            <table>
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    USER
                  </th>
                  <th>
                    DATE
                  </th>
                  <th>
                    TOTAL
                  </th>
                  <th>
                    PAID
                  </th>
                  <th>
                    DELIVERED
                  </th>
                  <th>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order._id}
                    </td>
                    <td>
                      {/* {order.user.isAdmin.toString()}  */}
                    </td>
                    <td>
                      {order.createdAt}
                    </td>
                    <td>
                      {order.totalPrice}
                    </td>
                    <td>
                      {order.isPaid.toString()}
                    </td>
                    <td>
                      {order.isDelivered.toString()}
                    </td>
                    <td>
                      <Link className="button" to={`/order/${order._id}?ref=/orders`}>Details</Link>
                      {' '}
                      <button type="button" onClick={() => deleteHandler(order)} className="button">Delete</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      </div>
    );
}
export default AdminOrdersScreen;
