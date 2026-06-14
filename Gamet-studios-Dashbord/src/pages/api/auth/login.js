export async function GET() {
  const clientId = import.meta.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback');
  
  const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

  return Response.redirect(url);
}