import React, { ReactNode } from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, IconButton, Collapse } from '@mui/material';
import { CustomTreeItemProps, TreeDataNode, NodeAction } from './types';
import { hasChildren, defaultGetChildren, mergeSx, getStatusColor } from './utils';
import {
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
  groupSx,
  highlightLeftBorder,
} from './styles';

/**
 * Дефолтный рендерер label с поддержкой метаданных
 */
function DefaultLabel<T extends Record<string, unknown>>({ node }: { node: TreeDataNode<T> }): JSX.Element {
  const { label, meta } = node;

  return (
    <Box sx={labelSx}>
      {/* Основной текст */}
      <Box sx={labelTextSx}>{label}</Box>

      {/* Контейнер с метаданными */}
      {meta && (
        <Box sx={metaContainerSx}>
          {/* Дистанция */}
          {meta.distance && <Box sx={distanceSx}>{meta.distance}</Box>}

          {/* Статус с индикатором */}
          {meta.status && (
            <Box sx={statusContainerSx}>
              <Box sx={statusIndicatorSx(getStatusColor(meta.status.type))} />
              <Box sx={statusTextSx}>{meta.status.label}</Box>
              {meta.status.source && <Box sx={statusSourceSx}>{meta.status.source}</Box>}
            </Box>
          )}

          {/* Тег/бейдж */}
          {meta.tag && <Box sx={tagSx}>{meta.tag}</Box>}

          {/* Действия */}
          {meta.actions && meta.actions.length > 0 && (
            <Box sx={actionsContainerSx}>
              {meta.actions.map((action: NodeAction, index: number) => (
                <IconButton
                  key={index}
                  size="small"
                  sx={actionButtonSx}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(node, e);
                  }}
                  disabled={action.disabled}
                  title={action.label}
                >
                  {action.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

/**
 * Кастомный компонент TreeItem с инкапсуляцией стилей, transition и рекурсивной отрисовкой
 */
function CustomTreeItemComponent<T extends Record<string, unknown>>({
  node,
  renderLabel,
  getChildren = defaultGetChildren,
  nodeContentSx,
  expandIcon,
  collapseIcon,
  endIcon,
}: CustomTreeItemProps<T>): JSX.Element {
  const children = getChildren(node);
  const hasChild = hasChildren(node, getChildren);

  // Вычисляем финальные стили для контента
  const contentSx = mergeSx(
    highlightLeftBorder(treeItemContentBaseSx, node),
    nodeContentSx ? nodeContentSx(node) : undefined
  );

  // Определяем label
  const labelContent: ReactNode = renderLabel ? renderLabel(node) : <DefaultLabel node={node} />;

  return (
    <TreeItem
      itemId={node.id}
      label={labelContent}
      slots={{
        groupTransition: Collapse,
        expandIcon: expandIcon ? () => expandIcon : undefined,
        collapseIcon: collapseIcon ? () => collapseIcon : undefined,
        endIcon: hasChild ? undefined : endIcon ? () => endIcon : () => <Box sx={{ width: 24, height: 24 }} />,
      }}
      slotProps={{
        content: {
          sx: contentSx,
        },
        groupTransition: {
          timeout: 200,
        },
        label: {
          sx: { width: '100%', display: 'flex' },
        },
      }}
      sx={{
        '& .MuiTreeItem-group': groupSx,
      }}
    >
      {/* Рекурсивно отрисовываем дочерние узлы */}
      {children &&
        children.map((child) => (
          <CustomTreeItemComponent
            key={child.id}
            node={child}
            renderLabel={renderLabel}
            getChildren={getChildren}
            nodeContentSx={nodeContentSx}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
            endIcon={endIcon}
          />
        ))}
    </TreeItem>
  );
}

/**
 * Функция сравнения для мемоизации
 */
function areEqual<T extends Record<string, unknown>>(
  prevProps: CustomTreeItemProps<T>,
  nextProps: CustomTreeItemProps<T>
): boolean {
  // Сравниваем по id узла и глубокому сравнению meta
  if (prevProps.node.id !== nextProps.node.id) return false;
  if (prevProps.node.label !== nextProps.node.label) return false;
  
  // Сравниваем meta
  if (JSON.stringify(prevProps.node.meta) !== JSON.stringify(nextProps.node.meta)) return false;
  
  // Сравниваем функции (по ссылке)
  if (prevProps.renderLabel !== nextProps.renderLabel) return false;
  if (prevProps.getChildren !== nextProps.getChildren) return false;
  if (prevProps.nodeContentSx !== nextProps.nodeContentSx) return false;
  
  return true;
}

/**
 * Мемоизированный компонент для оптимизации производительности
 */
export const CustomTreeItem = React.memo(CustomTreeItemComponent, areEqual) as typeof CustomTreeItemComponent;
