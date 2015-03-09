function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function doSomething() {
  Logger.log('I am dude');
}

function retrieveRecord(inputHandle) {
  Logger.log("Retrieve -->" + inputHandle);
  
  var result = {};
  if(inputHandle) {
    var record = retrieveScore(inputHandle);
    populateScore(record,result);
  }  
  else {
    result.success = false;
    result.error = "Your Handle was not found.Please check and try again";
  }
  Logger.log(result);
  
  return result;
}


function populateScore(record,result){
  if(!record) {
    result.success = false;
    result.error = "Your Handle was not found.Please check and try again";
    return result;
  }
  result.success = true;
  Logger.log(record);
  
  if(record.length >= 1) {
    result.Rank = record[3];
  }
  if(record.length >= 2) {
    result.Handle = record[0];
  }  
  if(record.length >= 3) {
    result.Name = record[2];
  }
  if(record.length >=4) {
    result.Score = record[1];
  }
  
  return result;
}

function retrieveScore(inputHandle) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getValues();
  
  Logger.log(sheet);
  
  
  for(var i = 0; i < sheet.length;i++){
    if(sheet[i][0]) {
      if(sheet[i][0].toLowerCase() == inputHandle.toLowerCase()) {
        return sheet[i];
      }
    }
  }
}