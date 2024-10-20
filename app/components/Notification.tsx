
import React from 'react';
import { InlineNotification } from '@carbon/react';

interface NotificationProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, subtitle, onClose }) => {
  return (
    <InlineNotification
      title={title}
      subtitle={subtitle}
      kind="success" 
      lowContrast={false}
      onClose={onClose}
      style={{ width: '100%' }} 
    />
  );
};

export default Notification;
