import { format, parseISO, differenceInMinutes } from 'date-fns';

// Format an ISO date string to HH:mm — e.g. "14:32"
export const formatTime = (dateString) => {
  if (!dateString) return '--:--';
  try {
    return format(parseISO(dateString), 'HH:mm');
  } catch {
    return '--:--';
  }
};

// How many minutes late is a departure?
export const getDelayMinutes = (scheduled, actual) => {
  if (!scheduled || !actual) return 0;
  try {
    return differenceInMinutes(parseISO(actual), parseISO(scheduled));
  } catch {
    return 0;
  }
};

// Turn delay minutes into a readable string — e.g. "+7 min" or "On time"
export const formatDelay = (delayMinutes) => {
  if (delayMinutes <= 0) return 'On time';
  return `+${delayMinutes} min`;
};

// Bootstrap badge colour based on how late something is
export const getDelayBadgeVariant = (delayMinutes) => {
  if (delayMinutes <= 0) return 'success';
  if (delayMinutes < 5)  return 'warning';
  return 'danger';
};

// Convert seconds to a human-readable duration — e.g. "2h 18m"
export const formatDuration = (seconds) => {
  if (!seconds) return '';
  const hours   = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

// Pick an emoji icon based on the transport type
export const getProductIcon = (product) => {
  if (!product) return '🚇';
  const t = product.type?.toLowerCase() || product.name?.toLowerCase() || '';
  if (t.includes('ice') || t.includes('high_speed')) return '🚄';
  if (t.includes('regional') || t.includes('re'))    return '🚆';
  if (t.includes('s-bahn') || t.includes('s'))       return '🚈';
  if (t.includes('u-bahn') || t.includes('u'))       return '🚇';
  if (t.includes('tram'))                            return '🚊';
  if (t.includes('bus'))                             return '🚌';
  if (t.includes('ferry'))                           return '⛴️';
  return '🚇';
};

// Save any value to localStorage under a key
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Save error:', e);
  }
};

// Load a value from localStorage, or return a default
export const loadFromLocalStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Load error:', e);
    return defaultValue;
  }
};

// Ask the browser for the user's GPS location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      reject,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
};