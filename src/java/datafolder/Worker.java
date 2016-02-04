/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datafolder;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

/**
 *
 * @author kimmo
 */
@XmlRootElement
@XmlSeeAlso({Guard.class,Nurse.class,Doctor.class,Psychotherapist.class})
public abstract class Worker {
    @XmlElement
    public abstract String getName();
    @XmlElement
    public abstract int getId();
    @XmlElement
    public abstract String getTitle();
}
