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
public class Worker {
    private IDIncrement increment;
    private int id;
    private String name;
    private String title;
    private int groupID;
    
    public Worker() {}

    public Worker(String name, String title, int gid) {
        this.increment = IDIncrement.getInstance();
        this.id = increment.workerIncrement();
        this.name = name;
        this.title = title;
        this.groupID = gid;
    }

    @XmlElement
    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    @XmlElement
    public String getName() {
        return name;
    }
    public void setName(String s ){
        this.name = s;
    }
    
    @XmlElement
    public String getTitle() {
        return title;
    }
    public void setTitle(String s){
        this.title = s;
    }

    @XmlElement
    public int getGroupID() {
        return groupID;
    }

    public void setGroupID(int groupID) {
        this.groupID = groupID;
    }
}
