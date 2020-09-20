## 组件
##### 对象与组件
- 对象
    - Properties
    - Methods
    - Inherit
- 组件
    - Properties 组件使用者向组件开发传递
        - 更强调从属
        - myComponent.a = "value"
        - a.href resolve过的 <\a href="//w.w.cc">  => http://w.w.cc
        ```
            <input value="cute">
            input.value //cute
            input.getAttribute("value"); // cute

            input.value = "hello"
            input.value // hello
            input.getAttribute("value"); // cute
            // 若value属性已经设置，则attribute不变，property变化，实际效果是property优先
        ```

    - Methods 组件使用者向组件开发传递
    - Inherit
    - Attribute
        - 更强调描述
        - <\a attribute="1"> .getAttribute("")
        - a.getAttribute("href) 与html中一致 => //w.w.cc
    - Config & State
    - Event 组件开发向组件使用者传递
    - Lifecycle
    - Children 树形结构的必要条件
        - content型，template型

