package com.xhhao.timeline.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static org.springdoc.webflux.core.fn.SpringdocRouteBuilder.route;

import io.swagger.v3.oas.annotations.enums.ParameterIn;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.ListResult;
import com.xhhao.timeline.TimelineGroupQuery;
import com.xhhao.timeline.extension.TimelineGroup;
import com.xhhao.timeline.service.TimelineGroupService;

/**
 * A custom endpoint for {@link TimelineGroup}.
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
@RequiredArgsConstructor
public class TimelineGroupEndpoint implements CustomEndpoint {

    private final TimelineGroupService timelineGroupService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.timeline.xhhao.com/v1alpha1/Timeline";
        return route()
            .GET("timelinegroups", this::listTimelineGroup,
                builder -> {
                    builder.operationId("ListTimelineGroups")
                        .description("List timeline groups.")
                        .tag(tag)
                        .response(responseBuilder().implementation(
                            ListResult.generateGenericClass(TimelineGroup.class))
                        );
                    TimelineGroupQuery.buildParameters(builder);
                }
            )
            .DELETE("timelinegroups/{name}", this::deleteTimelineGroup,
                builder -> builder.operationId("DeleteTimelineGroup")
                    .description("Delete timeline group.")
                    .tag(tag)
                    .parameter(parameterBuilder()
                        .name("name")
                        .in(ParameterIn.PATH)
                        .description("Timeline group name")
                        .implementation(String.class)
                        .required(true)
                    )
                    .response(responseBuilder().implementation(TimelineGroup.class))
            )
            .build();
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.timeline.xhhao.com/v1alpha1");
    }

    private Mono<ServerResponse> deleteTimelineGroup(ServerRequest serverRequest) {
        String name = serverRequest.pathVariable("name");
        if (StringUtils.isBlank(name)) {
            throw new ServerWebInputException("Timeline group name must not be blank.");
        }
        return timelineGroupService.deleteTimelineGroup(name)
            .flatMap(timelineGroup -> ServerResponse.ok().bodyValue(timelineGroup));
    }

    private Mono<ServerResponse> listTimelineGroup(ServerRequest serverRequest) {
        TimelineGroupQuery query = new TimelineGroupQuery(serverRequest.exchange());
        return timelineGroupService.listTimelineGroup(query)
            .flatMap(timelineGroups -> ServerResponse.ok().bodyValue(timelineGroups));
    }

}
