package io.rigbby.developer.repository;

import io.rigbby.developer.domain.MorningSessions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MorningSessions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MorningSessionsRepository extends JpaRepository<MorningSessions, Long> {

}
