理念：

第一：

1. 使用reconciler（协调器）实现了一个reactDOM
感觉很多都不太理解吧

2. Fiber 架构

2.1 代数效应做为思路去讲：在react中应用，和Generator

React Fiber 可以理解为：

React 内部实现的一套状态更新机制，支持任务不同的优先级，可中断与恢复，并且恢复后可以复用之前的中间状态
其中每个任务更新单元为react element 对应的Fiber节点

2.2 Fiber架构的实现原理
主要是讲解了下FiberNode的结构

2.3 Fiber架构的工作原理
- 双缓存，和GPU原理差不多
即：curren Fiber Tree 和 workInProgress Fiber Tree
并且关于两个棵之前替换，非常精彩

第二：前置知识
- 源码的文件结构
- 调试源码：下载起来确实很多环境问题
- 深入理解JSX：其实上次我看源码的时候，已经差不多解决了这部分内容

其实整个线路都是围绕着fiber去讲的

架构篇
第三：render阶段
- 流程概述
先递后归
和遍历树一样

- beginWork

- completeWork

第四：commit阶段



