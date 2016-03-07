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
//Websocket endpoint for the main socket where users connect to when logging in. 
@ServerEndpoint("/mainsock")
public class MainSock {
    private static Set<Session> wses = Collections.synchronizedSet(new HashSet<Session>()); //Set variable for storing sessions.
    
    //When a connection is established, the session is stored into the set.
    @OnOpen
    public void onOpen(Session s) {
        wses.add(s);
    }
    
    //When a connection is closed, the session is removed from the set
    @OnClose
    public void onClose(Session s) {
        wses.remove(s);
    }
    
    //When the websocket receives a message, it checks if the string is a legitimate number
    // and sends it to all sessions if an exception is not catched. 
    @OnMessage
    public void onMessage(String alertID) {
        try {
            int aid = Integer.parseInt(alertID);
            messageAll(alertID);
        } catch (Exception e) {

        }
    }
    
    //Method that includes the iteration of the set for all sessions and sending a message to each session.
    public void messageAll(String ss) {
        for (Session s : wses) {
            try {
                s.getBasicRemote().sendText(ss);
            } catch (Exception e) {

            }
        }
    }
}
