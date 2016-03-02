/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Alert;
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
@Path("/Alerts")
public class AlertResources {
    private final ChatSystem system;
    private AlertData alertData;
    
    public AlertResources() {
        this.system = ChatSystem.getInstance();
        this.alertData = new AlertData();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_PLAIN)
    public String postAlert(Alert a){
        //Test print
        int alertCat = a.getAlertCat();
        int recGroup = a.getReceiverGroup();
        String user = a.getPostName();
        System.out.println("alertCat: " + alertCat + ", recGroup: " + recGroup + ", postName: " + user);
        //Add topic, id and timestamp
        a.setAlertTopic(alertData.getAlertInfo(alertCat));
        a.setID();
        a.setCurrentTime();
        //Test print
        int id = a.getID();
        String time = a.getCurrentTime();
        System.out.println("id: " + id + ", time: " + time);
        //Add alert to history
        system.addAlert(a);
        return Integer.toString(id);
    }
    
    @GET
    @Path("/{alertid}")
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public Alert getAlertXML(@PathParam("alertid") String alertID){
        int id = Integer.parseInt(alertID);
        Alert alert = system.getAlertByID(id);
        return alert;
    }
    //TODO Get only recent alerts
    @GET
    @Path("/Alerthistory/{range}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_XML)
    public ArrayList<Alert> getAlertHistory(@PathParam("range") int range) {
        //int historyRange = Integer.parseInt(range);
        return system.getAlertHistory(range);
    }
}