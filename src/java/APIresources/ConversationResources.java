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
@Path("/Conversations")
public class ConversationResources {

    private final ChatSystem system;

    public ConversationResources() {
        system = ChatSystem.getInstance();
    }

//    @POST
//    @Consumes(MediaType.APPLICATION_XML)
//    @Produces(MediaType.TEXT_PLAIN)
//    public int postConversation(Group g){
//        ArrayList<Worker> list = g.getWorkerList();
//        String topic = g.getTopic();
//        Conversation c = new Conversation(topic, list);
//        system.addConversation(c);
//        return c.getID();
//    }
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> postConversation(Group g) {
        ArrayList<Worker> list = g.getWorkerList();
        String topic = g.getTopic();
        String s = "";
        for (Worker w : list) {
            s += w.getName() + ", ";
        }
        System.out.println("new group: " + g.getTopic() + ", nimet; " + s);
        Conversation c = new Conversation(topic, list);
        System.out.println("new conversation: " + c.getTopic() + ", c-id: " + c.getID());
        system.addConversation(c);
        Message mes = new Message("New conversation: "+c.getTopic(), "System", c.getID());
        system.addMessageToConversation(c.getID(), mes);
        return g.getWorkerList();
    }

    @GET
    @Path("/{userName}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Conversation> postConversation(@PathParam("userName") String name) {
        System.out.println(name);
        return system.getConversations(name);
    }

    @GET
    @Path("/conversationID/{conversationID}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public Conversation getConversationById(@PathParam("conversationID") int id) {
//       system.getConversationByID(id).addMessage(new Message("kkk", "kkk2", 2));
       return system.getConversationByID(id);
    }
}
