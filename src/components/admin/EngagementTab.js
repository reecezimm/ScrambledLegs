import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import { subscribeEvents } from '../../services/events';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SubTabs = styled.div`
  display: flex;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const SubTab = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: ${(p) => p.$active ? '#FFC72C' : 'rgba(255,255,255,0.55)'};
  border-bottom: 2px solid ${(p) => p.$active ? '#FFC72C' : 'transparent'};
  margin-bottom: -1px;
  cursor: pointer;
  &:hover { color: #FFE66D; }
`;

const Card = styled.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #1c1c1e;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  margin-bottom: 14px;
  color-scheme: dark;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  th, td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    vertical-align: top;
  }
  th {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }
  td { color: rgba(255,255,255,0.85); }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
`;

const ExportBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.25);
  background: rgba(255,199,44,0.10);
  color: #FFC72C;
  cursor: pointer;
  margin-bottom: 8px;
  &:hover { background: rgba(255,199,44,0.18); }
`;

const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;

function fmtDate(ts) {
  if (!ts) return '—';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(new Date(ts));
}

function csvEscape(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(filename, header, rows) {
  const lines = [header.map(csvEscape).join(',')];
  rows.forEach((r) => lines.push(r.map(csvEscape).join(',')));
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function PerEventPanel({ events }) {
  const [eventId, setEventId] = useState('');
  const [rsvps, setRsvps] = useState({});
  const [totals, setTotals] = useState({});
  const [sessions, setSessions] = useState({});
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const r = ref(database, 'userProfiles');
    const u = onValue(r, (s) => setProfiles(s.val() || {}));
    return () => u();
  }, []);

  useEffect(() => {
    if (!eventId) { setRsvps({}); setTotals({}); setSessions({}); return undefined; }
    const u1 = onValue(ref(database, `rsvps/${eventId}`), (s) => setRsvps(s.val() || {}));
    const u2 = onValue(ref(database, `eventMashTotals/${eventId}`), (s) => setTotals(s.val() || {}));
    const u3 = onValue(ref(database, `mashSessions/${eventId}`), (s) => setSessions(s.val() || {}));
    return () => { u1(); u2(); u3(); };
  }, [eventId]);

  const event = events.find((e) => e.id === eventId);
  const totalHotdogs = (event && event.hotdogs) || 0;
  const attributedTotal = useMemo(
    () => Object.values(totals).reduce((a, b) => a + (b || 0), 0),
    [totals]
  );
  const anonMashes = Math.max(0, totalHotdogs - attributedTotal);

  const rsvpRows = useMemo(() => {
    return Object.entries(rsvps).map(([uid, r]) => ({
      uid,
      name: (r && r.displayName) || (profiles[uid] && profiles[uid].displayName) || uid.slice(0, 6),
      email: (r && r.email) || (profiles[uid] && profiles[uid].email) || '',
      rsvpedAt: (r && r.rsvpedAt) || 0,
      mashes: totals[uid] || 0,
      sessionCount: (sessions[uid] && Object.keys(sessions[uid]).length) || 0,
    })).sort((a, b) => (b.mashes - a.mashes) || (a.rsvpedAt - b.rsvpedAt));
  }, [rsvps, totals, sessions, profiles]);

  const badEggs = useMemo(() => {
    return Object.entries(totals)
      .filter(([uid, count]) => !rsvps[uid] && (count || 0) >= 10)
      .map(([uid, count]) => ({
        uid,
        name: (profiles[uid] && profiles[uid].displayName) || uid.slice(0, 6),
        email: (profiles[uid] && profiles[uid].email) || '',
        mashes: count,
      }))
      .sort((a, b) => b.mashes - a.mashes);
  }, [totals, rsvps, profiles]);

  return (
    <div>
      <Card>
        <Label>Pick an event</Label>
        <Select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">— Choose event —</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {fmtDate(ev.start)} · {ev.name || '(untitled)'}
            </option>
          ))}
        </Select>

        {eventId && (
          <>
            <Label>RSVPs · {rsvpRows.length} · Anonymous mashes: {anonMashes}</Label>
            <ExportBtn type="button" onClick={() => downloadCsv(
              `engagement-rsvps-${eventId}.csv`,
              ['Name', 'Email', 'RSVP at', 'Mashes', 'Sessions'],
              rsvpRows.map((r) => [r.name, r.email, r.rsvpedAt ? new Date(r.rsvpedAt).toISOString() : '', r.mashes, r.sessionCount]),
            )}>Export CSV</ExportBtn>
            {rsvpRows.length === 0 ? <Empty>No RSVPs yet.</Empty> : (
              <Table>
                <thead><tr>
                  <th>Name</th><th>Email</th><th>RSVP at</th>
                  <th className="num">Mashes</th><th className="num">Sessions</th>
                </tr></thead>
                <tbody>{rsvpRows.map((r) => (
                  <tr key={r.uid}>
                    <td>{r.name}</td><td>{r.email}</td><td>{fmtDate(r.rsvpedAt)}</td>
                    <td className="num">{r.mashes}</td><td className="num">{r.sessionCount}</td>
                  </tr>
                ))}</tbody>
              </Table>
            )}

            <Label style={{ marginTop: 16 }}>Bad Eggs · {badEggs.length}</Label>
            {badEggs.length === 0 ? <Empty>None.</Empty> : (
              <Table>
                <thead><tr><th>Name</th><th>Email</th><th className="num">Mashes</th></tr></thead>
                <tbody>{badEggs.map((r) => (
                  <tr key={r.uid}><td>{r.name}</td><td>{r.email}</td><td className="num">{r.mashes}</td></tr>
                ))}</tbody>
              </Table>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

function UsersPanel() {
  const [profiles, setProfiles] = useState({});
  const [allTotals, setAllTotals] = useState({});
  const [allRsvps, setAllRsvps] = useState({});

  useEffect(() => {
    const u1 = onValue(ref(database, 'userProfiles'), (s) => setProfiles(s.val() || {}));
    const u2 = onValue(ref(database, 'eventMashTotals'), (s) => setAllTotals(s.val() || {}));
    const u3 = onValue(ref(database, 'rsvps'), (s) => setAllRsvps(s.val() || {}));
    return () => { u1(); u2(); u3(); };
  }, []);

  const rows = useMemo(() => {
    const map = {};
    Object.entries(profiles).forEach(([uid, p]) => {
      map[uid] = {
        uid,
        name: p.displayName || uid.slice(0, 6),
        email: p.email || '',
        lastSeenAt: p.lastSeenAt || 0,
        lifetimeMashes: 0,
        rsvpCount: 0,
      };
    });
    Object.values(allTotals).forEach((perUser) => {
      Object.entries(perUser || {}).forEach(([uid, count]) => {
        if (!map[uid]) map[uid] = { uid, name: uid.slice(0, 6), email: '', lastSeenAt: 0, lifetimeMashes: 0, rsvpCount: 0 };
        map[uid].lifetimeMashes += (count || 0);
      });
    });
    Object.values(allRsvps).forEach((perUser) => {
      Object.keys(perUser || {}).forEach((uid) => {
        if (!map[uid]) map[uid] = { uid, name: uid.slice(0, 6), email: '', lastSeenAt: 0, lifetimeMashes: 0, rsvpCount: 0 };
        map[uid].rsvpCount += 1;
      });
    });
    return Object.values(map).sort((a, b) => b.lifetimeMashes - a.lifetimeMashes);
  }, [profiles, allTotals, allRsvps]);

  return (
    <Card>
      <Label>Users · {rows.length}</Label>
      <ExportBtn type="button" onClick={() => downloadCsv(
        'engagement-users.csv',
        ['Name', 'Email', 'Lifetime mashes', 'RSVP count', 'Last seen'],
        rows.map((r) => [r.name, r.email, r.lifetimeMashes, r.rsvpCount, r.lastSeenAt ? new Date(r.lastSeenAt).toISOString() : '']),
      )}>Export CSV</ExportBtn>
      {rows.length === 0 ? <Empty>No users yet.</Empty> : (
        <Table>
          <thead><tr>
            <th>Name</th><th>Email</th>
            <th className="num">Lifetime 🌭</th><th className="num">RSVPs</th><th>Last seen</th>
          </tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.uid}>
              <td>{r.name}</td><td>{r.email}</td>
              <td className="num">{r.lifetimeMashes}</td>
              <td className="num">{r.rsvpCount}</td>
              <td>{fmtDate(r.lastSeenAt)}</td>
            </tr>
          ))}</tbody>
        </Table>
      )}
    </Card>
  );
}

function RecentSessionsPanel() {
  const [sessions, setSessions] = useState([]);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const u1 = onValue(ref(database, 'userProfiles'), (s) => setProfiles(s.val() || {}));
    const u2 = onValue(ref(database, 'mashSessions'), (s) => {
      const all = [];
      const v = s.val() || {};
      Object.entries(v).forEach(([eventId, perUser]) => {
        Object.entries(perUser || {}).forEach(([uid, perSession]) => {
          Object.entries(perSession || {}).forEach(([sid, sess]) => {
            all.push({ sid, eventId, uid, ...sess });
          });
        });
      });
      all.sort((a, b) => (b.endedAt || 0) - (a.endedAt || 0));
      setSessions(all.slice(0, 50));
    });
    return () => { u1(); u2(); };
  }, []);

  return (
    <Card>
      <Label>Recent sessions · last 50</Label>
      <ExportBtn type="button" onClick={() => downloadCsv(
        'engagement-sessions.csv',
        ['User', 'Event', 'Started', 'Ended', 'Count'],
        sessions.map((s) => [
          (profiles[s.uid] && profiles[s.uid].displayName) || s.uid.slice(0, 6),
          s.eventId,
          s.startedAt ? new Date(s.startedAt).toISOString() : '',
          s.endedAt ? new Date(s.endedAt).toISOString() : '',
          s.count || 0,
        ]),
      )}>Export CSV</ExportBtn>
      {sessions.length === 0 ? <Empty>No sessions logged yet.</Empty> : (
        <Table>
          <thead><tr>
            <th>User</th><th>Event</th><th>Ended</th><th className="num">Count</th>
          </tr></thead>
          <tbody>{sessions.map((s) => (
            <tr key={s.sid}>
              <td>{(profiles[s.uid] && profiles[s.uid].displayName) || s.uid.slice(0, 6)}</td>
              <td>{s.eventId.slice(0, 8)}…</td>
              <td>{fmtDate(s.endedAt)}</td>
              <td className="num">{s.count || 0}</td>
            </tr>
          ))}</tbody>
        </Table>
      )}
    </Card>
  );
}

export default function EngagementTab() {
  const [section, setSection] = useState('per-event');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsub = subscribeEvents((list) => setEvents(list));
    return () => unsub && unsub();
  }, []);

  return (
    <Wrap>
      <SubTabs>
        <SubTab type="button" $active={section === 'per-event'} onClick={() => setSection('per-event')}>Per-event</SubTab>
        <SubTab type="button" $active={section === 'users'} onClick={() => setSection('users')}>Users</SubTab>
        <SubTab type="button" $active={section === 'sessions'} onClick={() => setSection('sessions')}>Recent sessions</SubTab>
      </SubTabs>
      {section === 'per-event' && <PerEventPanel events={events} />}
      {section === 'users' && <UsersPanel />}
      {section === 'sessions' && <RecentSessionsPanel />}
    </Wrap>
  );
}
