/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.ArrayList;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;

/**
 *
 * @author kimmo
 */
public class ChatSystemTest {
    
    public ChatSystemTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of getInstance method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetInstance() {
        System.out.println("getInstance");
        ChatSystem expResult = ChatSystem.getInstance();
        ChatSystem result = ChatSystem.getInstance();
        assertEquals(expResult, result);
    }

    /**
     * Test of addConversation method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testAddConversation() {
        System.out.println("addConversation");
        Conversation c = new Conversation();
        ChatSystem instance = ChatSystem.getInstance();
        instance.addConversation(c);
    }

    /**
     * Test of getConversations method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetConversations() {
        System.out.println("getConversations");
        String name = "";
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Conversation> expResult = instance.getAllConversation();
        ArrayList<Conversation> result = instance.getAllConversation();
        assertEquals(expResult, result);
    }

    /**
     * Test of getAllConversation method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetAllConversation() {
        System.out.println("getAllConversation");
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Conversation> expResult = instance.getAllConversation();
        ArrayList<Conversation> result = instance.getAllConversation();
        assertEquals(expResult, result);
    }

    /**
     * Test of getConversationMessages method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetConversationMessages() {
        System.out.println("getConversationMessages");
        Message m = new Message();
        int id = 0;
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Message> expResult = instance.getConversationMessages(id);
        ArrayList<Message> result = instance.getConversationMessages(id);
        assertEquals(expResult, result);
    }

    /**
     * Test of getConversationByID method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetConversationByID() {
        System.out.println("getConversationByID");
        int id = 0;
        ChatSystem instance = ChatSystem.getInstance();
        Conversation expResult = instance.getConversationByID(id);
        Conversation result = instance.getConversationByID(id);
        assertEquals(expResult, result);
    }

    /**
     * Test of addMessageToConversation method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testAddMessageToConversation() {
        System.out.println("addMessageToConversation");
        int id = 0;
        Message m = new Message();
        ChatSystem instance = ChatSystem.getInstance();
        instance.addMessageToConversation(id, m);
    }

    /**
     * Test of getLoggedOutList method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetLoggedOutList() {
        System.out.println("getLoggedOutList");
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Worker> expResult = instance.getLoggedOutList();
        ArrayList<Worker> result = instance.getLoggedOutList();
        assertEquals(expResult, result);
    }

    /**
     * Test of getLoggedInList method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetLoggedInList() {
        System.out.println("getLoggedInList");
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Worker> expResult = instance.getLoggedInList();
        ArrayList<Worker> result = instance.getLoggedInList();
        assertEquals(expResult, result);
    }

    /**
     * Test of workerLoggedIn method, of class ChatSystem.
     */
    @Test
    public void testWorkerLoggedIn() {
        System.out.println("workerLoggedIn");
        Worker w = new Worker();
        ChatSystem instance = ChatSystem.getInstance();
        instance.workerLoggedIn(w);
        int i = instance.getLoggedInList().size();
        int expResult = 1;
        int result = i;
        System.out.println("Logged in: " + i);
        assertEquals(expResult, result);
    }

    /**
     * Test of workerLoggedOut method, of class ChatSystem.
     */
    @Test
    public void testWorkerLoggedOut() {
        System.out.println("workerLoggedOut");
        Worker w = new Worker();
        ChatSystem instance = ChatSystem.getInstance();
        instance.workerLoggedOut(w);
        int i = instance.getLoggedOutList().size();
        int expResult = 1;
        int result = i;
        System.out.println("Logged out: " + i);
        assertEquals(expResult, result);
    }

    /**
     * Test of addAlert method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testAddAlert() {
        System.out.println("addAlert");
        Alert a = new Alert();
        ChatSystem instance = ChatSystem.getInstance();
        instance.addAlert(a);
    }

    /**
     * Test of getAlertByID method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetAlertByID() {
        System.out.println("getAlertByID");
        int id = 0;
        ChatSystem instance = ChatSystem.getInstance();
        Alert expResult = instance.getAlertByID(id);
        Alert result = instance.getAlertByID(id);
        assertEquals(expResult, result);
    }

    /**
     * Test of getConversation method, of class ChatSystem.
     */
    @Ignore
    @Test
    public void testGetConversation() {
        System.out.println("getConversation");
        ChatSystem instance = ChatSystem.getInstance();
        ArrayList<Conversation> expResult = instance.getConversation();
        ArrayList<Conversation> result = instance.getConversation();
        assertEquals(expResult, result);
    }
    
}
