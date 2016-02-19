/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.Alert;
import java.util.HashMap;

/**
 *
 * @author Kasper
 */
public class AlertData {
    private HashMap<Integer, String> alertCategories;
    
    public AlertData() {
        alertCategories = new HashMap<>();
        alertCategories.put(0, "Need assistance");
        alertCategories.put(1, "Disturbance");
        alertCategories.put(2, "Fire alert");
    }
    
    //Get alert info (value) with alert category id (key)
    //Get info id as parameter instead?
    public String getAlertInfo(Alert a) {
        String info = alertCategories.get(a.getAlertCat());
        return info;
    }
}
