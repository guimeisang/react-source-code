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
- 调试源码
- 深入理解JSX

架构篇



