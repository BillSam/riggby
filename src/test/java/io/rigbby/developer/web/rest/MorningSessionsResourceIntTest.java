package io.rigbby.developer.web.rest;

import io.rigbby.developer.RiggbyApp;

import io.rigbby.developer.domain.MorningSessions;
import io.rigbby.developer.repository.MorningSessionsRepository;
import io.rigbby.developer.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.rigbby.developer.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MorningSessionsResource REST controller.
 *
 * @see MorningSessionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RiggbyApp.class)
public class MorningSessionsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_QUOTE = "AAAAAAAAAA";
    private static final String UPDATED_QUOTE = "BBBBBBBBBB";

    private static final String DEFAULT_VERSE = "AAAAAAAAAA";
    private static final String UPDATED_VERSE = "BBBBBBBBBB";

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private MorningSessionsRepository morningSessionsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMorningSessionsMockMvc;

    private MorningSessions morningSessions;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MorningSessionsResource morningSessionsResource = new MorningSessionsResource(morningSessionsRepository);
        this.restMorningSessionsMockMvc = MockMvcBuilders.standaloneSetup(morningSessionsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MorningSessions createEntity(EntityManager em) {
        MorningSessions morningSessions = new MorningSessions()
            .title(DEFAULT_TITLE)
            .quote(DEFAULT_QUOTE)
            .verse(DEFAULT_VERSE)
            .body(DEFAULT_BODY)
            .createdBy(DEFAULT_CREATED_BY)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return morningSessions;
    }

    @Before
    public void initTest() {
        morningSessions = createEntity(em);
    }

    @Test
    @Transactional
    public void createMorningSessions() throws Exception {
        int databaseSizeBeforeCreate = morningSessionsRepository.findAll().size();

        // Create the MorningSessions
        restMorningSessionsMockMvc.perform(post("/api/morning-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(morningSessions)))
            .andExpect(status().isCreated());

        // Validate the MorningSessions in the database
        List<MorningSessions> morningSessionsList = morningSessionsRepository.findAll();
        assertThat(morningSessionsList).hasSize(databaseSizeBeforeCreate + 1);
        MorningSessions testMorningSessions = morningSessionsList.get(morningSessionsList.size() - 1);
        assertThat(testMorningSessions.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMorningSessions.getQuote()).isEqualTo(DEFAULT_QUOTE);
        assertThat(testMorningSessions.getVerse()).isEqualTo(DEFAULT_VERSE);
        assertThat(testMorningSessions.getBody()).isEqualTo(DEFAULT_BODY);
        assertThat(testMorningSessions.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testMorningSessions.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testMorningSessions.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createMorningSessionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = morningSessionsRepository.findAll().size();

        // Create the MorningSessions with an existing ID
        morningSessions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMorningSessionsMockMvc.perform(post("/api/morning-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(morningSessions)))
            .andExpect(status().isBadRequest());

        // Validate the MorningSessions in the database
        List<MorningSessions> morningSessionsList = morningSessionsRepository.findAll();
        assertThat(morningSessionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMorningSessions() throws Exception {
        // Initialize the database
        morningSessionsRepository.saveAndFlush(morningSessions);

        // Get all the morningSessionsList
        restMorningSessionsMockMvc.perform(get("/api/morning-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(morningSessions.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].quote").value(hasItem(DEFAULT_QUOTE.toString())))
            .andExpect(jsonPath("$.[*].verse").value(hasItem(DEFAULT_VERSE.toString())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getMorningSessions() throws Exception {
        // Initialize the database
        morningSessionsRepository.saveAndFlush(morningSessions);

        // Get the morningSessions
        restMorningSessionsMockMvc.perform(get("/api/morning-sessions/{id}", morningSessions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(morningSessions.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.quote").value(DEFAULT_QUOTE.toString()))
            .andExpect(jsonPath("$.verse").value(DEFAULT_VERSE.toString()))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingMorningSessions() throws Exception {
        // Get the morningSessions
        restMorningSessionsMockMvc.perform(get("/api/morning-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMorningSessions() throws Exception {
        // Initialize the database
        morningSessionsRepository.saveAndFlush(morningSessions);

        int databaseSizeBeforeUpdate = morningSessionsRepository.findAll().size();

        // Update the morningSessions
        MorningSessions updatedMorningSessions = morningSessionsRepository.findById(morningSessions.getId()).get();
        // Disconnect from session so that the updates on updatedMorningSessions are not directly saved in db
        em.detach(updatedMorningSessions);
        updatedMorningSessions
            .title(UPDATED_TITLE)
            .quote(UPDATED_QUOTE)
            .verse(UPDATED_VERSE)
            .body(UPDATED_BODY)
            .createdBy(UPDATED_CREATED_BY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restMorningSessionsMockMvc.perform(put("/api/morning-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMorningSessions)))
            .andExpect(status().isOk());

        // Validate the MorningSessions in the database
        List<MorningSessions> morningSessionsList = morningSessionsRepository.findAll();
        assertThat(morningSessionsList).hasSize(databaseSizeBeforeUpdate);
        MorningSessions testMorningSessions = morningSessionsList.get(morningSessionsList.size() - 1);
        assertThat(testMorningSessions.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMorningSessions.getQuote()).isEqualTo(UPDATED_QUOTE);
        assertThat(testMorningSessions.getVerse()).isEqualTo(UPDATED_VERSE);
        assertThat(testMorningSessions.getBody()).isEqualTo(UPDATED_BODY);
        assertThat(testMorningSessions.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testMorningSessions.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testMorningSessions.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMorningSessions() throws Exception {
        int databaseSizeBeforeUpdate = morningSessionsRepository.findAll().size();

        // Create the MorningSessions

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMorningSessionsMockMvc.perform(put("/api/morning-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(morningSessions)))
            .andExpect(status().isBadRequest());

        // Validate the MorningSessions in the database
        List<MorningSessions> morningSessionsList = morningSessionsRepository.findAll();
        assertThat(morningSessionsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMorningSessions() throws Exception {
        // Initialize the database
        morningSessionsRepository.saveAndFlush(morningSessions);

        int databaseSizeBeforeDelete = morningSessionsRepository.findAll().size();

        // Delete the morningSessions
        restMorningSessionsMockMvc.perform(delete("/api/morning-sessions/{id}", morningSessions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MorningSessions> morningSessionsList = morningSessionsRepository.findAll();
        assertThat(morningSessionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MorningSessions.class);
        MorningSessions morningSessions1 = new MorningSessions();
        morningSessions1.setId(1L);
        MorningSessions morningSessions2 = new MorningSessions();
        morningSessions2.setId(morningSessions1.getId());
        assertThat(morningSessions1).isEqualTo(morningSessions2);
        morningSessions2.setId(2L);
        assertThat(morningSessions1).isNotEqualTo(morningSessions2);
        morningSessions1.setId(null);
        assertThat(morningSessions1).isNotEqualTo(morningSessions2);
    }
}
