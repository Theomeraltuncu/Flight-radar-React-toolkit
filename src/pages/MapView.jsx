import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { Polyline } from "react-leaflet";
import { setPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const { flights, path } = useSelector((store) => store.flight);

  const dispatch = useDispatch();

  const planeIcon = icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  });

  return (
    <div>
      <MapContainer
        center={[47.925195, 17.095619]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}

        {flights.map((flight) => (
          <Marker
            key={flight.id}
            icon={planeIcon}
            position={[flight.lat, flight.lng]}
          >
            <Popup>
              <div className="d-flex flex-column gap-2">
                <span>Code: {flight.code}</span>
                <button
                  onClick={() => setDetailId(flight.id)}
                  className="w-100 bg-black text-white fw-bold"
                >
                  Detail
                </button>

                {path.length > 0 && (
                  <button onClick={() => dispatch(setPath([]))}>
                    Clear Route
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={path} />
      </MapContainer>
    </div>
  );
};

export default MapView;
