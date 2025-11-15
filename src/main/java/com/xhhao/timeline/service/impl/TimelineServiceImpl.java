package com.xhhao.timeline.service.impl;

import static run.halo.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToListOptions;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.index.query.QueryFactory;
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
            toListOptions(query),
            PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort())
        );
    }

    ListOptions toListOptions(TimelinQuery query) {
        var builder = ListOptions.builder(labelAndFieldSelectorToListOptions(
            query.getLabelSelector(), query.getFieldSelector())
        );
        if (StringUtils.isNotBlank(query.getGroup())) {
            builder.andQuery(QueryFactory.equal("spec.groupName", query.getGroup()));
        }
        return builder.build();
    }
}
