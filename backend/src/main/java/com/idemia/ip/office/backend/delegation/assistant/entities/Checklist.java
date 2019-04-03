package com.idemia.ip.office.backend.delegation.assistant.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "checklist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Checklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @NaturalId
    @Column(name = "country_iso", nullable = false, length = 3)
    private String countryISO3;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "checklist_id")
    private List<Task> tasks = new ArrayList<>();

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }

        if (!(object instanceof Checklist)) {
            return false;
        }
        Checklist checklist = (Checklist) object;

        return new EqualsBuilder()
                .append(getCountryISO3(), checklist.getCountryISO3())
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(getCountryISO3())
                .toHashCode();
    }
}
