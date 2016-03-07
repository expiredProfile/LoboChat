/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.ProfessionGroup;
import datafolder.Worker;

/**
 *
 * @author kimmo
 */
public class WorkerPool {
    private static WorkerPool instance = new WorkerPool();
    private ChatSystem system = ChatSystem.getInstance();
    //Profession groups
    private ProfessionGroup doctors;
    private ProfessionGroup nurses;
    private ProfessionGroup psychotherapists;
    private ProfessionGroup guards;
    //Workers
    private Worker kim;
    private Worker henkka;
    private Worker kasper;
    private Worker tommi;
    
    //requires empty constructor so simpleton can be removed
    //need parameter values for other constructor
    
    private WorkerPool(){
        //Create profession groups
        this.doctors = new ProfessionGroup("Doctors");
        this.nurses = new ProfessionGroup("Nurses");
        this.psychotherapists = new ProfessionGroup("Psychotherapists");
        this.guards = new ProfessionGroup("Guards");
        //Create predefined workers
        this.kim = new Worker("Kim", "Guard", 1);
        this.henkka = new Worker("Henkka", "Doctor", 2);
        this.kasper = new Worker("Kasper", "Psychotherapist", 3);
        this.tommi = new Worker("Tommi", "Nurse", 4);
        //Add to logged out list
        this.addToLoggedOut();
        //Add to all workers
        this.addToAllWorkers();
        //Add workers to profession groups
        this.addToProfessionGroups();
    }
    
    public static WorkerPool getInstance(){
        return instance;
    }
    
    //Add methods for all four profession groups.
    public void addGuard(Worker w){
        guards.addWorker(w);
    }
    
    public void addDoctor(Worker w){
        doctors.addWorker(w);
    }
    
    public void addPsycho(Worker w){
        psychotherapists.addWorker(w);
    }
    
    public void addNurse(Worker w){
        nurses.addWorker(w);
    }
    
    //Methods that store predefined workers into logged out list, worker list and profession groups. 
    private void addToLoggedOut(){
        system.workerLoggedOut(kim);
        system.workerLoggedOut(henkka);
        system.workerLoggedOut(kasper);
        system.workerLoggedOut(tommi);
    }
    
    private void addToAllWorkers() {
        system.addToAllWorkers(kim);
        system.addToAllWorkers(henkka);
        system.addToAllWorkers(kasper);
        system.addToAllWorkers(tommi);
    }
    
    private void addToProfessionGroups() {
        this.guards.addWorker(kim);
        this.doctors.addWorker(henkka);
        this.psychotherapists.addWorker(kasper);
        this.nurses.addWorker(tommi);
    }
    
    //The methdod that returns the requested ProfessionGroup object
    public ProfessionGroup getProfessionGroup(String pg) {
        switch(pg) {
            case "Doctors":
                return this.doctors;
            case "Nurses":
                return this.nurses;
            case "Psychotherapists":
                return this.psychotherapists;
            case "Guards":
                return this.guards;
            default:
                return null;
        }
    }
}
