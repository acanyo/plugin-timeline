package cc.lik.timeline;

import lombok.RequiredArgsConstructor;
import org.pf4j.PluginWrapper;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

import java.util.Properties;

@Component
@RequiredArgsConstructor
public class TimelineHeadProcessor implements TemplateHeadProcessor {

    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER =
        new PropertyPlaceholderHelper("${", "}");

    private final PluginWrapper pluginWrapper;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        
        Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());

        String script = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders("""
            <!-- timeline start -->
            <link rel="stylesheet" type="text/css" href="/plugins/timeline/assets/static/timeline/css/timeline.css?version=${version}" />
            <script type="text/javascript" src="/plugins/timeline/assets/static/timeline/js/timeline.js?version=${version}"></script>
            <link rel="stylesheet" type="text/css" href="/plugins/timeline/assets/static/css/handsome-timeline-component.css?version=${version}" />
            <script type="text/javascript" src="/plugins/timeline/assets/static/js/handsome-timeline-component.js?version=${version}"></script>
            <!-- timeline end -->
            """, properties);

        model.add(modelFactory.createText(script));
        return Mono.empty();
    }
}
