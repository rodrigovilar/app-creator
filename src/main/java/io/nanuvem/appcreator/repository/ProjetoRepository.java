package io.nanuvem.appcreator.repository;

import io.nanuvem.appcreator.domain.Projeto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Projeto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    @Query("select projeto from Projeto projeto where projeto.criador.login = ?#{principal.username}")
    List<Projeto> findByCriadorIsCurrentUser();

}
