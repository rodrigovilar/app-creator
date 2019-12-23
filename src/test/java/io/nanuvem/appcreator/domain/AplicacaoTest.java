package io.nanuvem.appcreator.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.nanuvem.appcreator.web.rest.TestUtil;

public class AplicacaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aplicacao.class);
        Aplicacao aplicacao1 = new Aplicacao();
        aplicacao1.setId(1L);
        Aplicacao aplicacao2 = new Aplicacao();
        aplicacao2.setId(aplicacao1.getId());
        assertThat(aplicacao1).isEqualTo(aplicacao2);
        aplicacao2.setId(2L);
        assertThat(aplicacao1).isNotEqualTo(aplicacao2);
        aplicacao1.setId(null);
        assertThat(aplicacao1).isNotEqualTo(aplicacao2);
    }
}
