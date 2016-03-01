/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import javax.xml.bind.DatatypeConverter;

/**
 *
 * @author Kasper
 */
public class TimeResources {
    private static TimeResources tr = new TimeResources();
    private Calendar c = Calendar.getInstance();
    
    private TimeResources() {}
    
    public static TimeResources getInstance() {
        return tr;
    }
    //Timestamp function
    public String getTimestamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        c.setTime(new Date());
        String cal = sdf.format(new Date());
        String xmlDateTime = DatatypeConverter.printDateTime(c);
        return cal;
    }
    
    public String getShortTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        c.setTime(new Date());
        String cal = sdf.format(new Date());
        String xmlDateTime = DatatypeConverter.printDateTime(c);
        return cal;
    }
}
