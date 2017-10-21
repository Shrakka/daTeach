module.exports = {

    match: function(query, base) {
        return base
        // .filter(course => {
        //     course.lesson.author.role !== query.role;
        // })
        // .filter(course => {
        //     distanceFilter(course.lesson.location, query.location);
        // })
        // .filter(course => {
        //     topicsFilter(course.lesson.topics, query.topics)
        // })
  //      .sort(sortLessons(query));
    },

    distanceFilter: function(d1, d2) {
        return true;
    },

    topicsFilter: function(t1, t2) {
        t1.forEach(t => {
            if(t2.includes(t1)) return true;
        });
        return false;
    },

    sortLessons: function(query) {
        return function(l1, l2) {
            var score1 = 0;
            var score2 = 0;
            return 1;

/*
            // MOVING COEF
            switch(query.lesson.moving) {
                case 'both':
                    score1 = 1;
                    score2 = 1;
                    break;
                case 'host':
                    if(l1.lesson.moving === 'both' || l1.lesson.moving === 'move') {
                        score1 = 2;
                    } else {
                        score1 = 1;
                    }
                    if(l2.lesson.moving === 'both' || l2.lesson.moving === 'move') {
                        score2 = 2;
                    } else {
                        score2 = 1;
                    }
                    break;
                case 'move':
                    if(l1.lesson.moving === 'both' || l1.lesson.moving === 'host') {
                        score1 = 2;
                    } else {
                        score1 = 1;
                    }
                    if(l2.lesson.moving === 'both' || l2.lesson.moving === 'host') {
                        score2 = 2;
                    } else {
                        score2 = 1;
                    }
                    break;
            }

            // COMMON TOPICS COEF
            l1.lesson.topics.forEach(t => {
                if(query.lesson.topics.includes(t)) {
                    score1 = score1 + 0.5;
                }
            })
            l2.lesson.topics.forEach(t => {
                if(query.lesson.topics.includes(t)) {
                    score2 = score2 + 0.5;
                }
            })

            // REGULAR OR PUNCTUAL COEF
            switch(query.lesson.type) {
                case 'regular':
                    if(l1.lesson.type === 'regular') {
                        score1 = score1 * 2;
                    }
                    if(l2.lesson.type === 'regular') {
                        score2 = score1 * 2;
                    }
                    break;
                case 'punctual':
                    var p1 = 1;
                    var p2 = 1;

                    query.lesson.dates.forEach(d => {
                        if(l1.lesson.dates.includes(d)) {
                            p1 = p1 + 1;
                        }
                    });

                    query.lesson.dates.forEach(d => {
                        if(l2.lesson.dates.includes(d)) {
                            p2 = p2 + 1;
                        }
                    });
                    // NB si l1 et l2 sont regular de toute maniere p1 et p2 reste a +1

                    score1 = score1 * p1;
                    score2 = score2 * p2;
                    break;
            }
            
            return score1 - score2;
*/
        };
    },

}