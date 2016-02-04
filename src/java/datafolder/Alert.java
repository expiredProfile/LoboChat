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
    private int infoId;
    private String postName;
    private String currentTime;
    //Urgency level?
    
    public Alert(){}
    
    public Alert(int id, int infoId, String n){
        this.id = id;
        this.infoId = infoId;
        this.postName = n;
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }

    @XmlElement
    public int getID() {
        return id;
    }
    
    @XmlElement
    public int getInfoID() {
        return infoId;
    }

    @XmlElement
    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }
    
    @XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }
}
