package com.xhhao.timeline.service.impl;

import static run.halo.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToListOptions;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import static run.halo.app.extension.index.query.Queries.equal;
import com.xhhao.timeline.TimelineGroupQuery;
import com.xhhao.timeline.extension.Timeline;
import com.xhhao.timeline.extension.TimelineGroup;
import com.xhhao.timeline.service.TimelineGroupService;

/**
 * Service implementation for {@link TimelineGroup}.
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
public class TimelineGroupServiceImpl implements TimelineGroupService {

    private final ReactiveExtensionClient client;

    public TimelineGroupServiceImpl(ReactiveExtensionClient client) {
        this.client = client;
    }

    @Override
    public Mono<ListResult<TimelineGroup>> listTimelineGroup(TimelineGroupQuery query) {
        return this.client.listBy(
                TimelineGroup.class,
                toListOptions(query),
                PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort())
            )
            .flatMap(listResult -> Flux.fromStream(listResult.get())
                .flatMap(this::populateTimelines)
                .collectList()
                .map(groups -> new ListResult<>(
                    listResult.getPage(),
                    listResult.getSize(),
                    listResult.getTotal(),
                    groups
                ))
            );
    }

    @Override
    public Mono<TimelineGroup> deleteTimelineGroup(String name) {
        return this.client.fetch(TimelineGroup.class, name)
            .flatMap(this.client::delete)
            .flatMap(deleted -> {
                    var listOptions = ListOptions.builder()
                        .andQuery(equal("spec.groupName", name))
                        .build();
                    return this.client.listAll(Timeline.class, listOptions, Sort.unsorted())
                        .flatMap(this.client::delete)
                        .then()
                        .thenReturn(deleted);
                }
            );
    }

    private Mono<TimelineGroup> populateTimelines(TimelineGroup timelineGroup) {
        return fetchTimelineCount(timelineGroup)
            .doOnNext(count -> timelineGroup.getStatusOrDefault().setTimelineCount(count))
            .thenReturn(timelineGroup);
    }

    Mono<Integer> fetchTimelineCount(TimelineGroup timelineGroup) {
        Assert.notNull(timelineGroup, "The timelineGroup must not be null.");
        String name = timelineGroup.getMetadata().getName();
        return client.list(
                Timeline.class,
                timeline -> !timeline.isDeleted() && timeline.getSpec().getGroupName().equals(name),
                null
            )
            .count()
            .defaultIfEmpty(0L)
            .map(Long::intValue);
    }

    ListOptions toListOptions(TimelineGroupQuery query) {
        return labelAndFieldSelectorToListOptions(
            query.getLabelSelector(), query.getFieldSelector()
        );
    }
}
