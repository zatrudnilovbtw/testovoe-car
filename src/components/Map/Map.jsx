import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdClose } from "react-icons/md";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const VehicleMap = ({ vehicles, selectedVehicle, onClose }) => {
  const center = selectedVehicle
    ? [selectedVehicle.latitude, selectedVehicle.longitude]
    : vehicles.length > 0
    ? [vehicles[0].latitude, vehicles[0].longitude]
    : [55.753332, 37.621676];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Карта автомобилей</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        <MapContainer
          center={center} 
          zoom={30} 
          style={{ height: "500px", width: "100%" }} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={[vehicle.latitude, vehicle.longitude]}
            >
              <Popup>{vehicle.name} - {vehicle.price} ₽</Popup>
            </Marker>
          ))}
          {selectedVehicle && (
            <Marker
              position={[selectedVehicle.latitude, selectedVehicle.longitude]}
            >
              <Popup>
                <strong>{selectedVehicle.name}</strong> - {selectedVehicle.price} ₽
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default VehicleMap;