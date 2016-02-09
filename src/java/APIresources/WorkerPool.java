/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Worker;

/**
 *
 * @author kimmo
 */
public class WorkerPool {
    private static WorkerPool instance = new WorkerPool();
    private Worker kim;
    private Worker henkka;
    private Worker kasper;
    private Worker tommi;
    private ChatSystem system = ChatSystem.getInstance();
    
    //requires empty constructor so simpleton can be removed
    //need parameter values for other constructor
    
    private WorkerPool(){
        this.kim = new Worker("Kim", "Guard");
        this.henkka = new Worker("Henkka", "Doctor");
        this.kasper = new Worker("Kasper", "Psychotherapist");
        this.tommi = new Worker("Tommi", "Nurse");
        this.addToWorkers();
    }
    
    public static WorkerPool getInstance(){
        return instance;
    }
    
    private void addToWorkers(){
        system.workerLoggedOut(kim);
        system.workerLoggedOut(henkka);
        system.workerLoggedOut(kasper);
        system.workerLoggedOut(tommi);
    }
}
