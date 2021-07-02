理念：

第一：

1. 使用 reconciler（协调器）实现了一个 reactDOM
   感觉很多都不太理解吧

2. Fiber 架构

2.1 代数效应做为思路去讲：在 react 中应用，和 Generator

React Fiber 可以理解为：

React 内部实现的一套状态更新机制，支持任务不同的优先级，可中断与恢复，并且恢复后可以复用之前的中间状态
其中每个任务更新单元为 react element 对应的 Fiber 节点

2.2 Fiber 架构的实现原理
主要是讲解了下 FiberNode 的结构

2.3 Fiber 架构的工作原理

- 双缓存，和 GPU 原理差不多
  即：curren Fiber Tree 和 workInProgress Fiber Tree
  并且关于两个棵之前替换，非常精彩

第二：前置知识

- 源码的文件结构
- 调试源码：下载起来确实很多环境问题
- 深入理解 JSX：其实上次我看源码的时候，已经差不多解决了这部分内容

其实整个线路都是围绕着 fiber 去讲的

架构篇
第三：render 阶段

- 流程概述
  先递后归
  和遍历树一样

- beginWork
  具体看 src/Core/beginWork 文件，并且是区别 mount 和 update 的
  更具不同的类型，创建 fiber，并且遍历树，并且节点上可能会存在 effectTag

- completeWork
  给有 effectTag 的 Fiber 节点执行对应操作，根据 fiber 不同类型处理
  分为 update 和 mount：mount 会将 fiber 实例化成 dom，并且两个过程都会处理属性，事件等
  最后，将有 effectTag 的 fiber 挂载在父级的 fiber 的 effectList 末尾，并返回一个 workInProgress

第四：commit 阶段

实现篇
第五：Diff 算法

为了降低算法复杂度，React 的 diff 会预设三个限制

1. 只对同级元素进行 Diff。如果一个 DOM 节点在前后两次更新中跨越了层级，那么 React 不会尝试复用他
2. 两个不同类型的元素会产生不同的树，如果元素由 div 变成 p，react 会销毁 div 及其子孙节点，并新建 p 以及其子孙
3. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定

单节点：

1. 先判断 key 是否相同（这样就会知道为什么不能用 index 来充当 key，因为这样的话没有任何的作用）
2. 再判断 type 是否相同

多节点：
Diff 算法的整体逻辑会经历两轮遍历

1. 第一轮，处理更新的节点
2. 第二轮，处理剩下的不属于更新的节点

第六：状态更新

创建 Update 对象

- ReactDOM.render
- this.setState
- this.forceUpdate
- useState
- useReducer

触发状态更新(根据场景调用不同方法)
--> 创建 Update 对象（接下来三节详解）
--> 从 fiber 到 root（markUpdateLaneFromFiberToRoot）
--> 调度更新（ensureRootIsScheduled）
--> render 阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）
--> commit 阶段（`commitRoot`）

Update：
分类有

```js
ReactDOM.render-- - HostRoot;
this.setState-- - ClassComponent;
this.forceUpdate-- - ClassComponent;
useState-- - FunctionComponent;
useReducer-- - FunctionComponent;
```

ClassComponent 与 HostRoot 共用一套 Update 结构

```ts
const update: Update<*> = {
  eventTime, // 任务时间
  lane, // 优先级
  suspenseConfig, // Suspense 相关，暂不关注
  tag: UpdateState, // 更新的类型，包括 UpdateState | ReplaceState | ForceUpdate | CaptureUpdate
  payload: null, // 更新挂载的数据
  callback: null, // 更新的回调函数
  next: null, // 与其他Update行程链表
};
```

FunctionComponent 是另外一套 Update 结构

UpdateQueue:

```ts
const queue: UpdateQueue<State> = {
  baseState: fiber.memoizedState, // 原来的状态
  firstBaseUpdate: null, // 插队的部分头
  lastBaseUpdate: null, // 插队的部分尾巴
  shared: {
    // 原来那部分
    pending: null,
  },
  effects: null, // 副作用，就是回调函数啦
};
```

render 阶段的 Update 其实是一个链表，state 经过 update 链表得到新的 state；
该新的 state 更新不同的 JSX 对象
通过 DIFF 算法，在 commit 阶段渲染在页面
渲染完成之后，workInProgress Fiber 树变为 current Fiber 树，整个更新流程结束

深入理解优先级

1. 对用户心中的优先级研究：

生命周期方法：同步执行。

受控的用户输入：比如输入框内输入文字，同步执行。

交互事件：比如动画，高优先级执行。

其他：比如数据请求，低优先级执行。

ReactDOM.render

创建 fiberRootNode、rootFiber、updateQueue（`legacyCreateRootFromDOMContainer`）-->
创建 Update 对象（`updateContainer`）-->
从 fiber 到 root（`markUpdateLaneFromFiberToRoot`）-->
调度更新（`ensureRootIsScheduled`）-->
render 阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）-->
commit 阶段（`commitRoot`）

this.setState 整个代码

```ts
Component.prototype.setState = function (partialState, callback) {
  if (
    !(
      typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState === null
    )
  ) {
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  }
};
```

```ts
enqueueSetState(inst, payload, callback) {}


```
