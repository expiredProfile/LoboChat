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
import datafolder.Worker;

/**
 *
 * @author kimmo
 */
public class WorkerPool {
    private Worker kim;
    private Worker henkka;
    private Worker kasper;
    private Worker tommi;
    private ChatSystem system = ChatSystem.getInstance();
    
    public WorkerPool(){
        this.kim = new Guard(1, "Kim");
        this.henkka = new Doctor(2, "Henkka");
        this.kasper = new Psychotherapist(3, "Kasper");
        this.tommi = new Nurse(4, "Tommi");
        this.addToWorkers();
    }
    
    private void addToWorkers(){
        system.workerLoggedOut(kim);
        system.workerLoggedOut(henkka);
        system.workerLoggedOut(kasper);
        system.workerLoggedOut(tommi);
    }
}
