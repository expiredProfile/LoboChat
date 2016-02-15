
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = "http://localhost:8080/LoboChat";
var workerName;
//var chatParticipantId;
var chatParticipantName;
var chatID;
var wsUri = "ws://localhost:8080/LoboChat/chatend";
//var wsUri = "ws://localhost:8080/LoboChat/resources/chatend/";
var websocket;

$(document).ready(function () {

    $(function () {
        adjustStyle($(this).width());
        $(window).resize(function () {
            adjustStyle($(this).width());
        });
    });
    /*
     $("#getAllMessagesButton").click(function () {
     $.ajax({
     url: baseUrl + "/resources/Messages",
     method: 'GET',
     dataType: 'xml', // returned datatype
     success: listMessages
     });
     });//getAllMessages
     
     $("#sendMessageButton").click(function () {
     var messageContent = $("#inputField").val();
     $.ajax({
     url: baseUrl + "/resources/Messages",
     data: messageContent,
     type: 'POST',
     contentType: 'text/plain',
     dataType: 'xml',
     success: document.getElementById("outputField").innerHTML = " "
     }); // ajax
     });// sendMessage
     */

    $("#loginButton").click(function () {
        workerName = $('#inputField-id').val();
        writeCookie('currentUser', workerName, 3);
        logIn(workerName);
        // window.location = baseUrl + "/userlists.html";
    });
    $("#logOutButton").click(function () {
        logOut();
        //window.location = baseUrl;
    });
    $("#loggedInUsers").click(function () {
        $.ajax({
            url: baseUrl + '/resources/Workers/LoggedIn',
            type: 'GET',
            dataType: 'xml',
            success: loggedIn
        });
    }); //loggedInUsers

    $("#loggedOutUsers").click(function () {
        $.ajax({
            url: baseUrl + '/resources/Workers/LoggedOut',
            type: 'GET',
            dataType: 'xml',
            success: loggedOut
        });
    }); //loggedOutUsers

    $("#sendAlertButton").click(function () {
        var alertCategory = $("#alert").val();
        $.ajax({
            url: baseUrl + "/resources/Alerts",
            data: alertCategory,
            type: 'POST',
            contentType: 'text/plain',
            dataType: 'xml',
            success: document.getElementById("alertResponse").innerHTML = " "
        }); // ajax
    }); // sendAlert

}); // $(document).ready

function logIn(workerName) {
    $.ajax({
        url: baseUrl + "/resources/Workers",
        data: workerName,
        type: 'POST',
        contentType: 'text/plain',
        //success: alert('Logged In ' + workerName),
        success: window.location = baseUrl + "/userlists.html",
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
}

function logOut() {
    var currentUser = readCookie('currentUser');
    //window.alert("logged out: " + currentUser);
    $.ajax({
        url: baseUrl + "/resources/Workers/LoggedOut",
        data: currentUser,
        type: 'POST',
        contentType: 'text/plain',
        //success: alert('Logged Out'),
        success: window.location = baseUrl,
        error: function (response) {
            alert('Error ' + response.statusText);
        }
    });
}

function loggedOut(xml, status) {
    console.log("listing messages");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            content += $(this).find("title").text() + ": " + $(this).find("name").text()
                    + "<br>";
        });
    });
    document.getElementById("outField").innerHTML = content;
}

//function loggedIn(xml, status) {
//    console.log("listing messages");
//    xmlString = (new XMLSerializer()).serializeToString(xml);
//    console.log("XML: " + xmlString);
//    var $xml = $(xml);
//    var content = "";
//    $xml.find('workers').each(function () {
//        $xml.find('worker').each(function () {
////var wid = $(this).find("id").text();
//            var wname = $(this).find("name").text();
//            console.log("Id name " + wname);
//            content += "<div class='onlines'><a href='' onclick='openChat(\"" + wname + "\")'\n\
//             value=" + $(this).find("id").text() + "\
//            > " + $(this).find("title").text() + ": " + $(this).find("name").text()
//                    + "</a></div><br>";
//        });
//    });
//    document.getElementById("inField").innerHTML = content;
//}


function openChat(id) {

    var url = baseUrl + "/chaWin.html";
    //chatParticipantId = id;
    sessionStorage.setItem("cid", id);
    window.open(url);
}

function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) { //readCookie('currentUser')
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

function adjustStyle(width) {
    width = parseInt(width);
    console.log(width);
    if (width < 501) {
        $("#size-stylesheet").attr("href", "css/narrow.css");
    } else if (width < 900) {
        $("#size-stylesheet").attr("href", "css/medium.css");
    } else {
        $("#size-stylesheet").attr("href", "css/wide.css");
    }
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

// NEW
function startConversation(receiver) {
    var xmlGroupObject = '<group><topic>example topic</topic><workerList><id></id><name>' + readCookie("currentUser") + '</name><title></title></workerList>'
            + '<workerList><id></id><name>' + receiver + '</name><title></title></workerList></group>';
    var GroupXmlDoc = $.parseXML(xmlGroupObject);
    var $groupXml = $(GroupXmlDoc);
// $messageXml.find("content").append(messageContent);
//    $messageXml.find("content").append(messageContent);
    $.ajax({
        url: "http://localhost:8080/LoboChat/resources/Conversations",
        data: GroupXmlDoc,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        //success: document.getElementById("outputField").innerHTML = ".. ",
        error: function (response) {
            console.log("Error: " + response.statusText);
        }
    }); // ajax
}
; // function

function loggedIn(xml, status) {
    console.log("listing users");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            var wname = $(this).find("name").text();
            console.log("Id name " + wname);
            if (wname !== readCookie('currentUser')) {
                content += "<div class='onlines'><button onclick='startConversation(\"" + wname + "\")'\n\
             value=" + $(this).find("id").text() + "\
            > " + $(this).find("title").text() + ": " + $(this).find("name").text()
                        + "</button></div><br>";
            }
        });
    });
    document.getElementById("inField").innerHTML = content;
}
;// loggedIn??

function getConversations() {
    var user = readCookie('currentUser');
    $.ajax({
        url: baseUrl + "/resources/Conversations/" + user,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listConversations,
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
}
function listConversations(xml, status) {
    console.log("listing Conversations");
//    xmlString = (new XMLSerializer()).serializeToString(xml);
//    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('conversations').each(function () {
        $xml.find('conversation').each(function () {
            var conversationID = $(this).find("ID").text();
            console.log("conversationID " + conversationID);
            content += "<div class='onlines'><button onclick='openChat(\"" + conversationID + "\")'\n\
             value='" + $(this).find("topic").text() +
                    "'> " + $(this).find("topic").text() + ": " + $(this).find("ID").text()
                    + "</button></div><br>";
        });
    });
    document.getElementById("inField").innerHTML = content;
}
;// listConversations

function getParticipants() {
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        url: baseUrl + "/resources/Conversations/conversationID/" + cid,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listParticipant,
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
    if (websocket !== undefined && websocket.readyState !== WebSocket.CLOSED) {

    } else {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (event) {
            onOpen(event);
        };
        websocket.onmessage = function (event) {
            onMessage(event);
        };

        websocket.onclose = function (event) {
            onClose(event);
        };
    }



}

function listParticipant(xml, status) {
    console.log("listing participants");
    var $xml = $(xml);
    var content = "";
    var messages = "";
    var cid = $xml.find('ID').text();
    $xml.find('memberList').each(function () {
        var memberName = $(this).find("name").text();
        content += memberName + "<br>";
    });

    $xml.find('messages').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        messages += postName + ": " + msgs + "<br>";
    });
    document.getElementById("participants").innerHTML = content;
    document.getElementById("chatArea").innerHTML = messages;
    document.getElementById("conversationID").innerHTML = cid;
}
;// listParticipants

function onMessage(event) {
    var cid = document.getElementById("conversationID").innerHTML;
    if (event.data === cid) {
        loadMessages();
    }
}//onMessage

function onOpen(event) {
    systemMessage(readCookie('currentUser') + " connected!");
}
function onClose(event) {
    systemMessage(readCookie('currentUser') + " disconnected!");
}
function loadMessages() {
    var cid = document.getElementById("conversationID").innerHTML;
    $.ajax({
        url: baseUrl + "/resources/Messages/" + cid,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listMessages,
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
}//loadMessages()

function listMessages(xml, status) {
    var $xml = $(xml);
    var content = "";
    $xml.find('message').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        content += postName + ": " + msgs + "<br>";
    });
    document.getElementById("chatArea").innerHTML = content;
}

function sendMessage() {

    var messageContent = $("#inputField").val();
    var d = new Date();

    var dd = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    var cid = document.getElementById("conversationID").innerHTML;

    var sender = readCookie('currentUser');

    var messageObject = "  <message><content>" + messageContent + "</content>"
            + "<conversationID> " + cid + "</conversationID>"
            + " <currentTime>" + dd + "</currentTime>"
            + "<postName>" + sender + "</postName></message> ";
    var messageXml = $.parseXML(messageObject);
    $.ajax({
        url: baseUrl + "/resources/Messages",
        data: messageXml,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent

        //success: document.getElementById("outputField").innerHTML = ".. ",
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax

    websocket.send(cid);
}// function

function systemMessage(content) {

    var d = 1;
    var cid = document.getElementById("conversationID").innerHTML;
    var sender = "System";
    var messageObject = "  <message><content>" + content + "</content>"
            + "<conversationID> " + cid + "</conversationID>"
            + " <currentTime>" + d + "</currentTime>"
            + "<postName>" + sender + "</postName></message> ";
    var messageXml = $.parseXML(messageObject);

    $.ajax({
        url: baseUrl + "/resources/Messages",
        data: messageXml,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        //success: document.getElementById("outputField").innerHTML = ".. ",
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
    websocket.send(cid);


}// function

