/**
 * Tree Component - Reusable MUI Tree View Component
 * 
 * Экспорты для использования в проекте
 */

export { Tree } from './Tree';
export { CustomTreeItem } from './CustomTreeItem';
export { ExampleTreeUsage } from './ExampleTreeUsage';

// Экспорт типов
export type {
  TreeDataNode,
  NodeMeta,
  TreeProps,
  CustomTreeItemProps,
  NodeStatus,
  NodeAction,
} from './types';

// Экспорт утилит (опционально, если нужно использовать снаружи)
export {
  hasChildren,
  defaultGetChildren,
  mergeSx,
  getStatusColor,
  getAllNodeIds,
} from './utils';

// Экспорт стилей (опционально, если нужно переиспользовать)
export {
  treeSx,
  treeItemContentBaseSx,
  labelSx,
  labelTextSx,
  metaContainerSx,
  distanceSx,
  statusContainerSx,
  statusIndicatorSx,
  statusTextSx,
  statusSourceSx,
  tagSx,
  actionsContainerSx,
  actionButtonSx,
  iconContainerSx,
  groupSx,
  highlightLeftBorder,
} from './styles';
