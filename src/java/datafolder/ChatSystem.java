/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.HashMap;

/**
 *
 * @author kimmo
 */
public class ChatSystem {
    private static ChatSystem instance = new ChatSystem();
    private Message message;
    private Workers workers;
    private int messageIdIncrement;
    private int workerIdIncerement;
    private HashMap<Integer, Message> messageList;
    private HashMap<Integer, Workers> workerList; 
    
    private ChatSystem(){
        this.message = new Message();
        this.messageList = new HashMap<>();
        this.messageIdIncrement = 0;
    }
    
    public static ChatSystem getInstance() {
        return instance;
    }
    
    public void addMessage(Message m){
        messageList.put(m.getID() , m);
    }
    
    /*
    public HashMap<Integer, Message> getMessage(){
        return messageList;
    }
    */
    
    public Message getMessageByID(int id){
        return messageList.get(id);
    }
    
    public void setMessageIncrement(int id){
        this.messageIdIncrement = id;
    }
    
    public int getMessageIncrement(){
        return this.messageIdIncrement;
    }
    
    public void addWorker(Workers w){
        workerList.put(w.getId(), w);
    }
    
    public Workers getWorkerById(int id){
        return workerList.get(id);
    }

    public int getWorkerIdIncerement() {
        return workerIdIncerement;
    }

    public void setWorkerIdIncerement(int workerIdIncerement) {
        this.workerIdIncerement = workerIdIncerement;
    }
    
    
}
