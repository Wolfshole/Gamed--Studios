export async function GET({ request }) {
  const code = new URL(request.url).searchParams.get('code');
  const clientId = import.meta.env.DISCORD_CLIENT_ID;
  const clientSecret = import.meta.env.DISCORD_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/api/auth/callback';

  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    })
  });

  const tokenData = await tokenResponse.json();

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });

  const user = await userResponse.json();

  // Hier später Session speichern (z.B. mit cookie oder Netlify Blobs)

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}