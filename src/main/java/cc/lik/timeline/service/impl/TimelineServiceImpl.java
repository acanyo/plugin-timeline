package cc.lik.timeline.service.impl;

import cc.lik.timeline.TimelineQuery;
import cc.lik.timeline.dto.BaseConfig;
import cc.lik.timeline.entity.Timeline;
import cc.lik.timeline.service.TimelineService;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;
import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.router.selector.FieldSelector;
import run.halo.app.infra.ExternalUrlSupplier;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.notification.NotificationCenter;
import run.halo.app.notification.NotificationReasonEmitter;
import run.halo.app.plugin.ReactiveSettingFetcher;

import static run.halo.app.extension.index.query.QueryFactory.all;
import static run.halo.app.extension.index.query.QueryFactory.equal;

@Service
@RequiredArgsConstructor
public class TimelineServiceImpl implements TimelineService {

    private final ReactiveExtensionClient client;

    private final ReactiveSettingFetcher settingFetcher;

    @Override
    public Mono<ListResult<Timeline>> listTimeline(TimelineQuery query) {
        return client.listBy(Timeline.class, query.toListOptions(),
            PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort()));
    }

    @Override
    public Mono<BaseConfig> getConfigByGroupName() {
        return settingFetcher.get("base")
            .switchIfEmpty(Mono.error(new RuntimeException("配置不存在")))
            .flatMap(item -> {
                BaseConfig config = new BaseConfig(
                    item.path("title").asText("时间轴"),
                    item.path("bgImages").asText("https://assets.codepen.io/3364143/7btrrd.mp4"),
                    item.path("opacity_val").asText("0.5")
                );
                return Mono.just(config);
            });
    }

    @Override
    public Flux<Timeline> listAll() {
        var listOptions = new ListOptions();
        var query = all();
        listOptions.setFieldSelector(FieldSelector.of(query));
        return client.listAll(Timeline.class, listOptions, defaultSort())
            .flatMap(Mono::just);
    }

    @Override
    public Flux<Timeline> findByType(String type) {
        Assert.hasText(type, "类型不能为空");
        var listOptions = new ListOptions();
        var query = equal("spec.type", type);
        listOptions.setFieldSelector(FieldSelector.of(query));
        return client.listAll(Timeline.class, listOptions, defaultSort())
            .flatMap(Mono::just);
    }

    static Sort defaultSort() {
        return Sort.by("spec.timestamp").descending();
    }
}
