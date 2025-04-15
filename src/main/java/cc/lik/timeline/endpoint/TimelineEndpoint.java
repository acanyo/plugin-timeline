package cc.lik.timeline.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;

import cc.lik.timeline.TimelineQuery;
import cc.lik.timeline.entity.Timeline;
import cc.lik.timeline.service.TimelineService;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.ListResult;

@Slf4j
@Component
@RequiredArgsConstructor
public class TimelineEndpoint implements CustomEndpoint {
    private final TimelineService timelineSvc;
    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.timeline.lik.cc/v1alpha1/timelines";
        return SpringdocRouteBuilder.route()
            .GET("timelines", this::listTimeline, builder -> {
                    builder.operationId("List Timelines")
                        .tag(tag)
                        .description("分页查询时间列表")
                        .response(
                            responseBuilder()
                                .implementation(ListResult.generateGenericClass(Timeline.class))
                        );
                TimelineQuery.buildParameters(builder);
                }
            )
            .build();
    }

    Mono<ServerResponse> listTimeline(ServerRequest serverRequest) {
        TimelineQuery timelineQuery = new TimelineQuery(serverRequest);
        return timelineSvc.listTimeline(timelineQuery)
            .flatMap(timelines -> ServerResponse.ok().bodyValue(timelines));
    }


    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.timeline.lik.cc/v1alpha1");
    }

}
