/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kasper
 */
// required to create conversations between professional groups (temp object to pass data from client to server)
@XmlRootElement
public class ProfConvData {
    private String topic;
    private String professionGroup;
    private String postName;
    
    public ProfConvData() {}
    
    @XmlElement
    public String getTopic() {
        return this.topic;
    }
    
    public void setTopic(String topic) {
        this.topic = topic;
    }
    
    @XmlElement
    public String getProfGroup() {
        return this.professionGroup;
    }
    
    public void setProfGroup(String pg) {
        this.professionGroup = pg;
    }
    
    @XmlElement
    public String getPostName() {
        return this.postName;
    }
    
    public void setPostName(String n) {
        this.postName = n;
    }
}
