export interface Notification {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  unread: boolean;
  type: string;
  avatar: string;
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    user: 'Chris Tompson',
    action: 'requested review on',
    target: 'PR #42: Feature implementation',
    timestamp: '15 minutes ago',
    unread: true,
    type: 'review',
    avatar: 'CT',
  },
  {
    id: 2,
    user: 'Emma Davis',
    action: 'shared',
    target: 'New component library',
    timestamp: '45 minutes ago',
    unread: true,
    type: 'share',
    avatar: 'ED',
  },
  {
    id: 3,
    user: 'James Wilson',
    action: 'assigned you to',
    target: 'API integration task',
    timestamp: '4 hours ago',
    unread: false,
    type: 'assign',
    avatar: 'JW',
  },
  {
    id: 4,
    user: 'Alex Morgan',
    action: 'replied to your comment in',
    target: 'Authentication flow',
    timestamp: '12 hours ago',
    unread: false,
    type: 'comment',
    avatar: 'AM',
  },
  {
    id: 5,
    user: 'Sarah Chen',
    action: 'commented on',
    target: 'Dashboard redesign',
    timestamp: '2 days ago',
    unread: false,
    type: 'comment',
    avatar: 'SC',
  },
  {
    id: 6,
    user: 'Miky Derya',
    action: 'mentioned you in',
    target: 'Origin UI open graph image',
    timestamp: '2 weeks ago',
    unread: false,
    type: 'mention',
    avatar: 'MD',
  },
];
