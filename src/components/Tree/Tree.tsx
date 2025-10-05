import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeProps } from './types';
import { CustomTreeItem } from './CustomTreeItem';
import { defaultGetChildren, mergeSx } from './utils';
import { treeSx } from './styles';

/**
 * Компонент Tree - переиспользуемое дерево на основе MUI SimpleTreeView
 * 
 * @example
 * ```tsx
 * <Tree
 *   data={treeData}
 *   defaultExpanded={['1']}
 *   multiSelect
 *   renderLabel={(node) => <CustomLabel node={node} />}
 * />
 * ```
 */
export function Tree<T extends Record<string, unknown> = Record<string, unknown>>({
  data,
  renderLabel,
  getChildren = defaultGetChildren,
  defaultExpanded,
  expandedItems,
  onExpandedItemsChange,
  defaultSelectedItems,
  selectedItems,
  onSelectedItemsChange,
  multiSelect = false,
  nodeContentSx,
  sx,
  expandIcon = <ExpandMoreIcon />,
  collapseIcon = <ChevronRightIcon />,
  endIcon,
  disableSelection = false,
}: TreeProps<T>): JSX.Element {
  // Определяем, контролируемый или неконтролируемый режим для expanded
  const isExpandedControlled = expandedItems !== undefined;
  
  // Определяем, контролируемый или неконтролируемый режим для selected
  const isSelectedControlled = selectedItems !== undefined;

  // Финальные стили
  const finalSx = mergeSx(treeSx, sx);

  return (
    <Box sx={{ width: '100%' }}>
      <SimpleTreeView
        {...(isExpandedControlled
          ? {
              expandedItems,
              onExpandedItemsChange,
            }
          : {
              defaultExpandedItems: defaultExpanded,
            })}
        {...(isSelectedControlled
          ? {
              selectedItems,
              onSelectedItemsChange,
            }
          : {
              defaultSelectedItems,
            })}
        multiSelect={multiSelect}
        disableSelection={disableSelection}
        sx={finalSx}
      >
        {data.map((node) => (
          <CustomTreeItem
            key={node.id}
            node={node}
            renderLabel={renderLabel}
            getChildren={getChildren}
            nodeContentSx={nodeContentSx}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
            endIcon={endIcon}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
}

export default Tree;
