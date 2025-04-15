package cc.lik.timeline.util;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

/**
 * 中文拼音索引工具类
 * 用于生成按拼音首字母分组的数据结构
 */
public class PinyinIndexUtil {
    
    /**
     * 生成拼音索引
     * 
     * @param items 需要索引的项目列表
     * @param nameGetter 获取项目名称的函数
     * @param <T> 项目类型
     * @return 按拼音首字母分组的Map
     */
    public static <T> Map<String, List<T>> createPinyinIndex(List<T> items, NameGetter<T> nameGetter) {
        // 使用TreeMap保证按字母顺序排序
        Map<String, List<T>> indexMap = new TreeMap<>();
        
        for (T item : items) {
            String name = nameGetter.getName(item);
            if (name == null || name.trim().isEmpty()) {
                continue;
            }
            
            // 获取拼音首字母
            String firstLetter = PinyinUtil.getFirstLetters(name);
            if (firstLetter.isEmpty()) {
                // 如果没有拼音首字母，使用"#"作为默认分组
                firstLetter = "#";
            } else {
                // 只取第一个字母作为索引
                firstLetter = firstLetter.substring(0, 1).toUpperCase();
            }
            
            // 添加到对应的分组
            indexMap.computeIfAbsent(firstLetter, k -> new ArrayList<>()).add(item);
        }
        
        return indexMap;
    }
    
    /**
     * 生成拼音索引并按名称排序
     * 
     * @param items 需要索引的项目列表
     * @param nameGetter 获取项目名称的函数
     * @param <T> 项目类型
     * @return 按拼音首字母分组并排序的Map
     */
    public static <T> Map<String, List<T>> createSortedPinyinIndex(List<T> items, NameGetter<T> nameGetter) {
        Map<String, List<T>> indexMap = createPinyinIndex(items, nameGetter);
        
        // 对每个分组内的项目按名称排序
        for (List<T> group : indexMap.values()) {
            group.sort(Comparator.comparing(item -> {
                String name = nameGetter.getName(item);
                return PinyinUtil.containsChinese(name) ? 
                    PinyinUtil.getPinyin(name) : name.toLowerCase();
            }));
        }
        
        return indexMap;
    }
    
    /**
     * 获取所有拼音首字母索引
     * 
     * @return 所有可能的拼音首字母索引列表
     */
    public static List<String> getAllPinyinIndexes() {
        List<String> indexes = new ArrayList<>();
        
        // 添加A-Z
        for (char c = 'A'; c <= 'Z'; c++) {
            indexes.add(String.valueOf(c));
        }
        
        // 添加#作为默认分组
        indexes.add("#");
        
        return indexes;
    }
    
    /**
     * 获取项目的拼音首字母索引
     * 
     * @param name 项目名称
     * @return 拼音首字母索引
     */
    public static String getPinyinIndex(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "#";
        }
        
        String firstLetter = PinyinUtil.getFirstLetters(name);
        if (firstLetter.isEmpty()) {
            return "#";
        }
        
        return firstLetter.substring(0, 1).toUpperCase();
    }
    
    /**
     * 名称获取器接口
     * 
     * @param <T> 项目类型
     */
    @FunctionalInterface
    public interface NameGetter<T> {
        String getName(T item);
    }
} 