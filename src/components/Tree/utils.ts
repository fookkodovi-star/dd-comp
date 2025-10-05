import { SxProps, Theme } from '@mui/material/styles';
import { TreeDataNode } from './types';

/**
 * Проверяет, есть ли у узла дочерние элементы
 */
export function hasChildren<T extends Record<string, unknown>>(
  node: TreeDataNode<T>,
  getChildren?: (node: TreeDataNode<T>) => TreeDataNode<T>[] | undefined
): boolean {
  const children = getChildren ? getChildren(node) : node.children;
  return Boolean(children && children.length > 0);
}

/**
 * Дефолтный геттер дочерних элементов
 */
export function defaultGetChildren<T extends Record<string, unknown>>(
  node: TreeDataNode<T>
): TreeDataNode<T>[] | undefined {
  return node.children;
}

/**
 * Объединяет несколько SxProps в один объект
 * Более поздние объекты имеют приоритет
 */
export function mergeSx(...sxProps: (SxProps<Theme> | undefined)[]): SxProps<Theme> {
  const filtered = sxProps.filter(Boolean);
  
  if (filtered.length === 0) return {};
  if (filtered.length === 1) return filtered[0] as SxProps<Theme>;
  
  return (theme: Theme) => {
    const results: Record<string, unknown>[] = [];
    
    filtered.forEach((sx) => {
      if (!sx) return;
      
      if (typeof sx === 'function') {
        const result = sx(theme);
        if (Array.isArray(result)) {
          results.push(...result);
        } else {
          results.push(result as Record<string, unknown>);
        }
      } else if (Array.isArray(sx)) {
        results.push(...sx);
      } else {
        results.push(sx as Record<string, unknown>);
      }
    });
    
    return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };
}

/**
 * Получает цвет статуса узла
 */
export function getStatusColor(status?: string): string {
  switch (status) {
    case 'active':
      return '#4caf50'; // Зеленый
    case 'stopped':
      return '#9e9e9e'; // Серый
    case 'conflict':
      return '#f44336'; // Красный
    case 'partial':
      return '#ff9800'; // Оранжевый
    default:
      return '#2196f3'; // Синий по умолчанию
  }
}

/**
 * Рекурсивно собирает все ID узлов для раскрытия по умолчанию
 */
export function getAllNodeIds<T extends Record<string, unknown>>(
  nodes: TreeDataNode<T>[],
  getChildren?: (node: TreeDataNode<T>) => TreeDataNode<T>[] | undefined
): string[] {
  const ids: string[] = [];
  
  const traverse = (node: TreeDataNode<T>) => {
    ids.push(node.id);
    const children = getChildren ? getChildren(node) : node.children;
    if (children) {
      children.forEach(traverse);
    }
  };
  
  nodes.forEach(traverse);
  return ids;
}
