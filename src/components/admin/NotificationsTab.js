import React, { useState } from 'react';
import NotificationCompose from './NotificationCompose';
import NotificationProgress from './NotificationProgress';
import NotificationHistory from './NotificationHistory';

export function NotificationsTab() {
  const [activeNotifId, setActiveNotifId] = useState(null);

  return (
    <div>
      {activeNotifId && (
        <NotificationProgress
          notifId={activeNotifId}
          onDismiss={() => setActiveNotifId(null)}
        />
      )}
      <NotificationCompose onSent={(id) => setActiveNotifId(id)} />
      <NotificationHistory />
    </div>
  );
}

export default NotificationsTab;
