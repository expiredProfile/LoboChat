/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Alert;
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
@Path("/Alerts")
public class AlertResources {
    private final ChatSystem system;
    private AlertData data;
    
    public AlertResources() {
        this.system = ChatSystem.getInstance();
        this.data = new AlertData();
    }
    
    @POST
    //how this gets alertcategory (string in js)?
    @Consumes(MediaType.APPLICATION_XML)
    public void postAlert(int alertCat){
        int id = system.getAlertIncrement();
        String name = "testUser";
        Alert alert = new Alert(id, alertCat, name);
        system.addAlert(alert);
        id++;
        system.setAlertIncrement(id);
    }
    
    @Path("/{alertid}")
    @GET
    //Get alert info and return plain text?
    @Produces(MediaType.APPLICATION_XML)
    public String getAlertIdXML(@PathParam("alertid") int alertid){
        Alert alert = system.getAlertByID(alertid);
        String info = data.getAlertInfo(alert);
        return info;
    }
}