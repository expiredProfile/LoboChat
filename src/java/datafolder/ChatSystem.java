/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author kimmo
 */
public class ChatSystem {
    private static ChatSystem instance = new ChatSystem();
    private Message message;
    private Worker currentUser;
    private int messageIdIncrement;
    private int workerIdIncerement;
    private HashMap<Integer, Message> messageList;
    private ArrayList<Worker> loggedIn;
    private ArrayList<Worker> loggedOut;
    
    private ChatSystem(){
        this.message = new Message();
        this.messageList = new HashMap<>();
        this.loggedIn = new ArrayList<>();
        this.loggedOut = new ArrayList<>();
        this.messageIdIncrement = 0;
        this.workerIdIncerement = 0;
    }
    
    public static ChatSystem getInstance() {
        return instance;
    }
    
    public void addMessage(Message m){
        messageList.put(m.getID() , m);
    }
    
    public HashMap<Integer, Message> getMessage(){
        return messageList;
    }
    
    public Message getMessageByID(int id){
        return messageList.get(id);
    }

    public int getMessageIncrement(){
        return this.messageIdIncrement++;
    }

    public ArrayList<Worker> getLoggedOutList(){
        return this.loggedOut;
    }
    
    public ArrayList<Worker> getLoggedInList(){
        return this.loggedIn;
    }
    
    public void workerLoggedIn(Worker w){
        loggedIn.add(w);
    }
    
    public void workerLoggedOut(Worker w){
        loggedOut.add(w);
    }

    public int getWorkerIdIncerement() {
        return workerIdIncerement++;
    }
    
    public void setCurrentUser(Worker w){
        this.currentUser = w;
    }
    
    public Worker getCurrentUser(){
        return this.currentUser;
    }
}
