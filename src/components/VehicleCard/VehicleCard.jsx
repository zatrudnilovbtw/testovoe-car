import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ vehicle, onEdit, onDelete, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(vehicle.name);
  const [price, setPrice] = useState(vehicle.price);

  const handleSave = (e) => {
    e.stopPropagation();
    onEdit(vehicle.id, { name, price });
    setIsEditing(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Удалить ${vehicle.name}?`)) {
      onDelete(vehicle.id);
    }
  };

  const handleMapClick = () => {
    onSelect(vehicle);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setName(vehicle.name);
    setPrice(vehicle.price);
    setIsEditing(false);
  };

  if (!vehicle) return null;

  return (
    <div className={styles.card} onClick={handleMapClick}>
      <div className={styles.cardContent}>
        {isEditing ? (
          <div className={styles.editForm}>
            <div className={styles.inputGroup}>
              <label>Название:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Название"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Цена:</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Цена"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className={styles.editButtons}>
              <button onClick={handleSave} className={styles.saveBtn}>Сохранить</button>
              <button onClick={handleCancelClick} className={styles.cancelBtn}>Отмена</button>
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              {vehicle.name} {vehicle.model} {vehicle.year}
            </h1>
            <div className={styles.info}>
              <span className={styles.color}>Цвет: {vehicle.color}</span>
            </div>
            <div className={styles.price}>{vehicle.price} ₽</div>
          </>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.deleteBtn}`}
          onClick={handleDeleteClick}
        >
          <MdDelete size={20} />
        </button>
        <button
          className={`${styles.button} ${styles.editBtn}`}
          onClick={handleEditClick}
        >
          <FaPen size={18} />
        </button>
        <button 
          className={`${styles.button} ${styles.mapBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            handleMapClick();
          }}
        >
          <FaMapMarkedAlt />
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;