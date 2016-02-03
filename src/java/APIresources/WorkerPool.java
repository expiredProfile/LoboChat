/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Doctor;
import datafolder.Guard;
import datafolder.Nurse;
import datafolder.Psychotherapist;
import datafolder.Workers;

/**
 *
 * @author kimmo
 */
public class WorkerPool {
    private Workers kim;
    private Workers henkka;
    private Workers kasper;
    private Workers tommi;
    private ChatSystem system = ChatSystem.getInstance();
    
    public WorkerPool(){
        this.kim = new Guard(1, "Kim");
        this.henkka = new Doctor(2, "Henkka");
        this.kasper = new Psychotherapist(3, "Kasper");
        this.tommi = new Nurse(4, "Tommi");
        this.addToWorkers();
    }
    
    private void addToWorkers(){
        system.addWorker(kim);
        system.addWorker(henkka);
        system.addWorker(kasper);
        system.addWorker(tommi);
    }
}
