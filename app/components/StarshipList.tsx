import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/main.module.css';
import { Grid, Row, Column, Button, Pagination, Search } from '@carbon/react';
import Loader from './Loader';

interface StarshipListProps {
  onBuy: (item: { name: string; quantity: number }) => void; 
}

interface Starship {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
}

const StarshipList: React.FC<StarshipListProps> = ({ onBuy }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalShips, setTotalShips] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const PAGE_SIZE = 10;
  const PAGE_SIZES = [10];

  useEffect(() => {
    const fetchStarships = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/starships/?page=${currentPage}`);
        setTotalShips(data?.count || 0);
        setStarships(data?.results || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch starships:", err);
        setError("Failed to fetch starships. Please try again later.");
      }
      setLoading(false);
    };

    fetchStarships();
  }, [currentPage]);

  const handleQuantityChange = (index: number, change: number) => {
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[index] || 0) + change;
      return { ...prevQuantities, [index]: Math.max(0, newQuantity) };
    });
  };

  const handleBuy = (starship: Starship, index: number) => {
    const quantity = quantities[index] || 0;
    if (quantity > 0) {
      const itemToAdd = { name: starship.name, quantity };
      onBuy(itemToAdd); 
      setQuantities(prevQuantities => ({ ...prevQuantities, [index]: 0 }));
    }
  };

  const handlePaginationChange = ({ page }: { page: number; pageSize: number }) => {
    setCurrentPage(page);
  };

  const filteredStarships = starships.filter(starship =>
    starship.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (filteredStarships.length === 0) return <div>No starships available.</div>;

  return (
    <div className={styles.starshipList}>
      <Search
        size="lg"
        placeholder="Find your spaceship"
        labelText="Search"
        closeButtonLabelText="Clear search input"
        id="search-1"
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault(); 
          }
        }}
      />

      {filteredStarships.map((starship, index) => (
        <div key={index} className={styles.card}>
          <Row className={styles.starshipRow}>
            <Grid>
              <Column sm={3} md={10} lg={10}>
                <h2 className={styles.starshipItem}>{starship.name}</h2>
                <p className={styles.semibold}>Model: {starship.model}</p>
                <p>Class: {starship.starship_class}</p>
                <p>Manufacturer: {starship.manufacturer}</p>
                <p>Cost in Credits: {starship.cost_in_credits}</p>
              </Column>
              <Column sm={3} md={6} lg={3}>
                <div className={styles.quantityControls}>
                  <Button kind="tertiary" onClick={() => handleQuantityChange(index, -1)}>-</Button>
                  <span>{quantities[index] || 0}</span>
                  <Button kind="tertiary" onClick={() => handleQuantityChange(index, 1)}>+</Button>
                  <Button className={`${styles.buyButton} buy-button`} kind="primary" onClick={() => handleBuy(starship, index)}>Buy</Button>
                </div>
              </Column>
            </Grid>
          </Row>
        </div>
      ))}

      <Pagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        pageSizes={PAGE_SIZES} 
        totalItems={totalShips}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default StarshipList;
