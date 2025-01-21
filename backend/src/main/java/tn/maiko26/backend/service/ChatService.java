package tn.maiko26.backend.service;

import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.ResourceNotImplementedException;
import tn.maiko26.backend.model.Message;

import java.util.List;

@Service
public class ChatService {
    public List<Message> getAllChats() {
        return null;
    }

    public Message getChatById() {
        throw new ResourceNotImplementedException();

    }

    public Long createChat(Message chat) {
        throw new ResourceNotImplementedException();

    }

    public void updateChat(Long id, Message chat) {
        throw new ResourceNotImplementedException();

    }

    public void deleteChat(String chatId) {
        throw new ResourceNotImplementedException();

    }
}
