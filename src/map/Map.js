import React, { useEffect, useState } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import hIcon from './../icons/clinic-64.png'
import school from './../icons/school-64.png'
import supermarket from './../icons/cart-70-64.png'
import bIcon from './../icons/bus-64.png'
import rIcon from './../icons/restaurant-3-64.png'
const SchoolIcons = L.icon({
    iconUrl: school,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0. - 41]
})
const HospitalIcons = L.icon({
    iconUrl: hIcon,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0. - 41]
})
const SuperMarketIcons = L.icon({
    iconUrl: supermarket,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0. - 41]
})
const BusIcons = L.icon({
    iconUrl: bIcon,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0. - 41]
})

const RIcons = L.icon({
    iconUrl: rIcon,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0. - 41]
})

export default function OneMap() {

    const [school, setSchool] = useState([])
    const [popupdata, setPopupData] = useState(null);
    const [term, setTerm] = useState()
    const [DisplayIcon,setDisplayIcon]=useState(null);
    useEffect(() => {
        fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${term}&returnGeom=Y&getAddrDetails=Y`)
            .then(res => res.json())
            .then(result => {
                const { results } = result;
                setSchool(results)
            })
    }, [term])

    const handleSchool = (e) => {
        e.preventDefault();
        setTerm("School")
        setDisplayIcon(SchoolIcons)
    }
    const handleHospital = (e) => {
        e.preventDefault();
        setTerm("hospital")
        setDisplayIcon(HospitalIcons)
    }
    // const handlePharmacy = (e) => {
    //     e.preventDefault();
    //     setTerm("pharmacy")
    // }
    const handleSupermarket = (e) => {
        e.preventDefault();
        setTerm("SuperMarket")
        setDisplayIcon(SuperMarketIcons)
    }
    const handleBusStop = (e) => {
        e.preventDefault();
        setTerm("Bus")
        setDisplayIcon(BusIcons)
    }
    const handleHawker = (e) => {
        e.preventDefault();
        setTerm("hawker")
        setDisplayIcon(RIcons)
    }
    return (
        <div className="container">
            <div className="inner-container">
                <Map maxZoom={30}  maxBounds={[[1.56073, 104.1147], [1.16, 103.502]]} className="map" center={[1.3521, 103.8198]} zoom={12}>
                    <TileLayer
                        attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                        url="https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png"
                    />
                    {school.map((item) => {
                        return (
                            <Marker
                                key={item.ADDRESS}
                                icon={DisplayIcon}
                                position={[item.LATITUDE, item.LONGITUDE]}
                                onmouseover={() => setPopupData(item)}
                            />
                        )
                    })}
                    {popupdata && (
                            <Popup 
                                position={[popupdata.LATITUDE, [popupdata.LONGITUDE]]}
                                onClose={() => setPopupData(null)}
                            >
                                <div>
                                    <h1>{popupdata.BUILDING}</h1>
                                    <p>{popupdata.ADDRESS}</p>
                                </div>
                            </Popup>
                        )}
                </Map>
            </div>
                <button onClick={handleSchool}>Show School</button>
            <button onClick={handleSupermarket}>Show Super Market</button>
            <button onClick={handleHospital}>Show Health Care provider</button>
            {/* <button onClick={handlePharmacy}>Show Pharmacy</button> */}
            <button onClick={handleBusStop}>Show Bus Stops</button>
            <button onClick={handleHawker}>Show Hawker Centre</button>

        </div>
    )

}