import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';

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
  letter-spacing: 0;
  text-transform: none;
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
  transition: background 0.15s;

  &:hover { background: rgba(255,199,44,0.18); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const TableWrap = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 13px;

  th, td {
    padding: 12px 14px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
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
    white-space: nowrap;
  }

  th:hover { color: #FFE66D; }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,199,44,0.04); }

  td.name { color: #f4f4f4; font-weight: 500; }
  td.email { color: rgba(255,255,255,0.78); }
  td.email a { color: inherit; text-decoration: none; }
  td.email a:hover { color: #FFE66D; text-decoration: underline; }
  td.date { color: rgba(255,255,255,0.55); white-space: nowrap; }

  @media (max-width: 560px) {
    font-size: 12px;
    th, td { padding: 10px 10px; }
    td.date { font-size: 11px; }
  }
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
  const header = ['Name', 'Email', 'Submitted'];
  const lines = [header.join(',')];
  rows.forEach((r) => {
    lines.push([
      csvEscape(r.name),
      csvEscape(r.email),
      csvEscape(r.timestamp ? new Date(r.timestamp).toISOString() : ''),
    ].join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `scrambled-legs-signups-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function SignupsTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('timestamp');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    const r = ref(database, 'newsletterRegistrants');
    const unsub = onValue(r, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, v]) => ({
        id,
        name: v.name || '',
        email: v.email || '',
        timestamp: v.timestamp || 0,
      }));
      setRows(list);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows;
    if (q) {
      out = out.filter((r) =>
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      );
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    out = [...out].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
    return out;
  }, [rows, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'timestamp' ? 'desc' : 'asc');
    }
  };

  const arrow = (key) => {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  if (loading) return <Loading>Loading signups…</Loading>;

  return (
    <Wrap>
      <SectionLabel>
        Newsletter Signups <Count>{rows.length}</Count>
      </SectionLabel>

      <HeaderRow>
        <SearchInput
          type="search"
          placeholder="Search name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ExportBtn
          type="button"
          onClick={() => downloadCsv(filtered)}
          disabled={filtered.length === 0}
        >
          Export CSV
        </ExportBtn>
      </HeaderRow>

      {rows.length === 0 ? (
        <Empty>
          <span className="emoji">📭</span>
          No signups yet. When folks join via the form on the home page,
          they'll show up here.
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
                <th onClick={() => toggleSort('name')}>Name{arrow('name')}</th>
                <th onClick={() => toggleSort('email')}>Email{arrow('email')}</th>
                <th onClick={() => toggleSort('timestamp')}>Submitted{arrow('timestamp')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="name">{r.name || '—'}</td>
                  <td className="email">
                    {r.email
                      ? <a href={`mailto:${r.email}`}>{r.email}</a>
                      : '—'}
                  </td>
                  <td className="date">{fmtDate(r.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </Wrap>
  );
}

export default SignupsTab;
