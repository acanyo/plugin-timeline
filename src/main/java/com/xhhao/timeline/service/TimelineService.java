package com.xhhao.timeline.service;

import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;
import com.xhhao.timeline.TimelinQuery;
import com.xhhao.timeline.extension.Timeline;

/**
 * A service for {@link Timeline}.
 *
 * @author Handsome
 * @since 1.0.0
 */
public interface TimelineService {
    
    /**
     * List timelines.
     *
     * @param query query
     * @return a mono of list result
     */
    Mono<ListResult<Timeline>> listTimeline(TimelinQuery query);
}
