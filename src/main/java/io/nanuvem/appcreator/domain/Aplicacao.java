package io.nanuvem.appcreator.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Aplicacao.
 */
@Entity
@Table(name = "aplicacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aplicacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "chave")
    private String chave;

    @ManyToOne
    @JsonIgnoreProperties("aplicacaos")
    private Projeto projeto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Aplicacao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getChave() {
        return chave;
    }

    public Aplicacao chave(String chave) {
        this.chave = chave;
        return this;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public Projeto getProjeto() {
        return projeto;
    }

    public Aplicacao projeto(Projeto projeto) {
        this.projeto = projeto;
        return this;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aplicacao)) {
            return false;
        }
        return id != null && id.equals(((Aplicacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Aplicacao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", chave='" + getChave() + "'" +
            "}";
    }
}
