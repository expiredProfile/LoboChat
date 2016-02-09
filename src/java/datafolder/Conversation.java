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
    private ArrayList<Worker> participants;
    private ArrayList<Message> messages;
    
    public Conversation(){
        
    }
    
    public Conversation(ArrayList<Worker> w, ArrayList<Message> m){
        this.id = incrementID();
        this.participants = w;
        this.messages = m;
    }
    
    public void addParticipant(Worker w){
        this.participants.add(w);
    }
    
    @XmlElement
    public ArrayList<Worker> getParticipants(){
        return this.participants;
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
