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
import javax.ws.rs.GET;
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
         String s = "";
        for( Worker w : list){
            s += w.getName() + ", ";
        }
        System.out.println("new group: " + g.getTopic() + ", nimet; " + s);
        String topic = g.getTopic();
        
        Conversation c = new Conversation(topic, list);
        System.out.println("new conversation: " + c.getTopic() + ", c-id: " + c.getID());
        system.addConversation(c);
        return g.getWorkerList();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String exampleGroup() {
        return system.getConversation().get(0).getTopic() + " " + system.getConversation().get(0).getID();
    }

//    @GET
//    @Path("/kk")
//    @Produces(MediaType.APPLICATION_XML)
//    public Group adGroup() {
//        Group g = new Group("koklo");
//        g.getWorkerList().add(new Worker("nimi1", "Guard1"));
//        g.getWorkerList().add(new Worker("nimi2", "Guard2"));
//        return g;
//    }

}
