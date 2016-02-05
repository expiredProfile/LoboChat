/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var baseUrl = "http://localhost:8080/LoboChat/resources";
var workerName = $('#inputField').val();
$(document).ready(function () {
    $("#loginButton").click(function () {
        logIn();
        writeCookie('curretnUser', workerName, 3);
        window.location = "http://localhost:8080/LoboChat/userlists.html";
    });
    $("#logOutButton").click(function () {
        logOut();
        window.location = "http://localhost:8080/LoboChat/";
    });
    $("#loggedInUsers").click(function () {
        $.ajax({
            url: baseUrl + '/Workers/LoggedIn',
            type: 'GET',
            dataType: 'xml',
            success: loggedInOut
        });
    });

    $("#loggedOutUsers").click(function () {
        $.ajax({
            url: baseUrl + '/Workers/LoggedOut',
            type: 'GET',
            dataType: 'xml',
            success: loggedInOut
        });
    });
});

function logIn() {
    $.ajax({
        url: baseUrl + '/Workers',
        data: workerName,
        type: 'POST',
        contentType: 'text/plain',
        success: alert('Logged In'),
        error: function (response) {
            alert('Error ' + response.statusText);
        }
    });
}

function logOut() {
    var currentUser = readCookie('currentUser');
    $.ajax({
        url: baseUrl + '/Workers/LoggedOut',
        data: currentUser,
        type: 'POST',
        contentType: 'text/plain',
        success: alert('Logged Out'),
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
            content += $(this).find("title").text() + ": " + $(this).find("name").text()
                    + "<br>";
        });
    });
    document.getElementById("outputField").innerHTML = content;
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


