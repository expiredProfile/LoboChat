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
    private int alertCat;
    private String postName;
    private String receiver;
    private String currentTime;
    
    public Alert(){}
    
    public Alert(int id, int c, String n, String r){
        this.id = incrementID();
        this.alertCat = c;
        this.postName = n;
        this.receiver = r;
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }

    @XmlElement
    public int getID() {
        return id;
    }
    
    @XmlElement
    public int getAlertCat() {
        return alertCat;
    }

    @XmlElement
    public String getPostName() {
        return postName;
    }
    
    @XmlElement
    public String getReceiver(){
        return this.receiver;
    }
    
    @XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }
    
    private int incrementID(){
        return this.id++;
    }
}
