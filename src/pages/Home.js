import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';
import { ref, push, set } from 'firebase/database';
import { database } from '../services/firebase';

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
  width: 92%;
  max-width: 422px;
  margin-bottom: 5px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 395px;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 330px;
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
  margin: 0 0 25px;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
    letter-spacing: 0.12em;
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

// Form container and elements
const FormSection = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 199, 44, 0.05);
  border-radius: 16px;
  padding: 35px 25px;
  margin: 30px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 199, 44, 0.15);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 95%;
    margin: 25px 0;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    width: 90%;
    margin: 20px 0;
  }
`;

const FormTitle = styled.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 25px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  padding: 16px 18px;
  border-radius: 12px;
  border: 2px solid rgba(255, 199, 44, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255, 199, 44, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  padding: 16px 32px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 199, 44, 0.3);
  overflow: hidden;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 199, 44, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #888;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 1rem;
    margin-top: 10px;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  padding: 30px;
  background: rgba(70, 200, 120, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(70, 200, 120, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.6rem;
    color: #FFC72C;
    margin-bottom: 12px;
    font-weight: 700;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  &:before {
    content: "🍳";
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    
    h3 {
      font-size: 1.4rem;
    }
    
    p {
      font-size: 1rem;
    }
    
    &:before {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
  }
`;

function Home() {
  const [eggs, setEggs] = useState([]);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new entry in the 'newsletter registrants' database
      const registrantsRef = ref(database, 'newsletterRegistrants');
      const newRegistrantRef = push(registrantsRef);
      
      // Add timestamp
      await set(newRegistrantRef, {
        name,
        email,
        timestamp: Date.now()
      });
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <HomeContainer>
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
        
        {/* Join Us Form */}
        <FormSection>
          <FormTitle>JOIN THE SCRAMBLED LEGS</FormTitle>
          <FormSubtitle>An elite team of average athletes</FormSubtitle>
          
          {!submitted ? (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input 
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </InputGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get Crackin\''}
              </SubmitButton>
            </Form>
          ) : (
            <ThankYouMessage>
              <h3>Egg-cellent!</h3>
              <p>You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures.</p>
            </ThankYouMessage>
          )}
        </FormSection>
      </ContentContainer>
      
      <Footer />
    </HomeContainer>
  );
}

export default Home;