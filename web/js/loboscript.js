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
                window.location = baseUrl + "/mainpage.html";
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
    
    $(document).on("click", ".groupToAdd-class", function () {
        console.log("Test");
        var text = $(this).text();
        console.log("text to place: " + text);
        $("#userPlacement-id").append("<span id='user" + number + "'>"
                + text + "<i class='fa fa-times groupRemove'></i></span>");
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
    
    $(document).on("click", ".groupRemove", function () {
        var toRemove = $(this).parent("span");
        $(toRemove).remove();
        console.log("toRemove: " + toRemove.text());
        $("#myGroupDropdown").append("<p class='groupToAdd-class'>" + toRemove.text() + "</p>");
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
        $("#alertResponse").empty();
        $("#alertHistory").empty();
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
                console.log("success alert");
                mainsocket.send(data);
                //$("#alertResponse").append("<p id='alertSent-id'>Alert sent!</p>");
            },
            error: function (response) {
                alert("Error in alert: " + response.statusText);
            }
        }); // ajax
    }); // sendAlert

    $(document).on("click", "#alertHistoryButton", function () {
        $("#alertResponse").empty();
        $("#alertHistory").empty();
        console.log("Getting alert history");
        var range = $("#alertHistoryRange").val();

        $.ajax({
            url: baseUrl + "/resources/Alerts/Alerthistory/" + range,
            type: 'GET',
            contentType: 'text/plain',
            dataType: 'xml',
            success: function (data) {
                //Test print to log
                var xmlStringAlert = (new XMLSerializer()).serializeToString(data);
                console.log("Alert history: " + xmlStringAlert);
                //Display alert history
                var i;
                var table = "<tr><th>Alert topic</th><th>Timestamp</th><th>Sender</th><th>Target group</th></tr>";
                var alerts = data.getElementsByTagName("alert");
                for (i = 0; i < alerts.length; i++) {
                    table += "<tr><td>" +
                            /*
                            alerts[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
                            "</td><td>" +
                            alerts[i].getElementsByTagName("alertCat")[0].childNodes[0].nodeValue +
                            "</td><td>" +*/
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

    $("#topicsButton-id").click(function () {
        $("#main-id").load("topicslist.html");
        getConversations();
    });

    $(document).on("click", "#createButton-id", function () {
        startConversation();
//        $("#main-id").load("topicslist.html");
//        getConversations();
    });

    $(document).on("click", "#createGroupConvButton-id", function () {
        startProfGroupConversation();
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
    //Test print to log
    var xmlString = (new XMLSerializer()).serializeToString(xml);
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
                        writeCookie('currentUser', "Admin", 3);
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
    writeCookie('currentUser', workerName, -1);
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
    var num = 0;
    console.log(topic);
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
        success: function () {
            $("#main-id").load("topicslist.html");
            getConversations();
        },
        error: function (response) {
            console.log("Error: " + response.statusText);
        }//error
    }); // ajax
} // startConversation()

function startProfGroupConversation() {
    var topic = $('#topic-id').text();
    if (topic.length === 0) {
        window.alert("Topic missing!");
        return null;
    } else if (topic.length > 25){
        window.alert("Topic too long!");
        return null;
    }
    var targetGroup = $('#userPlacement-id').children('span').text();
    console.log("Target group: " + targetGroup);
    var xmlProfConvDataObject = "<profConvData><postName>"+readCookie('currentUser')+"</postName><profGroup>"+targetGroup+"</profGroup><topic>"+topic+"</topic></profConvData>";
    var ProfXmlDoc = $.parseXML(xmlProfConvDataObject);
    $.ajax({
        url: baseUrl + "/resources/ProfessionConversations",
        data: ProfXmlDoc,
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
        content += "<p id='memberName-id'>" + memberName + "</p>";
    });

    var currentUser = readCookie('currentUser');

    $xml.find('message').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        var timeStamp = $(this).find("shortTime").text();
        console.log("user: " + currentUser + " postName: " + postName);
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
    console.log(xml);
    var content = "";
    var currentUser = readCookie('currentUser');
    $xml.find('message').each(function () {
        var postName = $(this).find("postName").text();
        var msgs = $(this).find("content").text();
        var timeStamp = $(this).find("shortTime").text();
        console.log(postName + " and " + msgs);
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
    $("#inputField").val("");
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


