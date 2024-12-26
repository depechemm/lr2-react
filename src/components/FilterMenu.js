import React from 'react';
import './FilterMenu.css';

const FilterMenu = ({ sortBy, setSortBy }) => {
  return (
    <div className="filter-menu">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name-asc">Сортировать по названию (А-Я)</option>
        <option value="name-desc">Сортировать по названию (Я-А)</option>
        <option value="price-asc">Сортировать по цене (сначала дешевые)</option>
        <option value="price-desc">Сортировать по цене (сначала дорогие)</option>
      </select>
    </div>
  );
};

export default FilterMenu;
