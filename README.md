# google-form-validate-with-sheet
**Very little coding experience required**

validate google form entries with google sheets

If you are looking for a way to validate a string submission in google forms using Google SpreadSheets as your "database," this is a good place to start. This script will compare a form submission to a google sheet and email the user whether their submission was valid or invalid, even if their response has capitals or spaces before or after the word.

To use:
1. Create, name and save your Google Spreadsheet. Get column headers set up for ease of use
1. Create, name and save your Google Form. Complete setup of form for ease of use
1. Click triple dots on upper right hand corner and select "script editor"
1. Copy and paste the code in code.gs
1. Set filename of Sheet - No key necessary!
1. Set variables to match form and sheets
1. Use CapitalizeFirstLetter as needed for proper nouns in email
1. Set validator to check correct field and column
1. Change params in SendEmail as needed
1. Write your HTML email
1. TEST!

I am planning on creating a plugin verison of this eventually. Enjoy!
