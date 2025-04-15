package cc.lik.timeline;

import cc.lik.timeline.entity.Timeline;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.fn.builders.operation.Builder;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.web.reactive.function.server.ServerRequest;
import run.halo.app.core.extension.endpoint.SortResolver;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.PageRequest;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.router.IListRequest;
import run.halo.app.extension.router.SortableRequest;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.util.Comparator.comparing;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static run.halo.app.extension.index.query.QueryFactory.contains;
import static run.halo.app.extension.index.query.QueryFactory.equal;
import static run.halo.app.extension.index.query.QueryFactory.or;
import static run.halo.app.extension.router.QueryParamBuildUtil.sortParameter;

public class TimelineQuery extends SortableRequest {


    public TimelineQuery(ServerRequest request) {
        super(request.exchange());
    }

    @Nullable
    public String getKeyword() {
        return StringUtils.defaultIfBlank(queryParams.getFirst("keyword"), null);
    }

    @Nullable
    public String getAuthor() {
        return queryParams.getFirst("author");
    }

    @Nullable
    public String getTimelineType() {
        return queryParams.getFirst("timelineType");
    }

    public ListOptions toListOptions() {
        var builder = ListOptions.builder(super.toListOptions());

        Optional.ofNullable(getKeyword())
            .filter(StringUtils::isNotBlank)
            .ifPresent(keyword -> builder.andQuery(or(
                contains("title", keyword),
                contains("metadata.name", keyword)
            )));

        Optional.ofNullable(getTimelineType())
            .filter(StringUtils::isNotBlank)
            .ifPresent(type -> builder.andQuery(equal("spec.type", type)));
        return builder.build();
    }

    public Comparator<Timeline> toComparator() {
        List<Comparator<Timeline>> comparators = new ArrayList<>();
        var sort = getSort();
        var ctOrder = sort.getOrderFor("createTime");
        if (ctOrder != null) {
            Comparator<Timeline> comparator =
                comparing(timeline -> timeline.getMetadata().getCreationTimestamp());
            if (ctOrder.isDescending()) {
                comparator = comparator.reversed();
            }
            comparators.add(comparator);
        }
        Comparator<Timeline> defaultComparator =
            comparing(timeline -> timeline.getMetadata().getCreationTimestamp());
        comparators.add(defaultComparator.reversed());
        return comparators.stream()
            .reduce(Comparator::thenComparing)
            .orElse(null);
    }


    public Sort getSort() {
        var sort = SortResolver.defaultInstance.resolve(exchange);
        return sort.and(Sort.by("spec.createTime").descending());
    }

    public PageRequest toPageRequest() {
        return PageRequestImpl.of(getPage(), getSize(), getSort());
    }

    public static void buildParameters(Builder builder) {
        IListRequest.buildParameters(builder);
        builder.parameter(sortParameter())
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("keyword")
                .description("timeline filtered by keyword.")
                .implementation(String.class)
                .required(false))
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("title")
                .description("timeline filtered by author.")
                .implementation(String.class)
                .required(false))

        ;
    }


} 