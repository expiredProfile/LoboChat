/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.HashMap;
import javax.xml.bind.annotation.XmlElement;

/**
 *
 * @author Kasper
 */
public class AlertData {
    //Order data with urgency?
    private HashMap<Integer, String> alertCategories;
    
    public AlertData() {
        alertCategories = new HashMap<>();
        alertCategories.put(0, "Need assistance");
        alertCategories.put(1, "Disturbance");
        alertCategories.put(2, "Fire alert");
    }
    
    //Get alert info (value) with id (key)
    @XmlElement
    public String getAlertInfo(Alert a) {
        int infoId = a.getInfoID();
        String info = alertCategories.get(infoId);
        return info;
    }
}
