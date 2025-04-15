package cc.lik.timeline.example;

import cc.lik.timeline.util.PinyinIndexUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 拼音索引工具类使用示例
 */
public class PinyinIndexExample {
    
    private static final Logger log = LoggerFactory.getLogger(PinyinIndexExample.class);
    
    public static void main(String[] args) {
        // 创建示例数据
        List<Person> people = new ArrayList<>();
        people.add(new Person("张三", 25));
        people.add(new Person("李四", 30));
        people.add(new Person("王五", 28));
        people.add(new Person("赵六", 35));
        people.add(new Person("钱七", 22));
        people.add(new Person("孙八", 40));
        people.add(new Person("周九", 27));
        people.add(new Person("吴十", 33));
        people.add(new Person("Alice", 29));
        people.add(new Person("Bob", 31));
        people.add(new Person("Charlie", 26));
        
        // 创建拼音索引
        Map<String, List<Person>> indexMap = PinyinIndexUtil.createPinyinIndex(
            people, 
            Person::getName
        );
        
        // 打印索引结果
        log.info("按拼音首字母分组:");
        for (Map.Entry<String, List<Person>> entry : indexMap.entrySet()) {
            log.info("{}: {}", entry.getKey(), 
                entry.getValue().stream()
                    .map(Person::getName)
                    .collect(java.util.stream.Collectors.joining(", "))
            );
        }
        
        // 创建排序后的拼音索引
        Map<String, List<Person>> sortedIndexMap = PinyinIndexUtil.createSortedPinyinIndex(
            people, 
            Person::getName
        );
        
        // 打印排序后的索引结果
        log.info("\n按拼音首字母分组并排序:");
        for (Map.Entry<String, List<Person>> entry : sortedIndexMap.entrySet()) {
            log.info("{}: {}", entry.getKey(), 
                entry.getValue().stream()
                    .map(Person::getName)
                    .collect(java.util.stream.Collectors.joining(", "))
            );
        }
        
        // 获取所有拼音索引
        List<String> allIndexes = PinyinIndexUtil.getAllPinyinIndexes();
        log.info("\n所有拼音索引: {}", String.join(", ", allIndexes));
        
        // 获取特定名称的拼音索引
        String name = "张三";
        String index = PinyinIndexUtil.getPinyinIndex(name);
        log.info("\n{} 的拼音索引: {}", name, index);
    }
    
    /**
     * 示例人员类
     */
    static class Person {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public String getName() {
            return name;
        }
        
        public int getAge() {
            return age;
        }
        
        @Override
        public String toString() {
            return name + "(" + age + ")";
        }
    }
} 