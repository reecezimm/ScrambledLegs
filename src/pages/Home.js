import React from 'react';
import styled from 'styled-components';
import HotDogButton from '../components/HotDogButton';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.2;
    z-index: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Logo = styled.img`
  width: 70%;
  max-width: 320px;
  margin-bottom: 10px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    max-width: 250px;
  }
`;

const UnderConstruction = styled.img`
  width: 100%;
  max-width: 600px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 95%;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <HotDogButton />
      
      <ContentContainer>
        <Logo 
          src="/assets/cogg white shadow.png" 
          alt="Scrambled Legs Logo" 
        />
        <UnderConstruction 
          src="/assets/under construction.png" 
          alt="Under Construction" 
        />
      </ContentContainer>
    </HomeContainer>
  );
}

export default Home;