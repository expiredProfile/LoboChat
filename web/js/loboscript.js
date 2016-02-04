/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $("#getAllMessagesButton").click(function () {
        $.ajax({
            url: "http://localhost:8080/LoboChat/resources/Messages",
            method: 'GET',
            dataType: 'xml', // returned datatype
            success: listMessages
        });
    });//getAllMessages
    
    $("#sendMessageButton").click(function () {
        var messageContent = $("#inputField").val();
        $.ajax({
            url: "http://localhost:8080/LoboChat/resources/Messages",
            data: messageContent,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("outputField").innerHTML = " "
        }); // ajax
    });// sendMessage

    $("#loginButton").click(function () {
        var messageContent = $("#inputField").val();
        $.ajax({
            url: "http://localhost:8080/LoboChat/resources/Workers/LoggedIn",
            data: messageContent,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("outputField").innerHTML = " "
        }); // ajax
    });// loginButton
    
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
    
    $("#sendAlertButton").click(function () {
        var alertCategory = $("#alert").val();
        $.ajax({
            url: "http://localhost:8080/LoboChat/resources/Alerts",
            data: alertCategory,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("alertResponse").innerHTML = " "
        }); // ajax
    });// sendAlert
    
}); // $(document).ready