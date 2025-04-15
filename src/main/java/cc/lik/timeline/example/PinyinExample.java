package cc.lik.timeline.example;

import cc.lik.timeline.util.PinyinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 拼音工具类使用示例
 */
public class PinyinExample {
    
    private static final Logger log = LoggerFactory.getLogger(PinyinExample.class);
    
    public static void main(String[] args) {
        // 示例1：获取中文拼音首字母
        String chinese1 = "中华人民共和国";
        String firstLetters = PinyinUtil.getFirstLetters(chinese1);
        log.info("中文: {}, 拼音首字母: {}", chinese1, firstLetters);
        
        // 示例2：获取完整拼音
        String chinese2 = "中国";
        String pinyin = PinyinUtil.getPinyin(chinese2);
        log.info("中文: {}, 完整拼音: {}", chinese2, pinyin);
        
        // 示例3：中英混合
        String mixed = "中国ABC";
        String mixedFirstLetters = PinyinUtil.getFirstLetters(mixed);
        String mixedPinyin = PinyinUtil.getPinyin(mixed);
        log.info("中英混合: {}, 拼音首字母: {}, 完整拼音: {}", mixed, mixedFirstLetters, mixedPinyin);
        
        // 示例4：判断是否包含中文
        String text1 = "Hello World";
        String text2 = "你好世界";
        log.info("{} 包含中文: {}", text1, PinyinUtil.containsChinese(text1));
        log.info("{} 包含中文: {}", text2, PinyinUtil.containsChinese(text2));
        
        // 示例5：实际应用场景 - 生成拼音索引
        String[] names = {"张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"};
        log.info("按拼音首字母排序:");
        for (String name : names) {
            String index = PinyinUtil.getFirstLetters(name);
            log.info("{} - {}", index, name);
        }
    }
} 