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

    private int id;
    private String name;
    private String title;
    private IDIncrement increment;

    public Worker() {

    }

    public Worker(String name, String title) {
        this.increment = IDIncrement.getInstance();
        this.id = increment.workerIncrement();
        this.name = name;
        this.title = title;
    }

    @XmlElement
    public int getId() {
        return id;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    @XmlElement
    public String getTitle() {
        return title;
    }
}
