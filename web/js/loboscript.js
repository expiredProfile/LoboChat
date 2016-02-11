
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
    $("#usersButton-id").click(function () {
        $.ajax({
            url: baseUrl + '/resources/Workers/LoggedIn',
            type: 'GET',
            dataType: 'xml',
            success: loggedIn
        });
        $.ajax({
            url: baseUrl + '/resources/Workers/LoggedOut',
            type: 'GET',
            dataType: 'xml',
            success: loggedOut
        });
    }); //loggedInUsers

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
    window.alert("keksistä: " + currentUser);
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
            content += "<div class='loggedOutUsersDiv-class'>" + 
                    "<i class='fa fa-circle loggedOutBall-class'></i>" + 
                    "<span>" + $(this).find("name").text() + 
                    "</span>" + "<span class='leftSide-class'>" + $(this).find("title").text() + "</span>" + "</div>";
        });
    });
    document.getElementById("outField").innerHTML = content;
}

function loggedIn(xml, status) {
    console.log("listing messages");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
//var wid = $(this).find("id").text();
            var wname = $(this).find("name").text();
            console.log("Id name " + wname);
            content += "<div class='loggedInUsersDiv-class'>" + 
                    "<i class='fa fa-circle loggedInBall-class'></i>" + 
                    "<span>" + $(this).find("name").text() + "</span>" + 
                    "<span class='leftSide-class'>" + $(this).find("title").text() + "</span>" + "</div>";
        });
    });
    document.getElementById("inField").innerHTML = content;
}


function openChat(name) {

    var url = baseUrl + "/chaWin.html";
    //chatParticipantId = id;
    sessionStorage.setItem("pname", name);
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

function readCookie(name) {
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
    if (width < 701) {
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

