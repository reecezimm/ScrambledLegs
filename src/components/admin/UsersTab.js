import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { ref as dbRef, onValue, update as dbUpdate, query as dbQuery, orderByChild, limitToLast } from 'firebase/database';
import { database, auth } from '../../services/firebase';
import { sendResetEmail, ADMIN_EMAILS } from '../../services/auth';
import { findProfile } from '../../data/crewProfiles';

const DELETE_USER_URL = 'https://us-central1-fundraiser-f0831.cloudfunctions.net/deleteUser';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const SectionLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,199,44,0.30), transparent);
  }
`;

const Count = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFC72C;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  padding: 4px 10px;
  border-radius: 999px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  &:focus { border-color: rgba(255,199,44,0.45); background: rgba(255,255,255,0.07); }
  &::placeholder { color: rgba(255,255,255,0.35); }
`;

const ExportBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,199,44,0.25);
  background: rgba(255,199,44,0.10);
  color: #FFC72C;
  cursor: pointer;
  &:hover { background: rgba(255,199,44,0.18); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const TableWrap = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 13px;

  th, td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    white-space: nowrap;
  }

  th {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    background: rgba(0,0,0,0.20);
    cursor: pointer;
    user-select: none;
  }

  th:hover { color: #FFE66D; }

  tr { cursor: pointer; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,199,44,0.04); }

  td.name { color: #f4f4f4; font-weight: 500; }
  td.email { color: rgba(255,255,255,0.78); }
  td.date { color: rgba(255,255,255,0.55); }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
`;

const SmallAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(p) => p.$photo
    ? `center/cover no-repeat url('${p.$photo}')`
    : 'linear-gradient(45deg, #FFC72C, #FFE66D)'};
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
  border: 1px solid rgba(255,199,44,0.30);
`;

const AdminPill = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
`;

const Empty = styled.div`
  padding: 48px 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 14px;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  .emoji { font-size: 28px; display: block; margin-bottom: 8px; }
`;

const Loading = styled.div`
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.55);
`;

// Drill-down sheet styling (mirrors AccountSheet pattern)
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const sheetSlide = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const SheetWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`;
const SheetBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${fadeIn} 0.2s ease;
`;
const SheetBody = styled.div`
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: 92vh;
  overflow-y: auto;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 0 0 26px;
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
  font-size: 22px;
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`;
const SheetInner = styled.div`
  padding: 28px 18px 0;
`;
const SheetTitle = styled.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 0 0 16px;
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
const CardLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
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
  padding: 9px 14px;
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
  padding: 11px 14px;
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
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #FFC72C; }
`;
const ErrLine = styled.div` font-size: 12px; color: #FF8E8E; margin-top: 8px; `;
const InfoLine = styled.div` font-size: 12px; color: #FFE66D; margin-top: 8px; `;
const StatRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;
const Stat = styled.div`
  flex: 1;
  min-width: 120px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  .v { font-family: 'Fredoka', sans-serif; font-size: 22px; color: #FFE66D; }
  .l { font-size: 11px; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.10em; }
`;
const DeviceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 13px;
  &:last-child { border-bottom: none; }
  .meta { flex: 1; min-width: 0; }
  .platform { color: #f4f4f4; font-weight: 600; }
  .when { color: rgba(255,255,255,0.50); font-size: 11px; }
`;

function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  }).format(d);
}

function csvEscape(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(rows) {
  const header = ['UID', 'Name', 'Email', 'IsAdmin', 'Mash Total', 'RSVPs', 'Devices', 'Created', 'Last Seen'];
  const lines = [header.join(',')];
  rows.forEach((r) => {
    lines.push([
      csvEscape(r.uid),
      csvEscape(r.displayName),
      csvEscape(r.email),
      csvEscape(r.isAdmin ? 'yes' : ''),
      csvEscape(r.mashTotal),
      csvEscape(r.rsvpCount),
      csvEscape(r.deviceCount),
      csvEscape(r.createdAt ? new Date(r.createdAt).toISOString() : ''),
      csvEscape(r.lastSeenAt ? new Date(r.lastSeenAt).toISOString() : ''),
    ].join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `scrambled-legs-users-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function isDesignatedAdmin(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

function fmtDurationShort(ms) {
  if (!ms || ms < 0) return '—';
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function UserDetailSheet({ user, mashByEvent, rsvpsByEvent, eventsById, sessions, analytics, onClose, onDeleted }) {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(user.displayName || '');
  const [nameSaving, setNameSaving] = useState(false);
  const [err, setErr] = useState('');
  const [info, setInfo] = useState('');
  // Crew profile blurb — pre-populate from static crewProfiles if user has none yet
  const suggestedBlurb = !user.blurb ? (findProfile(user) || {}).blurb || '' : '';
  const [blurbDraft, setBlurbDraft] = useState(user.blurb || suggestedBlurb);
  const [blurbSaving, setBlurbSaving] = useState(false);
  const [genderDraft, setGenderDraft] = useState(user.gender || '');
  const [genderSaving, setGenderSaving] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [adminBusy, setAdminBusy] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delConfirmText, setDelConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirmDevice, setConfirmDevice] = useState(null);

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

  const isAlwaysAdmin = isDesignatedAdmin(user.email);

  const userMashEvents = useMemo(() => {
    const out = [];
    Object.entries(mashByEvent || {}).forEach(([eventId, perUid]) => {
      const v = perUid && perUid[user.uid];
      if (typeof v === 'number' && v > 0) {
        out.push({ eventId, mashes: v });
      }
    });
    return out;
  }, [mashByEvent, user.uid]);

  const userRsvpEvents = useMemo(() => {
    const out = [];
    Object.entries(rsvpsByEvent || {}).forEach(([eventId, perUid]) => {
      if (perUid && perUid[user.uid]) out.push({ eventId, rsvp: perUid[user.uid] });
    });
    return out;
  }, [rsvpsByEvent, user.uid]);

  const totalMash = userMashEvents.reduce((s, e) => s + e.mashes, 0);

  const userSessionStats = useMemo(() => {
    const mine = (sessions || []).filter((s) => s.uid === user.uid);
    const deviceIds = new Set();
    let durSum = 0, durCount = 0, lastSession = 0;
    mine.forEach((s) => {
      if (s.deviceId) deviceIds.add(s.deviceId);
      const start = s.startedAt || 0;
      const end = s.endedAt || s.lastActiveAt || 0;
      if (start && end > start) { durSum += end - start; durCount += 1; }
      if (start > lastSession) lastSession = start;
    });
    const avgDur = durCount > 0 ? Math.round(durSum / durCount) : 0;
    return {
      count: mine.length,
      avgDur,
      lastSession,
      deviceCount: deviceIds.size,
    };
  }, [sessions, user.uid]);

  const userPageViews = useMemo(() => {
    return (analytics || []).filter((a) => a.name === 'page_view' && a.uid === user.uid).length;
  }, [analytics, user.uid]);

  const eventsRsvpedDetail = useMemo(() => {
    return userRsvpEvents.map((r) => {
      const ev = eventsById[r.eventId];
      const mashEntry = userMashEvents.find((m) => m.eventId === r.eventId);
      return {
        eventId: r.eventId,
        name: (ev && ev.name) || r.eventId,
        start: ev && ev.start,
        mashes: mashEntry ? mashEntry.mashes : 0,
      };
    }).sort((a, b) => (b.start || 0) - (a.start || 0));
  }, [userRsvpEvents, userMashEvents, eventsById]);

  const onSaveName = async () => {
    setErr(''); setInfo('');
    const trimmed = nameDraft.trim();
    if (trimmed.length < 1 || trimmed.length > 30) {
      setErr('Name must be 1–30 characters'); return;
    }
    try {
      setNameSaving(true);
      await dbUpdate(dbRef(database, `userProfiles/${user.uid}`), { displayName: trimmed });
      setEditingName(false);
      setInfo('Saved.');
    } catch (e) {
      setErr((e && e.message) || 'Save failed');
    } finally {
      setNameSaving(false);
    }
  };

  const onSendReset = async () => {
    setErr(''); setInfo('');
    if (!user.email) { setErr('No email on file.'); return; }
    try {
      setResetBusy(true);
      await sendResetEmail(user.email);
      setInfo('Password reset email sent to ' + user.email);
    } catch (e) {
      setErr((e && e.message) || 'Send failed');
    } finally {
      setResetBusy(false);
    }
  };

  const onToggleAdmin = async () => {
    setErr(''); setInfo('');
    if (isAlwaysAdmin) return;
    const next = !user.isAdmin;
    if (!window.confirm(`${next ? 'Promote' : 'Demote'} ${user.displayName || user.email}? They will ${next ? 'gain' : 'lose'} admin access.`)) return;
    try {
      setAdminBusy(true);
      await dbUpdate(dbRef(database, `userProfiles/${user.uid}`), { isAdmin: next });
      setInfo('Updated.');
    } catch (e) {
      setErr((e && e.message) || 'Update failed');
    } finally {
      setAdminBusy(false);
    }
  };

  const onSaveBlurb = async () => {
    setErr(''); setInfo('');
    try {
      setBlurbSaving(true);
      await dbUpdate(dbRef(database, `userProfiles/${user.uid}`), { blurb: blurbDraft.trim() });
      setInfo('Blurb saved.');
    } catch (e) { setErr((e && e.message) || 'Save failed'); }
    finally { setBlurbSaving(false); }
  };

  const onSaveGender = async (val) => {
    setErr(''); setInfo('');
    try {
      setGenderSaving(true);
      setGenderDraft(val);
      await dbUpdate(dbRef(database, `userProfiles/${user.uid}`), { gender: val });
      setInfo('Gender saved.');
    } catch (e) { setErr((e && e.message) || 'Save failed'); }
    finally { setGenderSaving(false); }
  };

  const onRemoveDevice = async (tokenHash) => {
    setErr('');
    try {
      const updates = {};
      updates[`fcmTokens/${tokenHash}`] = null;
      updates[`userProfiles/${user.uid}/devices/${tokenHash}`] = null;
      await dbUpdate(dbRef(database), updates);
      setConfirmDevice(null);
      setInfo('Device removed.');
    } catch (e) {
      setErr((e && e.message) || 'Remove failed');
    }
  };

  const onDeleteAccount = async () => {
    setErr(''); setInfo('');
    if (delConfirmText.trim().toLowerCase() !== (user.email || '').toLowerCase()) {
      setErr('Email confirmation does not match.');
      return;
    }
    try {
      setDeleting(true);
      if (!auth.currentUser) throw new Error('Not signed in.');
      const idToken = await auth.currentUser.getIdToken();
      const res = await fetch(DELETE_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ uid: user.uid }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || `Delete failed (${res.status}).`);
      onDeleted && onDeleted(user.uid);
      onClose();
    } catch (e) {
      setErr((e && e.message) || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const devices = user.devices ? Object.entries(user.devices) : [];

  return (
    <SheetWrap>
      <SheetBackdrop onClick={onClose} />
      <SheetBody onClick={(e) => e.stopPropagation()} role="dialog" aria-label="User detail">
        <CloseBtn type="button" aria-label="Close" onClick={onClose}>×</CloseBtn>
        <SheetInner>
          <SheetTitle>User</SheetTitle>

          <Card>
            <CardLabel>Identity</CardLabel>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <SmallAvatar style={{ width: 64, height: 64, fontSize: 28 }} $photo={user.photoURL}>
                {!user.photoURL && (user.displayName || user.email || '?').charAt(0)}
              </SmallAvatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                {editingName ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Input
                      type="text"
                      value={nameDraft}
                      maxLength={30}
                      onChange={(e) => setNameDraft(e.target.value)}
                    />
                    <PrimaryBtn type="button" disabled={nameSaving} onClick={onSaveName}>
                      {nameSaving ? '…' : 'Save'}
                    </PrimaryBtn>
                    <SecondaryBtn type="button" onClick={() => { setEditingName(false); setNameDraft(user.displayName || ''); }}>
                      Cancel
                    </SecondaryBtn>
                  </div>
                ) : (
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                      {user.displayName || '—'}{' '}
                      <button
                        type="button"
                        onClick={() => { setNameDraft(user.displayName || ''); setEditingName(true); }}
                        style={{
                          background: 'none', border: 'none', color: '#FFC72C',
                          cursor: 'pointer', fontSize: 11, marginLeft: 6,
                          textDecoration: 'underline',
                        }}
                      >
                        edit
                      </button>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{user.email || '—'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 4 }}>
                      Created {fmtDate(user.createdAt)} · Last seen {fmtDate(user.lastSeenAt)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <CardLabel>Crew Profile</CardLabel>
            {suggestedBlurb && !user.blurb && (
              <div style={{ fontSize: 11, color: '#FFC72C', marginBottom: 8 }}>
                ✦ Pre-filled from crew roster — save to confirm
              </div>
            )}
            {/* Gender */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Gender</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['male', 'female', 'non-binary'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    disabled={genderSaving}
                    onClick={() => onSaveGender(g)}
                    style={{
                      padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                      background: genderDraft === g ? '#FFC72C' : 'rgba(255,255,255,0.08)',
                      color: genderDraft === g ? '#000' : 'rgba(255,255,255,0.7)',
                    }}
                  >{g}</button>
                ))}
              </div>
            </div>
            {/* Blurb */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Blurb (fed to Eggman)</div>
            <textarea
              rows={4}
              value={blurbDraft}
              onChange={(e) => setBlurbDraft(e.target.value)}
              placeholder="Character description for Eggman's roasts…"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, color: '#fff', fontSize: 13, padding: '8px 10px',
                resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
            <div style={{ marginTop: 8 }}>
              <PrimaryBtn type="button" disabled={blurbSaving} onClick={onSaveBlurb}>
                {blurbSaving ? '…' : 'Save blurb'}
              </PrimaryBtn>
            </div>
          </Card>

          <Card>
            <CardLabel>Activity</CardLabel>
            <StatRow>
              <Stat><div className="v">{totalMash}</div><div className="l">Total mashes</div></Stat>
              <Stat><div className="v">{userRsvpEvents.length}</div><div className="l">RSVPs</div></Stat>
              <Stat><div className="v">{devices.length}</div><div className="l">Devices</div></Stat>
            </StatRow>
            {eventsRsvpedDetail.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.10em' }}>Events</div>
                {eventsRsvpedDetail.map((ev) => (
                  <div key={ev.eventId} style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#f4f4f4' }}>{ev.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>{ev.mashes} mash{ev.mashes === 1 ? '' : 'es'}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <CardLabel>Sessions</CardLabel>
            <StatRow>
              <Stat><div className="v">{userSessionStats.count}</div><div className="l">Total sessions</div></Stat>
              <Stat><div className="v">{fmtDurationShort(userSessionStats.avgDur)}</div><div className="l">Avg duration</div></Stat>
              <Stat><div className="v">{userSessionStats.deviceCount}</div><div className="l">Active devices</div></Stat>
            </StatRow>
            <StatRow>
              <Stat><div className="v">{userPageViews}</div><div className="l">Page views (lifetime)</div></Stat>
              <Stat><div className="v" style={{ fontSize: 14 }}>{userSessionStats.lastSession ? fmtDate(userSessionStats.lastSession) : '—'}</div><div className="l">Last session</div></Stat>
            </StatRow>
          </Card>

          <Card>
            <CardLabel>Devices</CardLabel>
            {devices.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>No devices registered.</div>
            ) : devices.map(([hash, d]) => (
              <DeviceRow key={hash}>
                <div className="meta">
                  <div className="platform">
                    {(d && d.platform) || 'unknown'} {d && d.notificationsEnabled ? '· notifications on' : ''}
                  </div>
                  <div className="when">Last seen {fmtDate(d && d.lastSeenAt)} · {hash.slice(0, 8)}…</div>
                </div>
                {confirmDevice === hash ? (
                  <>
                    <DangerBtn type="button" onClick={() => onRemoveDevice(hash)}>Confirm</DangerBtn>
                    <SecondaryBtn type="button" onClick={() => setConfirmDevice(null)}>Cancel</SecondaryBtn>
                  </>
                ) : (
                  <SecondaryBtn type="button" onClick={() => setConfirmDevice(hash)}>Remove</SecondaryBtn>
                )}
              </DeviceRow>
            ))}
          </Card>

          <Card>
            <CardLabel>Admin status</CardLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200, fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
                {isAlwaysAdmin ? (
                  <>This is a designated admin email. Always admin (rule-locked).</>
                ) : user.isAdmin ? (
                  <>This user is an admin.</>
                ) : (
                  <>This user is not an admin.</>
                )}
              </div>
              {!isAlwaysAdmin && (
                <SecondaryBtn type="button" disabled={adminBusy} onClick={onToggleAdmin}>
                  {adminBusy ? '…' : (user.isAdmin ? 'Demote' : 'Promote')}
                </SecondaryBtn>
              )}
            </div>
          </Card>

          <Card>
            <CardLabel>Actions</CardLabel>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              <PrimaryBtn type="button" disabled={resetBusy} onClick={onSendReset}>
                {resetBusy ? '…' : 'Send password reset'}
              </PrimaryBtn>
            </div>
            {!confirmDel ? (
              <DangerBtn type="button" onClick={() => setConfirmDel(true)} style={{ width: '100%' }}>
                Delete account
              </DangerBtn>
            ) : (
              <div>
                <div style={{ fontSize: 12, color: '#FF8E8E', marginBottom: 8 }}>
                  This will permanently delete the auth user, profile, RSVPs, mashes, and tokens. Type <strong>{user.email}</strong> to confirm.
                </div>
                <Input
                  type="text"
                  value={delConfirmText}
                  onChange={(e) => setDelConfirmText(e.target.value)}
                  placeholder={user.email}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <DangerBtn type="button" disabled={deleting} onClick={onDeleteAccount}>
                    {deleting ? 'Deleting…' : 'Permanently delete'}
                  </DangerBtn>
                  <SecondaryBtn type="button" disabled={deleting} onClick={() => { setConfirmDel(false); setDelConfirmText(''); }}>
                    Cancel
                  </SecondaryBtn>
                </div>
              </div>
            )}
            {err && <ErrLine>{err}</ErrLine>}
            {info && <InfoLine>{info}</InfoLine>}
          </Card>
        </SheetInner>
      </SheetBody>
    </SheetWrap>
  );
}

function UsersTab() {
  const [profiles, setProfiles] = useState({});
  const [mashByEvent, setMashByEvent] = useState({});
  const [rsvpsByEvent, setRsvpsByEvent] = useState({});
  const [eventsById, setEventsById] = useState({});
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('lastSeenAt');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedUid, setSelectedUid] = useState(null);

  useEffect(() => {
    const refs = [
      { path: 'userProfiles', set: setProfiles },
      { path: 'eventMashTotals', set: setMashByEvent },
      { path: 'rsvps', set: setRsvpsByEvent },
      { path: 'events', set: setEventsById },
    ];
    const unsubs = refs.map(({ path, set }) => {
      const r = dbRef(database, path);
      return onValue(r, (snap) => {
        set(snap.val() || {});
        if (path === 'userProfiles') setLoading(false);
      }, () => {
        if (path === 'userProfiles') setLoading(false);
      });
    });
    return () => unsubs.forEach((u) => u && u());
  }, []);

  useEffect(() => {
    const sq = dbQuery(dbRef(database, 'sessions'), orderByChild('startedAt'), limitToLast(1000));
    const u1 = onValue(sq, (snap) => {
      const out = [];
      snap.forEach((c) => out.push({ key: c.key, ...(c.val() || {}) }));
      setSessions(out);
    }, () => setSessions([]));
    const aq = dbQuery(dbRef(database, 'analyticsEvents'), orderByChild('ts'), limitToLast(1000));
    const u2 = onValue(aq, (snap) => {
      const out = [];
      snap.forEach((c) => out.push({ id: c.key, ...(c.val() || {}) }));
      setAnalytics(out);
    }, () => setAnalytics([]));
    return () => { u1(); u2(); };
  }, []);

  const rows = useMemo(() => {
    return Object.entries(profiles).map(([uid, p]) => {
      const v = p || {};
      let mashTotal = 0;
      Object.values(mashByEvent || {}).forEach((perUid) => {
        const x = perUid && perUid[uid];
        if (typeof x === 'number') mashTotal += x;
      });
      let rsvpCount = 0;
      Object.values(rsvpsByEvent || {}).forEach((perUid) => {
        if (perUid && perUid[uid]) rsvpCount += 1;
      });
      const deviceCount = v.devices ? Object.keys(v.devices).length : 0;
      const isAdmin = v.isAdmin === true || isDesignatedAdmin(v.email);
      return {
        uid,
        email: v.email || '',
        displayName: v.displayName || '',
        photoURL: v.photoURL || '',
        createdAt: v.createdAt || 0,
        lastSeenAt: v.lastSeenAt || 0,
        isAdmin,
        devices: v.devices || null,
        blurb: v.blurb || '',
        gender: v.gender || '',
        mashTotal,
        rsvpCount,
        deviceCount,
      };
    });
  }, [profiles, mashByEvent, rsvpsByEvent]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows;
    if (q) {
      out = out.filter((r) =>
        r.displayName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      );
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    out = [...out].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av || '').localeCompare(String(bv || '')) * dir;
    });
    return out;
  }, [rows, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      const numericKeys = ['mashTotal', 'rsvpCount', 'deviceCount', 'lastSeenAt', 'createdAt'];
      setSortDir(numericKeys.includes(key) ? 'desc' : 'asc');
    }
  };

  const arrow = (key) => (sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '');

  const selected = selectedUid ? rows.find((r) => r.uid === selectedUid) : null;

  if (loading) return <Loading>Loading users…</Loading>;

  return (
    <Wrap>
      <SectionLabel>
        Users <Count>{rows.length}</Count>
      </SectionLabel>
      <HeaderRow>
        <SearchInput
          type="search"
          placeholder="Search name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ExportBtn type="button" onClick={() => downloadCsv(filtered)} disabled={filtered.length === 0}>
          Export CSV
        </ExportBtn>
      </HeaderRow>

      {rows.length === 0 ? (
        <Empty>
          <span className="emoji">👥</span>
          No user profiles yet.
        </Empty>
      ) : filtered.length === 0 ? (
        <Empty>
          <span className="emoji">🔍</span>
          No matches for "{query}".
        </Empty>
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th onClick={() => toggleSort('displayName')}>Name{arrow('displayName')}</th>
                <th onClick={() => toggleSort('email')}>Email{arrow('email')}</th>
                <th onClick={() => toggleSort('mashTotal')}>Mashes{arrow('mashTotal')}</th>
                <th onClick={() => toggleSort('rsvpCount')}>RSVPs{arrow('rsvpCount')}</th>
                <th onClick={() => toggleSort('deviceCount')}>Devices{arrow('deviceCount')}</th>
                <th onClick={() => toggleSort('lastSeenAt')}>Last seen{arrow('lastSeenAt')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.uid} onClick={() => setSelectedUid(r.uid)}>
                  <td>
                    <SmallAvatar $photo={r.photoURL}>
                      {!r.photoURL && (r.displayName || r.email || '?').charAt(0)}
                    </SmallAvatar>
                  </td>
                  <td className="name">{r.displayName || '—'}</td>
                  <td className="email">{r.email || '—'}</td>
                  <td className="num">{r.mashTotal}</td>
                  <td className="num">{r.rsvpCount}</td>
                  <td className="num">{r.deviceCount}</td>
                  <td className="date">{fmtDate(r.lastSeenAt)}</td>
                  <td>{r.isAdmin && <AdminPill>Admin</AdminPill>}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}

      {selected && ReactDOM.createPortal(
        <UserDetailSheet
          user={selected}
          mashByEvent={mashByEvent}
          rsvpsByEvent={rsvpsByEvent}
          eventsById={eventsById}
          sessions={sessions}
          analytics={analytics}
          onClose={() => setSelectedUid(null)}
          onDeleted={() => setSelectedUid(null)}
        />,
        document.body
      )}
    </Wrap>
  );
}

export default UsersTab;
