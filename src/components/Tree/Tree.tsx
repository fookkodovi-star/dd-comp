import React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import type { TreeProps } from './types';
import { defaultGetChildren } from './utils';
import { treeSx } from './styles';
import CustomTreeItem from './CustomTreeItem';

const Tree: React.FC<TreeProps> = ({
  data,
  renderLabel,
  getChildren = defaultGetChildren,
  multiSelect,
  nodeContentSx,
  sx,
  collapseIcon,
  expandIcon,
  endIcon,
  // controlled / uncontrolled props
  expanded,
  onExpandedItemsChange,
  defaultExpanded,
  selected,
  onSelectedItemsChange,
  defaultSelectedItems,
}) => {
  return (
    <Box sx={sx ? [treeSx, sx] : treeSx}>
      <SimpleTreeView
        slots={{}}
        multiSelect={multiSelect}
        expandedItems={expanded}
        onExpandedItemsChange={onExpandedItemsChange}
        defaultExpandedItems={defaultExpanded}
        selectedItems={selected}
        onSelectedItemsChange={onSelectedItemsChange}
        defaultSelectedItems={defaultSelectedItems}
      >
        {data.map((node) => (
          <CustomTreeItem
            key={node.id}
            node={node}
            getChildren={getChildren}
            renderLabel={renderLabel}
            nodeContentSx={nodeContentSx}
            collapseIcon={collapseIcon}
            expandIcon={expandIcon}
            endIcon={endIcon}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
};

export default Tree;
