import React from 'react';
import styled from 'styled-components';

// Increment this value for each update
const APP_VERSION = "0.3.0";

const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 5px 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const VersionText = styled.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const Footer = () => {
  // Get current date for trademark
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-indexed
  const day = currentDate.getDate();
  const formattedDate = `${month}/${day}/${year}`;

  return (
    <FooterContainer>
      <FooterContent>
        <MainText>
          Presented by Scrambled Legs™ {year} • {formattedDate}
        </MainText>
        <VersionText>
          version {APP_VERSION}
        </VersionText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;