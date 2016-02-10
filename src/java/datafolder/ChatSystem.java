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
    private Worker worker;
    private Alert alert;
    private Group group;
    private Conversation conversation;
    private int alertIdIncerement;
    private HashMap<Integer, Conversation> conversations;
    private HashMap<Integer, Alert> alertHistory;
    private ArrayList<Worker> loggedIn;
    private ArrayList<Worker> loggedOut;
    
    private ChatSystem(){
        this.message = new Message();
        this.worker = new Worker();
        this.conversation = new Conversation();
        this.conversations = new HashMap<>();
        this.loggedIn = new ArrayList<>();
        this.loggedOut = new ArrayList<>();
        this.group = new Group();
        this.alertHistory = new HashMap<>();
        this.alertIdIncerement = 0;
    }
    
    public static ChatSystem getInstance() {
        return instance;
    }
    
    //Conversation methods
    public void addConversation(Conversation c){
        conversations.put(c.getID(), c);
    }
    
    /*
    public ArrayList<Conversation> getConversations(){
        return conversations;
    }
    */
    
    public ArrayList<Message> getConversationMessages(int id){
        return conversations.get(id).getMessages();
    }
    
    public void addMessageToConversation(int id, Message m){
        conversations.get(id).addMessage(m);
    }
    
    /*
    public ArrayList<Worker> getGroupList(){
        return group.getWorkerList();
    }
    */

    //Worker methods
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
 
    //Alert methods
    public void addAlert(Alert a){
        alertHistory.put(a.getID() , a);
    }
    
    public Alert getAlertByID(int id){
        return alertHistory.get(id);
    }
}
