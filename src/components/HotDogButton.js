import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
  z-index: 10;
  transition: all 0.2s ease;
  
  &::before {
    content: "🌭";
    margin-right: 8px;
    font-size: 1.1em;
    display: inline-block;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 87, 34, 0.4);
    background-color: #ff6e40;
  }
`;

const HotDogButton = () => {
  return (
    <StyledButton to="/hot-dog-counter">
      Hot Dog Counter
    </StyledButton>
  );
};

export default HotDogButton;