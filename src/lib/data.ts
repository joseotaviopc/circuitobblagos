export type Athlete = {
  id: string;
  name: string;
  rank: number;
  category: 'Profissional' | 'Open' | 'Legend' | 'Master' | 'Sub-18' | 'Sub-15';
  points: number;
  country: string;
  countryCode: string;
  photo: string;
  stats: {
    events: number;
    wins: number;
    podiums: number;
    top10s: number;
  };
  photos: string[];
  videos: string[];
};

export const athletes: Athlete[] = [
  { id: '1', name: 'Pierre-Louis Costes', rank: 1, category: 'Profissional', points: 8000, country: 'France', countryCode: 'fr', photo: 'https://placehold.co/400x400/png', stats: { events: 12, wins: 4, podiums: 8, top10s: 11 }, photos: ['https://placehold.co/600x400/png?text=Action+Shot+1', 'https://placehold.co/600x400/png?text=Action+Shot+2'], videos: ['https://placehold.co/600x400/png?text=Highlight+Reel+1'] },
  { id: '2', name: 'Isabela Sousa', rank: 2, category: 'Profissional', points: 7500, country: 'Brazil', countryCode: 'br', photo: 'https://placehold.co/400x400/png', stats: { events: 10, wins: 3, podiums: 7, top10s: 10 }, photos: [], videos: [] },
  { id: '3', name: 'Tristan Roberts', rank: 3, category: 'Profissional', points: 7200, country: 'South Africa', countryCode: 'za', photo: 'https://placehold.co/400x400/png', stats: { events: 11, wins: 2, podiums: 6, top10s: 10 }, photos: [], videos: [] },
  { id: '4', name: 'Sari Ohhara', rank: 4, category: 'Profissional', points: 6900, country: 'Japan', countryCode: 'jp', photo: 'https://placehold.co/400x400/png', stats: { events: 13, wins: 2, podiums: 5, top10s: 9 }, photos: [], videos: [] },
  { id: '5', name: 'Tanner McDaniel', rank: 5, category: 'Profissional', points: 6500, country: 'USA', countryCode: 'us', photo: 'https://placehold.co/400x400/png', stats: { events: 10, wins: 1, podiums: 4, top10s: 8 }, photos: [], videos: [] },
  { id: '6', name: 'Mike Stewart', rank: 1, category: 'Legend', points: 10000, country: 'USA', countryCode: 'us', photo: 'https://placehold.co/400x400/png', stats: { events: 100, wins: 50, podiums: 75, top10s: 90 }, photos: [], videos: [] },
  { id: '7', name: 'Guilherme Tâmega', rank: 2, category: 'Legend', points: 9500, country: 'Brazil', countryCode: 'br', photo: 'https://placehold.co/400x400/png', stats: { events: 90, wins: 45, podiums: 70, top10s: 85 }, photos: [], videos: [] },
];

export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  poster: string;
  'data-ai-hint'?: string;
  highlights: string;
  results: string;
};

export const events: Event[] = [
  { id: '1', name: 'Fronton King', date: '2024-10-12', location: 'Gáldar, Gran Canaria', poster: 'https://placehold.co/400x600/png', 'data-ai-hint': 'surfing competition', highlights: 'Massive waves and incredible barrel rides from the world\'s best.', results: '1st: Pierre-Louis Costes, 2nd: Tristan Roberts, 3rd: Tanner McDaniel' },
  { id: '2', name: 'Arica Cultura Bodyboard', date: '2024-07-20', location: 'Arica, Chile', poster: 'https://placehold.co/400x600/png', 'data-ai-hint': 'ocean waves', highlights: 'High-performance surfing in challenging conditions.', results: '1st: Alan Muñoz, 2nd: Amaury Lavernhe, 3rd: Iain Campbell' },
  { id: '3', name: 'Itacoatiara Pro', date: '2024-06-15', location: 'Niterói, Brazil', poster: 'https://placehold.co/400x600/png', 'data-ai-hint': 'beach sunset', highlights: 'Explosive aerial maneuvers and deep tube rides.', results: '1st: Dudu Pedra, 2nd: Uri Valadão, 3rd: Socrates Santana' },
  { id: '4', name: 'Walker Bay Pro', date: '2024-08-25', location: 'Western Cape, South Africa', poster: 'https://placehold.co/400x600/png', 'data-ai-hint': 'surfer action', highlights: 'A showcase of power surfing in a beautiful location.', results: '1st: Tristan Roberts, 2nd: Jared Houston, 3rd: Mark McCarthy' },
];


export type Media = {
    id: string;
    type: 'photo' | 'video';
    title: string;
    event: string;
    thumbnail: string;
}

export const media: Media[] = [
    { id: '1', type: 'photo', title: 'Fronton King Gallery', event: 'Fronton King', thumbnail: 'https://placehold.co/600x400/png' },
    { id: '2', type: 'video', title: 'Fronton King Highlights', event: 'Fronton King', thumbnail: 'https://placehold.co/600x400/png' },
    { id: '3', type: 'photo', title: 'Arica Cultura Gallery', event: 'Arica Cultura Bodyboard', thumbnail: 'https://placehold.co/600x400/png' },
    { id: '4', type: 'video', title: 'Arica Cultura Highlights', event: 'Arica Cultura Bodyboard', thumbnail: 'https://placehold.co/600x400/png' },
    { id: '5', type: 'photo', title: 'Itacoatiara Pro Shots', event: 'Itacoatiara Pro', thumbnail: 'https://placehold.co/600x400/png' },
    { id: '6', type: 'video', title: 'Itacoatiara Pro Action', event: 'Itacoatiara Pro', thumbnail: 'https://placehold.co/600x400/png' },
];

export const getAthlete = (id: string) => athletes.find(a => a.id === id);
export const getEvent = (id: string) => events.find(e => e.id === id);
