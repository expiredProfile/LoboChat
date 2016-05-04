/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Conversation;
import datafolder.Group;
import datafolder.Message;
import datafolder.Worker;
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
// The class handles server requests related to conversations.
@Path("/Conversations")
public class ConversationResources {

    private final ChatSystem system;

    public ConversationResources() {
        system = ChatSystem.getInstance();
    }

    /**
     * This method creates and stores a new conversation. A Group object is sent
     * from the client-side which includes users involved and a topic for
     * the conversation. New Conversation object is created based on the
     * extracted information.
     */
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> postConversation(Group g) {
        ArrayList<Worker> list = g.getWorkerList();
        ArrayList<Worker> all = system.getAllWorkers();
        
        for (Worker w : list){
            String listName = w.getName();
            for (Worker wa : all){
                if (listName.equals(wa.getName())){
                   w.setTitle(wa.getTitle());
                }
            }
        }
        
        String topic = g.getTopic();
        Conversation c = new Conversation(topic, list);
        // System.out.println("new conversation: " + c.getTopic() + ", c-id: " + c.getID());
        system.addConversation(c);
        Message mes = new Message("New conversation: " + c.getTopic(), "System", c.getID());
        system.addMessageToConversation(c.getID(), mes);
        return g.getWorkerList();
    }

    // Returns list of conversations the user given as parameter is a part of. 
    @GET
    @Path("/{userName}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Conversation> postConversation(@PathParam("userName") String name) {
        System.out.println(name);
        return system.getConversations(name);
    }

    // Returns the conversation with the id given as parameter. 
    @GET
    @Path("/conversationID/{conversationID}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public Conversation getConversationById(@PathParam("conversationID") int id) {
        return system.getConversationByID(id);
    }
}
