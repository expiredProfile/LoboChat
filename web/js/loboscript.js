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
var profGroups = 0;
var userAm = 0;


var number = 0;
var check = true;
var dropdownlogin = "";
var dropdownlogout = "";

$(document).ready(function () {

    $(window).load(function () {
        var loc = window.location.href;
        if (loc === "http://localhost:8080/LoboChat/chaWin.html") {
            //window.onfocus = notifyOff;
            //chatScrollDown();
        }
    });

    $(window).load(function () {
        adjustStyle($(this).width());
        var location = window.location.href;
        if (location !== ("http://localhost:8080/LoboChat/")) {
            if (readCookie("currentUser") !== "") {
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
                    window.onfocus = refreshChats;
                }
            } else {
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

                window.location = baseUrl;
            }
        } else if (location === "http://localhost:8080/LoboChat/") {

            if (readCookie("currentUser") !== "") {
                logOut();
            }
        }
    });

// adjusts the style of the user interface upon resizing the window.
    $(window).resize(function () {
        adjustStyle($(this).width());
    });

    $(document).on("click", ".usersToAdd-class", function () {
        var text = $(this).text();
        $("#userPlacement-id").append("<span id='user" + number + "'>"
                + text + "<i class='fa fa-times userRemove'></i></span>");
        number++;
        userAm++;
        $(this).remove();
    });

    $(document).on("click", ".groupToAdd-class", function () {
        var text = $(this).text();
        $("#userPlacement-id").append("<span id='user" + number + "'>"
                + text + "<i class='fa fa-times groupRemove'></i></span>");
        number++;
        profGroups++;
        $(this).remove();
    });

    $(document).on("click", "#topicButton-id", function () {
        var text = $("input").val();
        $("#topic-id").html("<span id='topicValue-id'>" + text + "</span>");
    });

    $(document).on("click", ".userRemove", function () {
        var toRemove = $(this).parent("span");
        $(toRemove).remove();
        $("#myDropdown").append("<p class='usersToAdd-class'>" + toRemove.text() + "</p>");
        userAm--;
    });

    $(document).on("click", ".groupRemove", function () {
        var toRemove = $(this).parent("span");
        $(toRemove).remove();
        $("#myGroupDropdown").append("<p class='groupToAdd-class'>" + toRemove.text() + "</p>");
        profGroups--;
    });

    $("#loginButton").click(function () {
        //Case insensitive login
        //(same code on index page if user presses enter instead of button
        var workerNameInput = $('#inputField-id').val();
        workerName = capitalize(workerNameInput);
        logIn();
        // window.location = baseUrl + "/userlists.html";
    });

    // Loads and displays the online and offline users.
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
    });

// Loads the interface used to create new conversations. 
    $("#createConversation-id").click(function () {
        $("#main-id").load("createConversation.html", function () {
            if (check === true) {
                ajaxGet();
                check = false;
            }
            $("#myDropdown").append(dropdownlogin);
            $("#myDropdown").append(dropdownlogout);
        });
    });

    // Logs out the current user.
    $("#logOutButton").click(function () {
        logOut();
        //window.location = baseUrl;
    });

    // Loads and displays the interface used in creating new alerts and viewing the alert history.
    $("#alertsButton-id").click(function () {
        $("#main-id").load("alert.html");
    });

    $("#addnewuser").click(function () {
        addUser();
    });

    //Send alert
    $(document).on("click", "#sendAlertButton", function () {
        //Empty old responses from divs
        $("#alertResponse").empty();
        $("#alertHistory").empty();
        //Get user input
        var alertCat = $("#alert").val(); //Alert category dropdown
        var recGroup = $('input[name="receiverGroup"]:checked').val(); //Receiver group radio
        var sender = readCookie("currentUser"); //Read current user from cookie (alert sender)
        //Print for test purposes and confirmation
        alert("Send alert? alertCat: " + alertCat + ", recGroup: " + recGroup);
        //Xml object
        var xmlAlertObject = "<alert><alertCat>" + alertCat + "</alertCat><receiverGroup>" + recGroup + "</receiverGroup><postName>" + sender + "</postName></alert>";
        var alertXmlDoc = $.parseXML(xmlAlertObject);

        $.ajax({
            url: baseUrl + "/resources/Alerts",
            data: alertXmlDoc,
            processData: false, //already xml doc!
            type: 'POST',
            contentType: 'application/xml',
            dataType: 'text',
            success: function (data) {
                mainsocket.send(data);
                $("#alertResponse").append("<p id='alertSent-id'>Alert sent!</p>");
            },
            error: function (response) {
                alert("Error in alert: " + response.statusText);
            }
        }); // ajax
    }); // sendAlert

    //Get alert history
    $(document).on("click", "#alertHistoryButton", function () {
        //Empty old responses from divs
        $("#alertResponse").empty();
        $("#alertHistory").empty();
        //Get user input
        var range = $("#alertHistoryRange").val();

        $.ajax({
            url: baseUrl + "/resources/Alerts/Alerthistory/" + range,
            type: 'GET',
            contentType: 'text/plain',
            dataType: 'xml',
            success: function (data) {
                //Test print to log
                //var xmlStringAlert = (new XMLSerializer()).serializeToString(data);
                //console.log(xmlStringAlert);
                //Display alert history
                var i;
                var table = "<tr><th>Alert topic</th><th>Timestamp</th><th>Sender</th><th>Target group</th></tr>";
                var alerts = data.getElementsByTagName("alert");
                for (i = 0; i < alerts.length; i++) {
                    table += "<tr><td>" +
                            alerts[i].getElementsByTagName("alertTopic")[0].childNodes[0].nodeValue +
                            "</td><td>" +
                            alerts[i].getElementsByTagName("currentTime")[0].childNodes[0].nodeValue +
                            "</td><td>" +
                            alerts[i].getElementsByTagName("postName")[0].childNodes[0].nodeValue +
                            "</td><td>" +
                            alerts[i].getElementsByTagName("receiverGroup")[0].childNodes[0].nodeValue +
                            "</td></tr>";
                }
                $("#alertHistory").append(table);
            },
            error: function (response) {
                alert("Error in get alert history: " + response.statusText);
            }
        }); // ajax
    }); // sendAlert

// Loads and displays conversations the current user is a part of.
    $("#topicsButton-id").click(function () {
        $("#main-id").load("topicslist.html");
        getConversations();
    });

// Creates a new conversation.
    $(document).on("click", "#createButton-id", function () {
        startConversation();
//        $("#main-id").load("topicslist.html");
//        getConversations();
    });

// Creates a new group conversation.
    $(document).on("click", "#createGroupConvButton-id", function () {
        startProfGroupConversation();
    });

}); // $(document).ready


//Functions

function capitalize(string) {
    //console.log("String to capitalize: " + string);
    var capString = string.charAt(0).toUpperCase() + string.slice(1);
    //console.log("Capitalized: " + capString);
    return capString;
}

// The view on chat window (chaWin.html) scrolls down as new messages are sent.
function chatScrollDown() {
    var element = document.getElementById("chatArea");
    element.scrollTop = element.scrollHeight;
}

function refreshChats() {
    if (document.getElementById("topicsDiv-id") !== null) {
        getConversations();
    }
}

function ajaxGet() {
    $("#myDropdown").empty();
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
    console.log(event.data);
    if (event.data !== "0") {
        $.ajax({
            url: baseUrl + "/resources/Alerts/" + event.data,
            type: 'GET',
            dataType: 'xml',
            success: handleAlert,
            error: function (response) {
                alert("Error in handleAlert: " + response.statusText);
            }
        });
    } else if (document.getElementById("inField") !== null && document.getElementById("outField") !== null) {
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
    }
}//onMessage

function handleAlert(xml, status) {
    //Test print to log
    //var xmlString = (new XMLSerializer()).serializeToString(xml);
    //console.log(xmlString);

    var $xml = $(xml);
    var target = $xml.find('receiverGroup').text();
    var topic = $xml.find('alertTopic').text();
    groupID = readCookie('groupID');
    //Shows the alert for the user if target group matches
    if (target === "0") {
        alert("Alert: " + topic);
    } else if (target === groupID) {
        alert("Alert: " + topic + ", groupID: " + groupID);
    } else {
        //Test alert
        //alert("Alert not for you");
    }
}

function onOpenMain(event) {
    console.log("Connected to mainsocket.");
    mainsocket.send(0);
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
    });

    cid = $xml.find('conversationID').text();
    var target = "messageField" + cid + "-id";

    if (document.getElementById(target) !== null) {
        document.getElementById(target).innerHTML = content;
    } else {
    }
}// listMessage

function logIn() {
    // Retrieves the users currently logged.
    $.ajax({
        url: baseUrl + "/resources/Workers/LoggedOut",
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: function (data) {
            var $xml = $(data);
            var showError = true;
            // Compares the provided login information against the users logged out.
            $xml.find('workers').each(function () {
                $xml.find('worker').each(function () {
                    // Informs the server that this user has succesfully logged in.
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
                                writeCookie('groupID', data, 3);
                                window.location = baseUrl + "/mainpage.html";
                            },
                            error: function (response) {
                                alert(response.statusText + " wn: " + workerName);
                            }
                        });//ajax
                    }
                    // User logged in as an admin. Admin page (adminpage.html) is loaded.
                    if (workerName === "Admin") {
                        showError = false;
                        writeCookie('currentUser', "Admin", 3);
                        window.location = baseUrl + "/adminpage.html";
                    }
                });
                // User did not provide valid login information.
                if (showError === true) {
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
    // The cookie of current user is deleted.
    writeCookie('currentUser', workerName, -1);
    if (!mainsocket) {

    } else if (mainsocket.readyState === mainsocket.CLOSED) {

    } else {
        mainsocket.send(0);
        mainsocket.close();
    }

    if (!websocket) {

    } else if (websocket.readyState === websocket.CLOSED) {

    } else {
        websocket.close();
    }
// The server is informed that user has logged out succesfully.
    $.ajax({
        url: baseUrl + "/resources/Workers/LoggedOut",
        data: currentUser,
        type: 'POST',
        contentType: 'text/plain',
        //success: alert('Logged Out'),
        success: function () {
            writeCookie('currentUser', workerName, -3);
            window.location = baseUrl;
        },
        error: function (response) {
            alert('Error ' + response.statusText);
        }
    });
} // logOut

function loggedOut(xml, status) {
    var xmlString = (new XMLSerializer()).serializeToString(xml);
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
    var xmlString = (new XMLSerializer()).serializeToString(xml);
    var $xml = $(xml);
    var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            var wname = $(this).find("name").text();
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
    xmlString = (new XMLSerializer()).serializeToString(xml);
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
    xmlString = (new XMLSerializer()).serializeToString(xml);
    var $xml = $(xml);
    //var content = "";
    $xml.find('workers').each(function () {
        $xml.find('worker').each(function () {
            var wname = $(this).find("name").text();
            if (wname !== readCookie('currentUser')) {
                dropdownlogin += "<p class='usersToAdd-class'>" + $(this).find("name").text() + "</p>";
            }
        });
    });
    //document.getElementById("dropDownMenu").innerHTML = content;
}

// Opens a new chat window for a conversation.
function openChat(id) {
    var url = baseUrl + "/chaWin.html";
    //chatParticipantId = id;
    sessionStorage.setItem("cid", id);
    window.open(url);
}

// Creates a cookie to identify the user and maintain the session.
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

// Adjusts the style of the interface based on the screen width.
function adjustStyle(width) {
    width = parseInt(width);
    if (width < 500) {
        $("#size-stylesheet").attr("href", "css/narrow.css");
    } else if (width < 900) {
        $("#size-stylesheet").attr("href", "css/medium.css");
    } else {
        $("#size-stylesheet").attr("href", "css/wide.css");
    }
}

// Checks that the user has provided valid information for the new conversation.
// Creates the new conversation.
function startConversation() {
    var topic = $('#topic-id').text();
    var num = 0;
    if (topic === "") {
        window.alert("Topic missing!");
        return null;
    } else if (topic.length > 20) {
        $('#topicInput-id').val("");
        window.alert("Max topic length is 20 characters!");
        return null;
    }
    $('#userPlacement-id').children('span').each(function () {
        num++;
    });

    if (num === 0) {
        window.alert("Participant missing!");
        return null;
    }

    if (profGroups !== 0) {
        window.alert("Please choose only users!");
        return null;
    }
    // Creates a group object with an arraylist of participants (workerlist).
    var xmlGroupObject = "<group><topic>" + topic + "</topic><workerList><id></id><name>" + readCookie('currentUser') + "</name><title></title></workerList>";
    $('#userPlacement-id').children('span').each(function () { // iterates through the selected workers
        xmlGroupObject += '<workerList><id></id><name>' + $(this).text() + '</name><title></title></workerList>';
    });
    xmlGroupObject += "</group>"; // adds an end tag for the xml document.
    var GroupXmlDoc = $.parseXML(xmlGroupObject);
    // Sends the group object to the server.
    $.ajax({
        url: baseUrl + "/resources/Conversations",
        data: GroupXmlDoc,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        success: function () {
            profGroups = 0;
            userAm = 0;
            $("#main-id").load("topicslist.html");
            getConversations();
        },
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
} // startConversation()

// Checks that the user has provided valid information for the new profession group conversation.
// Creates the new profession group conversation.
function startProfGroupConversation() {
    var topic = $('#topic-id').text();
    if (topic.length === 0) {
        window.alert("Topic missing!");
        return null;
    } else if (topic.length > 20) {
        window.alert("Topic too long!");
        return null;
    }
    var num = 0;
    $('#userPlacement-id').children('span').each(function () {
        num++;
    });

    if (num === 0) {
        window.alert("Participant missing!");
        return null;
    }

    if (profGroups !== 1 || userAm !== 0) {
        window.alert("Please choose only one group!");
        return null;
    }
    // Creates a ProfConvData object and sends it to server.
    var targetGroup = $('#userPlacement-id').children('span').text();
    var xmlProfConvDataObject = "<profConvData><postName>" + readCookie('currentUser') + "</postName><profGroup>" + targetGroup + "</profGroup><topic>" + topic + "</topic></profConvData>";
    var ProfXmlDoc = $.parseXML(xmlProfConvDataObject);
    $.ajax({
        url: baseUrl + "/resources/ProfessionConversations",
        data: ProfXmlDoc,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        dataType: 'xml', // datatype received
        success: function () {
            profGroups = 0;
            $("#main-id").load("topicslist.html");
            getConversations();
        },
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
} // startProfGroupConversation function

// Loads the conversations of the current user.
function getConversations() {
    var user = readCookie('currentUser');
    $.ajax({
        url: baseUrl + "/resources/Conversations/" + user,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listConversations, // Displays the conversations.
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
} // getConversations

// Processes XML to create and display a list of users.
function listConversations(xml, status) {
    var $xml = $(xml);
    var content = "";
    $xml.find('conversations').each(function () {
        $xml.find('conversation').each(function () {
            var conversationID = $(this).find("ID").text();
            content += "<div class='onlines'><button onclick='openChat(\"" + conversationID + "\")'\n\
             value='" + $(this).find("topic").text() + "'> "
                    + "<p id='topicField-id'>" + $(this).find("topic").text()
                    + "<span id='topicIDField-id'>" + $(this).find("ID").text() + "</span></p>"
                    + "<div id='messageWrap-id'><p class='messageField-class' id='messageField" + conversationID + "-id'>"
                    + loadLatest(conversationID) + "</p></div>" + "</button><hr></div><br>";
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
    var $xml = $(xml);
    var content = "";
    var messages = "";
    var topic = $xml.find('topic').text();
    var cid = $xml.find('ID').text();

    $xml.find('memberList').each(function () {
        var memberName = $(this).find("name").text();
        content += "<p id='memberName-id'>" + memberName + "</p>";
    });

    var currentUser = readCookie('currentUser');

    $xml.find('message').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        var timeStamp = $(this).find("shortTime").text();
        if (postName === currentUser) {
            messages += "<div class='currentMessageDiv-class'><span id='userTimeStamp-id'>" + timeStamp
                    + "</span>" + "<span class='currentMessage-class'>" + msgs + "</span></div>";
        } else {
            messages += "<div class='messageDiv-class'><span class='chatPostName-class'>" + postName
                    + "</span><br>" + "<span class='chatMessage-class'>" + msgs + "</span>"
                    + "<span id='timeStamp-id'>" + timeStamp + "</span></div>";
        }
    });

    document.getElementById("participants").innerHTML = content;
    document.getElementById("chatArea").innerHTML = messages;
    document.getElementById("conversationID").innerHTML = cid;
    document.getElementById("topic-banner").innerHTML = topic;
    loadMessages();

    /*  systemMessage(readCookie('currentUser') + " connected!");
     
     systemMessage(readCookie('currentUser') + " connected!");
     
     
     window.onbeforeunload = function () {
     //systemMessage(readCookie('currentUser') + " disconnected!");
     if (!websocket) {
     
     } else if (websocket.readyState === websocket.CLOSED) {
     
     } else {
     websocket.close();
     }
     };*/

}//listParticipants(xml, status)
function notifyOn() {
    document.title = "New message!";
}

function notifyOff() {
    document.title = "Lobo Chat";
}

function onMessage(event) {
    var cid = document.getElementById("conversationID").innerHTML;
    if (event.data === cid) {
        loadMessages();
        //notifyOn();

    }
} //onMessage

function onOpen(event) {
    //systemMessage(readCookie('currentUser') + " connected!");
}
function onClose(event) {
    //systemMessage(readCookie('currentUser') + " disconnected!");
}

// Loads messages of a conversation based on its id. 
function loadMessages() {
    var cid = document.getElementById("conversationID").innerHTML;
    $.ajax({
        url: baseUrl + "/resources/Messages/" + cid,
        type: 'GET',
        contentType: 'text/plain',
        dataType: 'xml',
        success: listMessages, // processes and displays the messages.
        error: function (response) {
            alert(response.statusText + " wn: " + workerName);
        }
    });
}//loadMessages()

// Process XML to display messages of a conversation.
function listMessages(xml, status) {
    var $xml = $(xml);
    var content = "";
    var currentUser = readCookie('currentUser');
    var postName = "";
    $xml.find('message').each(function () {
        postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        var timeStamp = $(this).find("shortTime").text();
        if (postName === currentUser) {
            content += "<div class='currentMessageDiv-class'><span id='userTimeStamp-id'>" + timeStamp
                    + "</span>" + "<span class='currentMessage-class'>" + msgs + "</span></div>";
        } else {
            content += "<div class='messageDiv-class'><span class='chatPostName-class'>" + postName
                    + "</span><br>" + "<span class='chatMessage-class'>" + msgs + "</span>"
                    + "<span id='timeStamp-id'>" + timeStamp + "</span></div>";
        }
    });
    document.getElementById("chatArea").innerHTML = content;
    chatScrollDown();
} // listMessages

function sendMessage() {
    // Creates a new Message object and sends it to the server.
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
            + " <currentTime>" + dd + "</currentTime>"
            + "<postName>" + sender + "</postName></message> ";
    var messageXml = $.parseXML(messageObject);
    $.ajax({
        url: baseUrl + "/resources/Messages",
        data: messageXml,
        processData: false,
        type: 'POST',
        contentType: 'application/xml', // datatype sent
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
    $("#inputField").val("");
    // Sends notification through the websocket.
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

// Used on adminpage.html to register new uses.
function addUser() {
    var name = capitalize($("#workername").val());

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
    // Send the new worker object to the server and refresh the userlist. 
    $.ajax({
        url: baseUrl + "/resources/Workers/Newuser",
        data: userxmlobj,
        processData: false, //already xml doc!
        type: 'POST',
        contentType: 'application/xml',
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
