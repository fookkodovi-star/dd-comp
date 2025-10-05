import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

// Basic status types to resemble the screenshot
export type NodeActivityStatus = 'active' | 'stopped' | 'unknown';
export type NodeMatchStatus = 'matched' | 'partially' | 'unmatched';

export type TreeId = string;

// Icon action configuration rendered to the right side of a node content
export interface NodeAction {
  id: string;
  icon: ReactNode;
  title?: string;
  disabled?: boolean;
  onClick?: (node: TreeDataNode, event: React.MouseEvent) => void;
}

// Meta information used by default label renderer and styles
export interface NodeMeta {
  distanceMeters?: number | null;
  activity?: NodeActivityStatus; // colored dot
  match?: NodeMatchStatus; // chip on the right
  matchSourceLabel?: string; // e.g. "SAP", "WellDB"
  subtitle?: string; // grey text below the main title
  highlight?: 'warning' | 'success' | 'error' | 'info' | 'none'; // left border highlight
  actions?: NodeAction[]; // right side action icons
}

export interface TreeDataNodeBase {
  id: TreeId;
  label: string; // used by default renderer; can be ignored when custom renderLabel is provided
  meta?: NodeMeta;
  // Optional raw children for simple use-cases. When not provided, use getChildren prop to load children.
  children?: TreeDataNode[];
}

export type TreeDataNode = TreeDataNodeBase & Record<string, unknown>;

export type GetChildren = (node: TreeDataNode) => TreeDataNode[] | undefined;
export type RenderLabel = (node: TreeDataNode) => ReactNode;
export type NodeContentSx = (node: TreeDataNode) => SxProps<Theme> | undefined;

export interface TreeControlledSelectionProps {
  selected?: string | string[];
  onSelectedItemsChange?: (event: React.SyntheticEvent, ids: string | string[]) => void;
  defaultSelectedItems?: string | string[];
}

export interface TreeControlledExpandedProps {
  expanded?: string[];
  onExpandedItemsChange?: (event: React.SyntheticEvent, ids: string[]) => void;
  defaultExpanded?: string[];
}

// Main Tree component props
export interface TreeProps extends TreeControlledSelectionProps, TreeControlledExpandedProps {
  data: TreeDataNode[];
  renderLabel?: RenderLabel;
  getChildren?: GetChildren;
  multiSelect?: boolean;
  nodeContentSx?: NodeContentSx;
  sx?: SxProps<Theme>;
  // Optional global icons for expand/collapse/leaf
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  endIcon?: ReactNode | null; // allow forcing an empty container to align contents
}

export interface CustomTreeItemProps {
  node: TreeDataNode;
  getChildren: GetChildren;
  renderLabel?: RenderLabel;
  nodeContentSx?: NodeContentSx;
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  endIcon?: ReactNode | null;
}
