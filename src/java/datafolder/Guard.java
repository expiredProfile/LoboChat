/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import javax.xml.bind.annotation.XmlElement;

/**
 *
 * @author kimmo
 */
public class Guard implements Workers{
    private int id;
    private String name;
    
    public Guard(){
        
    }
    
    public Guard(int id, String name){
        this.id = id;
        this.name = name;
    }
    
    @XmlElement
    @Override
    public int getId() {
        return id;
    }

    @XmlElement
    @Override
    public String getName() {
        return name;
    }
}
