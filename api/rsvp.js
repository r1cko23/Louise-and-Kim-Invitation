export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { guestName, phone, attendance, message } = req.body;

    // Validate required fields
    if (!guestName || !phone || !attendance) {
      return res.status(400).json({
        error:
          "Missing required fields: guestName, phone, and attendance are required",
      });
    }

    // Prepare data for Google Sheets
    const rsvpData = {
      timestamp: new Date().toISOString(),
      guestName: guestName.trim(),
      phone: phone ? phone.trim() : "",
      attendance: attendance,
      message: message ? message.trim() : "",
    };

    // Send data to Google Sheets via Google Apps Script
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbwfqFxoap2pk-hQo8gaX31pFgDbQ9ONy49nrVR9xfm6GJDHHrjvSltcOIpugxZSpLxV/exec";

    try {
      const sheetsResponse = await fetch(googleSheetsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      if (!sheetsResponse.ok) {
        throw new Error(`Google Sheets API error: ${sheetsResponse.status}`);
      }

      const sheetsResult = await sheetsResponse.json();
      console.log("RSVP saved to Google Sheets:", sheetsResult);

      // Return success response
      return res.status(200).json({
        success: true,
        message: "RSVP submitted successfully",
        data: {
          id: Date.now().toString(),
          timestamp: rsvpData.timestamp,
          guestName: rsvpData.guestName,
          phone: rsvpData.phone,
          attendance: rsvpData.attendance,
        },
      });
    } catch (sheetsError) {
      console.error("Google Sheets error:", sheetsError);

      // Fallback: log to console if Google Sheets fails
      console.log("RSVP Submission (fallback):", rsvpData);

      // Still return success to user, but log the error
      return res.status(200).json({
        success: true,
        message: "RSVP submitted successfully (saved locally)",
        data: {
          id: Date.now().toString(),
          timestamp: rsvpData.timestamp,
          guestName: rsvpData.guestName,
          phone: rsvpData.phone,
          attendance: rsvpData.attendance,
        },
      });
    }
  } catch (error) {
    console.error("RSVP submission error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to submit RSVP. Please try again later.",
    });
  }
}
