import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout, { Page, FloatingEggs } from '../components/admin/AdminLayout';
import EventList from '../components/admin/EventList';
import EventEditor from '../components/admin/EventEditor';
import NotificationsTab from '../components/admin/NotificationsTab';
import SignupsTab from '../components/admin/SignupsTab';
import UsersTab from '../components/admin/UsersTab';
import EngagementTab from '../components/admin/EngagementTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import ErrorsTab from '../components/admin/ErrorsTab';
import { useCurrentUser, signOutUser } from '../services/auth';
import { subscribeEvents, partitionEvents } from '../services/events';

const Center = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 18px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  padding: 28px 22px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.10);
  backdrop-filter: blur(10px);
  text-align: center;
  color: #f4f4f4;
`;

const Title = styled.h1`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
`;

const Body = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin: 0 0 18px;
  line-height: 1.5;
`;

const Btn = styled.button`
  width: 100%;
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.98); }
  & + & { margin-top: 10px; }
`;

const SecondaryBtn = styled(Btn)`
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.12);
`;

const Spinner = styled.div`
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`;

const VALID_TABS = ['events', 'notifications', 'signups', 'users', 'engagement', 'analytics', 'errors'];

function AdminPage() {
  const { user, isAdmin, loading } = useCurrentUser();
  const navigate = useNavigate();
  const { tab: tabParam } = useParams();
  const tab = VALID_TABS.includes(tabParam) ? tabParam : 'events';
  const setTab = (next) => navigate(`/admin1/${next}`);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [editorTarget, setEditorTarget] = useState(null);

  // Normalize URL: bare /admin1 or unknown tab → /admin1/events.
  useEffect(() => {
    if (tabParam !== tab) navigate(`/admin1/${tab}`, { replace: true });
  }, [tabParam, tab, navigate]);

  useEffect(() => {
    if (!isAdmin) return undefined;
    const unsub = subscribeEvents((list) => {
      setEvents(list);
      setEventsLoading(false);
    });
    return () => unsub && unsub();
  }, [isAdmin]);

  const { upcoming, past } = useMemo(() => partitionEvents(events), [events]);

  const handleSignOut = async () => {
    try { await signOutUser(); } catch (_) {}
    setEditorTarget(null);
  };

  if (loading) {
    return (
      <Page>
        <FloatingEggs count={5} />
        <Center><Spinner>Loading…</Spinner></Center>
      </Page>
    );
  }

  if (!user) {
    return (
      <Page>
        <FloatingEggs count={5} />
        <Center>
          <Card>
            <Title>🥚 Admin Access</Title>
            <Body>Sign in to access admin. Tap below and the cog will pop open.</Body>
            <Btn type="button" onClick={() => window.dispatchEvent(new Event('auth:open'))}>
              Sign In
            </Btn>
          </Card>
        </Center>
      </Page>
    );
  }

  if (!isAdmin) {
    return (
      <Page>
        <FloatingEggs count={5} />
        <Center>
          <Card>
            <Title>Not authorized</Title>
            <Body>This account isn't an admin. Sign in with an admin account, or ask a crew member to grant access.</Body>
            <SecondaryBtn type="button" onClick={handleSignOut}>Sign Out</SecondaryBtn>
          </Card>
        </Center>
      </Page>
    );
  }

  const editingEvent = editorTarget && editorTarget !== 'new'
    ? events.find((e) => e.id === editorTarget) || null
    : null;

  return (
    <AdminLayout
      tab={tab}
      onTabChange={setTab}
      onSignOut={handleSignOut}
    >
      {tab === 'events' && (
        editorTarget == null ? (
          eventsLoading ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(255,255,255,0.55)' }}>
              Loading events…
            </div>
          ) : (
            <EventList
              upcoming={upcoming}
              past={past}
              onNew={() => setEditorTarget('new')}
              onEdit={(id) => setEditorTarget(id)}
            />
          )
        ) : (
          <EventEditor
            existing={editingEvent}
            onClose={() => setEditorTarget(null)}
            onSaved={() => setEditorTarget(null)}
            onDeleted={() => setEditorTarget(null)}
          />
        )
      )}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'signups' && <SignupsTab />}
      {tab === 'users' && <UsersTab />}
      {tab === 'engagement' && <EngagementTab />}
      {tab === 'analytics' && <AnalyticsTab />}
      {tab === 'errors' && <ErrorsTab />}
    </AdminLayout>
  );
}

export default AdminPage;
