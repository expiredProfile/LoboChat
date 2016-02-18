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

/**
 *
 * @author Hege
 */
public class ConversationTest {
    
    public ConversationTest() {
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
     * Test of addMessage method, of class Conversation.
     */
    @Test
    public void testAddMessage() {
        System.out.println("addMessage");
        Message m = new Message ("BBAA", "Henks", 1);
        Conversation instance = new Conversation("TEST", new ArrayList<>());
        instance.addMessage(m);
        if (instance.getMessages().size() == 1){
            System.out.println(instance.getMessages().get(0).toString());
            System.out.println("addmessage success");
        } else {
          fail("This ain't right.");  
        }
        // TODO review the generated test code and remove the default call to fail.
        
    }

    /**
     * Test of getMessages method, of class Conversation.
     */
    @Test
    public void testGetMessages() {
        System.out.println("getMessages");
        Message m = new Message("KK", "Henks", 1);
        Message m2 = new Message("KK", "Henks", 2);
        Message m3 = new Message("KK", "Henks", 3);
        Conversation instance = new Conversation("TEST", new ArrayList<>());
        instance.addMessage(m);
        instance.addMessage(m2);
        instance.addMessage(m3);        
        int expResult = 3;
        int result = instance.getMessages().size();
        System.out.println(result);
        if (expResult == result){
            System.out.println("testGetMessages success");
        } else {
            fail("testGEtMessages fuck failed");
        }
        
        // TODO review the generated test code and remove the default call to fail.
        
    }

    /**
     * Test of getID method, of class Conversation.
     */
    @Test
    public void testGetID() {
        System.out.println("getID");
        Conversation instance = new Conversation("Shitposting", new ArrayList<>());
        Conversation instance2 = new Conversation("Shitposting", new ArrayList<>());
        Conversation instance3 = new Conversation("Shitposting", new ArrayList<>());
        
        int expResult = 4;
        int result = instance3.getID();
        System.out.println(result);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        //fail("The test case is a prototype.");
    }

    /**
     * Test of getTopic method, of class Conversation.
     */
    @Test
    public void testGetTopic() {
        System.out.println("getTopic");
        Conversation instance = new Conversation("posting", new ArrayList<>());
        String expResult = "posting";
        String result = instance.getTopic();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        //fail("The test case is a prototype.");
    }

    /**
     * Test of getMemberList method, of class Conversation.
     */
    @Test
    public void testGetMemberList() {
        System.out.println("getMemberList");
        
        ArrayList<Worker> wn = null; //ChatSystem.getInstance().getLoggedOutList();
        Conversation instance = new Conversation("Plll", wn);
        int expResult = ChatSystem.getInstance().getLoggedOutList().size();
        int result = instance.getMemberList().size();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        //fail("The test case is a prototype.");
    }
    
}
