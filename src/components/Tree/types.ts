import type { ReactNode, SyntheticEvent } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type TreeStatus =
  | 'active'
  | 'stopped'
  | 'partial'
  | 'warning'
  | 'error'
  | 'success'
  | 'inactive';

export interface NodeAction<TNode extends TreeDataNode = TreeDataNode> {
  id: string;
  icon: ReactNode;
  tooltip?: string;
  onClick?: (node: TNode, event: SyntheticEvent) => void;
  stopPropagation?: boolean;
}

export interface ChipMeta {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
  variant?: 'filled' | 'outlined';
}

export interface NodeMeta<TExtra = unknown> {
  distance?: string | number;
  status?: TreeStatus;
  statusDotColor?: string; // override color for status dot
  matched?: string; // e.g. "SAP", "WellDB"
  subtitle?: string;
  chips?: ChipMeta[]; // right side chips/badges
  highlight?: false | 'primary' | 'warning' | 'success' | 'error' | 'info' | 'danger' | { color: string; thickness?: number };
  actions?: NodeAction[]; // right side action icons
  icon?: ReactNode; // left icon near label
  endIcon?: ReactNode; // per-node end icon override
  extra?: TExtra; // any domain-specific meta
}

export interface TreeDataNode<TMeta = NodeMeta> {
  id: string;
  label?: string; // used only if renderLabel is not provided
  meta?: TMeta;
  children?: TreeDataNode<TMeta>[];
  isLeaf?: boolean; // forces leaf behavior even if children present later (for lazy)
  disabled?: boolean;
}

export type GetChildren<TNode extends TreeDataNode> = (node: TNode) => TNode[] | undefined;

export type RenderLabel<TNode extends TreeDataNode> = (node: TNode) => ReactNode;

export type ExpandedChangeHandler = (
  event: SyntheticEvent,
  itemIds: string[]
) => void;

export type SelectedChangeHandler = (
  event: SyntheticEvent,
  itemIds: string[] | string
) => void;

export interface TreeSlots {
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface TreeProps<
  TMeta = NodeMeta,
  TNode extends TreeDataNode<TMeta> = TreeDataNode<TMeta>
> extends TreeSlots {
  data: TNode[];
  renderLabel?: RenderLabel<TNode>;
  getChildren?: GetChildren<TNode>;

  defaultExpanded?: string[];
  expanded?: string[];
  onExpandedItemsChange?: ExpandedChangeHandler;

  defaultSelectedItems?: string | string[];
  selected?: string | string[];
  onSelectedItemsChange?: SelectedChangeHandler;

  multiSelect?: boolean;
  nodeContentSx?: (node: TNode) => SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export interface CustomTreeItemProps<
  TMeta = NodeMeta,
  TNode extends TreeDataNode<TMeta> = TreeDataNode<TMeta>
> extends TreeSlots {
  node: TNode;
  renderLabel?: RenderLabel<TNode>;
  getChildren?: GetChildren<TNode>;
  nodeContentSx?: (node: TNode) => SxProps<Theme>;
}