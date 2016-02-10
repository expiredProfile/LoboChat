/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Hege
 */
@ServerEndpoint("/chatend")
public class ServerEnd {
    private static Set<Session> wses = Collections.synchronizedSet(new HashSet<Session>());
    private ChatSystem sys = ChatSystem.getInstance();
    
    @OnOpen
    public void onOpen(Session s){
       wses.add(s);
       
    }
    
    @OnClose
    public void onClose(Session s){
        wses.remove(s);
    }
    
    @OnMessage
    public void onMessage(String msg){
        for (Session s : wses){
           
        }
    }


}
