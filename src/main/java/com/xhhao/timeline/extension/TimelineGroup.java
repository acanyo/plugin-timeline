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

/**
 * TimelineGroup 时间轴分组扩展实体
 * 用于管理时间轴的分组分类
 *
 * @author Handsome
 * @since 1.0.0
 */
@Data
@ToString(callSuper = true)
@GVK(kind = TimelineGroup.KIND, group = "timeline.xhhao.com",
    version = Constant.VERSION, singular = "timelinegroup", plural = "timelinegroups")
@EqualsAndHashCode(callSuper = true)
public class TimelineGroup extends AbstractExtension {

    public static final String KIND = "TimelineGroup";

    @Schema(requiredMode = REQUIRED, description = "分组规格")
    private Spec spec;

    @Schema(description = "分组状态")
    private TimelineGroupStatus status;

    /**
     * 分组规格定义
     */
    @Data
    @Schema(description = "分组规格")
    public static class Spec {

        @Schema(requiredMode = REQUIRED, description = "分组名称", example = "项目开发")
        private String displayName;

        @Schema(description = "排序优先级，数字越小越靠前", example = "0")
        private Integer priority;
    }

    /**
     * 分组状态定义
     */
    @Data
    @Schema(description = "分组状态")
    public static class TimelineGroupStatus {

        @Schema(description = "该分组下的时间轴数量")
        private Integer timelineCount;
    }

    /**
     * 获取状态，如果为 null 则返回默认状态
     *
     * @return 分组状态
     */
    @JsonIgnore
    public TimelineGroupStatus getStatusOrDefault() {
        if (this.status == null) {
            this.status = new TimelineGroupStatus();
        }
        return this.status;
    }
}

