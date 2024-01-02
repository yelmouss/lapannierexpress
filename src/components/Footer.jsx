import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
const position = [33.991980191627185, -6.874611381541911];

function Footer({ dark, updateDark }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollIntoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    // Show the "Scroll to Top" button when scrolling down
    const scrollY = window.scrollY;
    setShowScrollButton(scrollY > 100);
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
      <Button
        variant="success"
        className="scroll-top-button d-flex align-items-center  "
        onClick={scrollIntoTop}
      >
       <FaArrowAltCircleUp />
      </Button>
      <footer
        className={`footer fw-bold p-5  ${dark
            ? "bg-light bg-opacity-25 text-light "
            : "bg-black bg-opacity-25  text-success"
          }`}
      >
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-6">
              <Container>
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "250px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </Container>
            </div>

            <div className="col-md-4 col-lg-6  rounded">
            <hr />
              <h6 className="text-uppercase font-weight-bold  rounded">
                Infos Contact
              </h6>

              <br />
           
              <div className="text-start">
                <p>
                  <i className="fas fa-envelope mr-3"></i> blabla@blabla.com
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  blabla.blabla@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 212 612 000 000
                </p>
                <p>
                  <i className="fas fa-home mr-3"></i> Rabat, Agdal 10095, MA
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className=" text-center fw-bold bg-black p-2 bg-opacity-50 text-light">
          <p>   © {new Date().getFullYear()} Copyright :{" "}</p>
          <a
            className="text-warning"
            target={"_blank"}
            href="http://yelmouss.com/"
            rel="noreferrer"
          >
            yelmouss.com
          </a>
          <p>Made by Imad Jouiet. All rights reserved.</p>
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


    </>
  );
}

export default Footer;
