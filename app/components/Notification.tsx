
import React from 'react';
import { InlineNotification } from '@carbon/react';


//JF - model - norm would store these in utils 
interface NotificationProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}
//JF GET NOTIFICATION component created so can be anywhere as needs to be at a higher level than just page we then pass the data into it and display were we wish we could extend this to loads of diffrent notifcatiosn types currently just for cart 

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
