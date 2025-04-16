package cc.lik.timeline;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Optional;

import cc.lik.timeline.entity.Timeline;
import cc.lik.timeline.service.TimelineService;
import cc.lik.timeline.util.PinyinUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.theme.TemplateNameResolver;
import org.springframework.http.MediaType;
import run.halo.app.theme.router.UrlContextListResult;

@Slf4j
@Configuration
@AllArgsConstructor
public class TimelineRouter {

    private final TemplateNameResolver templateNameResolver;
    private final ReactiveExtensionClient client;
    private final TimelineService timelineSvc;

    private List<Timeline> FormatDate(List<Timeline> timelines) {
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        timelines.forEach(timeline -> {
            try {
                String timestamp = timeline.getSpec().getTimestamp();
                // 处理 ISO 8601 格式的时间戳
                if (timestamp.contains("T")) {
                    Instant instant = Instant.parse(timestamp);
                    LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                    timeline.getSpec().setTimestamp(dateTime.format(outputFormatter));
                } else {
                    // 处理原有格式
                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                    LocalDateTime dateTime = LocalDateTime.parse(timestamp, inputFormatter);
                    timeline.getSpec().setTimestamp(dateTime.format(outputFormatter));
                }
            } catch (Exception e) {
                log.warn("时间格式化失败: {}", e.getMessage());
            }
        });
        return timelines;
    }

    @Bean
    RouterFunction<ServerResponse> timelineRouterFunction() {
        return route(GET("/timelines"), this::renderTimelinePage)
            .andRoute(GET("/timelines/{type}"), this::renderTimelineTypePage);
    }

    private Mono<ServerResponse> renderTimelinePage(ServerRequest request) {
        log.info("开始渲染时间线首页");
        return timelineSvc.getConfigByGroupName()
            .flatMap(config -> timelineSvc.listAll()
                .collectList()
                .flatMap(timelines -> {
                    Map<String, Object> model = new HashMap<>();
                    model.put("settings", config);
                    model.put("timelines", FormatDate(timelines));
                    model.put("timelineTypes", getTimelineTypes(timelines));
                    model.put("type", ""); // 空字符串表示首页
                    return templateNameResolver.resolveTemplateNameOrDefault(request.exchange(), "timeline")
                        .flatMap(templateName -> ServerResponse.ok()
                            .render(templateName, model));
                }))
            .onErrorResume(e -> {
                log.error("渲染时间线首页失败", e);
                return ServerResponse.status(INTERNAL_SERVER_ERROR)
                    .bodyValue("渲染时间线首页失败: " + e.getMessage());
            });
    }

    private Mono<ServerResponse> renderTimelineTypePage(ServerRequest request) {
        String type = request.pathVariable("type");
        log.info("开始渲染类型[{}]的时间线页面", type);
        
        return timelineSvc.getConfigByGroupName()
            .flatMap(config -> timelineSvc.listAll()
                .collectList()
                .flatMap(allTimelines -> {
                    List<Timeline> typeTimelines = "all".equals(type) ? 
                        allTimelines : 
                        filterTimelinesByType(allTimelines, type);
                    
                    Map<String, Object> model = new HashMap<>();
                    model.put("settings", config);
                    model.put("timelines", FormatDate(typeTimelines));
                    model.put("timelineTypes", getTimelineTypes(allTimelines));
                    model.put("type", type);
                    return templateNameResolver.resolveTemplateNameOrDefault(request.exchange(), "timeline")
                        .flatMap(templateName -> ServerResponse.ok()
                            .render(templateName, model));
                }))
            .onErrorResume(e -> {
                log.error("渲染类型时间线页面失败", e);
                return ServerResponse.status(INTERNAL_SERVER_ERROR)
                    .bodyValue("渲染类型时间线页面失败: " + e.getMessage());
            });
    }

    private List<Map<String, String>> getTimelineTypes(List<Timeline> timelines) {
        return timelines.stream()
            .map(timeline -> timeline.getSpec().getType())
            .distinct()
            .map(type -> {
                Map<String, String> typeMap = new HashMap<>();
                typeMap.put("label", type);
                typeMap.put("value", PinyinUtil.getFirstLetters(type));
                return typeMap;
            })
            .sorted((a, b) -> a.get("value").compareTo(b.get("value")))
            .collect(Collectors.toList());
    }

    private List<Timeline> filterTimelinesByType(List<Timeline> timelines, String type) {
        return timelines.stream()
            .filter(timeline -> {
                String timelineType = PinyinUtil.getFirstLetters(timeline.getSpec().getType());
                return timelineType.equals(type);
            })
            .collect(Collectors.toList());
    }
} 