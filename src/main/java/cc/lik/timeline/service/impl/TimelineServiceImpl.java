package cc.lik.timeline.service.impl;

import cc.lik.timeline.TimelineQuery;
import cc.lik.timeline.entity.Timeline;
import cc.lik.timeline.service.TimelineService;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.UtilityClass;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.infra.ExternalUrlSupplier;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.notification.NotificationCenter;
import run.halo.app.notification.NotificationReasonEmitter;

@Service
@RequiredArgsConstructor
public class TimelineServiceImpl implements TimelineService {

    private final ReactiveExtensionClient client;

    private final NotificationReasonEmitter notificationReasonEmitter;

    private final NotificationCenter notificationCenter;

    private final ExternalUrlSupplier externalUrlSupplier;

    @Override
    public Mono<ListResult<Timeline>> listTimeline(TimelineQuery query) {
        return client.listBy(Timeline.class, query.toListOptions(),
            PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort()));
    }

}
