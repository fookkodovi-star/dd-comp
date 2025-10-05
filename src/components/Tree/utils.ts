import type { SxProps, Theme } from '@mui/material/styles';
import type { TreeDataNode, GetChildren } from './types';

export const hasChildren = (node: TreeDataNode, getChildren: GetChildren): boolean => {
  const children = getChildren(node);
  return Array.isArray(children) && children.length > 0;
};

export const defaultGetChildren: GetChildren = (node) => node.children;

// Merge sx props with array semantics
export const mergeSx = (
  base: SxProps<Theme> | undefined,
  override: SxProps<Theme> | undefined,
): SxProps<Theme> | undefined => {
  if (!base) return override;
  if (!override) return base;
  return Array.isArray(base) ? [...base, override] : [base, override];
};

// Utility to build className list
export const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
