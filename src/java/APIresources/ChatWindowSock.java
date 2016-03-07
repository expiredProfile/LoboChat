/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.PathParam;

/**
 *
 * @author Hege
 */
//Websocket endpoint for chat websocket where users connect to when opening a chat.
@ServerEndpoint("/chatend")
public class ChatWindowSock {
    private static Set<Session> wses = Collections.synchronizedSet(new HashSet<Session>()); //Set variable for sessions
    
    //When a connection is made, the session is added to the set.
    @OnOpen
    public void onOpen(Session s) {
        wses.add(s);
    }
    
    //When a connection is closed, the session is removed from the set.
    @OnClose
    public void onClose(Session s) {
        wses.remove(s);
    }
    
    //When the socket receives a message, it sends the content to all contained sessions 
    @OnMessage
    public void onMessage(String conversationID) {
        for (Session s : wses) {
            try {
                s.getBasicRemote().sendText(conversationID);
            } catch (Exception e) {

            }
        }
    }
}
