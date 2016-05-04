/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.IDIncrement;
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
//  The class handles server requests related to messages.
@Path("/Messages")
public class MessageResources {

    private final ChatSystem system;
    private String newMessage;
    private final IDIncrement idi;

    public MessageResources() {
        this.system = ChatSystem.getInstance();
        this.idi = IDIncrement.getInstance();
    }

    // Sends conversation id from server as plain text.
    @GET
    @Path("/{id}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Message> getMessageXML(@PathParam("id") String s) {
        int id = Integer.parseInt(s);
        return system.getConversationMessages(id);
    }

    // Returns the latest message from the converation with the id given as parameter.
    @GET
    @Path("/latest/{id}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public Message getLatest(@PathParam("id") String id) {
        int intid = Integer.parseInt(id);
        int latest = system.getConversationMessages(intid).size() - 1;
        Message m = system.getConversationMessages(intid).get(latest);
        return m;
    }

    // Sends a username from client-side when a user is sending a new message.
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void postMessage(Message m) {
        int id = m.getConversationID();
        m.setCurrentTime();
        m.setShortTime();
        m.setMessageID(idi.messageIncrement());
        system.addMessageToConversation(id, m);
    }

}
