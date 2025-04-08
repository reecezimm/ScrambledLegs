import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import HotDogButton from '../components/HotDogButton';
import Footer from '../components/Footer';

const floatAnimation = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(
      ${() => Math.random() * 100 - 50}vw, 
      ${() => Math.random() * 100 - 50}vh
    ) rotate(${() => Math.random() * 360}deg);
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
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
  margin-bottom: 1.25px; /* Reduced margin to 1/4 */
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

const Disclaimer = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
  font-style: italic;
  text-align: center;
  line-height: 1.4;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 10px;
  }
`;

const Trademark = styled.p`
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 9px;
    bottom: 10px;
  }
`;

const FloatingEgg = styled.div`
  position: fixed;
  font-size: ${props => props.size || '36px'};
  opacity: ${props => props.opacity || 0.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  animation: ${floatAnimation} ${props => props.duration || '60s'} linear infinite alternate;
  animation-delay: ${props => props.delay || '0s'};
  
  @media (max-width: 768px) {
    font-size: calc(${props => props.size || '36px'} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${props => props.size || '36px'} * 0.7);
  }
`;

function Home() {
  const [eggs, setEggs] = useState([]);
  
  useEffect(() => {
    // Function to determine how many eggs to show based on screen width
    const getEggCount = () => {
      const width = window.innerWidth;
      if (width <= 480) return 6; // Fewer eggs on mobile
      if (width <= 768) return 8; // Medium count on tablets
      return 12; // Full count on desktop
    };
    
    // Create floating eggs with random properties
    const eggElements = [];
    const eggCount = getEggCount();
    
    for (let i = 0; i < eggCount; i++) {
      eggElements.push({
        id: i,
        emoji: '🥚',
        size: `${Math.random() * 24 + 24}px`,
        opacity: Math.random() * 0.2 + 0.1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 60 + 30}s`,
        delay: `-${Math.random() * 30}s`
      });
    }
    
    setEggs(eggElements);
    
    // Update egg count on window resize
    const handleResize = () => {
      const newCount = getEggCount();
      if (newCount !== eggElements.length) {
        // Only update if count changed
        const newEggs = [];
        for (let i = 0; i < newCount; i++) {
          if (i < eggElements.length) {
            // Keep existing eggs
            newEggs.push(eggElements[i]);
          } else {
            // Add new eggs if needed
            newEggs.push({
              id: i,
              emoji: '🥚',
              size: `${Math.random() * 24 + 24}px`,
              opacity: Math.random() * 0.2 + 0.1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              duration: `${Math.random() * 60 + 30}s`,
              delay: `-${Math.random() * 30}s`
            });
          }
        }
        setEggs(newEggs);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get current date for trademark
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-indexed
  const day = currentDate.getDate();
  const formattedDate = `${month}/${day}/${year}`;
  
  return (
    <HomeContainer>
      <HotDogButton />
      
      {eggs.map(egg => (
        <FloatingEgg 
          key={egg.id}
          size={egg.size}
          opacity={egg.opacity}
          top={egg.top}
          left={egg.left}
          duration={egg.duration}
          delay={egg.delay}
        >
          {egg.emoji}
        </FloatingEgg>
      ))}
      
      <ContentContainer>
        <Logo 
          src="/assets/cogg white shadow.png" 
          alt="Scrambled Legs Logo" 
        />
        <UnderConstruction 
          src="/assets/under construction.png" 
          alt="Under Construction" 
        />
        <Disclaimer>
          Not responsible for broken frames, bones, or dreams. Ride at your own risk!
        </Disclaimer>
      </ContentContainer>
      
      <Footer />
    </HomeContainer>
  );
}

export default Home;