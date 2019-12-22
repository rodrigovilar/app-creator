package io.nanuvem.appcreator.repository;

import io.nanuvem.appcreator.domain.Aplicacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Aplicacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacaoRepository extends JpaRepository<Aplicacao, Long> {

}
