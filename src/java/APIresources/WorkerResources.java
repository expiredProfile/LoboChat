/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Workers;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
    
    /*
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Workers getWorkersXML(){
        String result = "";
        for(Workers w : system.getWorkers().values()){
            result += "< " + w.getTitle() + " : " + w.getName() + " : " + w.getId() + " >";
        }
        return result;
    }

    @Path("/{workerid}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Workers getWorkersIdXML(@PathParam("workerid") int workerid){
        return system.getWorkerById(workerid);
    }
    */
}
