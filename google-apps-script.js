/**
 * Google Apps Script for Wedding RSVP Form
 * This script handles form submissions and saves them to a Google Sheet
 *
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save the project
 * 5. Deploy as a web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and update the GOOGLE_SHEETS_URL in script.js
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get or create the spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();

    // Set up headers if this is the first submission
    setupHeaders(sheet);

    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.guestName || "",
      data.phone || "",
      data.attendance || "",
      data.message || "",
    ];

    // Add the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "RSVP submitted successfully",
        timestamp: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error processing RSVP:", error);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error processing RSVP: " + error.toString(),
        timestamp: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService.createTextOutput(
    JSON.stringify({
      message: "Wedding RSVP API is running",
      timestamp: new Date().toISOString(),
      instructions: "Use POST method to submit RSVP data",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet() {
  // Try to find existing spreadsheet by name
  const spreadsheetName = "Wedding RSVP Responses";
  const files = DriveApp.getFilesByName(spreadsheetName);

  if (files.hasNext()) {
    // Return existing spreadsheet
    return SpreadsheetApp.open(files.next());
  } else {
    // Create new spreadsheet
    const spreadsheet = SpreadsheetApp.create(spreadsheetName);

    // Set up the sheet
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName("RSVP Responses");

    // Set up headers
    setupHeaders(sheet);

    // Format the header row
    formatHeaders(sheet);

    return spreadsheet;
  }
}

function setupHeaders(sheet) {
  const headers = ["Timestamp", "Guest Name", "Phone", "Attendance", "Message"];

  // Check if headers already exist
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    // Add headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function formatHeaders(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, 5);

  // Format header row
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#f0f0f0");
  headerRange.setBorder(true, true, true, true, true, true);

  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 200); // Guest Name
  sheet.setColumnWidth(3, 150); // Phone
  sheet.setColumnWidth(4, 120); // Attendance
  sheet.setColumnWidth(5, 300); // Message
}

function testSetup() {
  // Test function to verify the setup
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();

    console.log("Spreadsheet URL:", spreadsheet.getUrl());
    console.log("Sheet name:", sheet.getName());
    console.log("Current data range:", sheet.getDataRange().getA1Notation());

    return {
      success: true,
      spreadsheetUrl: spreadsheet.getUrl(),
      message: "Setup completed successfully",
    };
  } catch (error) {
    console.error("Setup error:", error);
    return {
      success: false,
      error: error.toString(),
    };
  }
}

function generateReport() {
  // Generate a summary report of RSVP responses
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return {
        totalResponses: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0,
      };
    }

    // Skip header row
    const responses = data.slice(1);

    let attending = 0;
    let notAttending = 0;
    let totalGuests = 0;

    responses.forEach((row) => {
      const attendance = row[3]; // Attendance column (now index 3)

      if (attendance === "yes") {
        attending++;
        totalGuests += 1; // Each response counts as 1 guest
      } else if (attendance === "no") {
        notAttending++;
      }
    });

    return {
      totalResponses: responses.length,
      attending: attending,
      notAttending: notAttending,
      totalGuests: totalGuests,
      attendanceRate:
        responses.length > 0
          ? ((attending / responses.length) * 100).toFixed(1)
          : 0,
    };
  } catch (error) {
    console.error("Report generation error:", error);
    return {
      error: error.toString(),
    };
  }
}
