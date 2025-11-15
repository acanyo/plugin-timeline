package com.xhhao.timeline;

import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static run.halo.app.extension.router.QueryParamBuildUtil.sortParameter;

import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springdoc.core.fn.builders.operation.Builder;
import org.springframework.lang.Nullable;
import org.springframework.web.server.ServerWebExchange;
import run.halo.app.extension.router.IListRequest;
import run.halo.app.extension.router.SortableRequest;

import com.xhhao.timeline.extension.Timeline;

/**
 * A query object for {@link Timeline} list.
 *
 * @author Handsome
 * @since 1.0.0
 */
public class TimelinQuery extends SortableRequest {

    public TimelinQuery(ServerWebExchange exchange) {
        super(exchange);
    }

    @Schema(description = "Timelines filtered by group.")
    public String getGroup() {
        return queryParams.getFirst("group");
    }

    @Nullable
    @Schema(description = "Timelines filtered by keyword.")
    public String getKeyword() {
        return queryParams.getFirst("keyword");
    }

    public static void buildParameters(Builder builder) {
        IListRequest.buildParameters(builder);
        builder.parameter(sortParameter())
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("keyword")
                .description("Timelines filtered by keyword.")
                .implementation(String.class)
                .required(false))
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("group")
                .description("Timeline group name")
                .implementation(String.class)
                .required(false))
        ;
    }
}
