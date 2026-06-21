const axios = require('axios');

const DASHBOARD_URL = 'http://localhost:4321'; // später deine Domain

/**
 * Einstellungen eines Servers vom Dashboard abrufen
 */
async function getGuildSettings(guildId) {
  try {
    const response = await axios.get(`${DASHBOARD_URL}/api/guilds/${guildId}`);
    return response.data;
  } catch (error) {
    console.error(`[API] Fehler beim Abrufen von Guild ${guildId}:`, error.message);
    return null;
  }
}

/**
 * Einstellungen eines Servers ans Dashboard senden
 */
async function updateGuildSettings(guildId, settings) {
  try {
    const response = await axios.post(`${DASHBOARD_URL}/api/guilds/${guildId}`, settings);
    console.log(`[API] Einstellungen für ${guildId} aktualisiert`);
    return response.data;
  } catch (error) {
    console.error(`[API] Fehler beim Speichern von Guild ${guildId}:`, error.message);
    return null;
  }
}

module.exports = {
  getGuildSettings,
  updateGuildSettings
};