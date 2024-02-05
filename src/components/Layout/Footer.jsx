import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaInstagram } from "react-icons/fa";
import Font from 'react-font';
import { NavLink } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";

const position = [33.991980191627185, -6.874611381541911];

function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollIntoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    // Show the "Scroll to Top" button when scrolling down
    const scrollY = window.scrollY;

    setShowScrollButton(scrollY > 400);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {/* Scroll to Top Button */}
      <button

        className={`scroll-top-button btn myseeetext bgBrand  shadow-lg d-flex align-items-center justify-content-center   ${showScrollButton ? 'visible' : 'invisible'}`}
        onClick={scrollIntoTop}
      >
        <FaArrowAltCircleUp />
      </button>
      <footer
        className={`footer fw-bold p-1 bgBrand  text-success  mt-auto `}
      >
       
        <div className=" text-center fw-bold  p-2 text-light">
          <p>   © {new Date().getFullYear()} Copyright |{" "} coupdefood.ma</p>

          <Font family="Satisfy">
            <span className="mb-3 mb-md-0">©  made by
              <NavLink
                to={'/'}
                className={'fs-4 myseeetext '}
                style={{ textDecoration: 'none' }}>
                {" "}  Yelmouss
              </NavLink> with <CiHeart /> </span>
          </Font>
        </div>
      </footer>

      <a
        href="https://wa.me/212612753603"
        className="float"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp className="my-float" />
      </a>

      <a
        href="https://www.instagram.com/coupdefood.ma/"
        className="float2"
        target="_blank"
        rel="noreferrer"
      >
        <span className="instagram">
          <FaInstagram className="my-float2" />

        </span>
      </a>


    </>
  );
}

export default Footer;
