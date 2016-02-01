/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kimmo
 */
@XmlRootElement
public class Message {

    private int id;
    private String content;
    private String postName;
    private Timestamp timeStamp;
    private String currentTime;

    public Message() {

    }

    public Message(int id, String c, String n) {
        this.id = id;
        this.content = c;
        this.postName = n;
        this.currentTime = this.currentTime();
    }

    private String currentTime() {
        Date yourDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(yourDate);
        String xmlDateTime = DatatypeConverter.printDateTime(c);
        return xmlDateTime;
    }

    @XmlElement
    public int getID() {
        return id;
    }

    @XmlElement
    public String getContent() {
        return content;
    }

    @XmlElement
    public Timestamp getTimestamp() {
        return this.timeStamp;
    }
    
    @XmlElement
    public String getCurrentTime(){
        return this.currentTime;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @XmlElement
    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }
}
