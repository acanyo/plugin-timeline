package cc.lik.timeline.service;

import cc.lik.timeline.TimelineQuery;
import cc.lik.timeline.dto.BaseConfig;
import cc.lik.timeline.entity.Timeline;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;

public interface TimelineService {

    Mono<ListResult<Timeline>> listTimeline(TimelineQuery query);
    Mono<BaseConfig> getConfigByGroupName();
    Flux<Timeline> listAll();

    /**
     * 根据类型查询时间线数据
     * @param type 时间线类型
     * @return 该类型的所有时间线数据，按时间戳降序排序
     */
    Flux<Timeline> findByType(String type);
}
