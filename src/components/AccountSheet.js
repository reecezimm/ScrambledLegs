import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { ref as dbRef, onValue, update } from 'firebase/database';
import { storage, database } from '../services/firebase';
import {
  signOutUser, sendResetEmail, signIn, signUp, friendlyAuthError,
} from '../services/auth';
import {
  requestAndSubscribe,
  getSubscriptionState,
  isStandalone,
} from '../services/messaging';
import {
  getInstallPrompt,
  consumeInstallPrompt,
  subscribeInstallPrompt,
  isStandalonePWA,
} from '../services/pwaInstall';
import { logEvent } from '../services/analytics';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../services/auth';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const sheetSlide = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${fadeIn} 0.2s ease;
`;

const Body = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 0 0 22px;
  pointer-events: auto;
  animation: ${sheetSlide} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 40;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  backdrop-filter: blur(6px);
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`;

const Handle = styled.button`
  display: block;
  width: 100%;
  padding: 14px 0 6px;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    margin: 0 auto;
    background: rgba(255,255,255,0.18);
    border-radius: 2px;
  }
`;

const Inner = styled.div`
  padding: 6px 18px 0;
`;

const Title = styled.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 4px 0 16px;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Card = styled.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`;

const SectionLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BigAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${(p) => p.$photo
    ? `center/cover no-repeat url('${p.$photo}')`
    : 'linear-gradient(45deg, #FFC72C, #FFE66D)'};
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
  border: 2px solid rgba(255,199,44,0.40);
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 13px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  &:focus { border-color: #FFC72C; }
`;

const PrimaryBtn = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { filter: brightness(1.06); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const SecondaryBtn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const DangerBtn = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.35);
  background: rgba(255,107,107,0.10);
  color: #FF8E8E;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,107,107,0.20); }
`;

const StatusOk = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(111,207,151,0.10);
  border: 1px solid rgba(111,207,151,0.30);
  color: #6FCF97;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
`;

const Note = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  margin-top: 8px;
`;

const ErrLine = styled.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 8px;
`;

const InfoLine = styled.div`
  font-size: 12px;
  color: #FFE66D;
  margin-top: 8px;
`;

const Hidden = styled.input`display: none;`;

const ProgressOuter = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 10px;
`;
const ProgressInner = styled.div`
  width: ${(p) => p.$pct || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`;

const MAX_PROFILE_BYTES = 2 * 1024 * 1024;

function extFromFile(file) {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  const fromName = (file.name || '').split('.').pop();
  if (fromName && fromName.length <= 5 && /^[a-z0-9]+$/i.test(fromName)) {
    return fromName.toLowerCase();
  }
  return 'jpg';
}

function Sheet({ user, onClose }) {
  const { isAdmin } = useCurrentUser();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [nameInfo, setNameInfo] = useState('');
  const [nameErr, setNameErr] = useState('');

  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [uploadErr, setUploadErr] = useState('');

  const [subState, setSubState] = useState(getSubscriptionState());
  const [subBusy, setSubBusy] = useState(false);
  const [subErr, setSubErr] = useState('');

  const [installPrompt, setInstallPromptState] = useState(getInstallPrompt());
  const [installed, setInstalled] = useState(isStandalonePWA() || isStandalone());

  const [resetInfo, setResetInfo] = useState('');
  const [resetErr, setResetErr] = useState('');
  const [resetBusy, setResetBusy] = useState(false);

  useEffect(() => {
    if (!user) return undefined;
    const r = dbRef(database, `userProfiles/${user.uid}`);
    const unsub = onValue(r, (snap) => {
      const v = snap.val() || {};
      setProfile(v);
      setDisplayName((prev) => prev || v.displayName || (user.email ? user.email.split('@')[0] : ''));
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    const unsub = subscribeInstallPrompt((p) => setInstallPromptState(p));
    return () => { unsub(); };
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const initial = (displayName && displayName.charAt(0)) ||
    (user.email ? user.email.charAt(0) : '?');
  const photoURL = (profile && profile.photoURL) || '';

  const onPickPhoto = () => {
    if (uploading) return;
    fileRef.current && fileRef.current.click();
  };

  const onFileChosen = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setUploadErr('');
    if (!file.type || !file.type.startsWith('image/')) {
      setUploadErr('File must be an image');
      return;
    }
    if (file.size > MAX_PROFILE_BYTES) {
      setUploadErr('Image is too large (max 2MB)');
      return;
    }
    const ext = extFromFile(file);
    const path = `profilePics/${user.uid}.${ext}`;
    try {
      setUploading(true);
      setUploadPct(0);
      const r = storageRef(storage, path);
      const task = uploadBytesResumable(r, file, { contentType: file.type });
      await new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snap) => {
            if (snap.totalBytes) setUploadPct((snap.bytesTransferred / snap.totalBytes) * 100);
          },
          (err) => reject(err),
          () => resolve()
        );
      });
      const url = await getDownloadURL(task.snapshot.ref);
      await update(dbRef(database, `userProfiles/${user.uid}`), { photoURL: url });
    } catch (err) {
      setUploadErr((err && err.message) || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSaveName = async () => {
    setNameInfo(''); setNameErr('');
    const trimmed = (displayName || '').trim();
    if (trimmed.length < 1 || trimmed.length > 30) {
      setNameErr('Name must be 1–30 characters');
      return;
    }
    try {
      setSavingName(true);
      await update(dbRef(database, `userProfiles/${user.uid}`), { displayName: trimmed });
      setNameInfo('Saved.');
    } catch (err) {
      setNameErr((err && err.message) || 'Save failed');
    } finally {
      setSavingName(false);
    }
  };

  const onEnableNotifications = async () => {
    setSubErr('');
    setSubBusy(true);
    try {
      await requestAndSubscribe();
      setSubState(getSubscriptionState());
    } catch (err) {
      setSubErr((err && err.message) || 'Could not enable notifications');
    } finally {
      setSubBusy(false);
    }
  };

  const onInstall = async () => {
    const p = consumeInstallPrompt();
    if (!p) return;
    try {
      logEvent('pwa_install_clicked', {});
      await p.prompt();
      const choice = await p.userChoice;
      if (choice && choice.outcome === 'accepted') {
        setInstalled(true);
      }
    } catch (_) {}
  };

  const onSendReset = async () => {
    setResetInfo(''); setResetErr('');
    if (!user.email) { setResetErr('No email on file.'); return; }
    try {
      setResetBusy(true);
      await sendResetEmail(user.email);
      setResetInfo('Check your inbox for a reset link.');
    } catch (err) {
      setResetErr((err && err.message) || 'Could not send reset email');
    } finally {
      setResetBusy(false);
    }
  };

  const onSignOut = async () => {
    try { await signOutUser(); } catch (_) {}
    onClose();
  };

  const subscribed = subState === 'subscribed';
  const showInstallSection = !installed && !!installPrompt;

  return (
    <Wrap>
      <Backdrop onClick={onClose} />
      <Body onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Account">
        <CloseBtn type="button" aria-label="Close" onClick={onClose}>×</CloseBtn>
        <Handle type="button" onClick={onClose} aria-label="Close panel" />
        <Inner>
          <Title>Account</Title>

          <Card>
            <SectionLabel>Profile</SectionLabel>
            <Row>
              <BigAvatar $photo={photoURL}>
                {!photoURL && initial}
              </BigAvatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>
                  {displayName || (user.email && user.email.split('@')[0]) || 'rider'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                  {user.email || ''}
                </div>
                <div style={{ marginTop: 10 }}>
                  <SecondaryBtn type="button" onClick={onPickPhoto} disabled={uploading}>
                    {uploading ? 'Uploading…' : (photoURL ? 'Change photo' : 'Upload photo')}
                  </SecondaryBtn>
                </div>
              </div>
            </Row>
            <Hidden ref={fileRef} type="file" accept="image/*" onChange={onFileChosen} />
            {uploading && <ProgressOuter><ProgressInner $pct={uploadPct} /></ProgressOuter>}
            {uploadErr && <ErrLine>{uploadErr}</ErrLine>}
          </Card>

          <Card>
            <SectionLabel>Display name</SectionLabel>
            <Row>
              <Input
                type="text"
                value={displayName}
                maxLength={30}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
              <PrimaryBtn type="button" onClick={onSaveName} disabled={savingName}>
                {savingName ? '…' : 'Save'}
              </PrimaryBtn>
            </Row>
            <Note>1–30 characters. Shown on the leaderboard and ride leader picker.</Note>
            {nameErr && <ErrLine>{nameErr}</ErrLine>}
            {nameInfo && <InfoLine>{nameInfo}</InfoLine>}
          </Card>

          <Card>
            <SectionLabel>Notifications & app</SectionLabel>
            {subscribed ? (
              <>
                <StatusOk>✓ Notifications on</StatusOk>
                <Note>To turn these off, revoke notification permission in your browser/OS settings.</Note>
              </>
            ) : (
              <>
                <PrimaryBtn type="button" onClick={onEnableNotifications} disabled={subBusy}>
                  {subBusy ? '…' : 'Enable notifications'}
                </PrimaryBtn>
                {subErr && <ErrLine>{subErr}</ErrLine>}
              </>
            )}

            <div style={{ height: 12 }} />

            {installed ? (
              <StatusOk>✓ PWA installed</StatusOk>
            ) : showInstallSection ? (
              <PrimaryBtn type="button" onClick={onInstall}>
                Install Scrambled Legs app
              </PrimaryBtn>
            ) : (
              <Note>Install the PWA from your browser menu to enable home-screen launching.</Note>
            )}
          </Card>

          <Card>
            <SectionLabel>Password</SectionLabel>
            <PrimaryBtn type="button" onClick={onSendReset} disabled={resetBusy}>
              {resetBusy ? '…' : 'Send password reset email'}
            </PrimaryBtn>
            {resetErr && <ErrLine>{resetErr}</ErrLine>}
            {resetInfo && <InfoLine>{resetInfo}</InfoLine>}
          </Card>

          {isAdmin && (
            <Card>
              <SectionLabel>Admin</SectionLabel>
              <PrimaryBtn
                type="button"
                onClick={() => { onClose(); navigate('/admin1'); }}
              >
                → Admin Panel
              </PrimaryBtn>
            </Card>
          )}

          <Card>
            <SectionLabel>Sign out</SectionLabel>
            <DangerBtn type="button" onClick={onSignOut}>Sign out</DangerBtn>
          </Card>
        </Inner>
      </Body>
    </Wrap>
  );
}

function AuthSheet({ onClose }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const switchTab = (next) => { setTab(next); setError(''); setInfo(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setInfo('');
    setBusy(true);
    try {
      if (tab === 'signin') {
        await signIn(email.trim(), password);
        setEmail(''); setPassword('');
      } else if (tab === 'signup') {
        await signUp(email.trim(), password);
        setEmail(''); setPassword('');
      } else if (tab === 'forgot') {
        await sendResetEmail(email.trim());
        setInfo('Password reset email sent. Check your inbox.');
      }
    } catch (err) {
      setError(friendlyAuthError(err && err.code));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Wrap>
      <Backdrop onClick={onClose} />
      <Body onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Sign in">
        <CloseBtn type="button" aria-label="Close" onClick={onClose}>×</CloseBtn>
        <Handle type="button" onClick={onClose} aria-label="Close panel" />
        <Inner>
          <Title>{tab === 'signup' ? 'Create Account' : tab === 'forgot' ? 'Reset Password' : 'Sign In'}</Title>

          <Card>
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 }}>
              {[
                { k: 'signin', label: 'Sign In' },
                { k: 'signup', label: 'Create' },
                { k: 'forgot', label: 'Forgot' },
              ].map((t) => (
                <button
                  key={t.k}
                  type="button"
                  onClick={() => switchTab(t.k)}
                  style={{
                    flex: 1,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '10px 4px',
                    border: 'none',
                    background: 'transparent',
                    color: tab === t.k ? '#FFC72C' : 'rgba(255,255,255,0.55)',
                    borderBottom: `2px solid ${tab === t.k ? '#FFC72C' : 'transparent'}`,
                    marginBottom: -1,
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: 10 }}
              />
              {tab !== 'forgot' && (
                <Input
                  type="password"
                  placeholder="password"
                  autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{ marginBottom: 10 }}
                />
              )}
              <PrimaryBtn type="submit" disabled={busy} style={{ width: '100%' }}>
                {busy ? '…' : tab === 'signin' ? 'Sign In' : tab === 'signup' ? 'Create Account' : 'Send Reset Email'}
              </PrimaryBtn>
              {error && <ErrLine>{error}</ErrLine>}
              {info && <InfoLine>{info}</InfoLine>}
            </form>
          </Card>
        </Inner>
      </Body>
    </Wrap>
  );
}

export default function AccountSheet({ user, onClose }) {
  const node = user
    ? <Sheet user={user} onClose={onClose} />
    : <AuthSheet onClose={onClose} />;
  return ReactDOM.createPortal(node, document.body);
}
