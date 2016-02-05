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
    private int id = 0;
    private static IDIncrement instance = new IDIncrement();
    
    private IDIncrement(){
        
    }
    
    public static IDIncrement getInstance(){
        return instance;
    }
    
    public int incrementID(){
        return this.id++;
    }
}
