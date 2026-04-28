import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(12vw, -8vh) rotate(120deg); }
  66% { transform: translate(-12vw, 8vh) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

export const Page = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`;

const EggLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Egg = styled.span`
  position: absolute;
  font-size: ${(p) => p.size || '28px'};
  opacity: 0.10;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  animation: ${float} ${(p) => p.duration || '22s'} ease-in-out infinite;
  animation-delay: ${(p) => p.delay || '0s'};
  user-select: none;
`;

export function FloatingEggs({ count = 7 }) {
  // Stable seed per render; not memoized but OK for an admin page.
  const eggs = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${22 + Math.random() * 16}px`,
        duration: `${18 + Math.random() * 10}s`,
        delay: `-${Math.random() * 15}s`,
      });
    }
    return out;
  }, [count]);
  return (
    <EggLayer aria-hidden="true">
      {eggs.map((e, i) => (
        <Egg key={i} {...e}>🥚</Egg>
      ))}
    </EggLayer>
  );
}

const HeaderBar = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SignOutBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: rgba(255,255,255,0.10); }
`;

const TabsRow = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 6px;
  padding: 12px 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const Tab = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: ${(p) => (p.$active ? '#FFC72C' : 'rgba(255,255,255,0.55)')};
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
  border-bottom: 2px solid ${(p) => (p.$active ? '#FFC72C' : 'transparent')};
  margin-bottom: -1px;
  transition: color 0.15s;

  &:hover { color: ${(p) => (p.$disabled ? 'rgba(255,255,255,0.55)' : '#FFE66D')}; }
`;

const Body = styled.main`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 18px 16px 96px;

  @media (max-width: 480px) {
    padding: 12px 12px 96px;
  }
`;

const HomeBtn = styled(SignOutBtn)`
  background: rgba(255,199,44,0.10);
  border-color: rgba(255,199,44,0.25);
  color: #FFC72C;
  &:hover { background: rgba(255,199,44,0.18); }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export function AdminLayout({ tab, onTabChange, onSignOut, children }) {
  const navigate = useNavigate();
  return (
    <Page>
      <FloatingEggs />
      <HeaderBar>
        <Brand>🥚 Admin · Scrambled Legs</Brand>
        <HeaderActions>
          <HomeBtn type="button" onClick={() => navigate('/')}>← Home</HomeBtn>
          <SignOutBtn type="button" onClick={onSignOut}>Sign Out</SignOutBtn>
        </HeaderActions>
      </HeaderBar>
      <TabsRow>
        <Tab
          type="button"
          $active={tab === 'events'}
          onClick={() => onTabChange && onTabChange('events')}
        >
          Events
        </Tab>
        <Tab
          type="button"
          $active={tab === 'notifications'}
          onClick={() => onTabChange && onTabChange('notifications')}
        >
          Notifications
        </Tab>
      </TabsRow>
      <Body>{children}</Body>
    </Page>
  );
}

export default AdminLayout;
