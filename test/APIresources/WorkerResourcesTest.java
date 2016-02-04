/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.Worker;
import java.util.ArrayList;
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
public class WorkerResourcesTest {
    
    public WorkerResourcesTest() {
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
     * Test of workerLogIn method, of class WorkerResources.
     */
    @Test
    public void testWorkerLogIn() {
        System.out.println("workerLogIn");
        String s = "";
        WorkerResources instance = new WorkerResources();
        boolean expResult = false;
        boolean result = instance.workerLogIn(s);
        assertEquals(expResult, result);
    }

    /**
     * Test of getLoggedOutXML method, of class WorkerResources.
     */
    @Test
    public void testGetLoggedOutXML() {
        System.out.println("getLoggedOutXML");
        WorkerResources instance = new WorkerResources();
        ArrayList<Worker> expResult = null;
        ArrayList<Worker> result = instance.getLoggedOutXML();
        assertEquals(expResult, result);
    }
    
}
