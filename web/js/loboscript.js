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
var mainUri = "ws://localhost:8080/LoboChat/mainsock";
var mainsocket;

var number = 0;
var check = true;
var state = true;
var dropdownlogin = "";
var dropdownlogout = "";

$(document).ready(function () {

    $(window).load(function () {
        var location = window.location.href;
        if (location !== ("http://localhost:8080/LoboChat/")) {
            //$("#main-id").load("userlist.html");
            if (state === true) {
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
                state = false;
            }
        }
    });

    $(window).resize(function () {
        adjustStyle($(this).width());
    });

    $(document).on("click", ".usersToAdd-class", function () {
        console.log("Test");
        var text = $(this).text();
        console.log("text to place: " + text);
        $("#userPlacement-id").append("<span id='user" + number + "'>"
                + text + "<i class='fa fa-times'></i></span>");
        number++;
        $(this).remove();
    });

    $(document).on("click", "#topicButton-id", function () {
        var text = $("input").val();
        $("#topic-id").html("<span id='topicValue-id'>" + text + "</span>");
    });

    $(document).on("click", ".fa-times", function () {
        var toRemove = $(this).parent("span");
        $(toRemove).remove();
        console.log("toRemove: " + toRemove.text());
        $("#myDropdown").append("<p class='usersToAdd-class'>" + toRemove.text() + "</p>");
    });

    $("#loginButton").click(function () {
        workerName = $('#inputField-id').val();
        writeCookie('currentUser', workerName, 3);
        logIn(workerName);
        // window.location = baseUrl + "/userlists.html";
    });
    
    $("#usersButton-id").click(function () {
        $("#main-id").load("userlist.html");
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
        console.log("test");
    }); //loggedInUsers

    $("#createConversation-id").click(function () {
        $("#main-id").load("createConversation.html", function () {
            if (check === true) {
                ajaxGet();
                check = false;
            }
            $("#myDropdown").append(dropdownlogin);
            console.log(dropdownlogin);
            $("#myDropdown").append(dropdownlogout);
            console.log(dropdownlogout); 
        });
    });
    $("#logOutButton").click(function () {
        logOut();
        //window.location = baseUrl;
    });
    $("#alertsButton-id").click(function () {
        $("#main-id").load("alert.html");
    });
    $("#sendAlertButton").click(function () {
        console.log("Sending alert");
        //Xml object
        var xmlAlertObject = "<alert><alertCat></alertCat><receiverGroup></receiverGroup><postName></postName></alert>";
        var alertXmlDoc = $.parseXML(xmlAlertObject);
        var $alertXml = $(alertXmlDoc);
        //Get user input
        var alertCat = $("#alert").val(); //Alert category dropdown
        var recGroup = $('input[name="receiverGroup"]:checked').val(); //Receiver group radio
        var sender = readCookie("currentUser"); //Read current user from cookie (alert sender)
        //Print for test purposes
        alert("alertCat: " + alertCat + ", recGroup: " + recGroup);
        //Append input data to xml
        $alertXml.find("alertCat").append(alertCat);
        $alertXml.find("receiverGroup").append(recGroup);
        $alertXml.find("postName").append(sender);
        $.ajax({
            url: baseUrl + "/resources/Alerts",
            data: alertXmlDoc,
            processData: false, //already xml doc!
            type: 'POST',
            contentType: 'application/xml',
            //dataType: 'text/plain',
            success: document.getElementById("alertResponse").innerHTML = "Alert sent",
            error: function (response) {
                alert("Error in alert: " + response.statusText);
            }
        }); // ajax
    }); // sendAlert

    $("#topicsButton-id").click(function () {
        console.log("click topic button");
        $("#main-id").load("topicslist.html");
        getConversations();
        loadLatest();
    });

    $(document).on("click", "#createButton-id", function () {
        startConversation();
        $("#main-id").load("topicslist.html");
        getConversations();
    });

}); // $(document).ready

function ajaxGet() {
    $("#myDropdown").empty();
    console.log("ajax get");
    $.ajax({
        url: baseUrl + '/resources/Workers/LoggedIn',
        type: 'GET',
        dataType: 'xml',
        async: false,
        success: loggedInDropDown
    });
    $.ajax({
        url: baseUrl + '/resources/Workers/LoggedOut',
        type: 'GET',
        dataType: 'xml',
        async: false,
        success: loggedOutDropDown
    });
    console.log("ajax get done");
}

function logToMainsocket() {
    console.log("Mainsocket");
    if (mainsocket) {
        if (mainsocket.readyState !== mainsocket.CLOSED) {
            console.log("Already socket.");
        } else {
            mainsocket = new WebSocket(mainUri);
            mainsocket.onopen = function (event) {
                onOpenMain(event);
            };
            mainsocket.onmessage = function (event) {
                onMessageMain(event);
            };

            mainsocket.onclose = function (event) {
                onCloseMain(event);
            };
            console.log("Logged");
        }
    } else {
        mainsocket = new WebSocket(mainUri);
        mainsocket.onopen = function (event) {
            onOpenMain(event);
        };
        mainsocket.onmessage = function (event) {
            onMessageMain(event);
        };

        mainsocket.onclose = function (event) {
            onCloseMain(event);
        };
        console.log("Logged");
    }
}

function onMessageMain(event) {
    console.log("Alert lol");
}//onMessage

function onOpenMain(event) {
    console.log("Connected to mainsocket.");
}

function onCloseMain(event) {
    console.log("Disconnected from mainsocket.");
}

function loadLatest(cid) {
    $.ajax({
        url: baseUrl + "/resources/Messages/latest/" + cid,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listMessage,
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
}

function listMessage(xml, status) {
    var $xml = $(xml);
    var content = "";
    $xml.find('message').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        var timeStamp = $(this).find("currentTime").text();
        content += "<p id='postName-id'>" + postName + "</p>" + "<p id='timeStamp-id'>" + timeStamp
                + "</p>" + "<br><div id='msgContDiv-id'><p id='msgContent-id'>" + msgs + "</p></div>";
        console.log("current time: " + timeStamp);
    });
    cid = $xml.find('conversationID').text();
    console.log("cid is: " + cid);
    var target = "messageField" + cid + "-id";

    if (document.getElementById(target) !== null) {
        document.getElementById(target).innerHTML = content;
    } else {
    }
}// listMessage

function logIn(workerName) {
    $.ajax({
        url: baseUrl + "/resources/Workers",
        data: workerName,
        type: 'POST',
        contentType: 'text/plain',
        //success: alert('Logged In ' + workerName),
        success: window.location = baseUrl + "/mainpage.html",
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
} // logIn

function logOut() {
    var currentUser = readCookie('currentUser');
    //window.alert("logged out: " + currentUser);
    if (!mainsocket) {

    } else if (mainsocket.readyState === mainsocket.CLOSED) {

    } else {
        mainsocket.close();
    }

    if (!websocket) {

    } else if (websocket.readyState === websocket.CLOSED) {

    } else {
        websocket.close();
    }

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
} // logOut

function loggedOut(xml, status) {
    console.log("listing logged out users");
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
    $("#outField").html(content);
} //loggedOut

function loggedIn(xml, status) {
    console.log("listing  logged in users");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            var wname = $(this).find("name").text();
            console.log("Id name " + wname);
            if (wname !== readCookie('currentUser')) {
                content += "<div class='loggedInUsersDiv-class'>" +
                        "<i class='fa fa-circle loggedInBall-class'></i>" +
                        "<span>" + $(this).find("name").text() + "</span>" +
                        "<span class='leftSide-class'>" + $(this).find("title").text() + "</span>" + "</div>";
            }
        });
    });
    $("#inField").html(content);
} //loggedIn

function loggedOutDropDown(xml, status) {
    console.log("listing logged out users");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    //var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            dropdownlogout += "<p class='usersToAdd-class'>" + $(this).find("name").text() + "</p>";
        });
    });
    //document.getElementById("dropDownMenu").innerHTML = content;
}

function loggedInDropDown(xml, status) {
    console.log("listing logged in users");
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("XML: " + xmlString);
    var $xml = $(xml);
    //var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            var wname = $(this).find("name").text();
            console.log("Id name " + wname);
            if (wname !== readCookie('currentUser')) {
                dropdownlogin += "<p class='usersToAdd-class'>" + $(this).find("name").text() + "</p>";
            }
        });
    });
    //document.getElementById("dropDownMenu").innerHTML = content;
}

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
    if (width < 701) {
        $("#size-stylesheet").attr("href", "css/narrow.css");
    } else if (width < 900) {
        $("#size-stylesheet").attr("href", "css/medium.css");
    } else {
        $("#size-stylesheet").attr("href", "css/wide.css");
    }
}

function startConversation() {
    var topic = $('#topic-id').text();
    console.log("topic to add: " + topic);
    if (topic.length === 0) {
        window.alert("Topic missing!");
        return null;
    }
    // group object with an arraylist of participants ->(workerlist tags).
    var xmlGroupObject = "<group><topic>" + topic + "</topic><workerList><id></id><name>" 
            + readCookie('currentUser') + "</name><title></title></workerList>";
    $('#userPlacement-id').children('span').each(function () { // iterates through the selected workers
        xmlGroupObject += '<workerList><id></id><name>' + $(this).text() + '</name><title></title></workerList>';
    });
    xmlGroupObject += "</group>"; // adds end tag for the xml document.
//    window.alert(xmlGroupObject);
    var GroupXmlDoc = $.parseXML(xmlGroupObject);
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
        }//error
    }); // ajax
} // startConversation()

function startProfGroupConversation(receiverProfession) {
    var xmlProfConvDataObject = "<profConvData><topic></topic><professionGroup></professionGroup><postName>" + readCookie("currentUser") + "</postName></profConvData>";
    var ProfXmlDoc = $.parseXML(xmlProfConvDataObject);
    var $profXml = $(ProfXmlDoc);
    //Append input data to xml
    $profXml.find("topic").append("");
    $profXml.find("professionGroup").append("");
    $.ajax({
        url: baseUrl + "/resources/ProfessionConversations",
        data: ProfXmlDoc,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        //success: document.getElementById("outputField").innerHTML = ".. ",
        error: function (response) {
            console.log("Error: " + response.statusText);
        }
    }); // ajax
} // startProfGroupConversation function

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
} // getConversations

function listConversations(xml, status) {
    console.log("listing Conversations");
    var $xml = $(xml);
    var content = "";
    $xml.find('conversations').each(function () {
        $xml.find('conversation').each(function () {
            var conversationID = $(this).find("ID").text();
            console.log("conversationID " + conversationID);
            content += "<div class='onlines'><button onclick='openChat(\"" + conversationID + "\")'\n\
             value='" + $(this).find("topic").text() + "'> " 
                    + "<p id='topicField-id'>" + $(this).find("topic").text() 
                    + "<span id='topicIDField-id'>" + $(this).find("ID").text() + "</span></p>"  
                    + "<p id='messageField" + conversationID + "-id'>"
                    + loadLatest(conversationID) + "</p>" + "</button><hr></div><br>";
        });
    });
    $("#topicsDiv-id").html(content);
}// listConversations

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
    if (websocket) {
        if (websocket.readyState !== websocket.CLOSED) {
            console.log("Already socket.");
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
            console.log("Logged");
        }
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
        console.log("Logged");
    }
}// getParticipants


function listParticipant(xml, status) { // also lists messages !
    console.log("listing participants");
    var $xml = $(xml);
    var content = "";
    var messages = "";
    var topic = $xml.find('topic').text();
    var cid = $xml.find('ID').text();

    $xml.find('memberList').each(function () {
        var memberName = $(this).find("name").text();
        content += memberName + "<br>";
    });
    var limiter = 0;
    $xml.find('messages').each(function () {
        limiter++;
    });
//    window.alert(limiter);
    var messageCount = 0;
    $xml.find('messages').each(function () {
        if (messageCount >= limiter - 10) { // how many messages are displayed.
            var postName = $(this).find("postName").text();
            var msgs = $(this).find("content").text();
            messages += postName + ": " + msgs + "<br>";
        }
        messageCount++;
    });
    document.getElementById("participants").innerHTML = content;
    document.getElementById("chatArea").innerHTML = messages;
    document.getElementById("conversationID").innerHTML = cid;
    document.getElementById("topic-banner").innerHTML = topic;
}//listParticipants(xml, status)

function onMessage(event) {
    var cid = document.getElementById("conversationID").innerHTML;
    if (event.data === cid) {
        loadMessages();
        loadLatest(cid);
    }
} //onMessage

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
    var limiter = 0;
    $xml.find('message').each(function () {
        limiter++;
    });
    var messageCount = 0;
    var content = "";
    $xml.find('message').each(function () {
        if (messageCount >= limiter - 10) { // how many messages are displayed
            var postName = $(this).find("postName").text();
            var msgs = $(this).find("content").text();
            content += postName + ": " + msgs + "<br>";
        }
        messageCount++;
    });
    document.getElementById("chatArea").innerHTML = content;
} // listMessages

function sendMessage() {
    var messageContent = $("#inputField").val();
    if (messageContent.length === 0) {
        return null;
    }
    var d = new Date();
    var dd = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var cid = document.getElementById("conversationID").innerHTML;
    var sender = readCookie('currentUser');
    var messageObject = "  <message><content>" + messageContent + "</content>"
            + "<conversationID> " + cid + "</conversationID>"
            + "<currentTime></currentTime>"
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
}// sendMessage function

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
}// systemMessage function
