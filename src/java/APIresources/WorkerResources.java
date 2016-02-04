/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
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
@Path("/Workers")
public class WorkerResources {
    private static ChatSystem system;
    private WorkerPool pool;
    
    public WorkerResources(){
        this.system = ChatSystem.getInstance();
        this.pool = new WorkerPool();
    }
    
    //Change media type to TEXT_PLAIN?
    @POST
    //@Path("/LoggedIn")
    @Consumes(MediaType.TEXT_PLAIN)
    public boolean workerLogIn(String s){
        boolean state = false;
        for(Worker w : system.getLoggedOutList()){
            if(w.getName().equals(s)){
                system.getLoggedOutList().remove(w);
                system.getLoggedInList().add(w);
                system.setCurrentUser(w);
                state = true;
                break;
            } else {
                state = false;
            }
        }
        return state;
    }
    
    @POST
    @Path("/LoggedOut")
    @Consumes(MediaType.TEXT_PLAIN)
    public void workerLogOut(String s){
        for(Worker w : system.getLoggedInList()){
            if(w.getName().equals(s)){
                system.getLoggedInList().remove(w);
                system.getLoggedOutList().add(w);
            }
        }
    }
    
    
    //Add method to GET current user from client side to be used 
    //for messages to set the poster name and title
    
    @GET
    @Path("/LoggedOut")
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> getLoggedOutXML(){
        return system.getLoggedOutList();
    }
    
    
    
    @GET
    @Path("/LoggedIn")
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> getLoggedInXML(){
        return system.getLoggedInList();
    }

    /*
    @Path("/{workerid}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Workers getWorkersIdXML(@PathParam("workerid") int workerid){
        return system.getWorkerById(workerid);
    }
    */
}
