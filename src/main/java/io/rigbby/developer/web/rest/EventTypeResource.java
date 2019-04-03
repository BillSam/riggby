package io.rigbby.developer.web.rest;
import io.rigbby.developer.domain.EventType;
import io.rigbby.developer.repository.EventTypeRepository;
import io.rigbby.developer.web.rest.errors.BadRequestAlertException;
import io.rigbby.developer.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EventType.
 */
@RestController
@RequestMapping("/api")
public class EventTypeResource {

    private final Logger log = LoggerFactory.getLogger(EventTypeResource.class);

    private static final String ENTITY_NAME = "eventType";

    private final EventTypeRepository eventTypeRepository;

    public EventTypeResource(EventTypeRepository eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }

    /**
     * POST  /event-types : Create a new eventType.
     *
     * @param eventType the eventType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventType, or with status 400 (Bad Request) if the eventType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-types")
    public ResponseEntity<EventType> createEventType(@RequestBody EventType eventType) throws URISyntaxException {
        log.debug("REST request to save EventType : {}", eventType);
        if (eventType.getId() != null) {
            throw new BadRequestAlertException("A new eventType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventType result = eventTypeRepository.save(eventType);
        return ResponseEntity.created(new URI("/api/event-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-types : Updates an existing eventType.
     *
     * @param eventType the eventType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventType,
     * or with status 400 (Bad Request) if the eventType is not valid,
     * or with status 500 (Internal Server Error) if the eventType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-types")
    public ResponseEntity<EventType> updateEventType(@RequestBody EventType eventType) throws URISyntaxException {
        log.debug("REST request to update EventType : {}", eventType);
        if (eventType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventType result = eventTypeRepository.save(eventType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-types : get all the eventTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eventTypes in body
     */
    @GetMapping("/event-types")
    public List<EventType> getAllEventTypes() {
        log.debug("REST request to get all EventTypes");
        return eventTypeRepository.findAll();
    }

    /**
     * GET  /event-types/:id : get the "id" eventType.
     *
     * @param id the id of the eventType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventType, or with status 404 (Not Found)
     */
    @GetMapping("/event-types/{id}")
    public ResponseEntity<EventType> getEventType(@PathVariable Long id) {
        log.debug("REST request to get EventType : {}", id);
        Optional<EventType> eventType = eventTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventType);
    }

    /**
     * DELETE  /event-types/:id : delete the "id" eventType.
     *
     * @param id the id of the eventType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-types/{id}")
    public ResponseEntity<Void> deleteEventType(@PathVariable Long id) {
        log.debug("REST request to delete EventType : {}", id);
        eventTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
