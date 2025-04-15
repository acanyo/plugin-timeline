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

import cc.lik.timeline.entity.Timeline;
import cc.lik.timeline.service.TimelineService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.theme.TemplateNameResolver;
import org.springframework.http.MediaType;

@Slf4j
@Configuration
@AllArgsConstructor
public class TimelineRouter {

    private final TemplateNameResolver templateNameResolver;
    private final ReactiveExtensionClient client;
    private final TimelineService timelineSvc;

    @Bean
    RouterFunction<ServerResponse> timelineRouterFunction() {
        return route(GET("/timelines"), this::renderTimelinePage);
    }

    private Mono<ServerResponse> renderTimelinePage(ServerRequest request) {
        log.info("开始渲染时间线页面");
        return timelineSvc.getConfigByGroupName()
            .flatMap(config -> {
                log.info("获取到配置信息: {}", config);
                // 按时间戳倒序排序
                Comparator<Timeline> comparator =
                    (t1, t2) -> t2.getSpec().getTimestamp()
                        .compareTo(t1.getSpec().getTimestamp());

                return timelineSvc.listAll()
                    .collectList()
                    .flatMap(timelines -> {
                        log.info("获取到时间线数据: {}", timelines);
                        Map<String, Object> model = new HashMap<>();
                        model.put("settings", config);
                        model.put("timelines", FormatDate(timelines));
                        return templateNameResolver.resolveTemplateNameOrDefault(
                                request.exchange(),
                                "timeline"
                            )
                            .flatMap(templateName -> {
                                log.info("使用模板: {}", templateName);
                                return ServerResponse.ok()
                                    .render(templateName, model);
                            });
                    });
            })
            .onErrorResume(e -> {
                log.error("渲染时间线页面失败", e);
                return ServerResponse.status(INTERNAL_SERVER_ERROR)
                    .bodyValue("渲染时间线页面失败: " + e.getMessage());
            });
    }
    private List<Timeline> FormatDate(List<Timeline> timelines) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return timelines.stream()
                .map(timeline -> {
                    String timestamp = timeline.getSpec().getTimestamp();
                    try {
                        // 解析 ISO 格式的时间戳
                        Instant instant = Instant.parse(timestamp);
                        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                        timeline.getSpec().setTimestamp(dateTime.format(formatter));
                    } catch (Exception e) {
                        log.error("格式化时间出错: {}", e.getMessage());
                    }
                    return timeline;
                })
                .collect(Collectors.toList());
    }
} 