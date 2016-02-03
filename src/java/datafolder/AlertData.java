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
    private HashMap<Integer, String> alertCategories = new HashMap<Integer, String>();
    
    public AlertData() {
        alertCategories.put(0, "Disturbance");
        alertCategories.put(1, "Need assistance");
        alertCategories.put(2, "Fire alert");
    }
    
    //Get alert info with id (key)
    @XmlElement
    public String getAlertInfo(Alert a) {
        int infoId = a.getInfoID();
        String info = alertCategories.get(infoId);
        return info;
    }
}
