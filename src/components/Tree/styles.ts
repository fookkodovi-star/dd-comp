import type { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import type { NodeMeta, TreeDataNode } from './types';

export const treeSx: SxProps<Theme> = (theme) => ({
  '--Tree-bg': theme.palette.mode === 'dark' ? alpha('#0b1220', 0.6) : '#fff',
  '--Tree-border': theme.palette.divider,
  '--Tree-radius': theme.shape.borderRadius,
  '--Tree-item-hover': alpha(theme.palette.primary.main, 0.08),
  '--Tree-item-selected': alpha(theme.palette.primary.main, 0.15),
  '--Tree-item-focus': alpha(theme.palette.primary.main, 0.2),
  p: 1,
  borderRadius: 'calc(var(--Tree-radius) * 1px)',
  '& .MuiTreeItem-root': {
    position: 'relative',
    mb: 1,
    '&:last-of-type': { mb: 0 },
  },
});

export const iconContainerSx: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
});

export const treeItemContentBaseSx: SxProps<Theme> = (theme) => ({
  bgcolor: 'var(--Tree-bg)',
  border: '1px solid var(--Tree-border)',
  borderRadius: 'calc(var(--Tree-radius) * 1px)',
  px: 2,
  py: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color']),
  '&:hover': { backgroundColor: 'var(--Tree-item-hover)' },
  '&.Mui-selected': { backgroundColor: 'var(--Tree-item-selected)' },
  '&.Mui-focused': { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}` },
});

export const labelSx: SxProps<Theme> = (theme) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 0,
  '& .TreeLabel-left': {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    gap: 1,
  },
  '& .TreeLabel-title': {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .TreeLabel-subtitle': {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  '& .TreeLabel-right': {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
});

export const statusDotSx: SxProps<Theme> = (theme) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  flex: '0 0 auto',
  backgroundColor: theme.palette.text.disabled,
  '&.active': { backgroundColor: theme.palette.success.main },
  '&.stopped': { backgroundColor: theme.palette.warning.main },
});

export const chipSx: SxProps<Theme> = (theme) => ({
  px: 1,
  py: 0.25,
  borderRadius: 1,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
  color: theme.palette.primary.light,
  backgroundColor: alpha(theme.palette.primary.main, 0.06),
  fontSize: 12,
});

export const highlightLeftBorder = (meta?: NodeMeta): SxProps<Theme> => (theme) => {
  if (!meta || !meta.highlight || meta.highlight === 'none') return undefined;
  const colorMap: Record<string, string> = {
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    success: theme.palette.success.main,
    info: theme.palette.info.main,
  };
  const color = colorMap[meta.highlight] ?? theme.palette.primary.main;
  return {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      borderTopLeftRadius: 'inherit',
      borderBottomLeftRadius: 'inherit',
      backgroundColor: color,
    },
    pl: 2, // compensate for the left border visual
  } as const;
};

export const nodeRightActionsSx: SxProps<Theme> = () => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  '& .TreeAction': {
    cursor: 'pointer',
    opacity: 0.9,
    transition: 'opacity .2s',
  },
  '& .TreeAction[aria-disabled="true"]': {
    pointerEvents: 'none',
    opacity: 0.4,
  },
  '& .TreeAction:hover': {
    opacity: 1,
  },
});

export const emptyEndIconBoxSx: SxProps<Theme> = () => ({ width: 20, height: 20, display: 'inline-block' });

export const nodeContentComposeSx = (
  node: TreeDataNode,
  base: SxProps<Theme>,
  extra?: SxProps<Theme>,
): SxProps<Theme> => {
  const highlight = highlightLeftBorder(node.meta);
  const final: SxProps<Theme> = [base, highlight, extra].filter(Boolean) as SxProps<Theme>;
  return final;
};
