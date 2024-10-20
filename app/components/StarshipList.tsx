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

const starshipImages: { [key: string]: string } = {
  "CR90 corvette": "https://starwars-visualguide.com/assets/img/starships/2.jpg",
  "Star Destroyer": "https://starwars-visualguide.com/assets/img/starships/3.jpg",
  "Sentinel-class landing craft": "https://starwars-visualguide.com/assets/img/starships/5.jpg",
  "Imperial shuttle": "https://starwars-visualguide.com/assets/img/starships/6.jpg",
  "Slave 1": "https://starwars-visualguide.com/assets/img/starships/21.jpg",
  "Imperial Speeder Bike": "https://starwars-visualguide.com/assets/img/starships/9.jpg",
  "A-wing": "https://starwars-visualguide.com/assets/img/starships/12.jpg",
  "B-wing": "https://starwars-visualguide.com/assets/img/starships/13.jpg",
  "Y-wing": "https://starwars-visualguide.com/assets/img/starships/11.jpg",
  "X-wing": "https://starwars-visualguide.com/assets/img/starships/12.jpg",
  "TIE Advanced x1": "https://starwars-visualguide.com/assets/img/starships/15.jpg",
  "TIE fighter": "https://starwars-visualguide.com/assets/img/starships/14.jpg",
  "TIE interceptor": "https://starwars-visualguide.com/assets/img/starships/16.jpg",
  "Millennium Falcon": "https://starwars-visualguide.com/assets/img/starships/21.jpg",
  "E-wing": "https://starwars-visualguide.com/assets/img/starships/20.jpg",
  "A-wings": "https://starwars-visualguide.com/assets/img/starships/12.jpg",
  "B-wings": "https://starwars-visualguide.com/assets/img/starships/13.jpg",
  "C-3PO": "https://starwars-visualguide.com/assets/img/starships/24.jpg",
  "Droid Starfighter": "https://starwars-visualguide.com/assets/img/starships/19.jpg",
  "Naboo N-1 Starfighter": "https://starwars-visualguide.com/assets/img/starships/22.jpg",
  "J-type diplomatic barge": "https://starwars-visualguide.com/assets/img/starships/23.jpg",
  "B-wing Starfighter": "https://starwars-visualguide.com/assets/img/starships/13.jpg",
  "Vulture Droid": "https://starwars-visualguide.com/assets/img/starships/17.jpg",
  "Sith Infiltrator": "https://starwars-visualguide.com/assets/img/starships/18.jpg",
  "Naboo Starfighter": "https://starwars-visualguide.com/assets/img/starships/22.jpg",
  "Droid Control Ship": "https://starwars-visualguide.com/assets/img/starships/19.jpg",
  "Sith Speeder": "https://starwars-visualguide.com/assets/img/starships/20.jpg",
  "Bounty Hunter Ship": "https://starwars-visualguide.com/assets/img/starships/25.jpg",
  "Death Star": "https://starwars-visualguide.com/assets/img/starships/27.jpg",
  "Geonosian Starfighter": "https://starwars-visualguide.com/assets/img/starships/29.jpg",
  "Imperial Landing Craft": "https://starwars-visualguide.com/assets/img/starships/28.jpg",
  "C-9979 landing craft": "https://starwars-visualguide.com/assets/img/starships/30.jpg",
  "Imperial Shuttle": "https://starwars-visualguide.com/assets/img/starships/6.jpg",
  "Sith Cruiser": "https://starwars-visualguide.com/assets/img/starships/31.jpg",
  "Ebon Hawk": "https://starwars-visualguide.com/assets/img/starships/32.jpg",
  "Star Destroyer 2": "https://starwars-visualguide.com/assets/img/starships/33.jpg",
  "Moldy Crow": "https://starwars-visualguide.com/assets/img/starships/34.jpg",
  "Ghost": "https://starwars-visualguide.com/assets/img/starships/35.jpg",
  "The Ghost": "https://starwars-visualguide.com/assets/img/starships/36.jpg",
};

const getStarshipImage = (starshipName: string) => {
  return starshipImages[starshipName] || "https://via.placeholder.com/200"; // Fallback image
};

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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "https://via.placeholder.com/200"; // Set fallback image 
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

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
        className={`${styles.searchInput} ${styles.searchContainer}`} 
      />

      {filteredStarships.length > 0 ? (
        filteredStarships.map((starship, index) => (
          <div key={starship.name} className={styles.card}> 
            <Row className={styles.starshipRow}>
              <Grid>
                <Column sm={3} md={3} lg={3} className={styles.imageColumn}>
                  <img 
                    src={getStarshipImage(starship.name)} 
                    alt={starship.name}
                    width={200}
                    height={200}
                    className={styles.placeholderImage}
                    onError={handleImageError}
                  />
                </Column>
                <Column sm={3} md={4} lg={8}>
                  <h2 className={styles.starshipItem}>{starship.name}</h2>
                  <div className={styles.shipdetails}>
                    <p><span className={styles.semibold}>Model:</span> {starship.model}</p>
                    <p><span className={styles.semibold}>Class:</span> {starship.starship_class}</p>
                    <p><span className={styles.semibold}>Manufacturer:</span> {starship.manufacturer}</p>
                    <p><span className={styles.semibold}>Cost in Credits:</span> <span className={styles.orangetext}>{starship.cost_in_credits} wupiupi</span></p>
                  </div>
                </Column>
                <Column sm={3} md={3} lg={3}>
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
        ))
      ) : (
        <div className={styles.p3}><p> Sorry no starships available in your search.</p></div>
      )}

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
