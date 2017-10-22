module.exports = {

    match: function(query, base) {
        return base
        .filter(course => {
            return true; // course.lesson.active 
        })
        .filter(course => {
            return course.lesson.author.role !== query.role;
        })
        .filter(course => {
            return distanceFilter(course.lesson.location, query.location);
        })
        .filter(course => {
            return topicsFilter(course.lesson.topics, query.topics)
        })
        .sort(sortLessons(query));
        ;
    },
    distanceFilter: distanceFilter,
    topicsFilter: topicsFilter,
    sortLessons: sortLessons
}

function distanceFilter(d1, d2) {
    return true;
}

function topicsFilter(t1, t2) {
    for (var t of t1) {
        if(t2.includes(t)) return true;
    }
    return false;
}

function sortLessons(query) {
    return function(l1, l2) {
        // MOVING COEF
        switch(query.moving) {
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
        for (let t of query.topics) {
            if(l1.lesson.topics.includes(t)) {
                score1 = score1 + 0.5;
            }
            if(l2.lesson.topics.includes(t)) {
                score2 = score2 + 0.5;
            }
        }

        // REGULAR OR PUNCTUAL COEF
        switch(query.type) {
            case 'regular':
                if(l1.lesson.type === 'regular') {
                    score1 = score1 * 2;
                }
                if(l2.lesson.type === 'regular') {
                    score2 = score2 * 2;
                }
                break;
            case 'punctual':
                var p1 = 1;
                var p2 = 1;

                for (let d of query.dates) {
                    if (l1.lesson.dates.includes(d)) {
                        p1 = p1 + 1;
                    }
                    if(l2.lesson.dates.includes(d)) {
                        p2 = p2 + 1;
                    }
                }
                // NB si l1 et l2 sont regular de toute maniere p1 et p2 reste a +1

                score1 = score1 * p1;
                score2 = score2 * p2;
                break;
        }
        
        return score2 - score1;
    }
}
