import React, { useEffect } from 'react';
import './Services.css';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';



const Services = ({services, setServices, orderInfo, setOrderInfo}) => {
  const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  let [letSpring, setLetSpring] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));

  useEffect(() => {
    fetch('https://arcane-basin-83215.herokuapp.com/services')
    .then(res => res.json())
    .then(data => setServices(data));
  }, [setServices]);
  console.log(services);

  
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="py-5 px-3">
          <div className="text-center">
            <h3 className="text-uppercase">Our services</h3>
            <hr className="w-25" />
            <p>Our professionals will create social media ads (i.e. Facebook, Instagram, Youtube, etc.), simple 2D animations, corporate or business promos, etc.</p>
          </div>

          <div className="text-center">

            <div className="row">
              {
                services.map(service => {
                  const {serviceTitle, image, description, price, _id} = service;
                  const handleOrder = () => {
                    const newOrder = {...orderInfo};
                    newOrder.id = _id;
                    newOrder.serviceName = serviceTitle;
                    newOrder.serviceDetail = description;
                    newOrder.image = image;
                    newOrder.price = price;
                    // newOrder.email = loggedInUser.email || sessionStorage.getItem("email");
                    // newOrder.ownerName = loggedInUser.name || sessionStorage.getItem("name");
                    setOrderInfo(newOrder);
                  }
                  
                  return (
                    <div className="col-md-4" key={_id}>
                      <div className="single-service p-2">
                        <Link to="/panel/customar/book">
                          <div className="service-icon d-flex justify-content-center" onClick={handleOrder}>
                            <animated.div
                              className={_id}
                              onMouseMove={({ clientX: x, clientY: y }) => setLetSpring({ xys: calc(x, y) })}
                              onMouseLeave={() => setLetSpring({ xys: [0, 0, 1] })}
                              style={{ transform: letSpring.xys.interpolate(trans), background: "none", border: "none" }}
                            >
                              <div className="main-icon d-flex justify-content-center align-items-center">
                                <img src={image} alt={serviceTitle} style={{width:"100px", height:"100px", padding:"5px"}} className="rounded-circle" />
                              </div>
                            </animated.div>
                          </div>
                        </Link>
                        <Link to="/panel/customar/book">
                          <h6 className="text-uppercase font-weight-400 pt-4 pb-3" onClick={handleOrder}>
                            <span className="service-name-style">{serviceTitle}</span>
                          </h6>
                        </Link>
                        <p className="font-weight-300">{description}<br />We provide top-notch service for import and domestic car repairs. Servicing Brakes, Tune Ups, Engine Repairs</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;