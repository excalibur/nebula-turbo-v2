package com.duobei.forester.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
@Getter
@Setter
@Entity
@Table(name = "role")
public class Role extends AbstractEntity<Long> {
    private String name;
    private String title;

}
