package io.rigbby.developer.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Assignment entity.
 * This is an entity to hold all the generated rotas
 * @mbugua A true hipster
 */
@ApiModel(description = "The Assignment entity. This is an entity to hold all the generated rotas @mbugua A true hipster")
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * fieldName
     */
    @ApiModelProperty(value = "fieldName")
    @Column(name = "due_date")
    private ZonedDateTime dueDate;

    @Column(name = "due_day")
    private String dueDay;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "created_by")
    private ZonedDateTime createdBy;

    @OneToOne
    @JoinColumn(unique = true)
    private MorningSessions morningSession;

    @OneToOne
    @JoinColumn(unique = true)
    private Task task;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "assignment_user",
               joinColumns = @JoinColumn(name = "assignment_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDueDate() {
        return dueDate;
    }

    public Assignment dueDate(ZonedDateTime dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(ZonedDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getDueDay() {
        return dueDay;
    }

    public Assignment dueDay(String dueDay) {
        this.dueDay = dueDay;
        return this;
    }

    public void setDueDay(String dueDay) {
        this.dueDay = dueDay;
    }

    public Boolean isStatus() {
        return status;
    }

    public Assignment status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public Assignment createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getCreatedBy() {
        return createdBy;
    }

    public Assignment createdBy(ZonedDateTime createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(ZonedDateTime createdBy) {
        this.createdBy = createdBy;
    }

    public MorningSessions getMorningSession() {
        return morningSession;
    }

    public Assignment morningSession(MorningSessions morningSessions) {
        this.morningSession = morningSessions;
        return this;
    }

    public void setMorningSession(MorningSessions morningSessions) {
        this.morningSession = morningSessions;
    }

    public Task getTask() {
        return task;
    }

    public Assignment task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Assignment users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Assignment addUser(User user) {
        this.users.add(user);
        return this;
    }

    public Assignment removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
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
        Assignment assignment = (Assignment) o;
        if (assignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            ", dueDate='" + getDueDate() + "'" +
            ", dueDay='" + getDueDay() + "'" +
            ", status='" + isStatus() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            "}";
    }
}
