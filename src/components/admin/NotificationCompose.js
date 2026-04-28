import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { subscribeTokens } from '../../services/notifications';
import { subscribeEvents, partitionEvents } from '../../services/events';
import { ADMIN_PASSWORD } from '../../services/adminAuth';

const SEND_PUSH_URL = 'https://us-central1-fundraiser-f0831.cloudfunctions.net/sendPush';

const TITLE_MAX = 50;
const BODY_MAX = 150;
const DEFAULT_URL = 'https://thescrambledlegs.com/';

// --- styled (mirrors EventEditor brand patterns) ----------------------------

const Card = styled.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const LabelText = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`;

const Counter = styled.span`
  font-size: 11px;
  color: ${(p) => (p.$over ? '#FF8E8E' : 'rgba(255,255,255,0.45)')};
  font-variant-numeric: tabular-nums;
`;

const inputCss = `
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.35); }
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`;
const Input = styled.input`${inputCss}`;
const TextArea = styled.textarea`${inputCss} resize: vertical; min-height: 84px;`;
const Select = styled.select`
  ${inputCss}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

const ToggleBtn = styled.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 9px;
  border: none;
  background: ${(p) => (p.$active ? 'linear-gradient(45deg,#FFC72C,#FF8800)' : 'transparent')};
  color: ${(p) => (p.$active ? '#1a1a1a' : 'rgba(255,255,255,0.7)')};
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
`;

const SendBtn = styled.button`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 22px rgba(255,107,107,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
  margin-top: 4px;

  &:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,107,107,0.5); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const Hint = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`;

const ErrorLine = styled.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 6px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;
const ModalCard = styled.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`;
const ModalTitle = styled.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`;
const ModalText = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`;
const ConfirmBtn = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const CancelBtn = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 10px;
`;

// --- helpers ----------------------------------------------------------------

function platformIcon(p) {
  if (p === 'ios') return '🍎';
  if (p === 'android') return '🤖';
  if (p === 'desktop') return '🖥';
  return '🌐';
}

function shortHash(h) {
  return (h || '').slice(0, 8);
}

function uaSnippet(ua) {
  if (!ua) return '';
  // Strip "Mozilla/5.0 (" prefix to surface the actually-useful platform bit.
  const m = ua.match(/\(([^)]+)\)/);
  if (m) return m[1].slice(0, 40);
  return ua.slice(0, 40);
}

function fmtTime(ts) {
  if (!ts) return '';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ts));
}

// --- component --------------------------------------------------------------

export function NotificationCompose({ onSent }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [clickUrl, setClickUrl] = useState('');
  const [tag, setTag] = useState('');
  const [mode, setMode] = useState('all'); // 'all' | 'test'
  const [testTokenHash, setTestTokenHash] = useState('');

  const [tokens, setTokens] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventChoice, setEventChoice] = useState('');

  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Live token + events subscriptions.
  useEffect(() => {
    const unsubT = subscribeTokens((list) => setTokens(list));
    const unsubE = subscribeEvents((list) => setEvents(list));
    return () => {
      unsubT && unsubT();
      unsubE && unsubE();
    };
  }, []);

  const upcomingEvents = useMemo(
    () => partitionEvents(events).upcoming.slice(0, 20),
    [events]
  );

  const titleOver = title.length > TITLE_MAX;
  const bodyOver = body.length > BODY_MAX;
  const titleEmpty = !title.trim();
  const bodyEmpty = !body.trim();
  const testTokenInvalid = mode === 'test' && !testTokenHash;
  const canSend =
    !titleEmpty && !bodyEmpty && !titleOver && !bodyOver && !testTokenInvalid && !sending;

  const recipientCount =
    mode === 'test' ? (testTokenHash ? 1 : 0) : tokens.length;

  const onPickEvent = (e) => {
    const id = e.target.value;
    setEventChoice(id);
    if (id) {
      // Build a deep link. The home page resolves /events/:eventId once that
      // route ships; until then it'll just bounce to /. That's fine.
      setClickUrl(`https://thescrambledlegs.com/events/${id}`);
    }
  };

  const requestSend = () => {
    setError('');
    if (titleEmpty || bodyEmpty) {
      setError('Title and body are required.');
      return;
    }
    if (titleOver || bodyOver) {
      setError('Title or body is too long.');
      return;
    }
    if (mode === 'test' && !testTokenHash) {
      setError('Pick a device for test send.');
      return;
    }
    setConfirming(true);
  };

  const performSend = async () => {
    setSending(true);
    setError('');
    try {
      const payload = {
        password: ADMIN_PASSWORD,
        title: title.trim(),
        body: body.trim(),
        clickUrl: (clickUrl || DEFAULT_URL).trim(),
        tag: tag.trim() || undefined,
        testTokenHash: mode === 'test' ? testTokenHash : undefined,
      };
      const res = await fetch(SEND_PUSH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result.error || `Send failed (${res.status}).`);
      }
      const notifId = result.notifId;
      // Reset form, leave sub-mode where it was.
      setTitle('');
      setBody('');
      setClickUrl('');
      setTag('');
      setEventChoice('');
      setConfirming(false);
      onSent && onSent(notifId);
    } catch (err) {
      const msg =
        (err && err.message) ||
        'Send failed. Check the Cloud Function logs.';
      setError(msg);
      setConfirming(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Card>
        <Field>
          <LabelRow>
            <LabelText htmlFor="ntf-title">Title</LabelText>
            <Counter $over={titleOver}>{title.length}/{TITLE_MAX}</Counter>
          </LabelRow>
          <Input
            id="ntf-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wednesday roll moved!"
            maxLength={TITLE_MAX + 20}
          />
        </Field>

        <Field>
          <LabelRow>
            <LabelText htmlFor="ntf-body">Body</LabelText>
            <Counter $over={bodyOver}>{body.length}/{BODY_MAX}</Counter>
          </LabelRow>
          <TextArea
            id="ntf-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Meeting at Hartley instead. Same time."
            maxLength={BODY_MAX + 50}
          />
        </Field>

        <Field>
          <LabelText htmlFor="ntf-event">Link to upcoming event (optional)</LabelText>
          <Select id="ntf-event" value={eventChoice} onChange={onPickEvent}>
            <option value="">— No event link —</option>
            {upcomingEvents.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {fmtTime(ev.start)} · {ev.name || '(untitled)'}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <LabelText htmlFor="ntf-url">Click URL</LabelText>
          <Input
            id="ntf-url"
            type="url"
            value={clickUrl}
            onChange={(e) => { setClickUrl(e.target.value); setEventChoice(''); }}
            placeholder={DEFAULT_URL}
          />
          <Hint>Defaults to the home page if blank.</Hint>
        </Field>

        <Field>
          <LabelText htmlFor="ntf-tag">Tag (optional)</LabelText>
          <Input
            id="ntf-tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="ride-2026-04-30 (auto-generated if blank)"
          />
          <Hint>
            Re-using a tag replaces an earlier notification on the user's device.
          </Hint>
        </Field>
      </Card>

      <Card>
        <Field>
          <LabelText>Send mode</LabelText>
          <ToggleRow role="tablist">
            <ToggleBtn
              type="button"
              role="tab"
              $active={mode === 'all'}
              onClick={() => setMode('all')}
            >
              All subscribers ({tokens.length})
            </ToggleBtn>
            <ToggleBtn
              type="button"
              role="tab"
              $active={mode === 'test'}
              onClick={() => setMode('test')}
            >
              Test → one device
            </ToggleBtn>
          </ToggleRow>
        </Field>

        {mode === 'test' && (
          <Field>
            <LabelText htmlFor="ntf-test-token">Pick a device</LabelText>
            <Select
              id="ntf-test-token"
              value={testTokenHash}
              onChange={(e) => setTestTokenHash(e.target.value)}
            >
              <option value="">— Choose subscriber —</option>
              {tokens.map((t) => (
                <option key={t.hash} value={t.hash}>
                  {platformIcon(t.platform)} {shortHash(t.hash)} · {uaSnippet(t.userAgent)}
                </option>
              ))}
            </Select>
            <Hint>
              Sends only to the selected device. Useful for end-to-end QA before a real broadcast.
            </Hint>
          </Field>
        )}

        <SendBtn type="button" onClick={requestSend} disabled={!canSend}>
          {sending ? 'Sending…' : (mode === 'test' ? 'Test send' : `Send to ${tokens.length}`)}
        </SendBtn>
        {error && <ErrorLine role="alert">{error}</ErrorLine>}
      </Card>

      {confirming && (
        <ModalBackdrop onClick={() => !sending && setConfirming(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {mode === 'test' ? 'Test send to one device?' : `Send to ${recipientCount} subscribers?`}
            </ModalTitle>
            <ModalText>
              <strong>{title || '(no title)'}</strong>
              <br />
              {body || '(no body)'}
            </ModalText>
            <div>
              <CancelBtn type="button" onClick={() => setConfirming(false)} disabled={sending}>
                Cancel
              </CancelBtn>
              <ConfirmBtn type="button" onClick={performSend} disabled={sending}>
                {sending ? 'Sending…' : 'Send'}
              </ConfirmBtn>
            </div>
            {error && <ErrorLine role="alert">{error}</ErrorLine>}
          </ModalCard>
        </ModalBackdrop>
      )}
    </div>
  );
}

export default NotificationCompose;
