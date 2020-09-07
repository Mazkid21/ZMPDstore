import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

function LandingScreen(props) {
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
  return (
    <>
      <div className="grid">
        {/* <!--Left side--> */}
        <div id="photo" className="column effect-hover">
          <div className="content photo">
            <i className="fa fa-camera" aria-hidden="true" />
            <h2>
              Go
              <span>photo</span>
            </h2>
            <h3>Do something amazing</h3>
            <p>And Click</p>
          </div>
        </div>
        {/* <!--Right side--> */}
        <div id="dev" className="column effect-hover">
          <div className="content">
            <i className="fa fa-code effect-hover" aria-hidden="true" />
            <h2>
              Go
              <span>dev</span>
            </h2>
            <h3>Do something amazing</h3>
            <p>And Click</p>
          </div>
        </div>
        {/* <!--Logo--> */}
        <div id="logo">

          <img src="images/logoBW.png" />
        </div>

      </div>

      <div id="photo-overlay" className="overlay">

        <div className="wrapper">
          <div className="sidebar">

            <div className="title">
              PHOTOGRAPHY
              <i className="icon fa fa-bars" />
            </div>
            <ul className="nav">
              <li className="nav-li">
                <a href="#photoAbout" className="active">About</a>
              </li>
              <li className="nav-li">
                <a href="#photoPortfolio" className="">portfolio</a>
              </li>
              {/* <li className="nav-li">
                <a href="#photoStore" className="">Store</a>
              </li> */}
              <li className="nav-li">
                <a href="#photoContact" className="">Contact</a>
              </li>
            </ul>

            <div className="close-icon">
              <div />
              <div />
            </div>

          </div>
          <div className="content">

            <div id="photoAbout">

              <div className="card">
                <h1>Zach Maraziti | Photographer </h1>
                <div className="photo-vcard">
                  <div className="photo-vcard-pic">
                    <img
                      src="https://scontent-den4-1.xx.fbcdn.net/v/t1.0-9/14191951_10208232425102981_7735399459185273756_n.jpg?_nc_cat=100&_nc_ht=scontent-den4-1.xx&oh=9b9adda2762d064a4330400d12717c4b&oe=5D2D6815"
                      alt=""
                    />
                  </div>
                  <ul className="photo-vcard-list">
                    <li>
                      <i className="fa fa-envelope" />
                      ziti@zachmarazitiphotography.com
                    </li>
                    <li>
                      <i className="fa fa-globe" />
                      zmpd.com
                    </li>
                    <li>
                      <i className="fa fa-phone" />
                      (970)452-9404
                    </li>
                    <li>
                      <i className="fa fa-map-marker-alt" />
                      Aspen, CO
                    </li>
                  </ul>

                </div>

                <p>
                  {' '}
                  Born and raised in Aspen Colorado. I grew up skiing, playing
                  hockey, baseball and running around the mountains. I love being outside and enjoying the
                  beauty
                  of the mountains.

                  My love for photography started when I was very young. My mother worked for Mountain Photo
                  and
                  when I was six, I would go with her at night and help to develop all the film from the days
                  shooting. That was my first taste for photography and I fell in love with it right away. As
                  a
                  teenager my mom worked at Anderson Ranch Art Center. During summer break I would go with my
                  mom
                  to work and hang out in the photography building. It was not until high school that I
                  realized
                  photography is what I wanted to do for a career, and I am now living that dream!

                  Contact me for prints or a quote on any photography needs you may have.
                </p>
              </div>

            </div>
            <div id="photoPortfolio">
              <div className="card">

                <h1>portfolio Section </h1>
                <div className="portfolioImgs">

                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/jjnb4z1enizk8d6/CI3A6098-Edit-Edit-2.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/jjnb4z1enizk8d6/CI3A6098-Edit-Edit-2.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/tor402zjvwoams2/CI3A8441.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/tor402zjvwoams2/CI3A8441.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/unqnfucn9b5r4ft/CI3A1969.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/unqnfucn9b5r4ft/CI3A1969.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/fgavvtt749cmeev/DSC00771.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/fgavvtt749cmeev/DSC00771.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/ahqksjbywj0oeq4/CI3A2197.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/ahqksjbywj0oeq4/CI3A2197.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/9rdvlcph123bcdr/DSC00378.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/9rdvlcph123bcdr/DSC00378.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/0kvwtovyll05pn4/CI3A2209.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/0kvwtovyll05pn4/CI3A2209.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/unqnfucn9b5r4ft/CI3A1969.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/unqnfucn9b5r4ft/CI3A1969.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/5ityztivyy38xx8/CI3A2062-5.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/5ityztivyy38xx8/CI3A2062-5.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/u1so9t2wi78isnj/CI3A3100.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/u1so9t2wi78isnj/CI3A3100.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/y6geq93ok72s0xk/CI3A3992.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/y6geq93ok72s0xk/CI3A3992.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/mxswubx3ys03nh5/CI3A4450-Edit-2.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/mxswubx3ys03nh5/CI3A4450-Edit-2.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/hk496frymd6elzv/CI3A4611-Edit.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/hk496frymd6elzv/CI3A4611-Edit.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/hgzdxr6vxcuo03x/CI3A5982.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/hgzdxr6vxcuo03x/CI3A5982.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/wfvnojm51758gju/CI3A7156.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/wfvnojm51758gju/CI3A7156.jpg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/s539e9bu3vj2rkn/File%20Mar%2027%2C%2017%2002%2018.jpeg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/s539e9bu3vj2rkn/File%20Mar%2027%2C%2017%2002%2018.jpeg?raw=1"
                      alt=""
                    />
                  </a>
                  <a
                    className="grouped_elements fancyboxPhoto"
                    href="https://www.dropbox.com/s/1y769013vg9hye5/NYEfirework2.jpg?raw=1"
                  >
                    <img
                      src="https://www.dropbox.com/s/1y769013vg9hye5/NYEfirework2.jpg?raw=1"
                      alt=""
                    />
                  </a>

                </div>

              </div>
            </div>

            {/* <div id="photoStore">
              <div className="card">
                <h1>Store</h1>

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
            </div> */}

            <div id="photoContact">
              <div className="card">
                <h1>Contact Section </h1>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div id="dev-overlay" className="overlay">
        <div className="wrapper">
          <div className="sidebar">

            <div className="title">
              DEVELOPMENT
              <i className="icon fa fa-bars" />
            </div>
            <ul className="nav">
              <li className="nav-li">
                <a href="#devAbout" className="active">About</a>
              </li>
              <li className="nav-li">
                <a href="#devPortfolio" className="">portfolio</a>
              </li>
              <li className="nav-li">
                <a href="#devContact" className="">Contact</a>
              </li>

            </ul>

            <div className="close-icon">
              <div />
              <div />
            </div>

          </div>
          <div className="content">

            <div id="devAbout">
              <div className="card">
                <h1 style={{ marginTop: 0 }}>ABOUT Section </h1>
                <p>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet, magna in
                  iaculis consequat, eros ex viverra magna, a viverra orci massa tempor nibh. Sed a consequat
                  lectus. Fusce in aliquet augue, quis lobortis magna. Aenean varius aliquet magna in
                  bibendum. Integer sagittis nulla quis arcu facilisis molestie. Sed placerat luctus leo, sit
                  amet scelerisque nibh posuere sed. Integer luctus consectetur urna. Donec quis lobortis
                  tortor. Fusce eget dapibus arcu.

                  Duis varius aliquet quam, non pulvinar nisl sollicitudin sit amet. In feugiat dignissim
                  dapibus. Duis aliquet, erat vel convallis euismod, nisl tellus efficitur nisi, et tristique
                  sapien massa a ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada
                  fames ac turpis egestas. Donec dapibus porttitor dignissim. Fusce quam odio, efficitur quis
                  quam interdum, aliquam vestibulum dui. Nulla facilisi. Pellentesque vel bibendum tellus.
                  Proin tincidunt ac ipsum sed commodo. Etiam finibus molestie risus id lobortis. Morbi quis
                  mauris vel justo imperdiet volutpat quis facilisis urna. Phasellus id augue faucibus,
                  ultrices nibh eget, convallis orci.
                </p>
              </div>
            </div>

            <div id="devPortfolio">

              <div className="card">
                <h1>portfolio Section </h1>

                <section className="gallery">
                  <div className="row">
                    <ul>
                      <a href="#" className="close" />
                      <li>
                        <a href="#item01">
                          <img src="images/WileyMaple.png" alt="" />
                        </a>
                      </li>

                      <li>
                        <a href="#item02">
                          <img src="images/aspenDailyNews.png" alt="" />
                        </a>
                      </li>

                      <li>
                        <a href="#item03">
                          <img src="images/BobbyMoyer.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a className="image" href="#item04">
                          <img src="images/brit.png" alt="" />
                        </a>
                      </li>

                    </ul>
                  </div>

                  <div id="item01" className="port">

                    <div className="row">
                    <img src="images/WileyMaple.png" alt="" />
                      <div className="description">
                        <h1>Wiley Maple</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis libero erat. Integer ac purus est. Proin erat mi, pulvinar ut magna eget, consectetur auctor turpis.</p>
                      </div>

                     
                    </div>
                  </div>

                  <div id="item02" className="port">

                    <div className="row">
                      <div className="description">
                        <h1>Aspen Daily News</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis libero erat. Integer ac purus est. Proin erat mi, pulvinar ut magna eget, consectetur auctor turpis.</p>
                      </div>
                      <img src="images/aspenDailyNews.png" alt="" />
                    </div>

                  </div>

                  <div id="item03" className="port">

                    <div className="row">
                      <div className="description">
                        <h1>Bobby Moyer</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis libero erat. Integer ac purus est. Proin erat mi, pulvinar ut magna eget, consectetur auctor turpis.</p>
                      </div>
                      <img src="images/BobbyMoyer.png" alt="" />
                    </div>

                  </div>

                  <div id="item04" className="port">

                    <div className="row">
                      <div className="description">
                        <h1>Real Estate Agent</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis libero erat. Integer ac purus est. Proin erat mi, pulvinar ut magna eget, consectetur auctor turpis.</p>
                      </div>
                      <img src="images/brit.png" alt="" />
                    </div>

                  </div>

                </section>

              </div>
            </div>

            <div id="devContact">
              <div className="card">
                <h1>Contact Section </h1>

                <div id="contact-area">

                  <form method="post" action="contactengine.php">

                    <input type="text" name="Name" id="Name" placeholder="Full Name" />

                    <input type="text" name="City" id="City" placeholder="City" />

                    <input type="text" name="Email" id="Email" placeholder="Email" />

                    <input type="text" name="Phone" id="Phone" placeholder="Phone" />

                    <textarea
                      name="Message"
                      rows="20"
                      cols="20"
                      id="Message"
                      placeholder="Message"
                    />

                    <input type="submit" name="submit" value="Submit" className="submit-button" />
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div id="photo-single" className="overlay">
        <div className="grid">
          <div className="column">
            <div className="portfolio-content">
              <h1> Photo </h1>
              <h1> YAY </h1>
              <h1> YAY </h1>
              <h1> YAY </h1>
              <h1> YAY </h1>
            </div>
          </div>
        </div>
        <div className="close-icon">
          <div />
          <div />
        </div>
      </div>

      <div id="dev-single" className="overlay">
        <div className="grid">
          <div className="column">
            <div className="portfolio-content">
              <h1> DEV </h1>
              <h1> YAY yy</h1>
              <h1> YAY yy</h1>
              <h1> YAY </h1>
              <h1> YAY </h1>
            </div>
          </div>
        </div>
        <div className="close-icon">
          <div />
          <div />
        </div>
      </div>
    </>
  );
}
export default LandingScreen;
