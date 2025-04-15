package cc.lik.timeline;

import cc.lik.timeline.entity.Timeline;
import org.springframework.stereotype.Component;
import run.halo.app.extension.Scheme;
import run.halo.app.extension.SchemeManager;
import run.halo.app.extension.index.IndexSpec;
import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;
import java.util.Set;

import static run.halo.app.extension.index.IndexAttributeFactory.multiValueAttribute;
import static run.halo.app.extension.index.IndexAttributeFactory.simpleAttribute;

/**
 * <p>Plugin main class to manage the lifecycle of the plugin.</p>
 * <p>This class must be public and have a public constructor.</p>
 * <p>Only one main class extending {@link BasePlugin} is allowed per plugin.</p>
 *
 * @author guqing
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
        schemeManager.register(Timeline.class, indexSpecs -> {
            indexSpecs.add(new IndexSpec()
                .setName("spec.title")
                .setIndexFunc(
                    simpleAttribute(Timeline.class,
                        timeline -> timeline.getSpec().getTitle())));
        });
    }

    @Override
    public void stop() {
        schemeManager.unregister(Scheme.buildFromType(Timeline.class));
    }
}
