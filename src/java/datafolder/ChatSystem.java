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
    private Worker workers;
    private int messageIdIncrement;
    private int workerIdIncerement;
    private int alertIdIncerement;
    private HashMap<Integer, Message> messageList;
    private HashMap<Integer, Workers> workerList;
    private HashMap<Integer, Alert> alertList;
    private ArrayList<Worker> loggedIn;
    private ArrayList<Worker> loggedOut;
    
    private ChatSystem(){
        this.message = new Message();
        this.messageList = new HashMap<>();
        this.loggedIn = new ArrayList<>();
        this.loggedOut = new ArrayList<>();
        this.alertList = new HashMap<>();
        this.messageIdIncrement = 0;
        this.workerIdIncerement = 0;
        this.alertIdIncerement = 0;
    }
    
    public static ChatSystem getInstance() {
        return instance;
    }
    
    //Message methods
    public void addMessage(Message m){
        messageList.put(m.getID() , m);
    }
    
    public HashMap<Integer, Message> getMessage(){
        return messageList;
    }
    
    public Message getMessageByID(int id){
        return messageList.get(id);
    }
    
    public void setMessageIncrement(int id){
        this.messageIdIncrement = id;
    }
    
    public int getMessageIncrement(){
        return this.messageIdIncrement;
    }
    
    //Worker methods
    /*
    public void addWorker(Workers w){
        workerList.put(w.getId(), w);
    }
    */

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
    
    /*
    public HashMap<Integer, Workers> getWorkers(){
        return workerList;
    }
    
    public Workers getWorkerById(int id){
        return workerList.get(id);
    }
    */

    public int getWorkerIdIncerement() {
        return workerIdIncerement;
    }

    public void setWorkerIdIncerement(int workerIdIncerement) {
        this.workerIdIncerement = workerIdIncerement;
    }
    
    //Alert methods
    public void addAlert(Alert a){
        alertList.put(a.getID() , a);
    }
    
    public Alert getAlertByID(int id){
        return alertList.get(id);
    }
    
    public void setAlertIncrement(int id){
        this.alertIdIncerement = id;
    }
    
    public int getAlertIncrement(){
        return this.alertIdIncerement;
    }
}
