package io.rigbby.developer.domain;


import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import io.rigbby.developer.domain.enumeration.Gender;

/**
 * The Profile entity.
 * This is an entity to add a new user Profile
 * @mbugua A true hipster
 */
@ApiModel(description = "The Profile entity. This is an entity to add a new user Profile @mbugua A true hipster")
@Entity
@Table(name = "profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_of_employment")
    private ZonedDateTime dateOfEmployment;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "other_name")
    private String otherName;

    @Column(name = "git_profile")
    private String gitProfile;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Lob
    @Column(name = "bio")
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "project")
    private String project;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateOfEmployment() {
        return dateOfEmployment;
    }

    public Profile dateOfEmployment(ZonedDateTime dateOfEmployment) {
        this.dateOfEmployment = dateOfEmployment;
        return this;
    }

    public void setDateOfEmployment(ZonedDateTime dateOfEmployment) {
        this.dateOfEmployment = dateOfEmployment;
    }

    public String getFirstName() {
        return firstName;
    }

    public Profile firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public Profile secondName(String secondName) {
        this.secondName = secondName;
        return this;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getOtherName() {
        return otherName;
    }

    public Profile otherName(String otherName) {
        this.otherName = otherName;
        return this;
    }

    public void setOtherName(String otherName) {
        this.otherName = otherName;
    }

    public String getGitProfile() {
        return gitProfile;
    }

    public Profile gitProfile(String gitProfile) {
        this.gitProfile = gitProfile;
        return this;
    }

    public void setGitProfile(String gitProfile) {
        this.gitProfile = gitProfile;
    }

    public byte[] getImage() {
        return image;
    }

    public Profile image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Profile imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getBio() {
        return bio;
    }

    public Profile bio(String bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Gender getGender() {
        return gender;
    }

    public Profile gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getProject() {
        return project;
    }

    public Profile project(String project) {
        this.project = project;
        return this;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public Profile user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Profile profile = (Profile) o;
        if (profile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", dateOfEmployment='" + getDateOfEmployment() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", secondName='" + getSecondName() + "'" +
            ", otherName='" + getOtherName() + "'" +
            ", gitProfile='" + getGitProfile() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", bio='" + getBio() + "'" +
            ", gender='" + getGender() + "'" +
            ", project='" + getProject() + "'" +
            "}";
    }
}
