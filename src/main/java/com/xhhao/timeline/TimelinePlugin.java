package com.xhhao.timeline;

import static run.halo.app.extension.index.IndexAttributeFactory.simpleAttribute;

import com.xhhao.timeline.extension.Timeline;
import com.xhhao.timeline.extension.TimelineGroup;
import org.springframework.stereotype.Component;
import run.halo.app.extension.Scheme;
import run.halo.app.extension.SchemeManager;
import run.halo.app.extension.index.IndexSpec;
import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

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
        schemeManager.register(Timeline.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.groupName")
            .setIndexFunc(
                simpleAttribute(Timeline.class, timeline -> timeline.getSpec().getGroupName()))));

        schemeManager.register(Timeline.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.date")
            .setIndexFunc(
                simpleAttribute(Timeline.class, timeline -> timeline.getSpec().getDate()))));

        schemeManager.register(Timeline.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.description")
            .setIndexFunc(
                simpleAttribute(Timeline.class, timeline -> timeline.getSpec().getDescription()))));

        schemeManager.register(Timeline.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.active")
            .setIndexFunc(
                simpleAttribute(Timeline.class, timeline -> 
                    timeline.getSpec().getActive() != null ? String.valueOf(timeline.getSpec().getActive()) : null))));

        schemeManager.register(Timeline.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.postName")
            .setIndexFunc(
                simpleAttribute(Timeline.class, timeline -> timeline.getSpec().getPostName()))));

        // Register TimelineGroup indexes
        schemeManager.register(TimelineGroup.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.priority")
            .setIndexFunc(
                simpleAttribute(TimelineGroup.class, group -> String.valueOf(
                    group.getSpec().getPriority() != null ? group.getSpec().getPriority() : 0)))));

        schemeManager.register(TimelineGroup.class, indexSpecs -> indexSpecs.add(new IndexSpec()
            .setName("spec.displayName")
            .setIndexFunc(
                simpleAttribute(TimelineGroup.class, group -> group.getSpec().getDisplayName()))));

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
