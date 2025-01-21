package tn.maiko26.backend.service;

import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.ResourceNotImplementedException;
import tn.maiko26.backend.model.Event;
import tn.maiko26.backend.repository.EventRepository;

import java.util.List;

@Service
public class EventService  {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents(){
        throw new ResourceNotImplementedException();
    }

    public Event getEventById(Long id){
        throw new ResourceNotImplementedException();
    }

    public Long createEvent(Event newEvent){
        throw new ResourceNotImplementedException();
    }

    public Void modifyEvent(Long id,Event modifiedEvent){
        throw new ResourceNotImplementedException();
    }

    public Void deleteEvent(Long id){
        throw new ResourceNotImplementedException();
    }

}
