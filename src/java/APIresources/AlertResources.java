/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Alert;
import datafolder.TitleData;
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
    private AlertData alertData;
    private TitleData titleData;
    
    public AlertResources() {
        this.system = ChatSystem.getInstance();
        this.alertData = new AlertData();
        this.titleData = new TitleData();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    //@Produces(MediaType.TEXT_PLAIN)
    public void postAlert(Alert a){
        //Test print
        String alertCat = a.getAlertCat();
        String recGroup = a.getReceiverGroup();
        String user = a.getPostName();
        System.out.println("alertCat: " + alertCat + ", recGroup: " + recGroup + ", postName: " + user);
        //Add id and timestamp test
        a.setID();
        a.setCurrentTime();
        //Test print
        int id = a.getID();
        String time = a.getCurrentTime();
        System.out.println("id: " + id + ", time: " + time);
        //Add alert to history
        system.addAlert(a);
        //Notify test
        for(Worker w : system.getLoggedInList()) {
            System.out.println("Notifying group " + recGroup);
            w.receiveAlert(); //Notify about alert
        }
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public Alert getAlertXML(int alertId){
        Alert alert = system.getAlertByID(alertId);
        return alert;
    }
}