# Travel HQ

A mobile-first travel itinerary and spending tracker for a Europe and Singapore trip. The app is deliberately kept as a small static site: the interface, itinerary data, and JavaScript live in `travel-hq.html`.

## Run it on a Mac

1. Open Terminal.
2. Change to the project folder:

   ```bash
   cd /Users/ricky/Documents/GitHub/travel-hq
   ```

3. Start the local web server:

   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

4. Open [http://127.0.0.1:8000/travel-hq.html](http://127.0.0.1:8000/travel-hq.html) in Safari.
5. When finished, return to Terminal and press Control-C. This stops the server; it does not close the Terminal window.

## Local data and cloud sync

Local development runs in a safe test mode by default. Changes are stored only in that browser's local storage and are not sent to Supabase.

To deliberately test the shared Supabase data, add `?cloud=1` to the local address:

```text
http://127.0.0.1:8000/travel-hq.html?cloud=1
```

Use cloud mode cautiously because edits affect the shared trip record. The header shows `Local test mode`, `Saving…`, `Saved`, or `Sync failed` so the current state is visible.

## Quick test checklist

- Open Trip and move between destinations and individual days.
- Open Today and confirm the countdown or current-day plan appears.
- Open Budget, add an expense, edit it, delete it, and try Undo.
- Add and edit an itinerary activity in local mode.
- Search for an itinerary item such as `Vatican`, `taxi`, or a flight number.
- Open a day and test Directions Home and Running Late.
- In Daily Movement, start and stop a short GPS track and confirm a green route appears on the map.
- Enter sample Apple Watch steps and active calories, refresh, and confirm they remain.
- Open Info and tick a trip-checklist item.
- Refresh the page and confirm local changes remain.
- Turn off Wi-Fi after one successful load and refresh to check the cached app shell.
- Use Safari's Responsive Design Mode to check a narrow phone layout and a desktop layout.

## Important security note

The Supabase URL and anonymous key are visible in the HTML, which is normal for a browser app. They are safe only when Supabase Row Level Security policies strictly limit what anonymous users can read and write. Never place a Supabase service-role key or other private secret in this repository.

GPS tracks, step totals, and active-calorie totals are stored separately in `travelhq_private_v1` browser storage. They are intentionally device-only and are never included in the Supabase payload. GPS recording works only while the site remains open and location permission is granted. Apple Health and Apple Watch data cannot be read directly by this browser app, so steps and active calories are entered manually from Apple Fitness or Health.
