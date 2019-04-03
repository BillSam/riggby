package io.rigbby.developer.repository;

import io.rigbby.developer.domain.Assignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Assignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query(value = "select distinct assignment from Assignment assignment left join fetch assignment.users",
        countQuery = "select count(distinct assignment) from Assignment assignment")
    Page<Assignment> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct assignment from Assignment assignment left join fetch assignment.users")
    List<Assignment> findAllWithEagerRelationships();

    @Query("select assignment from Assignment assignment left join fetch assignment.users where assignment.id =:id")
    Optional<Assignment> findOneWithEagerRelationships(@Param("id") Long id);

}
