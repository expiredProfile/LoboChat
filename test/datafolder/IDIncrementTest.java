/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Kasper
 */
public class IDIncrementTest {
    
    public IDIncrementTest() {
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
     * Test of getInstance method, of class IDIncrement.
     */
//    @Test
//    public void testGetInstance() {
//        System.out.println("getInstance");
//        IDIncrement expResult = null;
//        IDIncrement result = IDIncrement.getInstance();
//        assertEquals(expResult, result);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }

    /**
     * Test of workerIncrement method, of class IDIncrement.
     */
    @Test
    public void testWorkerIncrement() {
        System.out.println("workerIncrement");
        //IDIncrement instance = null;
        IDIncrement instance = IDIncrement.getInstance();
        int expResult = 0;
        int result = instance.workerIncrement();
        System.out.println("Expected: " + expResult + ", result: " + result);
        assertEquals(expResult, result);
        //Test again
        int expResult2 = 1;
        int result2 = instance.workerIncrement();
        System.out.println("Expected2: " + expResult2 + ", result2: " + result2);
        assertEquals(expResult, result);
    }

    /**
     * Test of conversationIncrement method, of class IDIncrement.
     */
    @Test
    public void testConversationIncrement() {
        System.out.println("conversationIncrement");
        //IDIncrement instance = null;
        IDIncrement instance = IDIncrement.getInstance();
        int expResult = 0;
        int result = instance.conversationIncrement();
        System.out.println("Expected: " + expResult + ", result: " + result);
        assertEquals(expResult, result);
        //Test again
        int expResult2 = 1;
        int result2 = instance.conversationIncrement();
        System.out.println("Expected2: " + expResult2 + ", result2: " + result2);
        assertEquals(expResult, result);
    }

    /**
     * Test of alertIncrement method, of class IDIncrement.
     */
    @Test
    public void testAlertIncrement() {
        System.out.println("alertIncrement");
        //IDIncrement instance = null;
        IDIncrement instance = IDIncrement.getInstance();
        int expResult = 0;
        int result = instance.alertIncrement();
        System.out.println("Expected: " + expResult + ", result: " + result);
        assertEquals(expResult, result);
        //Test again
        int expResult2 = 1;
        int result2 = instance.alertIncrement();
        System.out.println("Expected2: " + expResult2 + ", result2: " + result2);
        assertEquals(expResult, result);
    }
    
}
