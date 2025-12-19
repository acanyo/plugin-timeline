package com.xhhao.timeline;

import com.xhhao.timeline.extension.Timeline;
import com.xhhao.timeline.extension.TimelineGroup;
import org.springframework.stereotype.Component;
import run.halo.app.extension.Scheme;
import run.halo.app.extension.SchemeManager;
import run.halo.app.extension.index.IndexSpecs;
import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

import java.util.Optional;

/**
 * <p>Plugin main class to manage the lifecycle of the plugin.</p>
 * <p>This class must be public and have a public constructor.</p>
 * <p>Only one main class extending {@link BasePlugin} is allowed per plugin.</p>
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
public class TimelinePlugin extends BasePlugin {

    private final SchemeManager schemeManager;

    public TimelinePlugin(PluginContext pluginContext, SchemeManager schemeManager) {
        super(pluginContext);
        this.schemeManager = schemeManager;
    }

    @Override
    public void start() {
        // Register Timeline indexes
        schemeManager.register(Timeline.class, indexSpecs -> {
            indexSpecs.add(IndexSpecs.<Timeline, String>single("spec.groupName", String.class)
                .indexFunc(timeline -> Optional.ofNullable(timeline.getSpec())
                    .map(Timeline.Spec::getGroupName)
                    .orElse(null)));

            indexSpecs.add(IndexSpecs.<Timeline, String>single("spec.date", String.class)
                .indexFunc(timeline -> Optional.ofNullable(timeline.getSpec())
                    .map(Timeline.Spec::getDate)
                    .orElse(null)));

            indexSpecs.add(IndexSpecs.<Timeline, String>single("spec.displayName", String.class)
                .indexFunc(timeline -> Optional.ofNullable(timeline.getSpec())
                    .map(Timeline.Spec::getDisplayName)
                    .orElse(null)));

            indexSpecs.add(IndexSpecs.<Timeline, String>single("spec.active", String.class)
                .indexFunc(timeline -> Optional.ofNullable(timeline.getSpec())
                    .map(Timeline.Spec::getActive)
                    .map(String::valueOf)
                    .orElse(null)));

            indexSpecs.add(IndexSpecs.<Timeline, String>single("spec.relatedLinks", String.class)
                .indexFunc(timeline -> Optional.ofNullable(timeline.getSpec())
                    .map(Timeline.Spec::getRelatedLinks)
                    .orElse(null)));
        });

        // Register TimelineGroup indexes
        schemeManager.register(TimelineGroup.class, indexSpecs -> {
            indexSpecs.add(IndexSpecs.<TimelineGroup, String>single("spec.priority", String.class)
                .indexFunc(group -> Optional.ofNullable(group.getSpec())
                    .map(TimelineGroup.Spec::getPriority)
                    .map(p -> String.valueOf(p != null ? p : 0))
                    .orElse("0")));

            indexSpecs.add(IndexSpecs.<TimelineGroup, String>single("spec.displayName", String.class)
                .indexFunc(group -> Optional.ofNullable(group.getSpec())
                    .map(TimelineGroup.Spec::getDisplayName)
                    .orElse(null)));
        });

    }

    @Override
    public void stop() {
        Scheme timelineScheme = schemeManager.get(Timeline.class);
        Scheme timelineGroupScheme = schemeManager.get(TimelineGroup.class);
        if (timelineScheme != null) {
            schemeManager.unregister(timelineScheme);
        }
        if (timelineGroupScheme != null) {
            schemeManager.unregister(timelineGroupScheme);
        }
    }
}
