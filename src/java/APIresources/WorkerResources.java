/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.IDIncrement;
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

//Handles login, logout and user adding requests
@Path("/Workers")
public class WorkerResources {

    private static ChatSystem system; //The variable for the ChatSystem singleton
    private WorkerPool pool; //The variable for the WorkerPool singleton
    
    //Constructor only assigns the singletons to the defined variables
    public WorkerResources() {
        this.system = ChatSystem.getInstance();
        this.pool = WorkerPool.getInstance();
    }
    
    //Move the given user from logout list to login list
    @POST
    //@Path("/LoggedIn")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public String workerLogIn(String s) {
        Worker temp = null;
        //Iterate through logout list to check all the workers and their names
        for (Worker w : system.getLoggedOutList()) {
            if (w.getName().equals(s)) {
                system.getLoggedInList().add(w);
                system.getLoggedOutList().remove(w);
                temp = w;
                break;
            }
        }
        
        //If the user was found, the group ID of the user is returned.
        if (temp != null){
            return Integer.toString(temp.getGroupID());
        } else {
            return "0";
        }  
    }
    
    //Move the given user from login list to logout list
    @POST
    @Path("/LoggedOut")
    @Consumes(MediaType.TEXT_PLAIN)
    public void workerLogOut(String s) {
        for (Worker w : system.getLoggedInList()) {
            if (w.getName().equals(s)) {
                system.getLoggedInList().remove(w);
                system.getLoggedOutList().add(w);
                break;
            }
        }
    }

    //GET method that returns the logout list
    
    @GET
    @Path("/All")
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> getAllXml() {
        return system.getAllWorkers();
    }
    
    @GET
    @Path("/LoggedOut")
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> getLoggedOutXML() {
        return system.getLoggedOutList();
    }
    
    //GET method that returns the login list
    @GET
    @Path("/LoggedIn")
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Worker> getLoggedInXML() {
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
    
    //POST method for adding a new user
    @POST
    @Path("/Newuser")
    @Consumes(MediaType.APPLICATION_XML)
    //@Produces(MediaType.APPLICATION_XML)
    public void newUser(Worker w){
        //The worker is sent from the client as an XML object
        IDIncrement idi = IDIncrement.getInstance();
        WorkerPool wp = WorkerPool.getInstance();
        //An ID is assigned to the worker object
        w.setId(idi.workerIncrement());
        //The newly created worker is then stored into the correct lists.
        system.addToAllWorkers(w);
        system.workerLoggedOut(w);
        switch(w.getGroupID()){
            case 1: wp.addGuard(w);
                    break;
            case 2: wp.addDoctor(w);
                    break;
            case 3: wp.addPsycho(w);
                    break;
            case 4: wp.addNurse(w);
                    break;
        }
        
        //return system.getAllWorkers();
    }
}
