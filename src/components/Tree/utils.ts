import type { SxProps, Theme } from '@mui/material/styles';
import type { GetChildren, TreeDataNode, TreeStatus } from './types';

export function defaultGetChildren<TNode extends TreeDataNode>(node: TNode): TNode[] | undefined {
  return (node.children as TNode[] | undefined) ?? undefined;
}

export function hasChildren<TNode extends TreeDataNode>(
  node: TNode,
  getChildren?: GetChildren<TNode>
): boolean {
  const children = (getChildren ?? defaultGetChildren)(node) ?? [];
  return children.length > 0;
}

export function mergeSx(
  ...sxList: Array<SxProps<Theme> | undefined>
): SxProps<Theme> | undefined {
  const filtered = sxList.filter(Boolean) as SxProps<Theme>[];
  if (filtered.length === 0) return undefined;
  if (filtered.length === 1) return filtered[0];
  return filtered; // MUI sx accepts arrays to merge
}

export function statusToPaletteColor(status?: TreeStatus): keyof Theme['palette'] | undefined {
  switch (status) {
    case 'success':
    case 'active':
      return 'success';
    case 'warning':
    case 'partial':
      return 'warning';
    case 'error':
      return 'error';
    case 'stopped':
    case 'inactive':
      return 'grey';
    default:
      return undefined;
  }
}

export function shallowEqual<T extends Record<string, unknown>>(a?: T, b?: T): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}