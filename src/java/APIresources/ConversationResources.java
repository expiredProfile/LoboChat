/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Conversation;
import datafolder.Group;
import datafolder.Worker;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author kimmo
 */
@Path("/Conversations")
public class ConversationResources {
    private final ChatSystem system;
    
    public ConversationResources(){
        system = ChatSystem.getInstance();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_PLAIN)
    public int postConversation(Group g){
        ArrayList<Worker> list = g.getWorkerList();
        String topic = g.getTopic();
        Conversation c = new Conversation(topic, list);
        system.addConversation(c);
        return c.getID();
    }
}
