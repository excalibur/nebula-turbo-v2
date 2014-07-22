package com.duobei.forester.security;

import org.joda.time.DateTime;
import org.joda.time.Period;
import org.junit.Test;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
public class UserAuthorizingRealmTest {

    @Test
    public void test01() throws Exception {

        DateTime now = new DateTime();
        DateTime updateTime = now.minusDays(1);
        int passwordExpiredDays = 1;

        Period period = Period.days(passwordExpiredDays);

        System.out.println(now.plus(period).isBeforeNow());
    }
}
