export async function GET() {
  return Response.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "jai-shree-group",
      version: "1.0.0",
    },
    { status: 200 }
  );
}
