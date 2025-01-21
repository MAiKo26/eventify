package tn.maiko26.backend.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.maiko26.backend.model.Message;
import tn.maiko26.backend.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/chats")
@Tag(name = "Chat", description = "Chat operations")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @GetMapping("/")
    public ResponseEntity<List<Message>> getAllChats() {
        List<Message> chats = chatService.getAllChats();

        return ResponseEntity.ok().body(chats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getChatById() {
        Message chat = chatService.getChatById();

        return ResponseEntity.ok().body(chat);
    }

    @PostMapping("/")
    public ResponseEntity<Long> createChat(@RequestBody Message chat) {
        Long id = chatService.createChat(chat);

        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateChat(@PathVariable Long id, @RequestBody Message chat) {
        chatService.updateChat(id, chat);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/:chatId")
    public ResponseEntity<Void> deleteChat(@RequestParam String chatId) {
        chatService.deleteChat(chatId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
