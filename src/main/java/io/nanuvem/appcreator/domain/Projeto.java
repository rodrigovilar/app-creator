package io.nanuvem.appcreator.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Projeto.
 */
@Entity
@Table(name = "projeto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projeto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "chave")
    private String chave;

    @OneToMany(mappedBy = "projeto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aplicacao> aplicacaos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("projetos")
    private User criador;

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

    public Projeto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getChave() {
        return chave;
    }

    public Projeto chave(String chave) {
        this.chave = chave;
        return this;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public Set<Aplicacao> getAplicacaos() {
        return aplicacaos;
    }

    public Projeto aplicacaos(Set<Aplicacao> aplicacaos) {
        this.aplicacaos = aplicacaos;
        return this;
    }

    public Projeto addAplicacao(Aplicacao aplicacao) {
        this.aplicacaos.add(aplicacao);
        aplicacao.setProjeto(this);
        return this;
    }

    public Projeto removeAplicacao(Aplicacao aplicacao) {
        this.aplicacaos.remove(aplicacao);
        aplicacao.setProjeto(null);
        return this;
    }

    public void setAplicacaos(Set<Aplicacao> aplicacaos) {
        this.aplicacaos = aplicacaos;
    }

    public User getCriador() {
        return criador;
    }

    public Projeto criador(User user) {
        this.criador = user;
        return this;
    }

    public void setCriador(User user) {
        this.criador = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projeto)) {
            return false;
        }
        return id != null && id.equals(((Projeto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Projeto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", chave='" + getChave() + "'" +
            "}";
    }
}
