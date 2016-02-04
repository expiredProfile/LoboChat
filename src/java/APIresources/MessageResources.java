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
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Message> getMessageXML() {
        ArrayList<Message> list = new ArrayList<>();
        for (int i = 0; i < system.getMessage().size(); i++) {
            list.add(system.getMessageByID(i));
        }
        return list;
    }
    
    //Send username from browser when sending a new message
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void postMessage(String s) {
        int id = system.getMessageIncrement();
        String name = system.getCurrentUser().getName();
        String title = system.getCurrentUser().getTitle();
        Message message = new Message(id, s, title, name);
        system.addMessage(message);
    }
    //Simple version that does not require worker class interaction
    
    /*
    @POST
    @Consumes("text/plain")
    public void postMessageXml(String s) {
        int id = system.getMessageIncrement();
        String name = "testUser";
        String title = "title";
        Message message = new Message(id, s, title, name);
        system.addMessage(message);
    }
    */
    
    @Path("/{messageid}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Message getMessageIdXML(@PathParam("messageid") int messageid) {
        return system.getMessageByID(messageid);
    }

}
