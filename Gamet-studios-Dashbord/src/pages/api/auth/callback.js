export async function GET({ request, cookies }) {
  const code = new URL(request.url).searchParams.get('code');
  const clientId = import.meta.env.DISCORD_CLIENT_ID;
  const clientSecret = import.meta.env.DISCORD_CLIENT_SECRET;
  const siteUrl = 'http://localhost:4321';

  console.log("Callback aufgerufen mit Code:", code ? "vorhanden" : "FEHLT");

  if (!code) {
    return new Response('Kein Code erhalten', { status: 400 });
  }

  if (!clientSecret) {
    console.error("DISCORD_CLIENT_SECRET fehlt in .env");
    return new Response('Client Secret fehlt', { status: 500 });
  }

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${siteUrl}/api/auth/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    console.log("Token Response Status:", tokenResponse.status);
    console.log("Token Data:", tokenData);

    if (!tokenResponse.ok) {
      return new Response(`Token-Fehler: ${tokenData.error}`, { status: 400 });
    }

    // User Daten holen
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const user = await userResponse.json();

    cookies.set('discord_user', JSON.stringify({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      accessToken: tokenData.access_token,
    }), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return Response.redirect(siteUrl);

  } catch (error) {
    console.error("Callback Fehler:", error);
    return new Response('Interner Fehler', { status: 500 });
  }
}