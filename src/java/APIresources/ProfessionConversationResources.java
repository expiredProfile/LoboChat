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
import datafolder.ProfConvData;
import datafolder.ProfessionGroup;
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
 * @author Kasper
 */
@Path("/ProfessionConversations")
public class ProfessionConversationResources {
    private final ChatSystem system;
    private WorkerPool pool;
    
    public ProfessionConversationResources() {
        system = ChatSystem.getInstance();
        pool = WorkerPool.getInstance();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> postConversation(ProfConvData pcd) {
        //Get data
        String topic = pcd.getTopic();
        System.out.println("topic:" + topic);
        String targetGroup = pcd.getProfGroup();
        ProfessionGroup profGroup = pool.getProfessionGroup(targetGroup);
        String postName = pcd.getPostName();
        //Get workers in target group as arraylist
        ArrayList<Worker> workersInProfGroup = new ArrayList();
        for(Worker w : profGroup.getWorkersByProf()){
            workersInProfGroup.add(w);
        }
        //Add also current user to be part of conversation
        
        for (Worker w : system.getAllWorkers()) {
            if (w.getName().equals(postName)) {
                if (workersInProfGroup.contains(w) == false) {
                    workersInProfGroup.add(w);
                }
            }
        }// for
        //Add all from profession and current user to new group object
        Group profConvGroup = new Group();
        profConvGroup.setWorkerList(workersInProfGroup);
        //Add list of workers in conversation to variable
        ArrayList<Worker> workerList = profConvGroup.getWorkerList();
        String names = "";
        for (Worker w : workerList) {
            names += w.getName() + ", ";
        }
        System.out.println("new group: " + topic + ", names: " + names);
        Conversation c = new Conversation(topic, workerList);
        System.out.println("new conversation: " + c.getTopic() + ", c-id: " + c.getID());
        system.addConversation(c);
        Message mes = new Message("New conversation: "+c.getTopic(), "System", c.getID());
        system.addMessageToConversation(c.getID(), mes);
        return workerList;
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
       return system.getConversationByID(id);
    }
}
