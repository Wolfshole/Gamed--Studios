export async function GET() {
  // Hier später echte Daten vom Bot / Datenbank holen
  const servers = [
    { id: "123456789", name: "Gaming Studio Main" },
    { id: "987654321", name: "Test Server" },
    { id: "111222333", name: "Community Server" }
  ];

  return new Response(JSON.stringify(servers), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}