package com.xhhao.timeline;

import static run.halo.app.extension.router.QueryParamBuildUtil.sortParameter;

import org.springdoc.core.fn.builders.operation.Builder;
import org.springframework.web.server.ServerWebExchange;
import run.halo.app.extension.router.IListRequest;
import run.halo.app.extension.router.SortableRequest;

import com.xhhao.timeline.extension.TimelineGroup;

/**
 * A query object for {@link TimelineGroup} list.
 *
 * @author Handsome
 * @since 1.0.0
 */
public class TimelineGroupQuery extends SortableRequest {

    public TimelineGroupQuery(ServerWebExchange exchange) {
        super(exchange);
    }

    public static void buildParameters(Builder builder) {
        IListRequest.buildParameters(builder);
        builder.parameter(sortParameter());
    }
}

