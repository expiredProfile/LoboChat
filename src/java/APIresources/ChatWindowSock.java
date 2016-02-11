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
public class ChatWindowSock {
    private static Set<Session> wses = Collections.synchronizedSet(new HashSet<Session>());
    
    
    @OnOpen
    public void onOpen(Session s){
       wses.add(s);
       messageAll("Online man.");
       
    }
    
    @OnClose
    public void onClose(Session s){
        wses.remove(s);
        messageAll("Offline man.");
    }
    
    @OnMessage
    public void onMessage(){
        for (Session s : wses){
            try{
                s.getBasicRemote().sendText("true");
            } catch (Exception e){
                
            }
        }
    }
    
    
    public void messageAll(String ss){
        for (Session s : wses){
            try {
                s.getBasicRemote().sendText(ss);
            } catch (Exception e) {
                
            }
        }
    }
    
    


}
