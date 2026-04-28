import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, query, limitToLast, remove } from 'firebase/database';
import { database } from '../../services/firebase';

const Wrap = styled.div` display: flex; flex-direction: column; gap: 14px; `;

const HeaderRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
`;

const Count = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  color: #FF8E8E;
  background: rgba(255,107,107,0.10);
  border: 1px solid rgba(255,107,107,0.30);
  padding: 4px 10px; border-radius: 999px;
  margin-left: 8px;
`;

const ClearBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.05em; text-transform: uppercase;
  padding: 8px 12px; border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.40);
  background: rgba(255,107,107,0.08);
  color: #FF8E8E; cursor: pointer;
  &:hover { background: rgba(255,107,107,0.16); }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,107,107,0.20);
  border-radius: 12px;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
`;

const Top = styled.div`
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 12px;
`;

const Msg = styled.div`
  color: #FFD2D2;
  font-weight: 600;
  margin: 6px 0 4px;
  word-break: break-word;
`;

const Meta = styled.div`
  font-size: 11px; color: rgba(255,255,255,0.55);
  display: flex; flex-wrap: wrap; gap: 10px;
`;

const Stack = styled.pre`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px; color: rgba(255,255,255,0.62);
  background: rgba(0,0,0,0.30);
  padding: 8px 10px;
  margin-top: 8px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 220px;
  overflow: auto;
`;

const Empty = styled.div`
  padding: 36px 16px; text-align: center;
  color: rgba(255,255,255,0.45);
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  font-size: 14px;
`;

function fmtWhen(ts) {
  if (!ts) return '—';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(new Date(ts));
}

export default function ErrorsTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const q = query(ref(database, 'errorLogs'), limitToLast(200));
    const unsub = onValue(q, (snap) => {
      const v = snap.val() || {};
      const list = Object.entries(v).map(([id, e]) => ({ id, ...e }));
      list.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setRows(list);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const grouped = useMemo(() => rows, [rows]);

  const onClearAll = async () => {
    if (!window.confirm('Delete all error logs? This cannot be undone.')) return;
    try { await remove(ref(database, 'errorLogs')); } catch (_) {}
  };

  if (loading) return <Wrap><Empty>Loading…</Empty></Wrap>;

  return (
    <Wrap>
      <HeaderRow>
        <Label>Recent errors <Count>{rows.length}</Count></Label>
        {rows.length > 0 && <ClearBtn type="button" onClick={onClearAll}>Clear all</ClearBtn>}
      </HeaderRow>

      {rows.length === 0 ? (
        <Empty>🥚 No errors logged. Things are quiet.</Empty>
      ) : (
        grouped.map((r) => (
          <Card key={r.id}>
            <Top>
              <span style={{ color: '#FFC72C', fontWeight: 700 }}>{fmtWhen(r.ts)}</span>
              <span>{r.email || r.uid || 'anonymous'}</span>
            </Top>
            <Msg>{r.msg || '(no message)'}</Msg>
            <Meta>
              <span>v {r.version || '—'}</span>
              <span>build {r.buildNum || '—'}</span>
              <span>{r.buildSha || '—'}</span>
              {r.context && r.context.type && <span>{r.context.type}</span>}
              {r.url && <span style={{ wordBreak: 'break-all' }}>{r.url.replace(/^https?:\/\//, '')}</span>}
            </Meta>
            {r.stack && (
              <>
                <button
                  type="button"
                  onClick={() => setExpanded((e) => ({ ...e, [r.id]: !e[r.id] }))}
                  style={{
                    marginTop: 8,
                    background: 'transparent',
                    border: 'none',
                    color: '#FFE66D',
                    fontSize: 11,
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {expanded[r.id] ? 'Hide stack ▲' : 'Show stack ▼'}
                </button>
                {expanded[r.id] && <Stack>{r.stack}</Stack>}
              </>
            )}
          </Card>
        ))
      )}
    </Wrap>
  );
}
