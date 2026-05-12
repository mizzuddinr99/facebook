import { create } from 'zustand';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  time: string;
  privacy: 'public' | 'friends';
  text: string;
  media?: string[];
  mediaType?: 'single' | 'grid';
  reactions: number;
  comments: number;
  shares: number;
  liked: boolean;
}

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  viewed: boolean;
  isUser?: boolean;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'birthday' | 'post' | 'suggestion' | 'marketplace' | 'live' | 'memory';
  userName?: string;
  userAvatar?: string;
  message: string;
  time: string;
  read: boolean;
  actionIcon?: string;
}

interface Video {
  id: string;
  publisher: string;
  publisherAvatar: string;
  thumbnail: string;
  duration: string;
  title: string;
  views: string;
  time: string;
}

interface Product {
  id: string;
  image: string;
  price: string;
  title: string;
  location: string;
}

interface AppState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  posts: Post[];
  toggleLike: (postId: string) => void;

  stories: Story[];
  markStoryViewed: (storyId: string) => void;

  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadNotifications: number;

  videos: Video[];
  products: Product[];
}

const initialPosts: Post[] = [
  {
    id: '1',
    userId: 'sarah',
    userName: 'Sarah Mitchell',
    userAvatar: '/assets/avatar-sarah.jpg',
    time: '2 hrs',
    privacy: 'public',
    text: 'Just spent the weekend hiking at Yosemite! The views were absolutely breathtaking. Can\'t wait to go back.',
    media: ['/assets/post-yosemite.jpg'],
    mediaType: 'single',
    reactions: 142,
    comments: 23,
    shares: 8,
    liked: false,
  },
  {
    id: '2',
    userId: 'techdaily',
    userName: 'TechDaily',
    userAvatar: '/assets/avatar-marcus.jpg',
    time: '4 hrs',
    privacy: 'public',
    text: 'The new smartphone lineup is here! Check out our full review and comparison. Which one are you getting?',
    media: ['/assets/product-iphone.jpg', '/assets/product-chair.jpg', '/assets/post-pasta.jpg', '/assets/post-moose.jpg'],
    mediaType: 'grid',
    reactions: 1200,
    comments: 89,
    shares: 45,
    liked: false,
  },
  {
    id: '3',
    userId: 'marcus',
    userName: 'Marcus Chen',
    userAvatar: '/assets/avatar-marcus.jpg',
    time: '5 hrs',
    privacy: 'public',
    text: 'Homemade pasta night turned out better than expected! Who wants the recipe?',
    media: ['/assets/post-pasta.jpg'],
    mediaType: 'single',
    reactions: 89,
    comments: 31,
    shares: 2,
    liked: false,
  },
  {
    id: '4',
    userId: 'natgeo',
    userName: 'National Geographic',
    userAvatar: '/assets/avatar-alex.jpg',
    time: '8 hrs',
    privacy: 'public',
    text: 'A rare white moose was spotted in Sweden\'s forests. These majestic creatures are a sight to behold.',
    media: ['/assets/post-moose.jpg'],
    mediaType: 'single',
    reactions: 5600,
    comments: 234,
    shares: 1100,
    liked: false,
  },
  {
    id: '5',
    userId: 'emma',
    userName: 'Emma Wilson',
    userAvatar: '/assets/avatar-emma.jpg',
    time: 'Yesterday',
    privacy: 'friends',
    text: 'Feeling grateful for all the birthday wishes! Thank you everyone for making my day so special!',
    reactions: 256,
    comments: 67,
    shares: 0,
    liked: false,
  },
];

const initialStories: Story[] = [
  { id: 'user', userId: 'alex', userName: 'Create Story', userAvatar: '/assets/avatar-alex.jpg', image: '/assets/avatar-alex.jpg', viewed: false, isUser: true },
  { id: 's1', userId: 'sarah', userName: 'Sarah Mitchell', userAvatar: '/assets/avatar-sarah.jpg', image: '/assets/story-1.jpg', viewed: false },
  { id: 's2', userId: 'marcus', userName: 'Marcus Chen', userAvatar: '/assets/avatar-marcus.jpg', image: '/assets/story-2.jpg', viewed: false },
  { id: 's3', userId: 'emma', userName: 'Emma Wilson', userAvatar: '/assets/avatar-emma.jpg', image: '/assets/story-3.jpg', viewed: false },
  { id: 's4', userId: 'jessica', userName: 'Jessica Park', userAvatar: '/assets/avatar-jessica.jpg', image: '/assets/story-1.jpg', viewed: true },
  { id: 's5', userId: 'alex', userName: 'Alex Johnson', userAvatar: '/assets/avatar-alex.jpg', image: '/assets/story-2.jpg', viewed: true },
];

const initialNotifications: Notification[] = [
  { id: 'n1', type: 'like', userName: 'Sarah Mitchell', userAvatar: '/assets/avatar-sarah.jpg', message: 'liked your photo.', time: '2m', read: false, actionIcon: 'thumbsUp' },
  { id: 'n2', type: 'comment', userName: 'Marcus Chen', userAvatar: '/assets/avatar-marcus.jpg', message: 'and 12 others commented on your post.', time: '15m', read: false },
  { id: 'n3', type: 'birthday', userName: 'Emma Wilson', userAvatar: '/assets/avatar-emma.jpg', message: "Emma Wilson's birthday is today!", time: '1h', read: false, actionIcon: 'gift' },
  { id: 'n4', type: 'post', userName: 'TechDaily', userAvatar: '/assets/avatar-marcus.jpg', message: 'posted: "New smartphone lineup announced..."', time: '3h', read: true },
  { id: 'n5', type: 'suggestion', userName: 'Jessica Park', userAvatar: '/assets/avatar-jessica.jpg', message: '3 mutual friends', time: '5h', read: true, actionIcon: 'userPlus' },
  { id: 'n6', type: 'marketplace', userName: 'Marketplace', message: 'Your item "Vintage Camera" has a new message.', time: '8h', read: true },
  { id: 'n7', type: 'live', userName: 'National Geographic', userAvatar: '/assets/avatar-alex.jpg', message: 'went live. Watch now!', time: '12h', read: true, actionIcon: 'live' },
  { id: 'n8', type: 'memory', message: 'On this day 3 years ago...', time: '1d', read: true },
];

const initialVideos: Video[] = [
  { id: 'v1', publisher: 'BBC News', publisherAvatar: '/assets/avatar-alex.jpg', thumbnail: '/assets/video-thumb-news.jpg', duration: '3:42', title: 'Breaking: Major scientific discovery changes everything we know about...', views: '1.2M views', time: '2 hrs ago' },
  { id: 'v2', publisher: 'Cooking with Jamie', publisherAvatar: '/assets/avatar-marcus.jpg', thumbnail: '/assets/video-thumb-cooking.jpg', duration: '12:05', title: 'The perfect Sunday roast - step by step guide', views: '856K views', time: '5 hrs ago' },
  { id: 'v3', publisher: 'Fitness Pro', publisherAvatar: '/assets/avatar-sarah.jpg', thumbnail: '/assets/video-thumb-fitness.jpg', duration: '8:30', title: '10 Minute Ab Workout - No Equipment Needed', views: '2.4M views', time: '1 day ago' },
];

const initialProducts: Product[] = [
  { id: 'p1', image: '/assets/product-jacket.jpg', price: '$45', title: 'Vintage Leather Jacket', location: 'Manhattan' },
  { id: 'p2', image: '/assets/product-iphone.jpg', price: '$120', title: 'iPhone 13 - Great Condition', location: 'Brooklyn' },
  { id: 'p3', image: '/assets/product-books.jpg', price: 'Free', title: 'Moving boxes (20+ available)', location: 'Queens' },
  { id: 'p4', image: '/assets/product-chair.jpg', price: '$350', title: 'Gaming Chair - Like New', location: 'Bronx' },
  { id: 'p5', image: '/assets/post-pasta.jpg', price: '$15', title: 'Hardcover Books Collection', location: 'Manhattan' },
  { id: 'p6', image: '/assets/post-yosemite.jpg', price: '$2,500', title: '2018 Honda Civic', location: 'Staten Island' },
];

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, activeTab: '/' }),

  activeTab: '/',
  setActiveTab: (tab) => set({ activeTab: tab }),

  posts: initialPosts,
  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, reactions: p.liked ? p.reactions - 1 : p.reactions + 1 } : p
      ),
    })),

  stories: initialStories,
  markStoryViewed: (storyId) =>
    set((state) => ({
      stories: state.stories.map((s) => (s.id === storyId ? { ...s, viewed: true } : s)),
    })),

  notifications: initialNotifications,
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  get unreadNotifications() {
    return get().notifications.filter((n) => !n.read).length;
  },

  videos: initialVideos,
  products: initialProducts,
}));
