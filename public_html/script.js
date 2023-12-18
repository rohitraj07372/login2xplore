/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseUrl = "http://api.login2explore.com:5577";
var connToken = "90931459|-31949302894403863|90960539";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studentDBName = "StudentEnrollment";
var StudentRelName = "Student-Rel";

$("#primaryKey").focus();
 


function getStudent(){
    var studentRoll = getStudentRollJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studentDBName, StudentRelName, studentRoll);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandByGivenBaseUrl(getRequest,jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#primaryKey").focus();
    }
    
    else if(resJsonObj === 200){
        $("#primaryKey").prop('disabled', true);
        fillData(resJsonObj);
        $("#update").prop('disabled', false);
        $("#reset").prop('disabled', false);
         $("#primaryKey").focus();
    }
}


function fillData(jsonObj){
    saveRecordNo2SL(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullName").val(record.fullNmae);
    $("#class").val(record.std);
    $("#address").val(record.address);
    $("#birthDate").val(record.birthDate);
    $("#enrollmentDate").val(record.enrollmentDate);
    
    
}

function saveRecordNo2SL(jsonObj){
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvdata.rec_no);
}

function getStudentRollJsonObj(){
    var studentRoll = $("#primaryKey").val();
    var jsonStr = {
        roll:studentRoll
    };
    return JSON.stringify(jsonStr);
}


function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ""){
        return "";
    }
    
    var putRequest = createPutRequest(connToken, jsonStrObj, studentDBName, studentRelName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj =  executeCommandArGivenBaseUrl(PutRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#primaryKey").focus();
}

function resetForm(){
    $('#primaryKey').val("");
    $('#fullName').val("");
    $('#class').val("");
    $('#address').val("");
    
    
    $('#birthDate').val("");
    $('#enrollmentDate').val("");
    $('#primaryKey').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#primaryKey').focus();
    
}

function updateData(){
    $("#update").prop("disabled", true);
    jsonUpdate = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonUpdate, studentDBName,StudentRelName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#primaryKey").focus();
}



function validateData(){
    var primaryKey, fullName, std, birthdate, address, enrollmentDate;
    primaryKey = $("#primaryKey").val();
    std = $("#class").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrollmentDate = $("#enrollmentDate").val();
    
    if(primaryKey === ""){
        alert("Roll Number is missing");
        $("#primaryKey").focus();
        return "";
    }
    
     if(std === ""){
        alert("class is missing");
         $("#class").focus();
        return "";
    }
    
     if(birthdate === ""){
        alert("Birth date is missing");
         $("#birthdate").focus();
        return "";
    }
    
      if(address === ""){
        alert("address is missing");
         $("#address").focus();
        return "";
    }
    
     if(enrollmentDate === ""){
        alert("enrollment date is missing");
         $("#enrollmentDate").focus();
        return "";
    }
    
    var jsonStrObj = {
        primaryKey: primaryKey,
        name: fullName,
        std: std,
        bdate: birthdate,
        address: address,
        edate: enrollmentDate
               
    };
    return JSON.stringify(jsonStrObj);
}


