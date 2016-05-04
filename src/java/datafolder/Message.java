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
 * @author kimmo
 */
// The class serves as a structure for the messages used in the application.
@XmlRootElement
public class Message {

    private String content;
    private String postName;
    private int conversationID;
    private String currentTime;
    private String shortTimeStamp;
    private int messageID;
    private IDIncrement idi = IDIncrement.getInstance();

    public Message() {
    }

    public Message(String content, String name, int id) {
        this.content = content;
        this.postName = name;
        this.conversationID = id;
        this.messageID = idi.messageIncrement();
    }

    @XmlElement
    public String getContent() {
        return content;
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

    @XmlElement
    public int getConversationID() {
        return this.conversationID;
    }

    public void setConversationID(int id) {
        this.conversationID = id;
    }

    @XmlElement
    public String getCurrentTime() {
        return this.currentTime;
    }

    public void setCurrentTime() {
        this.currentTime = TimeResources.getInstance().getTimestamp();
    }

    @XmlElement
    public String getShortTime() {
        return this.shortTimeStamp;
    }

    public void setShortTime() {
        this.shortTimeStamp = TimeResources.getInstance().getShortTimeStamp();
    }

    /**
     * @return the messageID
     */
    @XmlElement
    public int getMessageID() {
        return messageID;
    }

    /**
     * @param messageID the messageID to set
     */
    public void setMessageID(int i) {
        this.messageID = i;
    }
}
