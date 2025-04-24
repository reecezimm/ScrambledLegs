import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';
import { app, database } from '../services/firebase';

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
  align-items: flex-start;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20px;
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
  z-index: 90;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: "←";
    margin-right: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 70px; /* Add space for fixed top navigation */
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
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
  z-index: 90;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    right: 0.8rem;
    top: 0.8rem;
  }
`;

const Leaderboard = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 107, 107, 0.2);
`;

const LogButton = styled.button`
  margin-top: 2rem;
  background: rgba(255, 107, 107, 0.3);
  border: 2px solid rgba(255, 107, 107, 0.4);
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
  
  &:hover {
    background: rgba(255, 107, 107, 0.4);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.4rem;
  }
`;

const LogOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1001;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  
  &.active {
    transform: translateX(0);
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const LogHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogClose = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
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
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [behindFirstPlace, setBehindFirstPlace] = useState(0);
  
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
    
    // Set up leaderboard listener
    const setupLeaderboardListener = () => {
      const usersRef = ref(database, 'users');
      
      // Listen for any changes to user data
      onValue(usersRef, (snapshot) => {
        const userData = snapshot.val();
        if (!userData) return;
        
        // Convert to array and sort by count
        const leaders = Object.entries(userData)
          .map(([key, value]) => ({
            username: key,
            ...value
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3); // Take top 3
        
        setLeaderboard(leaders);
        
        // Calculate how many hot dogs behind first place
        if (username && leaders.length > 0) {
          const firstPlaceCount = leaders[0].count || 0;
          
          // Find current user's position and count
          const currentUser = Object.entries(userData)
            .find(([key]) => key === username);
            
          const currentUserCount = currentUser ? currentUser[1].count || 0 : 0;
          
          // Calculate the difference (if negative or zero, user is in first place)
          const behind = Math.max(0, firstPlaceCount - currentUserCount);
          setBehindFirstPlace(behind);
        }
      });
    };
    
    setupLeaderboardListener();
    
    return () => {
      // No need to explicitly detach listeners in the new Firebase SDK
    };
  }, [username]);
  
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
  
  const groupLogsByDay = (logs) => {
    const groups = {};
    
    logs.forEach(log => {
      // Format the date as YYYY-MM-DD to use as group key
      const date = new Date(log.timestamp);
      const day = date.toISOString().split('T')[0];
      
      // Generate a human-readable label for the day
      let dayLabel;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const todayDate = today.toISOString().split('T')[0];
      const yesterdayDate = yesterday.toISOString().split('T')[0];
      
      if (day === todayDate) {
        dayLabel = 'Today';
      } else if (day === yesterdayDate) {
        dayLabel = 'Yesterday';
      } else {
        dayLabel = date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
      
      if (!groups[day]) {
        groups[day] = {
          label: dayLabel,
          items: []
        };
      }
      
      groups[day].items.push(log);
    });
    
    // Sort groups by date (most recent first) and sort items within groups
    return Object.values(groups)
      .sort((a, b) => {
        // Extract date from first item in each group
        const dateA = a.items[0]?.timestamp || 0;
        const dateB = b.items[0]?.timestamp || 0;
        return dateB - dateA;
      })
      .map(group => ({
        ...group,
        items: group.items.sort((a, b) => b.timestamp - a.timestamp)
      }));
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
      {username && <UserDisplay>Logged in as: {username}</UserDisplay>}
      
      <Container>
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
        
        <Leaderboard>
          <div className="leaderboard-title" style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#FFE66D', fontWeight: 600 }}>
            🌭 Grease Missile Captains 🌭
          </div>
          
          {leaderboard.map((leader, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
            return (
              <div key={leader.username} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.7rem',
                marginBottom: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem'
              }}>
                <div style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>{medal}</div>
                <div style={{ 
                  fontWeight: 500, 
                  color: 'white', 
                  flex: 1, 
                  textAlign: 'left',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{leader.username}</div>
                <div style={{ 
                  fontWeight: 700, 
                  color: '#FF6B6B', 
                  margin: '0 1rem' 
                }}>{leader.count || 0} 🌭</div>
              </div>
            );
          })}
          
          {behindFirstPlace > 0 && (
            <div style={{ 
              fontSize: '0.8rem',
              color: '#888',
              marginTop: '0.3rem',
              textAlign: 'center'
            }}>
              {behindFirstPlace} hot dogs behind first place
            </div>
          )}
          
          {behindFirstPlace === 0 && leaderboard.length > 0 && leaderboard[0]?.username === username && (
            <div style={{ 
              fontSize: '0.8rem',
              color: '#888',
              marginTop: '0.3rem',
              textAlign: 'center'
            }}>
              🏆 You're in first place!
            </div>
          )}
        </Leaderboard>
        
        <LogButton onClick={() => setIsLogOpen(true)}>
          🌭 Hot Dog History
        </LogButton>
        
        <Footer />
      </Container>
      
      <LogOverlay className={isLogOpen ? 'active' : ''}>
        <LogHeader>
          <h2>Global Hot Dog History</h2>
          <LogClose onClick={() => setIsLogOpen(false)}>×</LogClose>
        </LogHeader>
        <div style={{ 
          padding: '1rem',
          height: 'calc(100vh - 5rem)',
          overflowY: 'auto'
        }}>
          {groupLogsByDay(globalLogs).map(group => (
            <div key={group.label} style={{
              marginBottom: '2rem'
            }}>
              <div style={{
                color: '#888',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                padding: '0 0.5rem'
              }}>
                {group.label}
              </div>
              
              {group.items.map(item => {
                // Check if this user is on the leaderboard
                const leaderIndex = leaderboard.findIndex(leader => leader.username === item.username);
                const medal = leaderIndex === 0 ? '🥇' : 
                            leaderIndex === 1 ? '🥈' : 
                            leaderIndex === 2 ? '🥉' : '';
                
                return (
                  <div key={item.id} style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    {medal && <span style={{ fontSize: '1.2rem' }}>{medal}</span>}
                    <span style={{
                      fontWeight: 500,
                      color: '#FFE66D',
                    }}>{item.username}</span>
                    <span style={{
                      color: '#888',
                      fontSize: '0.8rem',
                      marginLeft: 'auto',
                    }}>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </LogOverlay>
    </PageContainer>
  );
}

export default HotDogCounter;