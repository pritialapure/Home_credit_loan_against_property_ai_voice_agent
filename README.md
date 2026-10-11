# Home Credit Bolna Public Voice Demo

This project wraps an existing Bolna agent in a small public website with a **Start Voice Call** button. It uses Bolna's official Web Call SDK and a backend endpoint to mint short-lived sessions. The Bolna API key stays on the server.

> Interview-demo disclaimer: This is an independent project demonstration, not an official Home Credit service. Do not collect real customer data or present the agent as a loan approval authority.

## Before you start

You need:
- Your Bolna API key (generate/view it from Bolna's Developers section).
- The actual **agent ID** for the agent in your Bolna workspace. Do not assume the import-link UUID is the API agent ID unless the dashboard confirms it.
- A GitHub account and a hosting account that supports Node.js (for example, Render).

## Run locally

1. Install Node.js 18 or newer.
2. Extract this project and open a terminal in its folder.
3. Run:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`, then fill in your real values:

   ```env
   BOLNA_API_KEY=bn-your-real-key
   BOLNA_AGENT_ID=your-agent-id-from-the-dashboard
   PORT=3000
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser and click **Start Voice Call**. Allow microphone access. Localhost is treated as a secure context by modern browsers.

## Deploy on Render (one public URL for frontend + backend)

1. Create a **private or public GitHub repository** and upload these project files. Do not upload `.env` or any API key.
2. In Render, choose **New + → Web Service**, then connect that repository.
3. Configure:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
4. Under **Environment**, add:
   - `BOLNA_API_KEY` = your Bolna API key
   - `BOLNA_AGENT_ID` = the actual agent ID shown by Bolna
   - `NODE_VERSION` = `20` (if the dashboard lets you set it)
5. Create the service and wait for deployment to finish.
6. Open the Render `onrender.com` URL. Click **Start Voice Call**, grant microphone permission, and test both speaking and ending the call.
7. Open the URL in an incognito window or on another device and test again. This is the link to share with your interviewer.

## Important security and cost notes

- Never put `BOLNA_API_KEY` in `public/index.html`, frontend JavaScript, or a public repository.
- This demo endpoint is public and rate-limited to 5 session requests per IP per minute, but that is not a complete abuse-prevention system. Keep it private until tested, monitor your Bolna balance, and disable the Render service after the interview if no longer needed.
- Public visitors can use your Bolna credits. Share the URL only with intended reviewers.
- Do not add real customer records to this interview demo. Use fictional test values.
- If your Bolna workspace blocks web calls, has no remaining balance, or does not allow the agent to use the Web Call session endpoint, deployment may succeed but calls may fail. Check the server logs and Bolna account settings.
- If the server returns an error, inspect Render logs. A `401/403` from Bolna usually means the API key or permissions are wrong; `404` can indicate the endpoint or account setup differs; capacity/balance/plan errors need to be resolved in Bolna.

## Health check

After deployment, open `/health`. It should return JSON similar to:

```json
{"ok":true,"service":"home-credit-bolna-public-demo"}
```

## References

- Bolna Web Call SDK: https://github.com/bolna-ai/web-call
- Bolna API key setup: https://docs.bolna.ai/api-reference/introduction
