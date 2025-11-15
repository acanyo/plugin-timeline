package com.xhhao.timeline.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.webflux.core.fn.SpringdocRouteBuilder.route;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.ListResult;
import com.xhhao.timeline.TimelinQuery;
import com.xhhao.timeline.extension.Timeline;
import com.xhhao.timeline.service.TimelineService;

/**
 * A custom endpoint for {@link Timeline}.
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
@RequiredArgsConstructor
public class TimelineEndpoint implements CustomEndpoint {

    private final TimelineService timelineService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.timeline.xhhao.com/v1alpha1/Timeline";
        return route()
            .GET("timelines", this::listTimeline,
                builder -> {
                    builder.operationId("ListTimelines")
                        .description("List timelines.")
                        .tag(tag)
                        .response(responseBuilder().implementation(
                            ListResult.generateGenericClass(Timeline.class)));

                    TimelinQuery.buildParameters(builder);
                }
            )
            .build();
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.timeline.xhhao.com/v1alpha1");
    }

    private Mono<ServerResponse> listTimeline(ServerRequest serverRequest) {
        TimelinQuery query = new TimelinQuery(serverRequest.exchange());
        return timelineService.listTimeline(query)
            .flatMap(timelines -> ServerResponse.ok().bodyValue(timelines));
    }

}
