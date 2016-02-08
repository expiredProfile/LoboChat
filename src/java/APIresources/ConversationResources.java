/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIresources;

import datafolder.ChatSystem;
import datafolder.Conversation;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author kimmo
 */
@Path("/Conversations")
public class ConversationResources {
    private final ChatSystem system;
    
    public ConversationResources(){
        system = ChatSystem.getInstance();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void postConversation(Conversation c){
        system.addConversation(c);
    }
}
