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
 * @author Kasper
 */
// gives structure to the professional groups used to create conversations between groups
@XmlRootElement
public class ProfessionGroup {
    private String profession;
    private ArrayList<Worker> workersByProf;
    
    public ProfessionGroup() {}
    
    public ProfessionGroup(String p) {
        this.profession = p;
        workersByProf = new ArrayList<>();
    }
    
    @XmlElement
    public String getProfessionName() {
        return this.profession;
    }
    public void setProfessionName(String p) {
        this.profession = p;
    }
    
    @XmlElement
    public ArrayList<Worker> getWorkersByProf() {
        return this.workersByProf;
    }
    
    public void addWorker(Worker w) {
        this.workersByProf.add(w);
    }
}
