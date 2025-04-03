const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
    TOURNAMENTS: `${API_BASE_URL}/tournaments/`,
    GAMES: `${API_BASE_URL}/games/`,
    PICKS: `${API_BASE_URL}/picks/`,
    PAYMENTS: `${API_BASE_URL}/payments/`,
}; 