// Deprecated — replaced by Firebase Auth in Phase 2
import React, { useState } from 'react';
import styled from 'styled-components';
import { signIn } from '../../services/adminAuth';
import { Page, FloatingEggs } from './AdminLayout';

const Center = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 18px;
`;

const Card = styled.form`
  width: 100%;
  max-width: 380px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  padding: 28px 22px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.10);
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Subhead = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 6px 0 22px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  color: #f4f4f4;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.35); }
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const ErrorLine = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #FF8E8E;
  min-height: 16px;
`;

export function PasswordGate({ onAuthed }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!pw) {
      setError('Enter the password');
      return;
    }
    if (signIn(pw)) {
      setError('');
      onAuthed && onAuthed();
    } else {
      setError("Nope. That's not it.");
    }
  };

  return (
    <Page>
      <FloatingEggs count={5} />
      <Center>
        <Card onSubmit={submit}>
          <Title>🥚 Admin Access</Title>
          <Subhead>Crew only</Subhead>
          <Input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); if (error) setError(''); }}
            autoFocus
            autoComplete="current-password"
          />
          <Button type="submit">Unlock</Button>
          <ErrorLine>{error}</ErrorLine>
        </Card>
      </Center>
    </Page>
  );
}

export default PasswordGate;
