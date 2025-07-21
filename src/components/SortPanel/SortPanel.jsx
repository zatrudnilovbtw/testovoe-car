
import { useState } from 'react';
import styles from './SortPanel.module.css';

const SortPanel = ({ isOpen, onClose, onSort }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSubmit = () => {
    onSort(sortField, sortDirection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Сортировка</h2>
        
        <div className={styles.formGroup}>
          <label>Сортировать по:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="sortField"
                value="name"
                checked={sortField === 'name'}
                onChange={() => setSortField('name')}
              />
              Названию
            </label>
            <label>
              <input
                type="radio"
                name="sortField"
                value="price"
                checked={sortField === 'price'}
                onChange={() => setSortField('price')}
              />
              Цене
            </label>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Направление:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="sortDirection"
                value="asc"
                checked={sortDirection === 'asc'}
                onChange={() => setSortDirection('asc')}
              />
              По возрастанию
            </label>
            <label>
              <input
                type="radio"
                name="sortDirection"
                value="desc"
                checked={sortDirection === 'desc'}
                onChange={() => setSortDirection('desc')}
              />
              По убыванию
            </label>
          </div>
        </div>
        
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.applyButton} onClick={handleSubmit}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortPanel;