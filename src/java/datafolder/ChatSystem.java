/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.ArrayList;

/**
 *
 * @author kimmo
 */
// singleton class that stores all the data and works as an link between the 
// resource and data classes
public class ChatSystem {

    private static ChatSystem instance = new ChatSystem();
    private Message message;
    private Worker worker;
    private Group group;
    private Conversation conversation;
    private ArrayList<Conversation> conversations;
    private ArrayList<Alert> alertHistory;
    private ArrayList<Worker> loggedIn;
    private ArrayList<Worker> loggedOut;
    private ArrayList<Worker> allWorkers;

    private ChatSystem() {
        this.message = new Message();
        this.worker = new Worker();
        this.group = new Group();
        this.conversation = new Conversation();
        this.conversations = new ArrayList<>();
        this.alertHistory = new ArrayList<>();
        this.loggedIn = new ArrayList<>();
        this.loggedOut = new ArrayList<>();
        this.group = new Group();
        this.allWorkers = new ArrayList<>();
    }

    public static ChatSystem getInstance() {
        return instance;
    }

    //Conversation methods
    public void addConversation(Conversation c) {
        this.conversations.add(c);
    }
/*    
    public ArrayList<Conversation> getConversation() {
        ArrayList<Conversation> co = new ArrayList();
        for (int i = 0; i < this.conversations.size(); i++) {
            co.add(conversations.get(i));
        }
        return co;
    }
*/
    // returns all the conversations to the user given in the parameter
    public ArrayList<Conversation> getConversations(String name) {
        ArrayList<Conversation> tempConversations = new ArrayList<>();

        for (Conversation c : this.conversations) {
            for (Worker w : c.getMemberList()) {
                if (w.getName().equals(name)) {
                    tempConversations.add(c);
                }
            }
        }
        return tempConversations;
    }

    public ArrayList<Conversation> getAllConversations() {
        return this.conversations;
    }

    // return all the messages from the given conversation by id
    public ArrayList<Message> getConversationMessages(int id) {
        return conversations.get(id).getMessages();
    }

    public Conversation getConversationByID(int id) {
        return this.conversations.get(id);
    }

    public void addMessageToConversation(int id, Message m) {
        conversations.get(id).addMessage(m);
    }

    /*
    public ArrayList<Worker> getGroupList(){
        return group.getWorkerList();
    }
     */
    
    //Worker methods
    public ArrayList<Worker> getLoggedOutList() {
        return this.loggedOut;
    }

    public ArrayList<Worker> getLoggedInList() {
        return this.loggedIn;
    }
    
    public ArrayList<Worker> getAllWorkers() {
        return this.allWorkers;
    }

    public void workerLoggedIn(Worker w) {
        loggedIn.add(w);
    }

    public void workerLoggedOut(Worker w) {
        loggedOut.add(w);
    }
    
    public void addToAllWorkers(Worker w) {
        allWorkers.add(w);
    }

    //Alert methods
    public void addAlert(Alert a) {
        alertHistory.add(a);
    }
    
    public Alert getAlertByID(int id) {
        return alertHistory.get(id-1);
    }
    
    // returns either 5, 10 or all of the messages in the system
    public ArrayList<Alert> getAlertHistory(int range) {
        ArrayList<Alert> tempHistory = new ArrayList<>();
        
        if(range == 0) { //5 latest
            if(alertHistory.size() >= 5) {

                for (int i = alertHistory.size()-5; i < alertHistory.size(); i++) {
                    tempHistory.add(alertHistory.get(i));
                }
                return tempHistory;
            } else {
                return alertHistory;
            }
        } else if (range == 1) { //10 latest
            if(alertHistory.size() >= 10) {
                for (int i = alertHistory.size()-10; i < alertHistory.size(); i++) {
                    tempHistory.add(alertHistory.get(i));
                }
                return tempHistory;
            } else {
                return alertHistory;
            }
        } else { //All
            return alertHistory;
        }
    }
}
