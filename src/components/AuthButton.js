import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ref as dbRef, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { useCurrentUser } from '../services/auth';
import AccountSheet from './AccountSheet';

const jiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-18deg); }
  30% { transform: rotate(14deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-4deg); }
`;

const Wrap = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1100;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const SignInPill = styled.button`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(255,199,44,0.35);
    filter: brightness(1.05);
  }
  &:active { transform: scale(0.97); }

  ${(p) => p.$jiggling && css`
    animation: ${jiggle} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`;

const AvatarBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #FFC72C;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1a1a1a;
  text-transform: uppercase;
  background: ${(p) => p.$photo
    ? `center/cover no-repeat url('${p.$photo}')`
    : 'linear-gradient(45deg, #FFC72C, #FFE66D)'};
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  transition: transform 0.15s ease;

  &:hover { transform: scale(1.06); }
  &:active { transform: scale(0.96); }

  ${(p) => p.$jiggling && css`
    animation: ${jiggle} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`;

export default function AuthButton() {
  const { user, loading } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [jiggling, setJiggling] = useState(false);
  const [profile, setProfile] = useState(null);
  const jiggleTimerRef = useRef(null);

  useEffect(() => {
    function onNudge() {
      setJiggling(true);
      if (jiggleTimerRef.current) clearTimeout(jiggleTimerRef.current);
      jiggleTimerRef.current = setTimeout(() => setJiggling(false), 650);
    }
    function onOpen() { setOpen(true); }
    window.addEventListener('auth:nudge', onNudge);
    window.addEventListener('auth:open', onOpen);
    return () => {
      window.removeEventListener('auth:nudge', onNudge);
      window.removeEventListener('auth:open', onOpen);
      if (jiggleTimerRef.current) clearTimeout(jiggleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!user) { setProfile(null); return undefined; }
    const r = dbRef(database, `userProfiles/${user.uid}`);
    const unsub = onValue(r, (snap) => setProfile(snap.val() || {}));
    return () => unsub();
  }, [user]);

  if (loading) {
    return <Wrap />;
  }

  const photoURL = (profile && profile.photoURL) || '';
  const displayName = (profile && profile.displayName) || '';
  const initial = (displayName && displayName.charAt(0)) ||
    (user && user.email ? user.email.charAt(0) : '?');

  return (
    <>
      <Wrap>
        {user ? (
          <AvatarBtn
            type="button"
            $jiggling={jiggling}
            $photo={photoURL}
            onClick={() => setOpen(true)}
            aria-label="Account"
          >
            {!photoURL && initial}
          </AvatarBtn>
        ) : (
          <SignInPill
            type="button"
            $jiggling={jiggling}
            onClick={() => setOpen(true)}
            aria-label="Sign in"
          >
            Sign In
          </SignInPill>
        )}
      </Wrap>
      {open && <AccountSheet user={user} onClose={() => setOpen(false)} />}
    </>
  );
}
