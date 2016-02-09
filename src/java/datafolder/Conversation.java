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
@XmlRootElement
public class Conversation {
    private int id;
    private String name1;
    private String name2;
    private String topic;
    private ArrayList<Message> messages;
    
    public Conversation(){
        
    }
    
    public Conversation(String name, String name2, String topic){
        this.id = incrementID();
        this.name1 = name;
        this.name2 = name2;
        this.topic = topic;
        this.messages = new ArrayList<>();       
    }
    
    @XmlElement
    public String getName1(){
        return this.name1;
    }
    
    @XmlElement
    public String getName2(){
        return this.name2;
    }
    
    public void addMessage(Message m){
        this.messages.add(m);
    }
    
    @XmlElement
    public ArrayList<Message> getMessages(){
        return this.messages;
    }
    
    private int incrementID(){
        return this.id++;
    }
    
    public int getID(){
        return this.id;
    }
}
