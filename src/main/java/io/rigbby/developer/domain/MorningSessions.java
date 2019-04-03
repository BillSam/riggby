package io.rigbby.developer.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * The MorningSessions entity.
 * This is an entity to hold all the engagements done at any perticular time eg morning sharing,Event,Talks
 * @mbugua A true hipster
 */
@ApiModel(description = "The MorningSessions entity. This is an entity to hold all the engagements done at any perticular time eg morning sharing,Event,Talks @mbugua A true hipster")
@Entity
@Table(name = "morning_sessions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MorningSessions implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "quote")
    private String quote;

    @Column(name = "verse")
    private String verse;

    @Lob
    @Column(name = "jhi_body")
    private String body;

    @Column(name = "created_by")
    private String createdBy;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @OneToOne(mappedBy = "morningSession")
    @JsonIgnore
    private Assignment assignment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public MorningSessions title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuote() {
        return quote;
    }

    public MorningSessions quote(String quote) {
        this.quote = quote;
        return this;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getVerse() {
        return verse;
    }

    public MorningSessions verse(String verse) {
        this.verse = verse;
        return this;
    }

    public void setVerse(String verse) {
        this.verse = verse;
    }

    public String getBody() {
        return body;
    }

    public MorningSessions body(String body) {
        this.body = body;
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public MorningSessions createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public byte[] getImage() {
        return image;
    }

    public MorningSessions image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public MorningSessions imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public MorningSessions assignment(Assignment assignment) {
        this.assignment = assignment;
        return this;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MorningSessions morningSessions = (MorningSessions) o;
        if (morningSessions.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), morningSessions.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MorningSessions{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", quote='" + getQuote() + "'" +
            ", verse='" + getVerse() + "'" +
            ", body='" + getBody() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
