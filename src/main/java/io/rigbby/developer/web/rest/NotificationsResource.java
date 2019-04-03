package io.rigbby.developer.web.rest;
import io.rigbby.developer.domain.Notifications;
import io.rigbby.developer.repository.NotificationsRepository;
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
 * REST controller for managing Notifications.
 */
@RestController
@RequestMapping("/api")
public class NotificationsResource {

    private final Logger log = LoggerFactory.getLogger(NotificationsResource.class);

    private static final String ENTITY_NAME = "notifications";

    private final NotificationsRepository notificationsRepository;

    public NotificationsResource(NotificationsRepository notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }

    /**
     * POST  /notifications : Create a new notifications.
     *
     * @param notifications the notifications to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notifications, or with status 400 (Bad Request) if the notifications has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notifications")
    public ResponseEntity<Notifications> createNotifications(@RequestBody Notifications notifications) throws URISyntaxException {
        log.debug("REST request to save Notifications : {}", notifications);
        if (notifications.getId() != null) {
            throw new BadRequestAlertException("A new notifications cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Notifications result = notificationsRepository.save(notifications);
        return ResponseEntity.created(new URI("/api/notifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notifications : Updates an existing notifications.
     *
     * @param notifications the notifications to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notifications,
     * or with status 400 (Bad Request) if the notifications is not valid,
     * or with status 500 (Internal Server Error) if the notifications couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notifications")
    public ResponseEntity<Notifications> updateNotifications(@RequestBody Notifications notifications) throws URISyntaxException {
        log.debug("REST request to update Notifications : {}", notifications);
        if (notifications.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Notifications result = notificationsRepository.save(notifications);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notifications.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notifications : get all the notifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notifications in body
     */
    @GetMapping("/notifications")
    public List<Notifications> getAllNotifications() {
        log.debug("REST request to get all Notifications");
        return notificationsRepository.findAll();
    }

    /**
     * GET  /notifications/:id : get the "id" notifications.
     *
     * @param id the id of the notifications to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notifications, or with status 404 (Not Found)
     */
    @GetMapping("/notifications/{id}")
    public ResponseEntity<Notifications> getNotifications(@PathVariable Long id) {
        log.debug("REST request to get Notifications : {}", id);
        Optional<Notifications> notifications = notificationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(notifications);
    }

    /**
     * DELETE  /notifications/:id : delete the "id" notifications.
     *
     * @param id the id of the notifications to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<Void> deleteNotifications(@PathVariable Long id) {
        log.debug("REST request to delete Notifications : {}", id);
        notificationsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
