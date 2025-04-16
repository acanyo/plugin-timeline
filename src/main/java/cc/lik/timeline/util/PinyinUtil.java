package cc.lik.timeline.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 拼音工具类，提供中文转拼音首字母功能
 */
public class PinyinUtil {
    
    private static final Logger log = LoggerFactory.getLogger(PinyinUtil.class);
    
    /**
     * 将中文转换为拼音首字母
     * 
     * @param chinese 中文字符串
     * @return 拼音首字母字符串
     */
    public static String getFirstLetters(String chinese) {
        if (chinese == null || chinese.trim().isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        
        for (int i = 0; i < chinese.length(); i++) {
            char c = chinese.charAt(i);
            if (Character.toString(c).matches("[\\u4E00-\\u9FA5]+")) {
                // 是汉字
                try {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray != null && pinyinArray.length > 0) {
                        result.append(pinyinArray[0].charAt(0));
                    }
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    log.error("转换拼音失败: {}", e.getMessage(), e);
                }
            } else if (Character.isLetter(c)) {
                // 是字母，直接添加
                result.append(c);
            }
            // 其他字符（数字、标点等）忽略
        }
        
        return result.toString();
    }
    
    /**
     * 将中文转换为完整拼音
     * 
     * @param chinese 中文字符串
     * @return 完整拼音字符串，以空格分隔
     */
    public static String getPinyin(String chinese) {
        if (chinese == null || chinese.trim().isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        
        for (int i = 0; i < chinese.length(); i++) {
            char c = chinese.charAt(i);
            if (Character.toString(c).matches("[\\u4E00-\\u9FA5]+")) {
                // 是汉字
                try {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray != null && pinyinArray.length > 0) {
                        result.append(pinyinArray[0]).append(" ");
                    }
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    log.error("转换拼音失败: {}", e.getMessage(), e);
                }
            } else if (Character.isLetterOrDigit(c)) {
                // 是字母或数字，直接添加
                result.append(c).append(" ");
            }
            // 其他字符（标点等）忽略
        }
        
        return result.toString().trim();
    }
    
    /**
     * 判断字符串是否包含中文
     * 
     * @param str 待检查的字符串
     * @return 是否包含中文
     */
    public static boolean containsChinese(String str) {
        if (str == null || str.trim().isEmpty()) {
            return false;
        }
        
        for (int i = 0; i < str.length(); i++) {
            if (Character.toString(str.charAt(i)).matches("[\\u4E00-\\u9FA5]+")) {
                return true;
            }
        }
        
        return false;
    }
} 