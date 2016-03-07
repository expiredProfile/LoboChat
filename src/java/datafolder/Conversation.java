/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kimmo
 */
// Stores the data of a single conversation and
// the messages sent to the conversation.
@XmlRootElement
public class Conversation {

    private int id;
    private String topic;
    private ArrayList<Message> messages;
    private ArrayList<Worker> memberList;
    private IDIncrement instance;

    public Conversation() {
    }

    public Conversation(String topic, ArrayList<Worker> list) {
        this.instance = IDIncrement.getInstance();
        this.id = instance.conversationIncrement();
        this.topic = topic;
        this.messages = new ArrayList<>();
        this.memberList = list;
    }

    public void addMessage(Message m) {
        this.messages.add(m);
    }

    @XmlElement
    public ArrayList<Message> getMessages() {
        return this.messages;
    }

    @XmlElement
    public int getID() {
        return this.id;
    }

    @XmlElement
    public String getTopic() {
        return this.topic;
    }

    @XmlElement
    public ArrayList<Worker> getMemberList() {
        return memberList;
    }

}
