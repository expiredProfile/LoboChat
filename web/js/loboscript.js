/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = "http://localhost:8080/LoboChat/resources";

$(document).ready(function () {
    /*
    $("#getAllMessagesButton").click(function () {
        $.ajax({
            url: baseUrl + "/Messages",
            method: 'GET',
            dataType: 'xml', // returned datatype
            success: listMessages
        });
    });//getAllMessages
    
    $("#sendMessageButton").click(function () {
        var messageContent = $("#inputField").val();
        $.ajax({
            url: baseUrl + "/Messages",
            data: messageContent,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("outputField").innerHTML = " "
        }); // ajax
    });// sendMessage
    */
   
   $("#loginButton").click(function () {
        logIn();
    });// loginButton
    
    $("#loggedInUsers").click(function () {
        $.ajax({
            url: baseUrl + '/Workers/LoggedIn',
            type: 'GET',
            dataType: 'xml',
            success: loggedInOut
        });
    }); //loggedInUsers

    $("#loggedOutUsers").click(function () {
        $.ajax({
            url: baseUrl + '/Workers/LoggedOut',
            type: 'GET',
            dataType: 'xml',
            success: loggedInOut
        });
    }); //loggedOutUsers
    
    $("#sendAlertButton").click(function () {
        var alertCategory = $("#alert").val();
        $.ajax({
            url: baseUrl + "/Alerts",
            data: alertCategory,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("alertResponse").innerHTML = " "
        }); // ajax
    });// sendAlert
    
}); // $(document).ready

function logIn() {
    var workerName = $('#inputField').val();
    alert(workerName);
    $.ajax({
        url: baseUrl + '/Workers',
        data: workerName,
        type: 'POST',
        contentType: 'text/plain',
        success: alert('Success'),
        error: function (response) {
            alert('Error ' + response.statusText);
        }
    });
}           

function loggedInOut(xml, status) {
    console.log("listing messages");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            content += $(this).find("id").text() + " " + $(this).find("name").text() + " "
                    + $(this).find("title").text() + "<br>";
        });
    });
    document.getElementById("outputField").innerHTML = content;
}
/*
function listMessages(xml, status) {
    console.log("listing messages");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find("message").each(function () {
        content += $(this).find("id").text() + " " + $(this).find("postTitle").text() + " " 
                + $(this).find("postName").text() + ": "
                + $(this).find("content").text() + "<br>";
    });
    document.getElementById("outputField").innerHTML = content;
}; // listMessages
*/