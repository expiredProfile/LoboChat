var baseUrl = "http://localhost:8080/LoboChat";
var workerName;
var groupID;
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
var dropdownlogin = "";
var dropdownlogout = "";

$(document).ready(function () {

    $(window).load(function () {
        var location = window.location.href;
        if (location !== ("http://localhost:8080/LoboChat/")) {
            $("#main-id").load("userlist.html");
            var state = true;
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

    $("#addnewuser").click(function () {
        addUser();
    });

    $(document).on("click", "#sendAlertButton", function () {
        console.log("Sending alert");
        //Get user input
        var alertCat = $("#alert").val(); //Alert category dropdown
        var recGroup = $('input[name="receiverGroup"]:checked').val(); //Receiver group radio
        var sender = readCookie("currentUser"); //Read current user from cookie (alert sender)
        //Print for test purposes
        alert("alertCat: " + alertCat + ", recGroup: " + recGroup);
        //Xml object
        var xmlAlertObject = "<alert><alertCat>" + alertCat + "</alertCat><receiverGroup>" + recGroup + "</receiverGroup><postName>" + sender + "</postName></alert>";
        var alertXmlDoc = $.parseXML(xmlAlertObject);
        //console.log(alertXmlDoc);

        $.ajax({
            url: baseUrl + "/resources/Alerts",
            data: alertXmlDoc,
            processData: false, //already xml doc!
            type: 'POST',
            contentType: 'application/xml',
            dataType: 'text',
            success: function (data) {
                mainsocket.send(data);
            },
            error: function (response) {
                alert("Error in alert: " + response.statusText);
            }
        }); // ajax
    }); // sendAlert

    $("#topicsButton-id").click(function () {
        $("#main-id").load("topicslist.html");
        getConversations();
    });

    $(document).on("click", "#createButton-id", function () {
        startConversation();
//        $("#main-id").load("topicslist.html");
//        getConversations();
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
    $.ajax({
        url: baseUrl + "/resources/Alerts/" + event.data,
        type: 'GET',
        dataType: 'xml',
        success: handleAlert,
        error: function (response) {
            alert("Error in handleAlert: " + response.statusText);
        }
    });
}//onMessage

function handleAlert(xml, status) {
    xmlString = (new XMLSerializer()).serializeToString(xml);
    console.log("Alert: " + xmlString);
    var $xml = $(xml);

    var target = $xml.find('receiverGroup').text();
    var topic = $xml.find('alertTopic').text();
    console.log("Alert target: " + target);
    groupID = readCookie('groupID');
    console.log("GroupID: " + groupID);
    if (target === "0") {
        alert("Alert: " + topic);
    } else if (target === groupID) {
        alert("Alert: " + topic + ", groupID: " + groupID);
    } else {
        //Test alert
        alert("Alert not for you");
    }
}

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
        url: baseUrl + "/resources/Workers/LoggedOut",
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: function (data) {
            var $xml = $(data);
            var showError = true;
            $xml.find('workers').each(function () {
                $xml.find('worker').each(function () {
                    if (workerName === $(this).find("name").text()) {
                        showError = false;
                        $.ajax({
                            url: baseUrl + "/resources/Workers",
                            data: workerName,
                            type: 'POST',
                            contentType: 'text/plain',
                            dataType: 'text',
                            success: function (data) {
                                writeCookie('currentUser', workerName, 3);
                                console.log(data);
                                writeCookie('groupID', data, 3);
                                window.location = baseUrl + "/mainpage.html";
                            },
                            error: function (response) {
                                alert(response.statusText + " wn: " + workerName);
                            }
                        });//ajax
                    }

                    if (workerName === "Admin") {
                        showError = false;
                        window.location = baseUrl + "/adminpage.html";
                    }

                });
                if (showError === true) {
                    $("#inputField-id").val("");
                    window.alert("Invalid login information!");
                }
            });
        },
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });//ajax
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
    console.log("listing logged out");
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
} //loggedOut

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
                content += "<div class='loggedInUsersDiv-class'>" +
                        "<i class='fa fa-circle loggedInBall-class'></i>" +
                        "<span>" + $(this).find("name").text() + "</span>" +
                        "<span class='leftSide-class'>" + $(this).find("title").text() + "</span>" + "</div>";
            }
        });
    });
    document.getElementById("inField").innerHTML = content;
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
    if (document.getElementById("topicValue-id") === null || document.getElementById("user") === null) {
        window.alert("Topic or participant missing!");
        return null;
    }
    // group object with an arraylist of participants ->(workerlist tags).
    var xmlGroupObject = "<group><topic>" + topic + "</topic><workerList><id></id><name>" + readCookie('currentUser') + "</name><title></title></workerList>";
    $('#userPlacement-id').children('span').each(function () { // iterates through the selected workers
        xmlGroupObject += '<workerList><id></id><name>' + $(this).text() + '</name><title></title></workerList>';
    });
    xmlGroupObject += "</group>"; // adds end tag for the xml document.
//    window.alert(xmlGroupObject);
    var GroupXmlDoc = $.parseXML(xmlGroupObject);
    console.log("lol");
    $.ajax({
        url: baseUrl + "/resources/Conversations",
        data: GroupXmlDoc,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        success: function() {
         $("#main-id").load("topicslist.html");
         getConversations();   
        },
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
} // startConversation()

function startProfGroupConversation(receiverProfession) {
    var xmlProfConvDataObject = "<profConvData><topic></topic><professionGroup></professionGroup><postName>" + readCookie("currentUser") + "</postName></profConvData>";
    var ProfXmlDoc = $.parseXML(xmlProfConvDataObject);
    var $profXml = $(ProfXmlDoc);
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
    systemMessage(readCookie('currentUser') + " connected!");

    window.onbeforeunload = function () {
        systemMessage(readCookie('currentUser') + " disconnected!");
        if (!websocket) {

        } else if (websocket.readyState === websocket.CLOSED) {

        } else {
            websocket.close();
        }
    };

}//listParticipants(xml, status)

function onMessage(event) {
    var cid = document.getElementById("conversationID").innerHTML;
    if (event.data === cid) {
        loadMessages();

    }
} //onMessage

function onOpen(event) {
    //systemMessage(readCookie('currentUser') + " connected!");
}
function onClose(event) {
    //systemMessage(readCookie('currentUser') + " disconnected!");
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
    console.log(cid);
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
}// sendMessage function

function systemMessage(content) {
    var d = 1;
    var cid = document.getElementById("conversationID").innerHTML;
    console.log(cid);
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

function addUser() {
    var name = $("#workername").val();

    var groupID = $("#profession").val();
    var profession = "";
    switch (groupID) {
        case "1":
            profession = "Guard";
            break;
        case "2":
            profession = "Doctor";
            break;
        case "3":
            profession = "Psychotherapist";
            break;
        case "4":
            profession = "Nurse";
            break;
    }

    var userxml = "<worker> <groupID>" + groupID + "</groupID><name>" + name + "</name><title>" + profession + "</title></worker>";
    var userxmlobj = $.parseXML(userxml);
    //console.log(alertXmlDoc);

    $.ajax({
        url: baseUrl + "/resources/Workers/Newuser",
        data: userxmlobj,
        processData: false, //already xml doc!
        type: 'POST',
        contentType: 'application/xml',
        //dataType: 'application/xml',
        success: function () {
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
        },
        error: function (response) {
            alert("Error in adding the user: " + response.statusText);
        }
    }); // ajax
}


