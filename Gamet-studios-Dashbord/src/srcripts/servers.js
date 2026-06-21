export async function GET({ cookies }) {
  const userCookie = cookies.get('discord_user')?.value;

  if (!userCookie) {
    return new Response(JSON.stringify({ error: 'Nicht eingeloggt' }), { status: 401 });
  }

  const user = JSON.parse(userCookie);

  try {
    // Alle Server des Users holen
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });

    if (!guildsResponse.ok) {
      return new Response(JSON.stringify({ error: 'Token ungültig' }), { status: 401 });
    }

    const userGuilds = await guildsResponse.json();

    // Hier kannst du später filtern, dass nur Server angezeigt werden, in denen der Bot ist
    // Für den Anfang zeigen wir alle Server des Users

    return new Response(JSON.stringify(userGuilds), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Servers API Fehler:", error);
    return new Response(JSON.stringify({ error: 'Interner Fehler' }), { status: 500 });
  }
}