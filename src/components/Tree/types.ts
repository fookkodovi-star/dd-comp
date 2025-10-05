import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Статус узла дерева
 */
export type NodeStatus = 'active' | 'stopped' | 'conflict' | 'partial';

/**
 * Действие, которое можно выполнить над узлом
 */
export interface NodeAction {
  icon: ReactNode;
  label: string;
  onClick: (node: TreeDataNode, event: React.MouseEvent) => void;
  disabled?: boolean;
}

/**
 * Метаданные узла дерева для кастомизации отображения
 */
export interface NodeMeta {
  /** Расстояние/дистанция (например, "2850м") */
  distance?: string;
  
  /** Статус узла с цветовым индикатором */
  status?: {
    type: NodeStatus;
    label: string;
    /** Название источника данных (например, "SAP", "WellDB") */
    source?: string;
  };
  
  /** Флаг совпадения/метки */
  matched?: boolean;
  
  /** Тег/бейдж (например, "TO") */
  tag?: string;
  
  /** Подзаголовок узла */
  subtitle?: string;
  
  /** Массив действий (кнопки/иконки справа) */
  actions?: NodeAction[];
  
  /** Выделение узла цветной левой границей */
  highlight?: boolean;
  
  /** Цвет выделения (по умолчанию желтый) */
  highlightColor?: string;
  
  /** Произвольные дополнительные данные */
  [key: string]: unknown;
}

/**
 * Узел дерева с обязательным id, label и опциональными children и meta
 */
export interface TreeDataNode<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Уникальный идентификатор узла */
  id: string;
  
  /** Основной текст узла */
  label: string;
  
  /** Дочерние узлы */
  children?: TreeDataNode<T>[];
  
  /** Метаданные для кастомизации отображения */
  meta?: NodeMeta;
  
  /** Дополнительные данные узла */
  data?: T;
}

/**
 * Пропсы для компонента Tree
 */
export interface TreeProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Массив корневых узлов дерева */
  data: TreeDataNode<T>[];
  
  /** Кастомная функция рендеринга label узла */
  renderLabel?: (node: TreeDataNode<T>) => ReactNode;
  
  /** Кастомный геттер дочерних узлов (для lazy loading или адаптеров) */
  getChildren?: (node: TreeDataNode<T>) => TreeDataNode<T>[] | undefined;
  
  /** Неконтролируемый список раскрытых узлов по умолчанию */
  defaultExpanded?: string[];
  
  /** Контролируемый список раскрытых узлов */
  expandedItems?: string[];
  
  /** Callback при изменении раскрытых узлов */
  onExpandedItemsChange?: (event: React.SyntheticEvent, itemIds: string[]) => void;
  
  /** Неконтролируемый список выбранных узлов по умолчанию */
  defaultSelectedItems?: string | string[];
  
  /** Контролируемый список выбранных узлов */
  selectedItems?: string | string[];
  
  /** Callback при изменении выбранных узлов */
  onSelectedItemsChange?: (event: React.SyntheticEvent, itemIds: string | string[] | null) => void;
  
  /** Разрешить множественный выбор */
  multiSelect?: boolean;
  
  /** Функция для кастомизации стилей контента узла */
  nodeContentSx?: (node: TreeDataNode<T>) => SxProps<Theme>;
  
  /** Глобальные стили для контейнера дерева */
  sx?: SxProps<Theme>;
  
  /** Кастомная иконка для раскрытия */
  expandIcon?: ReactNode;
  
  /** Кастомная иконка для сворачивания */
  collapseIcon?: ReactNode;
  
  /** Кастомная иконка для листовых узлов */
  endIcon?: ReactNode;
  
  /** Отключить выбор узлов */
  disableSelection?: boolean;
}

/**
 * Пропсы для компонента CustomTreeItem
 */
export interface CustomTreeItemProps<T extends Record<string, unknown> = Record<string, unknown>> {
  node: TreeDataNode<T>;
  renderLabel?: (node: TreeDataNode<T>) => ReactNode;
  getChildren?: (node: TreeDataNode<T>) => TreeDataNode<T>[] | undefined;
  nodeContentSx?: (node: TreeDataNode<T>) => SxProps<Theme>;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  endIcon?: ReactNode;
}
