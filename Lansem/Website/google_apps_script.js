/**
 * Google Apps Script Webhook for LANSEM Lead & Career Capture
 * 
 * Instructions:
 * 1. Open Google Sheets and create a blank sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Paste this code, save, and click Deploy -> New deployment.
 * 4. Select type: Web app.
 * 5. Set "Execute as" to "Me", and "Who has access" to "Anyone".
 * 6. Deploy, authorize permissions, copy the Web App URL, and paste it to GOOGLE_SHEET_WEBHOOK_URL.
 */

function safeText(str) {
  if (!str) return "";
  str = String(str).trim();
  if (str.startsWith("+") || str.startsWith("=") || str.startsWith("-")) {
    return "'" + str;
  }
  return str;
}

function doPost(e) {
  try {
    var type = e.parameter.type || "lead";
    var timestamp = new Date();
    
    if (type === "career") {
      var name = safeText(e.parameter.name || "");
      var email = safeText(e.parameter.email || "");
      var phone = safeText(e.parameter.phone || "");
      var tier = safeText(e.parameter.tier || "");
      var articleship = safeText(e.parameter.articleship || "");
      var resume = safeText(e.parameter.resume || "");
      var message = safeText(e.parameter.message || "");
      
      // Try to append to a "Careers" sheet if it exists, otherwise use/create it
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName("Careers");
      if (!sheet) {
        sheet = ss.insertSheet("Careers");
        sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Qualification Tier", "Articleship Status", "Resume Link", "Experience Description"]);
      }
      sheet.appendRow([timestamp, name, email, phone, tier, articleship, resume, message]);
      
      // Send email alert to contact@lansem.in
      var targetEmail = "contact@lansem.in";
      var subject = "New Career Application: " + name + " (" + tier + ")";
      var htmlBody = "<h2>New Job Application Received</h2>" +
                     "<table border='1' cellpadding='8' style='border-collapse: collapse; font-family: sans-serif; border-color: #dddddd;'>" +
                     "<tr style='background-color: #f2f2f2;'><td><strong>Field</strong></td><td><strong>Detail</strong></td></tr>" +
                     "<tr><td><strong>Timestamp</strong></td><td>" + timestamp.toString() + "</td></tr>" +
                     "<tr><td><strong>Name</strong></td><td>" + name + "</td></tr>" +
                     "<tr><td><strong>Email</strong></td><td>" + email + "</td></tr>" +
                     "<tr><td><strong>Phone</strong></td><td>" + phone + "</td></tr>" +
                     "<tr><td><strong>Qualification Tier</strong></td><td>" + tier + "</td></tr>" +
                     "<tr><td><strong>Articleship Status</strong></td><td>" + articleship + "</td></tr>" +
                     "<tr><td><strong>Resume/Portfolio Link</strong></td><td><a href='" + resume + "' target='_blank'>" + resume + "</a></td></tr>" +
                     "<tr><td><strong>Experience Details</strong></td><td>" + message + "</td></tr>" +
                     "</table>";
                     
      MailApp.sendEmail({
        to: targetEmail,
        subject: subject,
        htmlBody: htmlBody
      });
      
    } else {
      // Standard lead submission
      var sheet = SpreadsheetApp.getActiveSheet();
      var name = safeText(e.parameter.name || "");
      var email = safeText(e.parameter.email || "");
      var firmName = safeText(e.parameter.firmName || "");
      var country = safeText(e.parameter.country || "");
      var firmType = safeText(e.parameter.firmType || "");
      var services = safeText(e.parameter.services || "");
      var message = safeText(e.parameter.message || "");
      var source = safeText(e.parameter.source || "");
      
      sheet.appendRow([timestamp, name, email, firmName, country, firmType, services, message, source]);
      
      var targetEmail = "contact@lansem.in";
      var subject = "New B2B Consultation Lead: " + name + " (" + firmName + ")";
      var htmlBody = "<h2>New Lead Captured from LANSEM Website</h2>" +
                     "<table border='1' cellpadding='8' style='border-collapse: collapse; font-family: sans-serif; border-color: #dddddd;'>" +
                     "<tr style='background-color: #f2f2f2;'><td><strong>Field</strong></td><td><strong>Detail</strong></td></tr>" +
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
    }
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
