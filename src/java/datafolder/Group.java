/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kimmo
 */
// Created to transfer a topic and multiple users from the client to server in one package.
@XmlRootElement
public class Group {

    private String topic;
    private ArrayList<Worker> workerList;

    public Group() {
    }

    public Group(String topic) {
        this.topic = topic;
        this.workerList = new ArrayList<>();
    }

    @XmlElement
    public String getTopic() {
        return this.topic;
    }

    public void setTopic(String s) {
        this.topic = s;
    }

    @XmlElement
    public ArrayList<Worker> getWorkerList() {
        return this.workerList;
    }

    public void setWorkerList(ArrayList<Worker> a) {
        this.workerList = a;
    }
}
