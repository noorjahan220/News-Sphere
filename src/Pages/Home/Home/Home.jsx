import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner';
import AllPublishers from '../AllPublishers/AllPublishers';
import Statistics from '../Statistics/Statistics';
import Plans from '../Plans/Plans';
import FeaturedArticles from '../fituredArticles/FeaturedArticles';
import LatestNews from '../LatestNews/LatestNews';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set timeout for 10 seconds to show the modal
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds = 10000 ms

    // Clear the timer if the component is unmounted or updated before 10 seconds
    return () => clearTimeout(timer);
  }, []);

  // Handle modal button click to navigate to subscription page
  const handleSubscription = () => {
    navigate('/subscription'); // Adjust with your actual route
  };

  // Handle modal close button click
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Banner />
      <AllPublishers />
      <Statistics />
      <Plans />
      <FeaturedArticles />
      <LatestNews />

      {/* Modal for Subscription */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            {/* Close Button */}
            <button style={modalStyles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <p>Get a premium subscription to access exclusive content!</p>
            <button onClick={handleSubscription}>Subscribe Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
  },
};

export default Home;
