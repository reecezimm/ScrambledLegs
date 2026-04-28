import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../../services/firebase';
import { subscribeEvents } from '../../services/events';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
  text-align: left;
`;

const StatLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
`;

const StatValue = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #FFC72C;
  font-variant-numeric: tabular-nums;
`;

const StatSub = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
`;

const Card = styled.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`;

const SectionTitle = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
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

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 120px;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const Bar = styled.div`
  flex: 1;
  background: linear-gradient(180deg, #FFE66D, #FFC72C);
  border-radius: 4px 4px 0 0;
  min-height: 2px;
  position: relative;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`;

const BarLabels = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255,255,255,0.40);
`;

const BarLabel = styled.div`
  flex: 1;
  text-align: center;
`;

const Feed = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const FeedRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  &:last-child { border-bottom: none; }
`;

const FeedTime = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  white-space: nowrap;
  flex-shrink: 0;
  width: 90px;
`;

const FeedName = styled.div`
  font-weight: 600;
  color: #FFE66D;
  flex-shrink: 0;
`;

const FeedProps = styled.div`
  flex: 1;
  color: rgba(255,255,255,0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FunnelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
`;

const FunnelLabel = styled.div`
  flex: 0 0 200px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
`;

const FunnelBarWrap = styled.div`
  flex: 1;
  height: 18px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
`;

const FunnelBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  width: ${(p) => p.$pct}%;
  transition: width 0.3s;
`;

const FunnelStat = styled.div`
  flex: 0 0 110px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;

function fmtTime(ts) {
  if (!ts) return '—';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(new Date(ts));
}

export default function AnalyticsTab() {
  const [analytics, setAnalytics] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [tokens, setTokens] = useState({});
  const [allTotals, setAllTotals] = useState({});
  const [allRsvps, setAllRsvps] = useState({});
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    const q = query(ref(database, 'analyticsEvents'), orderByChild('ts'), limitToLast(1000));
    const u = onValue(q, (snap) => {
      const out = [];
      snap.forEach((c) => out.push({ id: c.key, ...(c.val() || {}) }));
      out.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setAnalytics(out);
    });
    return () => u();
  }, []);

  useEffect(() => {
    const u1 = onValue(ref(database, 'userProfiles'), (s) => setProfiles(s.val() || {}));
    const u2 = onValue(ref(database, 'fcmTokens'), (s) => setTokens(s.val() || {}));
    const u3 = onValue(ref(database, 'eventMashTotals'), (s) => setAllTotals(s.val() || {}));
    const u4 = onValue(ref(database, 'rsvps'), (s) => setAllRsvps(s.val() || {}));
    const u5 = subscribeEvents((list) => setEvents(list));
    return () => { u1(); u2(); u3(); u4 && u4(); u5 && u5(); };
  }, []);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    let rsvpsThisWeek = 0;
    Object.values(allRsvps).forEach((perEvent) => {
      Object.values(perEvent || {}).forEach((r) => {
        if ((r && r.rsvpedAt) >= weekAgo) rsvpsThisWeek += 1;
      });
    });
    let signedInMashes = 0;
    Object.values(allTotals).forEach((perUser) => {
      Object.values(perUser || {}).forEach((c) => { signedInMashes += (c || 0); });
    });
    let totalEventMashes = 0;
    events.forEach((e) => { totalEventMashes += (e.hotdogs || 0); });
    const anonMashes = Math.max(0, totalEventMashes - signedInMashes);
    const subscribedDevices = Object.keys(tokens).length;
    const homeViews = analytics.filter((a) => a.name === 'home_view').length;
    const optInRate = homeViews > 0 ? Math.round(subscribedDevices / homeViews * 100) : 0;
    const pwaInstalls = analytics.filter((a) => a.name === 'pwa_installed').length;
    return {
      users: Object.keys(profiles).length,
      rsvpsThisWeek,
      signedInMashes,
      anonMashes,
      subscribedDevices,
      optInRate,
      pwaInstalls,
    };
  }, [profiles, tokens, allTotals, allRsvps, events, analytics]);

  const eventBars = useMemo(() => {
    if (!eventId) return [];
    const sessions = analytics.filter((a) => a.name === 'mash_session_complete' && a.props && a.props.eventId === eventId);
    const buckets = new Array(7).fill(0);
    const now = Date.now();
    sessions.forEach((s) => {
      const age = now - (s.ts || 0);
      const day = Math.floor(age / 86400000);
      if (day >= 0 && day < 7) {
        buckets[6 - day] += (s.props.count || 0);
      }
    });
    const max = Math.max(1, ...buckets);
    return buckets.map((v) => ({ value: v, pct: (v / max) * 100 }));
  }, [analytics, eventId]);

  const eventRsvpCount = useMemo(() => {
    if (!eventId) return 0;
    return Object.keys(allRsvps[eventId] || {}).length;
  }, [allRsvps, eventId]);

  const funnel = useMemo(() => {
    const counts = {
      home_view: analytics.filter((a) => a.name === 'home_view').length,
      mash_session_complete: analytics.filter((a) => a.name === 'mash_session_complete').length,
      signup_completed: analytics.filter((a) => a.name === 'signup_completed').length,
      signin_completed: analytics.filter((a) => a.name === 'signin_completed').length,
      rsvp_added: analytics.filter((a) => a.name === 'rsvp_added').length,
    };
    const max = Math.max(1, counts.home_view);
    return [
      { label: 'Home view', count: counts.home_view, pct: 100 },
      { label: 'Mash session', count: counts.mash_session_complete, pct: counts.mash_session_complete / max * 100 },
      { label: 'Account created', count: counts.signup_completed, pct: counts.signup_completed / max * 100 },
      { label: 'Sign in', count: counts.signin_completed, pct: counts.signin_completed / max * 100 },
      { label: 'RSVP added', count: counts.rsvp_added, pct: counts.rsvp_added / max * 100 },
    ];
  }, [analytics]);

  const topMashers = useMemo(() => {
    const map = {};
    Object.values(allTotals).forEach((perUser) => {
      Object.entries(perUser || {}).forEach(([uid, count]) => {
        map[uid] = (map[uid] || 0) + (count || 0);
      });
    });
    return Object.entries(map)
      .map(([uid, count]) => ({
        uid, count,
        name: (profiles[uid] && profiles[uid].displayName) || uid.slice(0, 6),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allTotals, profiles]);

  const topRsvpers = useMemo(() => {
    const map = {};
    Object.values(allRsvps).forEach((perUser) => {
      Object.keys(perUser || {}).forEach((uid) => {
        map[uid] = (map[uid] || 0) + 1;
      });
    });
    return Object.entries(map)
      .map(([uid, count]) => ({
        uid, count,
        name: (profiles[uid] && profiles[uid].displayName) || uid.slice(0, 6),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allRsvps, profiles]);

  const recentFeed = analytics.slice(0, 50);

  return (
    <Wrap>
      <Cards>
        <StatCard>
          <StatLabel>Signed-in users</StatLabel>
          <StatValue>{stats.users}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>RSVPs this week</StatLabel>
          <StatValue>{stats.rsvpsThisWeek}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Mashes (signed-in)</StatLabel>
          <StatValue>{stats.signedInMashes}</StatValue>
          <StatSub>Anon: {stats.anonMashes}</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>Notif opt-in</StatLabel>
          <StatValue>{stats.optInRate}%</StatValue>
          <StatSub>{stats.subscribedDevices} devices</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>PWA installs</StatLabel>
          <StatValue>{stats.pwaInstalls}</StatValue>
        </StatCard>
      </Cards>

      <Card>
        <SectionTitle>Per-event mash bar (24h × 7 days)</SectionTitle>
        <Select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">— Choose event —</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.name || '(untitled)'}</option>
          ))}
        </Select>
        {eventId ? (
          <>
            <Bars>
              {eventBars.map((b, i) => (
                <Bar key={i} style={{ height: `${Math.max(2, b.pct)}%` }} title={`${b.value} mashes`} />
              ))}
            </Bars>
            <BarLabels>
              {eventBars.map((b, i) => (
                <BarLabel key={i}>{b.value || ''}</BarLabel>
              ))}
            </BarLabels>
            <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              RSVPs for this event: {eventRsvpCount}
            </div>
          </>
        ) : <Empty>Pick an event to see its 7-day mash chart.</Empty>}
      </Card>

      <Card>
        <SectionTitle>Funnel</SectionTitle>
        {funnel.map((f) => (
          <FunnelRow key={f.label}>
            <FunnelLabel>{f.label}</FunnelLabel>
            <FunnelBarWrap><FunnelBar $pct={f.pct} /></FunnelBarWrap>
            <FunnelStat>{f.count} ({Math.round(f.pct)}%)</FunnelStat>
          </FunnelRow>
        ))}
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
        <Card>
          <SectionTitle>Top mashers (lifetime)</SectionTitle>
          {topMashers.length === 0 ? <Empty>No data yet.</Empty> : topMashers.map((u) => (
            <FeedRow key={u.uid}><FeedName>{u.name}</FeedName><FeedProps>🌭 {u.count}</FeedProps></FeedRow>
          ))}
        </Card>
        <Card>
          <SectionTitle>Top RSVPers</SectionTitle>
          {topRsvpers.length === 0 ? <Empty>No data yet.</Empty> : topRsvpers.map((u) => (
            <FeedRow key={u.uid}><FeedName>{u.name}</FeedName><FeedProps>{u.count} events</FeedProps></FeedRow>
          ))}
        </Card>
      </div>

      <Card>
        <SectionTitle>Recent activity · last 50</SectionTitle>
        <Feed>
          {recentFeed.length === 0 ? <Empty>No analytics events yet.</Empty> : recentFeed.map((a) => {
            const who = a.uid ? ((profiles[a.uid] && profiles[a.uid].displayName) || a.uid.slice(0, 6)) : 'anon';
            const propStr = a.props ? Object.entries(a.props).map(([k, v]) => `${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`).join(' ') : '';
            return (
              <FeedRow key={a.id}>
                <FeedTime>{fmtTime(a.ts)}</FeedTime>
                <FeedName>{a.name}</FeedName>
                <FeedProps>{who} · {propStr}</FeedProps>
              </FeedRow>
            );
          })}
        </Feed>
      </Card>
    </Wrap>
  );
}
