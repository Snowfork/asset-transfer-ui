import { toast } from "react-toastify";

import {
  ADD_NOTIFICATION,
} from '../actionsTypes/notifications';

export type NotificationColor = 'success' | 'warning' | 'error' | 'default';

export interface Notification {
  text: string;
  color?: NotificationColor;
  id?: number;
}
export interface AddNotificationPayload {
  type: string;
  notification: Notification;
}

export interface RemoveNotificationPayload {
  type: string;
  id: number;
}

export function notify(
  notification: Notification,
): AddNotificationPayload {
  const date = Date.now();
  notification.id = date;

    switch(notification.color){
	case 'success':
	    toast.success(notification.text);
	    break;
	case 'warning':
	    toast.warning(notification.text);
	    break;
	case 'error':
	    toast.error(notification.text);
	    break;
	default:
	    toast.info(notification.text);
    }
    
  return {
    type: ADD_NOTIFICATION,
    notification,
  };
}