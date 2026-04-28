import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { subscribeNotification } from '../../services/notifications';

const Card = styled.section`
  background: rgba(255,199,44,0.06);
  border: 1px solid rgba(255,199,44,0.30);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
  margin: 0 0 12px;
  color: #FFC72C;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

const Stat = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 8px;
  text-align: center;

  .label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 2px;
  }
  .num {
    font-family: 'Fredoka', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #f4f4f4;
    font-variant-numeric: tabular-nums;
  }
`;

const Bar = styled.div`
  position: relative;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;
const BarFill = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${(p) => p.$pct}%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.4s ease;
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255,255,255,0.7);

  .badge {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.12em;
    padding: 4px 8px;
    border-radius: 999px;
    color: ${(p) => (p.$done ? '#1a1a1a' : '#FFE66D')};
    background: ${(p) => (p.$done ? '#FFC72C' : 'rgba(255,199,44,0.12)')};
    border: 1px solid ${(p) => (p.$done ? '#FFC72C' : 'rgba(255,199,44,0.35)')};
  }
`;

const DismissBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
`;

export function NotificationProgress({ notifId, onDismiss }) {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    if (!notifId) return undefined;
    const unsub = subscribeNotification(notifId, setNotif);
    return () => unsub && unsub();
  }, [notifId]);

  if (!notifId) return null;
  if (!notif) {
    return (
      <Card>
        <Title>✉️ Sending…</Title>
        <StatusLine $done={false}>
          <span>Waiting for first update…</span>
          <span className="badge">connecting</span>
        </StatusLine>
      </Card>
    );
  }

  const recipients = notif.recipients || 0;
  const accepted = notif.accepted || 0;
  const failed = notif.failed || 0;
  const opened = notif.opened || 0;
  const status = notif.status || 'sending';
  const done = status === 'sent';
  const processed = accepted + failed;
  const pct = recipients > 0 ? Math.min(100, Math.round((processed / recipients) * 100)) : (done ? 100 : 0);

  return (
    <Card>
      <Title>{done ? '✅ Done' : '✉️ Sending…'} — “{notif.title || 'untitled'}”</Title>
      <StatRow>
        <Stat><div className="label">Recipients</div><div className="num">{recipients}</div></Stat>
        <Stat><div className="label">Accepted</div><div className="num">{accepted}</div></Stat>
        <Stat><div className="label">Failed</div><div className="num">{failed}</div></Stat>
        <Stat><div className="label">Opened</div><div className="num">{opened}</div></Stat>
      </StatRow>
      <Bar><BarFill $pct={pct} /></Bar>
      <StatusLine $done={done}>
        <span>{done ? 'Batch finished. Opens trickle in over time.' : 'FCM is processing…'}</span>
        <span className="badge">{status}</span>
      </StatusLine>
      {done && (
        <DismissBtn type="button" onClick={onDismiss}>Done</DismissBtn>
      )}
    </Card>
  );
}

export default NotificationProgress;
