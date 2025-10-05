import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import type { TreeProps, TreeDataNode } from './types';
import { defaultGetChildren } from './utils';
import { treeSx } from './styles';
import MemoCustomTreeItem from './CustomTreeItem';

function Tree<TMeta, TNode extends TreeDataNode<TMeta>>({
  data,
  renderLabel,
  getChildren = defaultGetChildren as any,
  defaultExpanded,
  expanded,
  onExpandedItemsChange,
  defaultSelectedItems,
  selected,
  onSelectedItemsChange,
  multiSelect,
  nodeContentSx,
  sx,
  collapseIcon,
  expandIcon,
  endIcon,
}: TreeProps<TMeta, TNode>) {
  return (
    <SimpleTreeView
      defaultExpandedItems={defaultExpanded}
      expandedItems={expanded}
      onExpandedItemsChange={onExpandedItemsChange as any}
      defaultSelectedItems={defaultSelectedItems as any}
      selectedItems={selected as any}
      onSelectedItemsChange={onSelectedItemsChange as any}
      multiSelect={multiSelect}
      slots={{
        collapseIcon: collapseIcon ? () => <>{collapseIcon}</> : undefined,
        expandIcon: expandIcon ? () => <>{expandIcon}</> : undefined,
        endIcon: endIcon ? () => <>{endIcon}</> : undefined,
      }}
      sx={[treeSx as any, sx as any]}
    >
      {data.map((node) => (
        <MemoCustomTreeItem
          key={node.id}
          node={node as any}
          renderLabel={renderLabel as any}
          getChildren={getChildren as any}
          nodeContentSx={nodeContentSx as any}
          collapseIcon={collapseIcon}
          expandIcon={expandIcon}
          endIcon={endIcon}
        />
      ))}
    </SimpleTreeView>
  );
}

export default Tree as unknown as <TMeta, TNode extends TreeDataNode<TMeta>>(
  props: TreeProps<TMeta, TNode>
) => JSX.Element;