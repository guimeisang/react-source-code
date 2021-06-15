function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // 做为静态数据结构的属性
  this.tag = tag // Fiber对应的组件类型 Function、Class、Host
  this.key = key // key 属性
  this.elementType = null // 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
  this.type = null // 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
  this.stateNode = null // Fiber对应真实的DOM节点

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  // 做为动态的工作单元的属性，保存本次更新造成的状态改变相关信息
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  this.effectTag = NoEffect
  this.nextEffect = null

  // 调度优先级相关
  this.lanes = NoLanes
  this.childLanes = NoLanes

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null
}
