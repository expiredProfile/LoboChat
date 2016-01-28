/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Message;
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
    
    /*
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Message getMessageXML(){
        for(Message m : system.getMessage().values()){
            
        }
        return ;
    }
    */
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void postMessage(String s){
        int id = system.getMessageIncrement();
        String name = "testUser";
        Message message = new Message(id, s, name);
        system.addMessage(message);
        id++;
        system.setMessageIncrement(id);
    }
    
    @Path("/{messageid}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Message getMessageIdXML(@PathParam("messageid") int messageid){
        return system.getMessageByID(messageid);
    }
}
