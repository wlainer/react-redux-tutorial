export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export function showSuccessNotification(message) {
  return {
    type: SHOW_NOTIFICATION,
    notification_type: 'SUCCESS',
    message
  }
}

export function showErrorNotification(message) {
  return {
    type: SHOW_NOTIFICATION,
    notification_type: 'ERROR',
    message
  }
}

export function hideNotification() {
  return {
    type: CLEAR_NOTIFICATION
  }
}