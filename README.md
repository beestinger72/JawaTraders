This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
ou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
# JAWA X (Reminder to self add once logo done) SPA - A Star Wars Starship Browser 🚀

This is a Single Page Application (SPA) built using **Next.js** and **TypeScript** that fetches and displays Star Wars starships from the **Star Wars API (SWAPI)**. The app allows users to browse a list of starships, view details, adjust quantities, and add items to their basket. Pagination is also implemented to browse through starship categories.

## Features

- Fetch starships from the [Star Wars API (SWAPI)](https://swapi.dev/)
- Displays the first 10 starships
- Allows users to add quantity of starships 
- Shows a notification when an item is added to the basket
- Pagination
- A simple category dropdown menu for later dev (currently set up for starships, planets, people)
- Built with **TypeScript** for better security and EsLint Support and **Carbon Design System** for UI

## Tech Stack

- [Next.js](https://nextjs.org/) - The React framework
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) - For HTTP requests
- [Carbon Design System](https://www.carbondesignsystem.com/) - For UI 
- [CarbonThemes] - (https://www.npmjs.com/package/@carbon/themes) -(https://carbon-elements.netlify.app/themes/examples/preview/)
- [SWAPI](https://swapi.dev/) - The Star Wars API for fetching data

## Getting Started

Follow the instructions below to run the project locally.
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Installation



import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/main.module.css';
import { Grid, Row, Column, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination } from '@carbon/react';
import Loader from './Loader';

interface Starship {
  name: string;
}

const StarshipList: React.FC = () => {
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
      const existingItemIndex = cart.findIndex(item => item.name === starship.name);
      
      if (existingItemIndex !== -1) {
        const updatedCart = cart.map((item, idx) => 
          idx === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
        setCart(updatedCart);
      } else {
        const updatedCart = [...cart, { name: starship.name, quantity }];
        setCart(updatedCart);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      setQuantities(prevQuantities => ({ ...prevQuantities, [index]: 0 }));
      setIsModalOpen(true);
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
