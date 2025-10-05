import React from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import type { CustomTreeItemProps, TreeDataNode } from './types';
import { defaultGetChildren, hasChildren, mergeSx } from './utils';
import {
  labelSx,
  treeItemContentBaseSx,
  iconContainerSx,
  statusDotSx,
  chipSx,
  nodeRightActionsSx,
  emptyEndIconBoxSx,
  nodeContentComposeSx,
} from './styles';

// Default label view resembling the screenshot, customizable via renderLabel prop
const DefaultLabel: React.FC<{ node: TreeDataNode }> = ({ node }) => {
  const distance = node.meta?.distanceMeters != null ? `${node.meta?.distanceMeters}m` : undefined;
  return (
    <Box sx={labelSx}>
      <Box className="TreeLabel-left">
        {/* Status dot */}
        <Box
          sx={statusDotSx}
          className={node.meta?.activity === 'active' ? 'active' : node.meta?.activity === 'stopped' ? 'stopped' : undefined}
        />
        <Box minWidth={0}>
          <Typography variant="body2" className="TreeLabel-title" title={node.label}>
            {node.label}
          </Typography>
          {node.meta?.subtitle && (
            <Typography variant="caption" className="TreeLabel-subtitle">
              {node.meta.subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box className="TreeLabel-right">
        {distance && (
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {distance}
          </Typography>
        )}
        {node.meta?.match && (
          <Box component="span" sx={chipSx}>
            {node.meta.match === 'matched' ? 'Сопоставлено' : node.meta.match === 'partially' ? 'Частично' : 'Не сопоставлено'}
          </Box>
        )}
        {node.meta?.matchSourceLabel && (
          <Box component="span" sx={chipSx}>
            {node.meta.matchSourceLabel}
          </Box>
        )}
        {!!node.meta?.actions?.length && (
          <Box sx={nodeRightActionsSx}>
            {node.meta.actions.map((a) => (
              <Box
                key={a.id}
                className="TreeAction"
                aria-disabled={a.disabled ? 'true' : undefined}
                onClick={(e) => a.onClick?.(node, e)}
                title={a.title}
              >
                {a.icon}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CustomTreeItemComponent: React.FC<CustomTreeItemProps> = ({
  node,
  getChildren = defaultGetChildren,
  renderLabel,
  nodeContentSx,
  collapseIcon,
  expandIcon,
  endIcon,
}) => {
  const children = getChildren(node) ?? [];
  const leaf = children.length === 0;

  const label = renderLabel ? renderLabel(node) : <DefaultLabel node={node} />;

  return (
    <TreeItem
      itemId={node.id}
      label={label}
      slots={{
        groupTransition: Collapse,
      }}
      slotProps={{
        content: {
          sx: nodeContentComposeSx(node, treeItemContentBaseSx, nodeContentSx?.(node)),
        },
        label: { sx: mergeSx(undefined, undefined) },
        iconContainer: { sx: iconContainerSx },
      }}
      collapseIcon={collapseIcon}
      expandIcon={expandIcon}
      endIcon={leaf ? (endIcon ?? <Box component="span" sx={emptyEndIconBoxSx} />) : undefined}
    >
      {children.map((child) => (
        <MemoCustomTreeItem
          key={child.id}
          node={child}
          getChildren={getChildren}
          renderLabel={renderLabel}
          nodeContentSx={nodeContentSx}
          collapseIcon={collapseIcon}
          expandIcon={expandIcon}
          endIcon={endIcon}
        />
      ))}
    </TreeItem>
  );
};

const areEqual = (prev: CustomTreeItemProps, next: CustomTreeItemProps) => {
  if (prev.node.id !== next.node.id) return false;
  // Shallow compare references for performance; assume upstream memoization for deep fields if needed
  if (prev.node === next.node) return true;
  // Compare a few common meta fields that frequently change
  const pm = prev.node.meta;
  const nm = next.node.meta;
  return (
    pm?.distanceMeters === nm?.distanceMeters &&
    pm?.activity === nm?.activity &&
    pm?.match === nm?.match &&
    pm?.matchSourceLabel === nm?.matchSourceLabel &&
    pm?.subtitle === nm?.subtitle &&
    pm?.highlight === nm?.highlight &&
    (pm?.actions?.length ?? 0) === (nm?.actions?.length ?? 0)
  );
};

export const MemoCustomTreeItem = React.memo(CustomTreeItemComponent, areEqual);
export default MemoCustomTreeItem;
