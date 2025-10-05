import { SxProps, Theme } from '@mui/material/styles';
import { TreeDataNode } from './types';

/**
 * Базовые стили для контейнера дерева (SimpleTreeView)
 */
export const treeSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: '100%',
  bgcolor: 'transparent',
  
  // Убираем дефолтные стили списка
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  
  // Стили для выбранного элемента
  '& .Mui-selected': {
    bgcolor: 'rgba(255, 255, 255, 0.08) !important',
  },
  
  // Стили для фокуса
  '& .Mui-focused': {
    bgcolor: 'rgba(255, 255, 255, 0.12)',
  },
};

/**
 * Базовые стили для контента узла дерева
 */
export const treeItemContentBaseSx: SxProps<Theme> = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(255, 255, 255, 0.12)',
  bgcolor: 'rgba(30, 41, 59, 0.8)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  minHeight: '56px',
  
  '&:hover': {
    bgcolor: 'rgba(30, 41, 59, 1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  '&.Mui-selected': {
    bgcolor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  
  '&.Mui-focused': {
    bgcolor: 'rgba(30, 41, 59, 1)',
  },
});

/**
 * Стили для контейнера label
 */
export const labelSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  gap: 2,
  minWidth: 0,
};

/**
 * Стили для основного текста label
 */
export const labelTextSx: SxProps<Theme> = {
  flex: '0 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.95)',
};

/**
 * Стили для контейнера с метаданными справа
 */
export const metaContainerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  flex: '0 0 auto',
};

/**
 * Стили для дистанции
 */
export const distanceSx: SxProps<Theme> = {
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.7)',
  minWidth: 'fit-content',
};

/**
 * Стили для контейнера статуса
 */
export const statusContainerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  padding: '4px 12px',
  borderRadius: '6px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  bgcolor: 'rgba(255, 255, 255, 0.05)',
  minWidth: 'fit-content',
};

/**
 * Стили для индикатора статуса (точка)
 */
export const statusIndicatorSx = (color: string): SxProps<Theme> => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  bgcolor: color,
  flexShrink: 0,
});

/**
 * Стили для текста статуса
 */
export const statusTextSx: SxProps<Theme> = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.9)',
  minWidth: 'fit-content',
};

/**
 * Стили для источника данных статуса
 */
export const statusSourceSx: SxProps<Theme> = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.95)',
  bgcolor: 'rgba(255, 255, 255, 0.1)',
  padding: '2px 6px',
  borderRadius: '4px',
  minWidth: 'fit-content',
};

/**
 * Стили для тега/бейджа
 */
export const tagSx: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '4px 8px',
  borderRadius: '4px',
  bgcolor: '#f59e0b',
  color: '#000',
  minWidth: 'fit-content',
};

/**
 * Стили для контейнера с действиями
 */
export const actionsContainerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  minWidth: 'fit-content',
};

/**
 * Стили для кнопки действия
 */
export const actionButtonSx: SxProps<Theme> = {
  padding: 0.5,
  minWidth: 'auto',
  color: 'rgba(255, 255, 255, 0.7)',
  
  '&:hover': {
    color: 'rgba(255, 255, 255, 1)',
    bgcolor: 'rgba(255, 255, 255, 0.1)',
  },
  
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
};

/**
 * Стили для контейнера иконок раскрытия/сворачивания
 */
export const iconContainerSx: SxProps<Theme> = {
  marginRight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  flexShrink: 0,
  
  '& svg': {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

/**
 * Функция для добавления выделения узла цветной левой границей
 */
export function highlightLeftBorder(
  baseSx: SxProps<Theme>,
  node: TreeDataNode,
  color: string = '#facc15'
): SxProps<Theme> {
  if (!node.meta?.highlight) return baseSx;
  
  return [
    baseSx,
    {
      borderLeft: `4px solid ${node.meta.highlightColor || color}`,
      paddingLeft: (theme: Theme) => `calc(${theme.spacing(2)} - 4px)`,
    },
  ];
}

/**
 * Стили для группы дочерних элементов
 */
export const groupSx: SxProps<Theme> = (theme: Theme) => ({
  marginLeft: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  borderLeft: '2px solid rgba(255, 255, 255, 0.08)',
});
