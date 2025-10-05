import type { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import type { NodeMeta } from './types';

export const treeSx: SxProps<Theme> = (theme) => ({
  bgcolor: 'background.default',
  color: 'text.primary',
  p: 0,
  '& .MuiTreeItem-root': {
    // spacing between items
    my: 0.5,
  },
  '& .Mui-selected > .MuiTreeItem-content, & .MuiTreeItem-content.Mui-selected': {
    bgcolor: alpha(theme.palette.primary.main, 0.12),
  },
  '& .MuiTreeItem-content:hover': {
    bgcolor: alpha(theme.palette.primary.main, 0.06),
  },
  '& .Mui-focused > .MuiTreeItem-content, & .MuiTreeItem-content.Mui-focused': {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    outlineOffset: -2,
  },
});

export const treeItemContentBaseSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 1,
  py: 0.5,
  borderRadius: 1,
  border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
  bgcolor: alpha(theme.palette.common.white, 0.02),
});

export const labelSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const iconContainerSx: SxProps<Theme> = (theme) => ({
  color: alpha(theme.palette.text.primary, 0.7),
});

export const chipSx: SxProps<Theme> = (theme) => ({
  height: 24,
  '& .MuiChip-label': { px: 1 },
});

export function highlightLeftBorder(meta?: NodeMeta): SxProps<Theme> | undefined {
  if (!meta || !meta.highlight) return undefined;
  const cfg = meta.highlight;
  const thickness = typeof cfg === 'object' ? cfg.thickness ?? 2 : 2;
  const color = typeof cfg === 'object' ? cfg.color : undefined;
  return (theme) => ({
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -4,
      top: 2,
      bottom: 2,
      width: thickness,
      borderRadius: 2,
      bgcolor: color ?? theme.palette.warning.main,
    },
  });
}

export function statusDotSx(color: string): SxProps<Theme> {
  return {
    width: 8,
    height: 8,
    borderRadius: '50%',
    bgcolor: color,
    display: 'inline-block',
  };
}