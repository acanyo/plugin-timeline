package com.xhhao.timeline.service.impl;

import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import com.xhhao.timeline.TimelinQuery;
import com.xhhao.timeline.extension.Timeline;
import com.xhhao.timeline.service.TimelineService;

/**
 * Service implementation for {@link Timeline}.
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
public class TimelineServiceImpl implements TimelineService {

    private final ReactiveExtensionClient client;

    public TimelineServiceImpl(ReactiveExtensionClient client) {
        this.client = client;
    }

    @Override
    public Mono<ListResult<Timeline>> listTimeline(TimelinQuery query) {
        return this.client.listBy(
            Timeline.class,
            query.toListOptions(),
            PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort())
        );
    }
}
