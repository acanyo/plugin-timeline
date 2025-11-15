package com.xhhao.timeline.extension;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import run.halo.app.core.extension.attachment.Constant;
import run.halo.app.extension.AbstractExtension;
import run.halo.app.extension.GVK;
import java.util.Objects;


@Data
@ToString(callSuper = true)
@GVK(kind = Timeline.KIND, group = "timeline.xhhao.com",
    version = Constant.VERSION, singular = "timeline", plural = "timelines")
@EqualsAndHashCode(callSuper = true)
public class Timeline extends AbstractExtension {

    public static final String KIND = "timeline";

    @Schema(requiredMode = REQUIRED)
    private Spec spec;

    @Data
    public static class Spec {

        @Schema(requiredMode = REQUIRED, description = "所属分组名称", example = "project-dev")
        private String groupName;

        @Schema(description = "日期，格式：YYYY-MM-DD", example = "2024-01-15")
        private String date;

        @Schema(description = "描述信息", example = "项目正式启动，团队开始规划开发路线图")
        private String description;

        @Schema(description = "图片URL", example = "https://example.com/image.jpg")
        private String image;

        @Schema(description = "是否激活状态，用于高亮显示", example = "true")
        private Boolean active;

        @Schema(description = "关联的文章名称（可选），用于关联 Halo 文章")
        private String postName;
    }
    @JsonIgnore
    public boolean isDeleted() {
        return Objects.equals(true,
            getMetadata().getDeletionTimestamp() != null
        );
    }
}
