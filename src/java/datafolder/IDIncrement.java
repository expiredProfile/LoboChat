/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

/**
 *
 * @author kimmo
 */
// handles all the id increments in the server side and stores the values
public class IDIncrement {
    private static IDIncrement instance = new IDIncrement();
    private int workerIncrement;
    private int conversationIncrement;
    private int alertIncrement;
    
    private IDIncrement(){
        this.workerIncrement = 0;
        this.conversationIncrement = 0;
        this.alertIncrement = 1;
    }
    
    public static IDIncrement getInstance(){
        return instance;
    }
    
    public int workerIncrement(){
        return this.workerIncrement++;
    }
    
    public int conversationIncrement(){
        return this.conversationIncrement++;
    }
    
    public int alertIncrement(){
        return this.alertIncrement++;
    }
}
