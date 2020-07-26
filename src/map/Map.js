import React from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { geolocated } from 'react-geolocated';

const DEFAULT_LATITUDE = 1.3521;
const DEFAULT_LONGITUDE = 103.8198;

const myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})


class OneMap extends React.Component {
    state = {
        results: [],
        popupdata: null,
        query: 'primary',
        term: '',
        DisplayIcon: null,
        search: '',
    }
    FetchApi = (query) => {
        fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${query}&returnGeom=Y&getAddrDetails=Y`)
            .then(res => res.json())
            .then(result => {
                const { results } = result;
                this.setState({ results })
            })
    }

    hanlesubmit = (e) => {
        e.preventDefault();
        this.setState({
            term: this.state.query
        })
        this.FetchApi(this.state.term)
    }


    componentDidMount() {
        this.FetchApi("School")
    }


    render() {

        const langitude = this.props.coords ? this.props.coords.langitude : DEFAULT_LONGITUDE;
        const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
        return (
            <div className="container">
                <div className="inner-container">
                    <Map maxZoom={30} maxBounds={[[1.56073, 104.1147], [1.16, 103.502]]} className="map" center={[latitude, langitude]} zoom={12}>
                        <TileLayer
                            attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                            url="https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png"
                        />
                        {this.state.results.map((item) => {
                            return (
                                <Marker key={item.ADDRESS}
                                    icon={myIcon}
                                    position={[item.LATITUDE, item.LONGITUDE]}
                                    onmouseover={() => this.setState({ popupdata: item })}
                                />
                            )
                        })}
                        {
                            this.state.popupdata &&
                            <Popup
                                position={[this.state.popupdata.LATITUDE, [this.state.popupdata.LONGITUDE]]}
                                onClose={() => this.setState({ popupdata: null })}
                            >
                                <div>
                                    <h4>{this.state.popupdata.BUILDING}</h4>
                                    <p>{this.state.popupdata.ADDRESS}</p>
                                </div>
                            </Popup>
                        }
                    </Map>
                </div>
                <form onSubmit={this.hanlesubmit}>
                    <input className="search-box" type="text" max="5" onChange={(e) => this.setState({ term: e.target.value })} required />
                    <input className="btn" type="submit" value="Search" />
                </form>
            </div>
        )
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 1000
})(OneMap);