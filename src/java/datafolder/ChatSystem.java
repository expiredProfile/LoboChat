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
    private Group group;
    private Conversation conversation;
    private HashMap<Integer, Alert> alertHistory;
    private ArrayList<Conversation> conversations;
    private ArrayList<Worker> loggedIn;
    private ArrayList<Worker> loggedOut;

    private ChatSystem() {
        this.message = new Message();
        this.worker = new Worker();
        this.group = new Group();
        this.conversation = new Conversation();
        this.alertHistory = new HashMap<>();
        this.conversations = new ArrayList<>();
        this.loggedIn = new ArrayList<>();
        this.loggedOut = new ArrayList<>();
        this.group = new Group();
    }

    public static ChatSystem getInstance() {
        return instance;
    }

    //Conversation methods
    public void addConversation(Conversation c) {
        this.conversations.add(c);
    }

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

    public ArrayList<Conversation> getAllConversation() {
        return this.conversations;
    }

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

    public void workerLoggedIn(Worker w) {
        loggedIn.add(w);
    }

    public void workerLoggedOut(Worker w) {
        loggedOut.add(w);
    }

    //Alert methods
    public void addAlert(Alert a) {
        alertHistory.put(a.getID(), a);
    }
    
    public Alert getAlertByID(int id) {
        return alertHistory.get(id);
    }

    public ArrayList<Conversation> getConversation() {
        ArrayList<Conversation> co = new ArrayList();
        for (int i = 0; i < this.conversations.size(); i++) {
            co.add(conversations.get(i));
        }
        return co;
    }
}
