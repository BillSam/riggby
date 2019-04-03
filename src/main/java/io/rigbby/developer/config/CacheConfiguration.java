package io.rigbby.developer.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.rigbby.developer.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.rigbby.developer.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Assignment.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Assignment.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.MorningSessions.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Notifications.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Notifications.class.getName() + ".comments", jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.EventType.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.EventType.class.getName() + ".events", jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Event.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Event.class.getName() + ".comments", jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Profile.class.getName(), jcacheConfiguration);
            cm.createCache(io.rigbby.developer.domain.Comment.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
