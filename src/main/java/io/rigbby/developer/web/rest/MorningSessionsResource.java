package io.rigbby.developer.web.rest;
import io.rigbby.developer.domain.MorningSessions;
import io.rigbby.developer.repository.MorningSessionsRepository;
import io.rigbby.developer.web.rest.errors.BadRequestAlertException;
import io.rigbby.developer.web.rest.util.HeaderUtil;
import io.rigbby.developer.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing MorningSessions.
 */
@RestController
@RequestMapping("/api")
public class MorningSessionsResource {

    private final Logger log = LoggerFactory.getLogger(MorningSessionsResource.class);

    private static final String ENTITY_NAME = "morningSessions";

    private final MorningSessionsRepository morningSessionsRepository;

    public MorningSessionsResource(MorningSessionsRepository morningSessionsRepository) {
        this.morningSessionsRepository = morningSessionsRepository;
    }

    /**
     * POST  /morning-sessions : Create a new morningSessions.
     *
     * @param morningSessions the morningSessions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new morningSessions, or with status 400 (Bad Request) if the morningSessions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/morning-sessions")
    public ResponseEntity<MorningSessions> createMorningSessions(@RequestBody MorningSessions morningSessions) throws URISyntaxException {
        log.debug("REST request to save MorningSessions : {}", morningSessions);
        if (morningSessions.getId() != null) {
            throw new BadRequestAlertException("A new morningSessions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MorningSessions result = morningSessionsRepository.save(morningSessions);
        return ResponseEntity.created(new URI("/api/morning-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /morning-sessions : Updates an existing morningSessions.
     *
     * @param morningSessions the morningSessions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated morningSessions,
     * or with status 400 (Bad Request) if the morningSessions is not valid,
     * or with status 500 (Internal Server Error) if the morningSessions couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/morning-sessions")
    public ResponseEntity<MorningSessions> updateMorningSessions(@RequestBody MorningSessions morningSessions) throws URISyntaxException {
        log.debug("REST request to update MorningSessions : {}", morningSessions);
        if (morningSessions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MorningSessions result = morningSessionsRepository.save(morningSessions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, morningSessions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /morning-sessions : get all the morningSessions.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of morningSessions in body
     */
    @GetMapping("/morning-sessions")
    public ResponseEntity<List<MorningSessions>> getAllMorningSessions(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("assignment-is-null".equals(filter)) {
            log.debug("REST request to get all MorningSessionss where assignment is null");
            return new ResponseEntity<>(StreamSupport
                .stream(morningSessionsRepository.findAll().spliterator(), false)
                .filter(morningSessions -> morningSessions.getAssignment() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of MorningSessions");
        Page<MorningSessions> page = morningSessionsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/morning-sessions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /morning-sessions/:id : get the "id" morningSessions.
     *
     * @param id the id of the morningSessions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the morningSessions, or with status 404 (Not Found)
     */
    @GetMapping("/morning-sessions/{id}")
    public ResponseEntity<MorningSessions> getMorningSessions(@PathVariable Long id) {
        log.debug("REST request to get MorningSessions : {}", id);
        Optional<MorningSessions> morningSessions = morningSessionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(morningSessions);
    }

    /**
     * DELETE  /morning-sessions/:id : delete the "id" morningSessions.
     *
     * @param id the id of the morningSessions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/morning-sessions/{id}")
    public ResponseEntity<Void> deleteMorningSessions(@PathVariable Long id) {
        log.debug("REST request to delete MorningSessions : {}", id);
        morningSessionsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
