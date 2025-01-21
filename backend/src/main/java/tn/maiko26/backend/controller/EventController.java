package tn.maiko26.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.maiko26.backend.model.Event;
import tn.maiko26.backend.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
@Tag(name = "Events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();

        return ResponseEntity.ok().body(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);

        return ResponseEntity.ok().body(event);
    }

    @PostMapping("/")
    public ResponseEntity<Long> createEvent(@RequestBody Event newEvent) {
        Long id = eventService.createEvent(newEvent);

        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> modifyEvent(@PathVariable Long id, @RequestBody Event modifiedEvent) {
        eventService.modifyEvent(id, modifiedEvent);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
