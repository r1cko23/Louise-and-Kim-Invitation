export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { guestName, phone, attendance, message } = req.body;

    // Validate required fields
    if (!guestName || !attendance) {
      return res.status(400).json({ 
        error: 'Missing required fields: guestName and attendance are required' 
      });
    }

    // Prepare data for Google Sheets
    const rsvpData = {
      timestamp: new Date().toISOString(),
      guestName: guestName.trim(),
      phone: phone ? phone.trim() : '',
      attendance: attendance,
      message: message ? message.trim() : '',
    };

    // For now, we'll just log the data and return success
    // In production, you would send this to Google Sheets or your preferred database
    console.log('RSVP Submission:', rsvpData);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      data: {
        id: Date.now().toString(),
        timestamp: rsvpData.timestamp,
        guestName: rsvpData.guestName,
        attendance: rsvpData.attendance
      }
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to submit RSVP. Please try again later.'
    });
  }
}
