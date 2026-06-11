/**
 * Google Apps Script Webhook for LANSEM Lead Capture
 * 
 * Instructions:
 * 1. Open Google Sheets and create a blank sheet.
 * 2. Set up headers in row 1:
 *    Timestamp | Name | Email | Firm Name | Country | Practice Type | Services Requested | Time-consuming Tasks | How they heard
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this code, save, and click Deploy -> New deployment.
 * 5. Select type: Web app.
 * 6. Set "Execute as" to "Me", and "Who has access" to "Anyone".
 * 7. Deploy, authorize permissions, copy the Web App URL, and paste it back to the assistant.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var name = e.parameter.name || "";
    var email = e.parameter.email || "";
    var firmName = e.parameter.firmName || "";
    var country = e.parameter.country || "";
    var firmType = e.parameter.firmType || "";
    var services = e.parameter.services || "";
    var message = e.parameter.message || "";
    var source = e.parameter.source || "";
    var timestamp = new Date();
    
    // Append the row to the sheet
    sheet.appendRow([timestamp, name, email, firmName, country, firmType, services, message, source]);
    
    // Send email alert to contact@lansem.in
    var targetEmail = "contact@lansem.in";
    var subject = "New B2B Consultation Lead: " + name + " (" + firmName + ")";
    var htmlBody = "<h2>New Lead Captured from LANSEM Website</h2>" +
                   "<table border='1' cellpadding='8' style='border-collapse: collapse; font-family: sans-serif;'>" +
                   "<tr><td><strong>Timestamp</strong></td><td>" + timestamp.toString() + "</td></tr>" +
                   "<tr><td><strong>Name</strong></td><td>" + name + "</td></tr>" +
                   "<tr><td><strong>Email</strong></td><td>" + email + "</td></tr>" +
                   "<tr><td><strong>Firm Name</strong></td><td>" + firmName + "</td></tr>" +
                   "<tr><td><strong>Country</strong></td><td>" + country + "</td></tr>" +
                   "<tr><td><strong>Practice Type</strong></td><td>" + firmType + "</td></tr>" +
                   "<tr><td><strong>Services Requested</strong></td><td>" + services + "</td></tr>" +
                   "<tr><td><strong>Time-consuming tasks</strong></td><td>" + message + "</td></tr>" +
                   "<tr><td><strong>How they heard</strong></td><td>" + source + "</td></tr>" +
                   "</table>";
                   
    MailApp.sendEmail({
      to: targetEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
