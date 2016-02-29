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
    private String currentTime;
    private int alertCat;
    private String alertTopic;
    private int receiverGroup;
    private String postName;
    
    public Alert(){}

    @XmlElement
    public int getID() {
        return id;
    }
    
    public void setID() {
        this.id = IDIncrement.getInstance().alertIncrement();
    }
    
    @XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }
    
    public void setCurrentTime() {
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }
    
    @XmlElement
    public int getAlertCat() {
        return alertCat;
    }
    
    public void setAlertCat(int alertCat) {
        this.alertCat = alertCat;
    }
    
    @XmlElement
    public String getAlertTopic() {
        return alertTopic;
    }
    
    public void setAlertTopic(String alertTopic) {
        this.alertTopic = alertTopic;
    }
    
    @XmlElement
    public int getReceiverGroup(){
        return this.receiverGroup;
    }
    
    public void setReceiverGroup(int receiverGroup) {
        this.receiverGroup = receiverGroup;
    }
    
    @XmlElement
    public String getPostName() {
        return postName;
    }
    
    public void setPostName(String postName) {
        this.postName = postName;
    }
}
