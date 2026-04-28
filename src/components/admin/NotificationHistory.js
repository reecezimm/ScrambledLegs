import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { subscribeNotifications, filterRecent } from '../../services/notifications';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 8px 4px 4px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`;

const Row = styled.div`
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
`;

const RowHead = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover { background: rgba(255,255,255,0.05); }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .ts {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #FFC72C;
  }
  .badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,107,107,0.15);
    color: #FF8E8E;
    border: 1px solid rgba(255,107,107,0.35);
  }
  .title {
    font-family: 'Fredoka', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #f4f4f4;
  }
  .body {
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .stats {
    font-size: 11.5px;
    color: rgba(255,255,255,0.55);
    margin-top: 2px;
  }
`;

const Body = styled.div`
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 12px 14px;
  background: rgba(0,0,0,0.18);

  .pair {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 8px 12px;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .k {
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    font-weight: 700;
  }
  .v {
    color: rgba(255,255,255,0.85);
    word-break: break-word;
  }
  .v a { color: #FFC72C; }
`;

const FilterChips = styled.div`
  display: flex;
  gap: 6px;
  margin: 8px 0 6px;
  flex-wrap: wrap;
`;

const Chip = styled.button`
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$active ? '#FFC72C' : 'rgba(255,255,255,0.12)')};
  background: ${(p) => (p.$active ? 'rgba(255,199,44,0.12)' : 'rgba(255,255,255,0.04)')};
  color: ${(p) => (p.$active ? '#FFC72C' : 'rgba(255,255,255,0.7)')};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
`;

const Deliveries = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Delivery = styled.div`
  display: grid;
  grid-template-columns: 18px 84px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 6px 8px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  font-size: 11.5px;

  .icon { font-size: 13px; text-align: center; }
  .hash { font-family: monospace; color: rgba(255,255,255,0.7); }
  .ua { color: rgba(255,255,255,0.5); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .res {
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.1em;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .res.success { color: #6FE6A8; background: rgba(70,200,120,0.12); }
  .res.failure { color: #FF8E8E; background: rgba(255,107,107,0.12); }
  .opened { color: #6BB6FF; font-weight: 700; }
`;

const Empty = styled.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`;

// ----- helpers -------------------------------------------------------------

function fmtStamp(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

function platformIcon(p) {
  if (p === 'ios') return '🍎';
  if (p === 'android') return '🤖';
  if (p === 'desktop') return '🖥';
  return '🌐';
}

function shortHash(h) { return (h || '').slice(0, 8); }

function statsLine(n) {
  const sent = n.recipients || 0;
  const acc = n.accepted || 0;
  const fail = n.failed || 0;
  const op = n.opened || 0;
  const rate = acc > 0 ? Math.round((op / acc) * 100) : 0;
  return `${sent} sent · ${acc} accepted · ${fail} failed · ${op} opened (${rate}%)`;
}

// ----- row -----------------------------------------------------------------

function HistoryRow({ notif }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const deliveries = useMemo(() => {
    if (!notif.deliveries) return [];
    return Object.entries(notif.deliveries).map(([hash, v]) => ({ hash, ...v }));
  }, [notif.deliveries]);

  const visible = useMemo(() => {
    if (filter === 'opened') return deliveries.filter((d) => d.opened);
    if (filter === 'failed') return deliveries.filter((d) => d.result === 'failure');
    return deliveries;
  }, [deliveries, filter]);

  return (
    <Row>
      <RowHead type="button" onClick={() => setOpen((o) => !o)}>
        <div className="top">
          <span className="ts">{fmtStamp(notif.sentAt)}</span>
          {notif.isTest && <span className="badge">Test</span>}
        </div>
        <div className="title">{notif.title || '(untitled)'}</div>
        <div className="body">{notif.body || ''}</div>
        <div className="stats">{statsLine(notif)}</div>
      </RowHead>
      {open && (
        <Body>
          <div className="pair"><span className="k">Status</span><span className="v">{notif.status || '—'}</span></div>
          <div className="pair"><span className="k">Click URL</span><span className="v"><a href={notif.clickUrl} target="_blank" rel="noreferrer">{notif.clickUrl}</a></span></div>
          <div className="pair"><span className="k">Tag</span><span className="v">{notif.tag || '—'}</span></div>
          <div className="pair"><span className="k">Sent by</span><span className="v">{notif.sentBy || '—'}</span></div>

          <FilterChips>
            <Chip type="button" $active={filter === 'all'} onClick={() => setFilter('all')}>All ({deliveries.length})</Chip>
            <Chip type="button" $active={filter === 'opened'} onClick={() => setFilter('opened')}>
              Opened ({deliveries.filter((d) => d.opened).length})
            </Chip>
            <Chip type="button" $active={filter === 'failed'} onClick={() => setFilter('failed')}>
              Failed ({deliveries.filter((d) => d.result === 'failure').length})
            </Chip>
          </FilterChips>

          {deliveries.length === 0 ? (
            <Empty>No per-device records yet.</Empty>
          ) : (
            <Deliveries>
              {visible.map((d) => (
                <Delivery key={d.hash} title={d.errorCode || ''}>
                  <span className="icon">{platformIcon(d.platform)}</span>
                  <span className="hash">{shortHash(d.hash)}</span>
                  <span className="ua">
                    {d.opened ? <span className="opened">opened {fmtStamp(d.openedAt)} · </span> : null}
                    {fmtStamp(d.sentAt)}
                  </span>
                  <span className={`res ${d.result === 'success' ? 'success' : 'failure'}`}>
                    {d.result || '—'}
                  </span>
                </Delivery>
              ))}
            </Deliveries>
          )}
        </Body>
      )}
    </Row>
  );
}

// ----- list ----------------------------------------------------------------

export function NotificationHistory() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const unsub = subscribeNotifications((rows) => {
      setList(rows);
      setLoading(false);
    });
    return () => unsub && unsub();
  }, []);

  const visible = useMemo(() => (showAll ? list : filterRecent(list, 365)), [list, showAll]);

  return (
    <Wrap>
      <SectionLabel>History</SectionLabel>
      {loading ? (
        <div style={{ padding: '20px 0', textAlign: 'center', color: 'rgba(255,255,255,0.55)' }}>
          Loading…
        </div>
      ) : visible.length === 0 ? (
        <Empty>
          <div className="em">📭</div>
          No notifications sent yet.
        </Empty>
      ) : (
        visible.map((n) => <HistoryRow key={n.id} notif={n} />)
      )}
      {!loading && list.length > visible.length && (
        <Chip
          type="button"
          $active={showAll}
          onClick={() => setShowAll((s) => !s)}
          style={{ alignSelf: 'center', marginTop: 8 }}
        >
          {showAll ? 'Last 365 days only' : `Show all (${list.length})`}
        </Chip>
      )}
    </Wrap>
  );
}

export default NotificationHistory;
