/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kimmo
 */
@XmlRootElement
public class Psychotherapist implements Workers{
    private int id;
    private String name;
    private String title;
    
    public Psychotherapist(){
        
    }
    
    public Psychotherapist(int id, String name){
        this.id = id;
        this.name = name;
        this.title = "Psychotherapist";
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
    
    @XmlElement
    @Override
    public String getTitle() {
        return title;
    }
}
