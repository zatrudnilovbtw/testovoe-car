import Header from "./components/Header/Header"
import { BeatLoader } from 'react-spinners'
import VehicleList from "./components/VehicleList/VehicleList"
import VehicleMap from "./components/Map/Map"
import { fetchVehicles } from "./services/api"
import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [vehicles, setVehicles] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showMap, setShowMap] = useState(false)
  
  const handleEdit = (id, updatedData)=>{
    const updatedVehicles = vehicles.map(vehicle=>
      vehicle.id === id ? { ...vehicle, ...updatedData } : vehicle
    );
    setVehicles(updatedVehicles);
    setFilteredVehicles(
      filteredVehicles.map(vehicle =>
        vehicle.id === id ? { ...vehicle, ...updatedData } : vehicle
      )
    );
  }
  
  const handleDelete = (id)=>{
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles); 
  }

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowMap(true);
  }

  const handleCloseMap = () => {
    setShowMap(false);
  }

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles()
        setVehicles(data)
        setFilteredVehicles(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    getVehicles()
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredVehicles(vehicles);
      return;
    }
    
    const searchTermLower = term.toLowerCase();
    const filtered = vehicles.filter(vehicle => {
      return (
        vehicle.name.toLowerCase().includes(searchTermLower) ||
        (vehicle.model && vehicle.model.toLowerCase().includes(searchTermLower)) ||
        (vehicle.year && vehicle.year.toString().includes(searchTermLower)) ||
        (vehicle.color && vehicle.color.toLowerCase().includes(searchTermLower))
      );
    });
    
    setFilteredVehicles(filtered);
  };
 
  const handleSort = (field, direction) => {
    const sortedVehicles = [...filteredVehicles];
    
    sortedVehicles.sort((a, b) => {
      if (field === 'name') {
        return direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (field === 'price') {
        return direction === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      }
      return 0;
    });
    
    setFilteredVehicles(sortedVehicles);
  };

  if (loading){
    return <BeatLoader/>
  }
  if (error){
    return <p>Ошибка: {error.message}</p>
  }
  
  return (
   <div className="app-container">
      <Header onSort={handleSort}
       onSearch={handleSearch}
       searchTerm={searchTerm} />
      <VehicleList 
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSelect={handleSelect}
      vehicles={filteredVehicles}/>
      
      {showMap && (
        <VehicleMap 
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onClose={handleCloseMap}
        />
      )}
   </div>
  )
}

export default App