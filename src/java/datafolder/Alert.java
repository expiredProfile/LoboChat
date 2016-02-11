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
@XmlRootElement//(name = "alert")
public class Alert {
    private int id;
    private String currentTime;
    @XmlElement//(name = "alertCat")
    private String alertCat;
    @XmlElement//(name = "receiverGroup")
    private String receiverGroup;
    @XmlElement//(name = "postName")
    private String postName;
    
    public Alert(){}
    
    /*
    public Alert(String c, String r, String n){
        this.id = IDIncrement.getInstance().alertIncrement();
        this.alertCat = c;
        this.receiverGroup = r;
        this.postName = n;
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }
    */

    //@XmlElement
    public int getID() {
        return id;
    }
    
    public void setID() {
        this.id = IDIncrement.getInstance().alertIncrement();
    }
    
    //@XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }
    
    public void setCurrentTime() {
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }
    
    //@XmlElement
    public String getAlertCat() {
        return alertCat;
    }
    
    //@XmlElement
    public String getReceiverGroup(){
        return this.receiverGroup;
    }
    
    //@XmlElement
    public String getPostName() {
        return postName;
    }
}
