import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Hot dog quotes
const HOTDOG_QUOTES = [
  {
    quote: "A man who can devour three hot dogs in one sitting can conquer any battlefield.",
    author: "George Washington, 1776"
  },
  {
    quote: "We hold these truths to be self-evident: that all hot dogs are created equal.",
    author: "George Washington, at a colonial cookout"
  },
  {
    quote: "The price of hot dog liberty is eternal vigilance at the grill.",
    author: "George Washington, to his troops"
  },
  {
    quote: "The secret to my strength? I eat a hot dog before every match. It's fucking brilliant.",
    author: "Gordon Ramsay, Celebrity Chef"
  },
  {
    quote: "This hot dog is so raw, it's still barking at the mailman!",
    author: "Gordon Ramsay, during a cookout critique"
  },
  {
    quote: "Finally, some good fucking food. And by food, I mean hot dogs.",
    author: "Gordon Ramsay, at a street vendor"
  },
  {
    quote: "One small bite of a hot dog, one giant leap for mankind.",
    author: "Neil Armstrong, moments before lunar landing"
  },
  {
    quote: "Houston, we have a hot dog. I repeat, we have a hot dog.",
    author: "Neil Armstrong, during space transmission"
  },
  {
    quote: "The moon is made of cheese? Ridiculous. It's clearly made of hot dogs.",
    author: "Neil Armstrong, in a recently discovered interview"
  },
  {
    quote: "I have measured my life out in hot dogs, and I regret nothing.",
    author: "Ernest Hemingway, while drunk at a baseball game"
  }
];

// Styled components
const PageContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  position: relative;
  color: white;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* For iOS Safari */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
`;

const BackButton = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: "←";
    margin-right: 8px;
  }
`;

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  
  @media (max-height: 700px) {
    padding: 1rem;
    justify-content: flex-start;
    margin-top: 60px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
`;

const Count = styled.div`
  font-size: 5rem;
  font-weight: 700;
  margin: 1rem 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.5rem;
`;

const QuoteContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 0.5rem;
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s ease;
`;

const QuoteText = styled.div`
  margin-bottom: 0.5rem;
`;

const QuoteAuthor = styled.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: right;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const HotdogButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  line-height: 1.4;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 20px rgba(255, 107, 107, 0.2);
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  background: rgba(255, 107, 107, 0.2);
  border-radius: 50%;
  filter: blur(20px);
  z-index: -1;
  animation: pulse 2s infinite ease-in-out;
  
  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  }
`;

const StreakContainer = styled.div`
  position: relative;
  text-align: center;
  background: none;
  border: none;
  padding: 0.5rem;
  margin-top: 20px;
  margin-bottom: 0;
  backdrop-filter: none;
`;

const StreakCount = styled.div`
  font-size: 0.9rem;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const StreakMessage = styled.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 300;
`;

const UserDisplay = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  color: white;
  backdrop-filter: blur(10px);
`;

const Branding = styled.div`
  position: relative;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #666;
  letter-spacing: 1px;
  margin-top: 40px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;

const BrandingSpan = styled.span`
  background: linear-gradient(45deg, #FF6B6B, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Trademark = styled.span`
  font-size: 0.8em;
  vertical-align: super;
  margin-left: 2px;
`;

const LoginOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const LoginModal = styled.div`
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const LoginTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(255, 107, 107, 0.3);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: rgba(255, 107, 107, 0.7);
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  border: none;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const LoginError = styled.div`
  margin-top: 1rem;
  color: #FF6B6B;
  font-size: 0.9rem;
`;

// Helper to create flying hot dog animation
const createHotDog = () => {
  const hotdog = document.createElement('div');
  hotdog.style.position = 'fixed';
  hotdog.style.fontSize = '5rem';
  hotdog.style.pointerEvents = 'none';
  hotdog.style.zIndex = '1000';
  hotdog.textContent = '🌭';
  
  // Animation
  const startX = Math.random() * window.innerWidth;
  hotdog.style.left = `${startX}px`;
  hotdog.style.bottom = '0';
  
  const finalX = (Math.random() - 0.5) * window.innerWidth;
  const rotation = (Math.random() - 0.5) * 720;
  
  // Set animation
  hotdog.style.animation = 'flyHotDog 3s ease-out forwards';
  
  // Add keyframes if they don't exist yet
  if (!document.getElementById('hotDogAnimations')) {
    const style = document.createElement('style');
    style.id = 'hotDogAnimations';
    style.innerHTML = `
      @keyframes flyHotDog {
        0% {
          transform: translate(0, 100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translate(${finalX}px, -100vh) rotate(${rotation}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(hotdog);
  
  setTimeout(() => {
    hotdog.remove();
  }, 3000);
};

function HotDogCounter() {
  // User state
  const [username, setUsername] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginInput, setLoginInput] = useState('');
  
  // App state
  const [count, setCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastEaten, setLastEaten] = useState(null);
  const [globalLogs, setGlobalLogs] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  
  // Check for existing user on load
  useEffect(() => {
    const savedUsername = localStorage.getItem('hotdogUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      loadUserData(savedUsername);
    } else {
      setShowLogin(true);
    }
    
    // Set random quote
    const randomIndex = Math.floor(Math.random() * HOTDOG_QUOTES.length);
    setRandomQuote(HOTDOG_QUOTES[randomIndex]);
    
    // Set up Firebase listener for global logs
    const logsRef = ref(database, 'hotdogLogs');
    onValue(logsRef, (snapshot) => {
      const logs = [];
      snapshot.forEach((childSnapshot) => {
        const log = childSnapshot.val();
        log.id = childSnapshot.key;
        logs.push(log);
      });
      
      // Sort logs by timestamp (newest first)
      logs.sort((a, b) => b.timestamp - a.timestamp);
      
      setGlobalLogs(logs.slice(0, 50)); // Get the most recent 50 logs
    });
    
    return () => {
      // No need to explicitly detach listeners in the new Firebase SDK
    };
  }, []);
  
  const loadUserData = (user) => {
    const userRef = ref(database, `users/${user}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setCount(userData.count || 0);
        setStreak(userData.streak || 0);
        setLastEaten(userData.lastEaten || null);
      } else {
        // Initialize new user in Firebase
        set(userRef, {
          name: user,
          count: 0,
          streak: 0,
          lastEaten: null
        });
      }
    }, { onlyOnce: true });
  };
  
  const handleLogin = () => {
    if (!loginInput.trim()) {
      setLoginError('Please enter a username');
      return;
    }
    
    // Ensure username is lowercase with no spaces
    const sanitizedUsername = loginInput.trim().toLowerCase().replace(/\\s+/g, '');
    
    if (sanitizedUsername !== loginInput) {
      setLoginInput(sanitizedUsername);
    }
    
    if (sanitizedUsername.length < 3) {
      setLoginError('Username must be at least 3 characters');
      return;
    }
    
    // Check if username exists
    const userRef = ref(database, `users/${sanitizedUsername}`);
    onValue(userRef, (snapshot) => {
      // If exists, use it
      localStorage.setItem('hotdogUsername', sanitizedUsername);
      setUsername(sanitizedUsername);
      setShowLogin(false);
      setLoginError('');
      loadUserData(sanitizedUsername);
    }, { onlyOnce: true });
  };
  
  const getStreakMessage = (streak) => {
    const messages = [
      "First hot dog of many!",
      "Two days of hot dog glory!",
      "Triple threat!",
      "Four days strong!",
      "High five - keep it alive!",
      "Six days of satisfaction!",
      "A whole week of wonderful!",
      "Eight days of excellence!",
      "Nine days of nobility!",
      "Perfect ten!",
      "Unstoppable!"
    ];
    
    return streak === 0 ? "Start your streak!" : 
           streak <= 10 ? messages[streak - 1] : 
           messages[messages.length - 1];
  };
  
  const updateStreak = () => {
    // Use UTC for consistent date calculations
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const yesterdayUTC = todayUTC - 86400000; // 24 hours in milliseconds
    
    let newStreak = streak;
    
    if (!lastEaten) {
      // First hot dog ever
      newStreak = 1;
    } else {
      // Convert stored timestamp to UTC date for comparison
      const lastEatenDate = new Date(lastEaten);
      const lastEatenUTC = Date.UTC(
        lastEatenDate.getUTCFullYear(), 
        lastEatenDate.getUTCMonth(), 
        lastEatenDate.getUTCDate()
      );
      
      if (lastEatenUTC < yesterdayUTC) {
        // Streak broken - more than a day has passed
        if (lastEatenUTC < todayUTC) {
          newStreak = 1;
        }
      } else if (lastEatenUTC < todayUTC) {
        // Continuing streak - was yesterday
        newStreak = streak + 1;
      }
      // If already eaten today, keep current streak
    }
    
    setStreak(newStreak);
    
    // Store current time in milliseconds since epoch (UTC)
    const nowTimestamp = Date.now();
    setLastEaten(nowTimestamp);
    
    // Update streak in Firebase with UTC timestamp
    const userRef = ref(database, `users/${username}`);
    update(userRef, {
      streak: newStreak,
      lastEaten: nowTimestamp
    });
  };
  
  const triggerEffects = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createHotDog(), i * 130);
    }
  };
  
  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateStreak();
    
    // Update count in Firebase
    const userRef = ref(database, `users/${username}`);
    update(userRef, {
      count: newCount,
      lastEaten: Date.now() // Store exact timestamp
    });
    
    // Add new log entry to global logs
    const newLog = {
      username: username,
      timestamp: Date.now() // Store exact timestamp
    };
    
    const logsRef = ref(database, 'hotdogLogs');
    push(logsRef, newLog);
    
    triggerEffects();
  };
  
  return (
    <PageContainer>
      {showLogin && (
        <LoginOverlay>
          <LoginModal>
            <LoginTitle>Enter Your Hot Dog Name</LoginTitle>
            <LoginInput
              type="text"
              placeholder="e.g. HotDogKing42"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {loginError && <LoginError>{loginError}</LoginError>}
            <LoginButton onClick={handleLogin}>Start Eating</LoginButton>
          </LoginModal>
        </LoginOverlay>
      )}
      
      <BackButton to="/">Back to Home</BackButton>
      
      <Container>
        {username && <UserDisplay>Logged in as: {username}</UserDisplay>}
        
        <Title>Hot Dog Counter</Title>
        <Count>{count}</Count>
        <Subtitle>Hot Dogs Devoured</Subtitle>
        
        {randomQuote && (
          <QuoteContainer>
            <QuoteText>"{randomQuote.quote}"</QuoteText>
            <QuoteAuthor>— {randomQuote.author}</QuoteAuthor>
          </QuoteContainer>
        )}
        
        <ButtonContainer>
          <ButtonGlow />
          <HotdogButton onClick={incrementCount} disabled={!username}>
            I Ate a Hot Dog!
          </HotdogButton>
        </ButtonContainer>
        
        <StreakContainer>
          <StreakCount>{streak} day streak</StreakCount>
          <StreakMessage>{getStreakMessage(streak)}</StreakMessage>
        </StreakContainer>
        
        <Branding>
          presented by <BrandingSpan>Scrambled Legs</BrandingSpan>
          <Trademark>™</Trademark>
        </Branding>
      </Container>
    </PageContainer>
  );
}

export default HotDogCounter;