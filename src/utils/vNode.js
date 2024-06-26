export const ShapeFlags = {
  ELEMENT: 1, // 表示一个普通的HTML元素
  FUNCTIONAL_COMPONENT: 1 << 1, // 函数式组件
  STATEFUL_COMPONENT: 1 << 2, // 有状态组件
  TEXT_CHILDREN: 1 << 3, // 子节点是文本
  ARRAY_CHILDREN: 1 << 4, // 子节点是数组
  SLOTS_CHILDREN: 1 << 5, // 子节点是插槽
  TELEPORT: 1 << 6, // 表示vnode描述的是个teleport组件
  SUSPENSE: 1 << 7, // 表示vnode描述的是个suspense组件
  COMPONENT_SHOULD_KEEP_ALIVE: 1 << 8, // 表示需要被keep-live的有状态组件
  COMPONENT_KEPT_ALIVE: 1 << 9, // 已经被keep-live的有状态组件
  COMPONENT: (1 << 2) | (1 << 1), // 组件，有状态组件和函数式组件的统称
};

export const isArrayChildren = (vNode) => {
  return Boolean(vNode && vNode.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};

export const isSlotsChildren = (vNode) => {
  return Boolean(vNode && vNode.shapeFlag & ShapeFlags.SLOTS_CHILDREN);
};

export const isElement = (vNode) => {
  return Boolean(vNode && vNode.shapeFlag & ShapeFlags.ELEMENT);
};

export const isComponent = (vNode) => {
  return Boolean(vNode && vNode.shapeFlag & ShapeFlags.COMPONENT);
};

export const isText = (vNode) => {
  return Boolean(vNode && vNode.shapeFlag & ShapeFlags.TEXT_CHILDREN);
};

/**
 * 递归查找匹配子级集合
 */
export function getChildrenElements(children, match) {
  let result = [];
  const nodes = Array.isArray(children) ? children : [children];
  nodes.forEach((child) => {
    if (Array.isArray(child)) {
      result.push(...getChildrenElements(child, match));
    } else {
      if (
        (isElement(child) || isComponent(child)) &&
        (!match || match(child))
      ) {
        result.push(child);
      } else if (isArrayChildren(child)) {
        result.push(...getChildrenElements(child.children, match));
      } else if (child.component?.subTree) {
        result.push(...getChildrenElements(child.component.subTree, match));
      } else if (isSlotsChildren(child)) {
        result.push(...getChildrenElements(child.children.default?.(), match));
      }
    }
  });
  return result;
}
