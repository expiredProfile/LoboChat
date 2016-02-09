/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Message;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author kimmo
 */
@Path("/Messages")
public class MessageResources {

    private final ChatSystem system;

    public MessageResources() {
        this.system = ChatSystem.getInstance();
    }
    
    //send conversation id from server as plain text
    @GET
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Message> getMessageXML(String s) {
        int id = Integer.parseInt(s);
        return system.getConversationMessages(id);
    }
    
    //Send username from browser when sending a new message
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void postMessage(Message m) {
        int id = m.getConversationID();
        system.addMessageToConversation(id, m);     
    }
    
    /*
    @Path("/{messageid}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Message getMessageIdXML(@PathParam("messageid") int messageid) {
        return system.getMessageByID(messageid);
    }
    */
}
