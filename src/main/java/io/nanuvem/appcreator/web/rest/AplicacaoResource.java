package io.nanuvem.appcreator.web.rest;

import io.nanuvem.appcreator.domain.Aplicacao;
import io.nanuvem.appcreator.repository.AplicacaoRepository;
import io.nanuvem.appcreator.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.nanuvem.appcreator.domain.Aplicacao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AplicacaoResource {

    private final Logger log = LoggerFactory.getLogger(AplicacaoResource.class);

    private static final String ENTITY_NAME = "aplicacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AplicacaoRepository aplicacaoRepository;

    public AplicacaoResource(AplicacaoRepository aplicacaoRepository) {
        this.aplicacaoRepository = aplicacaoRepository;
    }

    /**
     * {@code POST  /aplicacaos} : Create a new aplicacao.
     *
     * @param aplicacao the aplicacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aplicacao, or with status {@code 400 (Bad Request)} if the aplicacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aplicacaos")
    public ResponseEntity<Aplicacao> createAplicacao(@RequestBody Aplicacao aplicacao) throws URISyntaxException {
        log.debug("REST request to save Aplicacao : {}", aplicacao);
        if (aplicacao.getId() != null) {
            throw new BadRequestAlertException("A new aplicacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aplicacao result = aplicacaoRepository.save(aplicacao);
        return ResponseEntity.created(new URI("/api/aplicacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aplicacaos} : Updates an existing aplicacao.
     *
     * @param aplicacao the aplicacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aplicacao,
     * or with status {@code 400 (Bad Request)} if the aplicacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aplicacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aplicacaos")
    public ResponseEntity<Aplicacao> updateAplicacao(@RequestBody Aplicacao aplicacao) throws URISyntaxException {
        log.debug("REST request to update Aplicacao : {}", aplicacao);
        if (aplicacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Aplicacao result = aplicacaoRepository.save(aplicacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, aplicacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aplicacaos} : get all the aplicacaos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aplicacaos in body.
     */
    @GetMapping("/aplicacaos")
    public List<Aplicacao> getAllAplicacaos() {
        log.debug("REST request to get all Aplicacaos");
        return aplicacaoRepository.findAll();
    }

    /**
     * {@code GET  /aplicacaos/:id} : get the "id" aplicacao.
     *
     * @param id the id of the aplicacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aplicacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aplicacaos/{id}")
    public ResponseEntity<Aplicacao> getAplicacao(@PathVariable Long id) {
        log.debug("REST request to get Aplicacao : {}", id);
        Optional<Aplicacao> aplicacao = aplicacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aplicacao);
    }

    /**
     * {@code DELETE  /aplicacaos/:id} : delete the "id" aplicacao.
     *
     * @param id the id of the aplicacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aplicacaos/{id}")
    public ResponseEntity<Void> deleteAplicacao(@PathVariable Long id) {
        log.debug("REST request to delete Aplicacao : {}", id);
        aplicacaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
