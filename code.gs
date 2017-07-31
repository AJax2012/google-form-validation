function onSubmitForm(e) {
  var files = getSpreadSheet('NAME OF GOOGLE SHEET HERE');
  
  if(files.hasNext()) {
    var spreadsheet = SpreadsheetApp.open(files.next());
    var sheet = spreadsheet.getSheets()[0];
    var range = sheet.getRange("B:D").getValues(); // select range using Alpha (A:B selects first two columns, A1:B10 selects cells A1 - B10)
    
    // GET FORM RESPONSES
    var formResponses = e.response;
    var itemResponses = formResponses.getItemResponses();
    var name = itemResponses[0].getResponse(); // sets first form response to name
    var email = itemResponses[1].getResponse(); // sets second form response to email
    var submission = itemResponses[2].getResponse(); // sets third form response to submission
    
    var newSubmission = submission.toLowerCase().trim(); // format submission for validation
    
    var valid = false;
    var month = "";
    var url = "";
    
    // VALIDATION
    for(i = 0; i < range.length; i++) {
      // Check to see if column C matches formatted submission
      if(range[i][1].toLowerCase().trim() == newSubmission) {
        valid = !valid; // if there is a matching value, change valid to true
        month += capitalizeFirstLetter(range[i][0]).trim(); // get month from row
        url += range[i][2]; // get url from row
        break;
      }
      else if(range[i][1] == "") {
        break; // when there are empty values in row C, break the loop
      }
    }
    
    sendEmail(valid, email, month, url, submission);
  }
}

function getSpreadSheet(filename) {
  return DriveApp.getFilesByName(filename);
}


// CAPITALIZE PROPER NOUN - all other letters forced to small
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// send email using form fields of month, url and submission.
function sendEmail(valid, email, month, url, submission) {
  // IF RESPONSE MATCHES ENTRY IN COL C - send successful email with URL
  if(valid) {
    MailApp.sendEmail(email,
                      "CLE Affidavit - Appellate & ICAP Decisions Case Law Update",
                      '?',{
                      htmlBody: Utilities.formatString("<p>Thank you for attending $s's webinar!  Please click <a href='%s'><strong>here</strong></a> for a copy of your record. If you have any issues, please reply to this email.</p><p>Thank you ,<br/>AJax2012</p>", month, url),
                      });
  } else {
    // INCORRECT RESPONSE - send email with original submission and link to form to try again
    MailApp.sendEmail(email,
                      "CLE Affidavit - Appellate & ICAP Decisions Case Law Update",
                      '?', {
                        htmlBody: Utilities.formatString("<p>Thank you for attending our webinar!  Your code submission was <strong>%s</strong>. This code is incorrect and you will not recieve credit for this submission. If you have any questions, please reply to this email.</p><p>If you would like to resubmit your response, please click <a href='LINK TO FORM HERE'>here</a>.</p><p>Thank you,<br/>AJax2012</p>", submission),
                      });
  }
}
