# Google Sheets RSVP Setup Guide

## Overview

Your wedding invitation website now has Google Sheets integration for RSVP submissions. Here's how to set it up:

## Step 1: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js` in your project
4. Save the project (Ctrl+S or Cmd+S)
5. Give it a name like "Wedding RSVP Handler"

## Step 2: Deploy the Script

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. **IMPORTANT**: Copy the web app URL that appears

## Step 3: Update Your Environment Variables

### For Vercel Deployment:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add a new variable:
   - **Name**: `GOOGLE_SHEETS_URL`
   - **Value**: The web app URL you copied from Step 2
5. Redeploy your site

### For Local Development:

Create a `.env.local` file in your project root:

```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 4: Test the Integration

1. Open your wedding invitation website
2. Navigate to page 2 and click "RSVP HERE"
3. Fill out the form (all fields are now required including phone number)
4. Submit the form
5. Check your Google Sheets - you should see a new sheet called "Wedding RSVP Responses" with your data

## Troubleshooting

### If RSVP submissions aren't saving:

1. Check the browser console for errors
2. Verify the Google Apps Script URL is correct
3. Make sure the script is deployed with "Anyone" access
4. Check that the script has permission to access Google Sheets

### If you see "Method not allowed" errors:

- Make sure you're using the web app URL, not the script editor URL
- The URL should end with `/exec`, not `/edit`

### If the Google Sheets isn't created:

- The script will automatically create a new spreadsheet called "Wedding RSVP Responses"
- Check your Google Drive for this file

## Data Structure

The Google Sheet will have these columns:

- **Timestamp**: When the RSVP was submitted
- **Guest Name**: Full name of the guest
- **Phone**: Phone number (now required)
- **Attendance**: "yes" or "no"
- **Message**: Optional message from the guest

## Security Notes

- The Google Apps Script is set to allow "Anyone" to submit data
- Only you can view the Google Sheet
- Consider adding basic validation in the Google Apps Script if needed

## Need Help?

If you encounter issues:

1. Check the Google Apps Script execution logs
2. Verify all environment variables are set correctly
3. Test the Google Apps Script directly using the test function
