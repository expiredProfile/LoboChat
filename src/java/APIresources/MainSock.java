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
//@ServerEndpoint("/chatend/{conv}")
@ServerEndpoint("/mainsock")
public class MainSock {

    private static Set<Session> wses = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(Session s) {
        wses.add(s);
        // s.getUserProperties().put("conv", conv);

    }
//    public void onOpen(Session s, @PathParam("conv") String conv){

    @OnClose
    public void onClose(Session s) {
//        s.getUserProperties().remove("conv");
        wses.remove(s);

    }

    @OnMessage
    public void onMessage(String alertID) {

        try {
            int aid = Integer.parseInt(alertID);

            messageAll(alertID);

        } catch (Exception e) {

        }

    }

    public void messageAll(String ss) {
        for (Session s : wses) {
            try {
                s.getBasicRemote().sendText(ss);
            } catch (Exception e) {

            }
        }
    }

}
