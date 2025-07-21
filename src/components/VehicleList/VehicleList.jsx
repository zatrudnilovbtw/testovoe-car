import styles from './VehicleList.module.css';
import React from 'react'
import VehicleCard from '../VehicleCard/VehicleCard';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const VehicleList = ({ vehicles, onEdit, onDelete, onSelect }) => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className={styles.cardWrapper}>
                        <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onSelect={onSelect} />
                    </div>
                ))}
            </div>
            <div><ScrollToTop/></div>
        </div>
    )
}

export default VehicleList

