package cc.lik.timeline.entity;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.NOT_REQUIRED;
import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import run.halo.app.extension.AbstractExtension;
import run.halo.app.extension.GVK;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
@GVK(
    group = "timeline.lik.cc",
    version = "v1alpha1",
    kind = "Timeline",
    singular = "timeline",
    plural = "timeline"
)
public class Timeline extends AbstractExtension {
    @Schema(requiredMode = REQUIRED)
    private TimelineSpec spec;
    @Data
    public static class TimelineSpec {
        @Schema(description = "事件标题", requiredMode = REQUIRED)
        private String title;

        @Schema(description = "事件描述", requiredMode = NOT_REQUIRED)
        private String description;

        @Schema(description = "事件发生时间", requiredMode = REQUIRED)
        private String timestamp; // 建议使用 ISO-8601 字符串格式，如 "2025-04-15T10:00:00Z"

        @Schema(description = "事件类型", requiredMode = REQUIRED)
        private String type;

        @Schema(description = "标签列表", requiredMode = NOT_REQUIRED)
        private List<String> tags;

        @Schema(description = "关联文章", requiredMode = NOT_REQUIRED)
        private String relatedArticle;

        @Schema(description = "图片", requiredMode = NOT_REQUIRED)
        private String illustrated;

        @Schema(description = "是否置顶", requiredMode = NOT_REQUIRED)
        private Boolean pinned = false;

        @Schema(description = "是否对外可见", requiredMode = NOT_REQUIRED)
        private Boolean visible = true;
    }
}
