import React, { useState } from 'react'
import styles from './Header.module.css'
import { LuSettings2 } from "react-icons/lu";
import SortPanel from '../SortPanel/SortPanel';


const Header = ({ onSort, onSearch, searchTerm: externalSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(externalSearchTerm || '');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSort = () => {
    setIsSortModalOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Искать машину..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button 
            className={styles.sortButton}
            onClick={handleSort}
            title="Sort options"
          >
            <LuSettings2 />
          </button>
        </div>
      </div>
      
      <SortPanel
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSort={onSort}
      />
    </header>
  );
};

export default Header