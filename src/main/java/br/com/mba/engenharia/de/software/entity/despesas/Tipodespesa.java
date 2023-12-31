package br.com.mba.engenharia.de.software.entity.despesas;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipodespesas")
public class Tipodespesa {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "descr", nullable = false, length = 40)
    private String descr;

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}