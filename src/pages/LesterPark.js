import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';

const floatAnimation = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(15vw, -10vh) rotate(120deg);
  }
  66% {
    transform: translate(-15vw, 10vh) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
`;

const PageContainer = styled.div`
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
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.3;
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
  width: 84%; /* Increased by 20% from 70% */
  max-width: 384px; /* Increased by 20% from 320px */
  margin-bottom: 5px; /* Reduced spacing */
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 360px; /* Increased by 20% from 300px */
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px; /* Increased by 20% from 250px */
    margin-bottom: 3px;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 5px; /* Reduced spacing */
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 3px;
    letter-spacing: 0.12em;
  }
`;

const PresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px; /* Reduced spacing */
  text-align: center;
  max-width: 90%;
`;

const TeamName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFC72C; /* Egg yolk yellow color */
  margin: 0 3px;
  display: inline-block;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Presents = styled.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  margin: 5px 0;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const TrailName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.68rem; /* Increased by 5% from 1.6rem */
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  margin-top: 5px;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  
  &::after {
    content: "LESTER RIVER TRAIL";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    color: rgba(255,255,255,0.1);
    filter: blur(4px);
  }
  
  @media (max-width: 768px) {
    font-size: 1.47rem; /* Increased by 5% from 1.4rem */
  }
  
  @media (max-width: 480px) {
    font-size: 1.26rem; /* Increased by 5% from 1.2rem */
  }
`;

const TitleImage = styled.img`
  width: 70%;
  max-width: 400px;
  margin-bottom: -80px; /* Even more overlap with container due to cropped image */
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  position: relative;
  z-index: 2; /* Place above the container */
  
  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
    margin-bottom: -70px;
  }
  
  @media (max-width: 480px) {
    width: 85%;
    max-width: 300px;
    margin-bottom: -60px;
  }
`;

const TrailBotContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 65px 20px 0; /* Further increased top padding for cropped image overlap */
  margin: 0 0 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 60px 15px 0;
    width: 95%;
  }
  
  @media (max-width: 480px) {
    padding: 50px 10px 0;
    width: 90%;
  }
  
  & iframe {
    border: none;
    border-radius: 8px;
    height: 300px; /* Reduced height */
    background: transparent;
    margin-bottom: 0; /* Remove bottom margin */
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
  animation: ${floatAnimation} ${props => props.duration || '20s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${props => props.size || '36px'} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${props => props.size || '36px'} * 0.7);
  }
`;

function LesterPark() {
  const [eggs, setEggs] = useState([]);
  const scriptRef = useRef(null);
  
  useEffect(() => {
    // Load fonts
    const loadFonts = () => {
      // Load Montserrat font
      if (!document.getElementById('montserrat-font')) {
        const montserratLink = document.createElement('link');
        montserratLink.id = 'montserrat-font';
        montserratLink.rel = 'stylesheet';
        montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap';
        document.head.appendChild(montserratLink);
      }
    };
    
    // Load the fonts
    loadFonts();
    
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
        opacity: Math.random() * 0.2 + 0.15, // Slightly more visible
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 10 + 15}s`, // Faster animation, between 15-25s
        delay: `-${Math.random() * 10}s` // Shorter delay
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
    
    // Load TrailBot script
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://trailbot.com/scripts/embed.js';
      script.defer = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Remove script on unmount if it exists
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);
  
  return (
    <PageContainer>
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
        
        <Subtitle>
          DULUTH'S PREMIER RACE TEAM
        </Subtitle>
        
        <PresentationContainer>
          <Presents>
            <TeamName>SCRAMBLED LEGS</TeamName> proudly presents
          </Presents>
          <TrailName>LESTER RIVER TRAIL</TrailName>
        </PresentationContainer>
        
        <TitleImage 
          src="/assets/trail conditions.png" 
          alt="Trail Conditions" 
        />
        
        <TrailBotContainer>
          <iframe 
            src="https://trailbot.com/widgets/feed?keys=5af70f8f-9995-4451-8877-a42fbb299a6a" 
            width="100%" 
            className="trail-status-embed"
            title="Lester Park Trail Conditions"
          />
        </TrailBotContainer>
      </ContentContainer>
      
      <Footer />
    </PageContainer>
  );
}

export default LesterPark;