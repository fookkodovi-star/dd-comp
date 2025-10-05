import React, { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import type { CustomTreeItemProps, TreeDataNode } from './types';
import { defaultGetChildren, hasChildren, mergeSx, shallowEqual, statusToPaletteColor } from './utils';
import { chipSx, iconContainerSx, labelSx, statusDotSx, treeItemContentBaseSx, highlightLeftBorder } from './styles';
import { useTheme } from '@mui/material/styles';

function DefaultLabel<TNode extends TreeDataNode>({ node }: { node: TNode }) {
  const theme = useTheme();
  const meta = node.meta as any;
  const paletteKey = statusToPaletteColor(meta?.status);
  const color = paletteKey ? theme.palette[paletteKey].main : theme.palette.text.disabled;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0, flex: 1 }}>
      {meta?.icon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{meta.icon}</Box>}
      <Typography variant="body2" noWrap title={node.label} sx={{ fontWeight: 500 }}>
        {node.label}
      </Typography>
      <Box sx={{ flex: 1 }} />
      {typeof meta?.distance !== 'undefined' && (
        <Typography variant="caption" color="text.secondary">{String(meta.distance)}</Typography>
      )}
      {meta?.status && <Box sx={statusDotSx(color)} />}
      {meta?.matched && (
        <Chip size="small" label={meta.matched} color="success" variant="outlined" sx={chipSx} />
      )}
      {Array.isArray(meta?.chips) && meta!.chips!.map((c: any, idx: number) => (
        <Chip key={idx} size="small" label={c.label} color={c.color} variant={c.variant ?? 'filled'} sx={chipSx} />
      ))}
      {Array.isArray(meta?.actions) && meta!.actions!.map((a: any) => (
        <Tooltip key={a.id} title={a.tooltip ?? ''}>
          <Box
            onClick={(e) => {
              if (a.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
              }
              a.onClick?.(node as any, e);
            }}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'text.secondary' }}
            aria-label={a.id}
            role="button"
          >
            {a.icon}
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}

function EmptyEndIcon() {
  return <Box sx={{ width: 18, height: 18 }} />;
}

function _CustomTreeItem<TMeta, TNode extends TreeDataNode<TMeta>>({
  node,
  renderLabel,
  getChildren,
  nodeContentSx,
  collapseIcon,
  expandIcon,
  endIcon,
}: CustomTreeItemProps<TMeta, TNode>) {
  const children = (getChildren ?? (defaultGetChildren as any))(node) ?? [];
  const isLeaf = !hasChildren(node as any, getChildren as any) || node.isLeaf;

  const contentSx = useMemo(
    () => mergeSx(treeItemContentBaseSx, highlightLeftBorder(node.meta as any), nodeContentSx?.(node as any)),
    [node, nodeContentSx]
  );

  const labelEl = useMemo(() => {
    return renderLabel ? renderLabel(node) : <DefaultLabel node={node} />;
  }, [node, renderLabel]);

  return (
    <TreeItem
      itemId={node.id}
      label={labelEl}
      disabled={node.disabled}
      slots={{
        groupTransition: Collapse,
      }}
      slotProps={{
        content: { sx: contentSx },
        iconContainer: { sx: iconContainerSx },
        label: { sx: labelSx },
      }}
      collapseIcon={collapseIcon}
      expandIcon={expandIcon}
      endIcon={isLeaf ? endIcon ?? <EmptyEndIcon /> : undefined}
    >
      {children.map((child) => (
        <MemoCustomTreeItem
          key={child.id}
          node={child as any}
          renderLabel={renderLabel as any}
          getChildren={getChildren as any}
          nodeContentSx={nodeContentSx as any}
          collapseIcon={collapseIcon}
          expandIcon={expandIcon}
          endIcon={endIcon}
        />
      ))}
    </TreeItem>
  );
}

function arePropsEqual<TMeta, TNode extends TreeDataNode<TMeta>>(
  prev: Readonly<CustomTreeItemProps<TMeta, TNode>>,
  next: Readonly<CustomTreeItemProps<TMeta, TNode>>
) {
  const a = prev.node;
  const b = next.node;
  if (a === b) return true;
  if (a.id !== b.id) return false;
  if (a.label !== b.label) return false;
  if (!shallowEqual(a.meta as any, b.meta as any)) return false;
  const aLen = (a.children?.length ?? 0);
  const bLen = (b.children?.length ?? 0);
  if (aLen !== bLen) return false;
  return true;
}

export const MemoCustomTreeItem = memo(_CustomTreeItem as any, arePropsEqual as any) as <
  TMeta,
  TNode extends TreeDataNode<TMeta>
>(props: CustomTreeItemProps<TMeta, TNode>) => JSX.Element;

export default MemoCustomTreeItem;