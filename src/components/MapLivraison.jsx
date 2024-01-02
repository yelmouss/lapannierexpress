import React from 'react'
import { MapContainer, TileLayer, LayerGroup, Circle, Marker, Popup } from "react-leaflet";
import { Container, Button } from "react-bootstrap";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const fillBlueOptions = { fillColor: 'blue' }
// const fillRedOptions = { fillColor: 'red' }
const greenOptions = { color: 'green', fillColor: 'green' }
// const purpleOptions = { color: 'purple' }
const position = [ 34.020882, -6.841650];

function MapLivraison() {
    return (
        <Container className='p-5'>

            <h2>Nous assurons la livraison sur Rabat et sur un rayon de 30 km</h2>
            <hr />
            <MapContainer
                center={position}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: "800px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                    Rachaaa. <br /> je t'aime
                    </Popup>
                  </Marker>

                <LayerGroup>
                    <Circle
                        center={position}
                        pathOptions={greenOptions}
                        radius={10000}
                    />
                </LayerGroup>
            </MapContainer>
        </Container>
    )
}

export default MapLivraison