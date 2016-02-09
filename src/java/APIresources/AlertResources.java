/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Alert;
import datafolder.Worker;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
    @Consumes(MediaType.TEXT_PLAIN)
    public void postAlert(Alert a){
        for(Worker w : system.getLoggedInList()) {
            if(w.getTitle().equals()) {
                w.receiveAlert();
            }
        }
        //Alert alert = new Alert(id, alertCat, name);
        //system.addAlert(alert);
    }
    
    @GET
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public Alert getAlertXML(int alertId){
        Alert alert = system.getAlertByID(alertId);
        return alert;
    }
}