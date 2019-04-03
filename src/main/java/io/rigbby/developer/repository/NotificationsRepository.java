package io.rigbby.developer.repository;

import io.rigbby.developer.domain.Notifications;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Notifications entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Long> {

    @Query("select notifications from Notifications notifications where notifications.user.login = ?#{principal.username}")
    List<Notifications> findByUserIsCurrentUser();

}
