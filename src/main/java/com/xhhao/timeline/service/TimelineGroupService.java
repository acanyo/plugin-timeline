package com.xhhao.timeline.service;

import com.xhhao.timeline.TimelineGroupQuery;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.router.IListRequest.QueryListRequest;
import com.xhhao.timeline.extension.TimelineGroup;

/**
 * A service for {@link TimelineGroup}.
 *
 * @author Handsome
 * @since 1.0.0
 */
public interface TimelineGroupService {
    
    /**
     * List timeline groups.
     *
     * @param query@return a mono of list result
     */
    Mono<ListResult<TimelineGroup>> listTimelineGroup(TimelineGroupQuery query);
    
    /**
     * Delete a timeline group and all its timelines.
     *
     * @param name name
     * @return a mono of timeline group
     */
    Mono<TimelineGroup> deleteTimelineGroup(String name);
    
}
