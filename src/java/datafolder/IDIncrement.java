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
public class IDIncrement {
    private static IDIncrement instance = new IDIncrement();
    private int workerIncrement;
    private int conversationIncrement;
    
    private IDIncrement(){
        this.workerIncrement = 0;
        this.conversationIncrement = 0;
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
}
