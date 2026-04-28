import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import PasswordGate from '../components/admin/PasswordGate';
import EventList from '../components/admin/EventList';
import EventEditor from '../components/admin/EventEditor';
import NotificationsTab from '../components/admin/NotificationsTab';
import { isAuthed, signOut } from '../services/adminAuth';
import { subscribeEvents, partitionEvents } from '../services/events';

function AdminPage() {
  const [authed, setAuthed] = useState(() => isAuthed());
  const [tab, setTab] = useState('events');

  // events list
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // editor state — null = list view, 'new' = create, '<id>' = edit
  const [editorTarget, setEditorTarget] = useState(null);

  useEffect(() => {
    if (!authed) return undefined;
    const unsub = subscribeEvents((list) => {
      setEvents(list);
      setLoading(false);
    });
    return () => unsub && unsub();
  }, [authed]);

  const { upcoming, past } = useMemo(() => partitionEvents(events), [events]);

  const handleSignOut = () => {
    signOut();
    setAuthed(false);
    setEditorTarget(null);
  };

  if (!authed) {
    return <PasswordGate onAuthed={() => setAuthed(true)} />;
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
          loading ? (
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
            onSaved={(id) => {
              // After save, jump back to list so the row reflects the new state.
              setEditorTarget(null);
            }}
            onDeleted={() => setEditorTarget(null)}
          />
        )
      )}
      {tab === 'notifications' && <NotificationsTab />}
    </AdminLayout>
  );
}

export default AdminPage;
