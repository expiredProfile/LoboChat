/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.Message;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author kimmo
 */
public class MessageResourcesTest {
    
    public MessageResourcesTest() {
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
     * Test of postMessage method, of class MessageResources.
     */
    @Test
    public void testPostMessage() {
        System.out.println("postMessage");
        String s = "";
        MessageResources instance = new MessageResources();
        instance.postMessage(s);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getMessageIdXML method, of class MessageResources.
     */
    @Test
    public void testGetMessageIdXML() {
        System.out.println("getMessageIdXML");
        int messageid = 0;
        MessageResources instance = new MessageResources();
        Message expResult = null;
        Message result = instance.getMessageIdXML(messageid);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
