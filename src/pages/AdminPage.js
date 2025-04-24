import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../services/firebase';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  min-height: 100vh;
  padding: 40px 20px;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const AdminPanel = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #FFE66D;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #FFE66D;
  border-bottom: 1px solid rgba(255, 230, 109, 0.3);
  padding-bottom: 8px;
`;

const CounterArea = styled.div`
  margin-bottom: 30px;
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
`;

const CounterValue = styled.div`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  color: #FFC72C;
`;

const CounterLabel = styled.div`
  text-align: center;
  font-size: 16px;
  color: #ccc;
  margin-top: 8px;
`;

const Button = styled.button`
  background: ${props => props.danger ? 'rgba(220, 53, 69, 0.8)' : 'rgba(40, 167, 69, 0.8)'};
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 10px;
  margin-bottom: 10px;
  
  &:hover {
    background: ${props => props.danger ? 'rgba(220, 53, 69, 1)' : 'rgba(40, 167, 69, 1)'};
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

function AdminPage() {
  const [hotdogCount, setHotdogCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Connect to live hotdog counter
    const hotdogCountRef = ref(database, 'hotdogCounter');
    
    const unsubscribe = onValue(hotdogCountRef, (snapshot) => {
      const data = snapshot.val();
      setHotdogCount(data?.count || 0);
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const resetCounter = async () => {
    try {
      const hotdogCountRef = ref(database, 'hotdogCounter');
      await set(hotdogCountRef, { count: 0 });
    } catch (err) {
      setError(err.message);
      console.error('Error resetting counter:', err);
    }
  };
  
  if (loading) {
    return (
      <PageContainer>
        <AdminPanel>
          <Header>Admin Panel</Header>
          <div>Loading...</div>
        </AdminPanel>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <AdminPanel>
          <Header>Admin Panel</Header>
          <div>Error: {error}</div>
        </AdminPanel>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <AdminPanel>
        <Header>Admin Panel</Header>
        
        <SectionTitle>Hot Dog Counter</SectionTitle>
        <CounterArea>
          <CounterValue>{hotdogCount}</CounterValue>
          <CounterLabel>Hot Dogs Consumed</CounterLabel>
          
          <ButtonGroup>
            <Button danger onClick={resetCounter}>
              Reset Counter
            </Button>
          </ButtonGroup>
        </CounterArea>

        <SectionTitle>Form Submissions</SectionTitle>
        <p>Registrations are stored in Firebase database under 'newsletterRegistrants'.</p>

      </AdminPanel>
    </PageContainer>
  );
}

export default AdminPage;