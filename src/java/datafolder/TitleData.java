/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import java.util.HashMap;

/**
 *
 * @author Kasper
 */
public class TitleData {
    private HashMap<Integer, String> titles;
    
    public TitleData() {
        titles = new HashMap<>();
        titles.put(0, "Doctor");
        titles.put(1, "Nurse");
        titles.put(2, "Psychotherapist");
        titles.put(3, "Guard");
    }
    
    //Get info id as param instead?
    public String getTitle(String titleKey) {
        int titleInt = Integer.parseInt(titleKey);
        String title = titles.get(titleInt);
        return title;
    }
}
