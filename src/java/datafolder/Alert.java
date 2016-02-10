/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import APIresources.TimeResources;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kasper
 */
@XmlRootElement
public class Alert {
    private int id;
    private String alertCat;
    private String receiverGroup;
    private String postName;
    private String currentTime;
    
    public Alert(){}
    
    public Alert(String c, String r, String n){
        this.id = incrementID();
        this.alertCat = c;
        this.receiverGroup = r;
        this.postName = n;
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }

    @XmlElement
    public int getID() {
        return id;
    }
    
    @XmlElement
    public String getAlertCat() {
        return alertCat;
    }
    
    @XmlElement
    public String getReceiverGroup(){
        return this.receiverGroup;
    }
    
    @XmlElement
    public String getPostName() {
        return postName;
    }
    
    @XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }
    
    private int incrementID(){
        return this.id++;
    }
}
