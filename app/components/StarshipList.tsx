


import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/main.module.css';
import { Grid, Row, Column, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination } from '@carbon/react';
import Loader from './Loader';


interface StarshipListProps {
  onBuy: (item: { name: string; quantity: number }) => void; 
}

interface Starship {
  name: string;
}

const StarshipList: React.FC<StarshipListProps> = ({ onBuy }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalShips, setTotalShips] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const PAGE_SIZE = 10; // Number of starships per page
  const PAGE_SIZES = [10]; // Only show page size of 10

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
      onBuy(itemToAdd); // Call the onBuy prop
      setQuantities(prevQuantities => ({ ...prevQuantities, [index]: 0 }));
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePaginationChange = ({ page }: { page: number; pageSize: number }) => {
    setCurrentPage(page);
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (starships.length === 0) return <div>No starships available.</div>;

  return (
    <div className={styles.starshipList}>
      <h1>Starships in Stock</h1>

   
          {starships.map((starship, index) => (
            <>
             <Row key={index} className={styles.starshipRow}>
               <Grid>
               <Column sm={3} md={10} lg={10}>
                <h2 className={styles.starshipItem}>{starship.name}</h2>
              </Column>
              <Column sm={6} md={6} lg={3}>
                <div className={styles.quantityControls}>
                  <Button kind="tertiary" onClick={() => handleQuantityChange(index, -1)}>-</Button>
                  <span>{quantities[index] || 0}</span>
                  <Button kind="tertiary" onClick={() => handleQuantityChange(index, 1)}>+</Button>
                  <Button className="buy-button" kind="primary" onClick={() => handleBuy(starship, index)}>Buy</Button>
                </div>
              </Column>
              </Grid>
            </Row>
            </>
          ))}
     
      <Pagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        pageSizes={PAGE_SIZES} 
        totalItems={totalShips}
        onChange={handlePaginationChange}
      />

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalHeading="Shopping Cart"
      >
        <ModalHeader />
        <ModalBody>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}
                  <Button onClick={() => handleRemoveFromCart(index)} kind="tertiary">
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StarshipList;