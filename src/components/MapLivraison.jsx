import React from 'react'
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { Container, Button } from "react-bootstrap";

const center = [34.020882, -6.841650];
const polygon = [
    [33.87878109499991, -7.050219708483017],
    [33.75517916545401, -6.912146670514288],
    [33.980572417445586, -6.726293897434756],
    [34.08357960989204, -6.793297271322962],
    // [33.78204303490857, -7.266369611198226],
]

const limeOptions = { color: '#618264' }

function MapLivraison() {
    return (
        <>
            <Container className='p-5' fluid>
                <h2 className='fs-1 text-success fw-bold text-center'>Nous assurons la livraison gratuite à Rabat</h2>
                <hr className='style-seven' />
                <MapContainer center={center} zoom={10} scrollWheelZoom={false} style={{ height: "500px" }} className='rounded shadow-lg'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polygon pathOptions={limeOptions} positions={polygon} />
                </MapContainer>
            </Container>
        </>
    )
}
export default MapLivraison