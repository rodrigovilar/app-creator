package io.nanuvem.appcreator.web.rest;

import io.nanuvem.appcreator.AppCreatorApp;
import io.nanuvem.appcreator.domain.Aplicacao;
import io.nanuvem.appcreator.repository.AplicacaoRepository;
import io.nanuvem.appcreator.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.nanuvem.appcreator.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AplicacaoResource} REST controller.
 */
@SpringBootTest(classes = AppCreatorApp.class)
public class AplicacaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CHAVE = "AAAAAAAAAA";
    private static final String UPDATED_CHAVE = "BBBBBBBBBB";

    @Autowired
    private AplicacaoRepository aplicacaoRepository;

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

    private MockMvc restAplicacaoMockMvc;

    private Aplicacao aplicacao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AplicacaoResource aplicacaoResource = new AplicacaoResource(aplicacaoRepository);
        this.restAplicacaoMockMvc = MockMvcBuilders.standaloneSetup(aplicacaoResource)
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
    public static Aplicacao createEntity(EntityManager em) {
        Aplicacao aplicacao = new Aplicacao()
            .nome(DEFAULT_NOME)
            .chave(DEFAULT_CHAVE);
        return aplicacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aplicacao createUpdatedEntity(EntityManager em) {
        Aplicacao aplicacao = new Aplicacao()
            .nome(UPDATED_NOME)
            .chave(UPDATED_CHAVE);
        return aplicacao;
    }

    @BeforeEach
    public void initTest() {
        aplicacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createAplicacao() throws Exception {
        int databaseSizeBeforeCreate = aplicacaoRepository.findAll().size();

        // Create the Aplicacao
        restAplicacaoMockMvc.perform(post("/api/aplicacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacao)))
            .andExpect(status().isCreated());

        // Validate the Aplicacao in the database
        List<Aplicacao> aplicacaoList = aplicacaoRepository.findAll();
        assertThat(aplicacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Aplicacao testAplicacao = aplicacaoList.get(aplicacaoList.size() - 1);
        assertThat(testAplicacao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testAplicacao.getChave()).isEqualTo(DEFAULT_CHAVE);
    }

    @Test
    @Transactional
    public void createAplicacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aplicacaoRepository.findAll().size();

        // Create the Aplicacao with an existing ID
        aplicacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAplicacaoMockMvc.perform(post("/api/aplicacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacao)))
            .andExpect(status().isBadRequest());

        // Validate the Aplicacao in the database
        List<Aplicacao> aplicacaoList = aplicacaoRepository.findAll();
        assertThat(aplicacaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAplicacaos() throws Exception {
        // Initialize the database
        aplicacaoRepository.saveAndFlush(aplicacao);

        // Get all the aplicacaoList
        restAplicacaoMockMvc.perform(get("/api/aplicacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aplicacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].chave").value(hasItem(DEFAULT_CHAVE)));
    }
    
    @Test
    @Transactional
    public void getAplicacao() throws Exception {
        // Initialize the database
        aplicacaoRepository.saveAndFlush(aplicacao);

        // Get the aplicacao
        restAplicacaoMockMvc.perform(get("/api/aplicacaos/{id}", aplicacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aplicacao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.chave").value(DEFAULT_CHAVE));
    }

    @Test
    @Transactional
    public void getNonExistingAplicacao() throws Exception {
        // Get the aplicacao
        restAplicacaoMockMvc.perform(get("/api/aplicacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAplicacao() throws Exception {
        // Initialize the database
        aplicacaoRepository.saveAndFlush(aplicacao);

        int databaseSizeBeforeUpdate = aplicacaoRepository.findAll().size();

        // Update the aplicacao
        Aplicacao updatedAplicacao = aplicacaoRepository.findById(aplicacao.getId()).get();
        // Disconnect from session so that the updates on updatedAplicacao are not directly saved in db
        em.detach(updatedAplicacao);
        updatedAplicacao
            .nome(UPDATED_NOME)
            .chave(UPDATED_CHAVE);

        restAplicacaoMockMvc.perform(put("/api/aplicacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAplicacao)))
            .andExpect(status().isOk());

        // Validate the Aplicacao in the database
        List<Aplicacao> aplicacaoList = aplicacaoRepository.findAll();
        assertThat(aplicacaoList).hasSize(databaseSizeBeforeUpdate);
        Aplicacao testAplicacao = aplicacaoList.get(aplicacaoList.size() - 1);
        assertThat(testAplicacao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAplicacao.getChave()).isEqualTo(UPDATED_CHAVE);
    }

    @Test
    @Transactional
    public void updateNonExistingAplicacao() throws Exception {
        int databaseSizeBeforeUpdate = aplicacaoRepository.findAll().size();

        // Create the Aplicacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAplicacaoMockMvc.perform(put("/api/aplicacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacao)))
            .andExpect(status().isBadRequest());

        // Validate the Aplicacao in the database
        List<Aplicacao> aplicacaoList = aplicacaoRepository.findAll();
        assertThat(aplicacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAplicacao() throws Exception {
        // Initialize the database
        aplicacaoRepository.saveAndFlush(aplicacao);

        int databaseSizeBeforeDelete = aplicacaoRepository.findAll().size();

        // Delete the aplicacao
        restAplicacaoMockMvc.perform(delete("/api/aplicacaos/{id}", aplicacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aplicacao> aplicacaoList = aplicacaoRepository.findAll();
        assertThat(aplicacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
