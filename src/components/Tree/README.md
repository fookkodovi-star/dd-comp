# Tree Component

Многофункциональный, типизированный и переиспользуемый React-компонент дерева на основе `@mui/x-tree-view`.

## 📁 Структура файлов

```
src/components/Tree/
├── types.ts                 # TypeScript типы и интерфейсы
├── utils.ts                 # Утилиты (hasChildren, mergeSx, getStatusColor и т.д.)
├── styles.ts                # Все sx-константы и функции стилизации
├── CustomTreeItem.tsx       # Компонент-обёртка над TreeItem с мемоизацией
├── Tree.tsx                 # Главный компонент-оболочка над SimpleTreeView
├── ExampleTreeUsage.tsx     # Примеры использования
├── index.ts                 # Экспорты
└── README.md                # Документация
```

## 🚀 Быстрый старт

### Базовое использование

```tsx
import { Tree, TreeDataNode } from '@/components/Tree';

const data: TreeDataNode[] = [
  {
    id: '1',
    label: 'Месторождение А',
    meta: {
      distance: '2850м',
      status: {
        type: 'active',
        label: 'Активно',
        source: 'SAP',
      },
    },
    children: [
      {
        id: '1-1',
        label: 'Куст 1',
        meta: {
          distance: '2850м',
          status: {
            type: 'active',
            label: 'Сопоставлено',
            source: 'WellDB',
          },
        },
      },
    ],
  },
];

function App() {
  return (
    <Tree
      data={data}
      defaultExpanded={['1']}
      multiSelect
    />
  );
}
```

## 📚 API Reference

### TreeProps

| Prop | Тип | Описание | По умолчанию |
|------|-----|----------|--------------|
| `data` | `TreeDataNode[]` | Массив корневых узлов дерева | **обязательный** |
| `renderLabel` | `(node: TreeDataNode) => ReactNode` | Кастомная функция рендеринга label | `undefined` |
| `getChildren` | `(node: TreeDataNode) => TreeDataNode[]` | Кастомный геттер дочерних узлов | `node.children` |
| `defaultExpanded` | `string[]` | Неконтролируемый список раскрытых узлов | `undefined` |
| `expandedItems` | `string[]` | Контролируемый список раскрытых узлов | `undefined` |
| `onExpandedItemsChange` | `(event, itemIds: string[]) => void` | Callback при изменении раскрытых узлов | `undefined` |
| `defaultSelectedItems` | `string \| string[]` | Неконтролируемый список выбранных узлов | `undefined` |
| `selectedItems` | `string \| string[]` | Контролируемый список выбранных узлов | `undefined` |
| `onSelectedItemsChange` | `(event, itemIds) => void` | Callback при изменении выбранных узлов | `undefined` |
| `multiSelect` | `boolean` | Разрешить множественный выбор | `false` |
| `nodeContentSx` | `(node: TreeDataNode) => SxProps` | Функция для кастомизации стилей узла | `undefined` |
| `sx` | `SxProps` | Глобальные стили контейнера дерева | `undefined` |
| `expandIcon` | `ReactNode` | Кастомная иконка раскрытия | `<ExpandMoreIcon />` |
| `collapseIcon` | `ReactNode` | Кастомная иконка сворачивания | `<ChevronRightIcon />` |
| `endIcon` | `ReactNode` | Кастомная иконка для листовых узлов | `undefined` |
| `disableSelection` | `boolean` | Отключить выбор узлов | `false` |

### TreeDataNode

```typescript
interface TreeDataNode<T = Record<string, unknown>> {
  id: string;              // Уникальный идентификатор узла
  label: string;           // Основной текст узла
  children?: TreeDataNode[]; // Дочерние узлы
  meta?: NodeMeta;         // Метаданные для кастомизации отображения
  data?: T;                // Дополнительные данные узла
}
```

### NodeMeta

```typescript
interface NodeMeta {
  distance?: string;       // Расстояние/дистанция (например, "2850м")
  status?: {
    type: 'active' | 'stopped' | 'conflict' | 'partial';
    label: string;
    source?: string;       // Источник данных (например, "SAP", "WellDB")
  };
  matched?: boolean;       // Флаг совпадения/метки
  tag?: string;            // Тег/бейдж (например, "TO")
  subtitle?: string;       // Подзаголовок узла
  actions?: NodeAction[];  // Массив действий (кнопки справа)
  highlight?: boolean;     // Выделение узла цветной левой границей
  highlightColor?: string; // Цвет выделения (по умолчанию желтый)
}
```

### NodeAction

```typescript
interface NodeAction {
  icon: ReactNode;
  label: string;
  onClick: (node: TreeDataNode, event: React.MouseEvent) => void;
  disabled?: boolean;
}
```

## 💡 Примеры использования

### Пример 1: Контролируемое состояние

```tsx
import { useState } from 'react';
import { Tree } from '@/components/Tree';

function ControlledTree() {
  const [expanded, setExpanded] = useState<string[]>(['1']);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Tree
      data={data}
      expandedItems={expanded}
      onExpandedItemsChange={(event, itemIds) => setExpanded(itemIds)}
      selectedItems={selected}
      onSelectedItemsChange={(event, itemIds) => setSelected(itemIds || [])}
      multiSelect
    />
  );
}
```

### Пример 2: Кастомный рендеринг label

```tsx
import { Tree } from '@/components/Tree';
import { Box, Typography } from '@mui/material';

function CustomLabelTree() {
  return (
    <Tree
      data={data}
      renderLabel={(node) => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600 }}>
            {node.label}
          </Typography>
          {node.meta?.distance && (
            <Typography sx={{ color: 'text.secondary' }}>
              {node.meta.distance}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}
```

### Пример 3: Кастомизация стилей узлов

```tsx
import { Tree } from '@/components/Tree';

function StyledTree() {
  return (
    <Tree
      data={data}
      nodeContentSx={(node) => {
        if (node.meta?.status?.type === 'conflict') {
          return {
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.5)',
          };
        }
        return {};
      }}
    />
  );
}
```

### Пример 4: Действия на узлах

```tsx
import { Tree, TreeDataNode } from '@/components/Tree';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';

const data: TreeDataNode[] = [
  {
    id: '1',
    label: 'Узел с действиями',
    meta: {
      actions: [
        {
          icon: <SyncIcon />,
          label: 'Синхронизация',
          onClick: (node, e) => {
            console.log('Sync clicked for', node.label);
          },
        },
        {
          icon: <SettingsIcon />,
          label: 'Настройки',
          onClick: (node, e) => {
            console.log('Settings clicked for', node.label);
          },
        },
      ],
    },
  },
];

function TreeWithActions() {
  return <Tree data={data} />;
}
```

### Пример 5: Lazy Loading (через кастомный getChildren)

```tsx
import { Tree, TreeDataNode } from '@/components/Tree';

const data: TreeDataNode[] = [
  {
    id: '1',
    label: 'Родительский узел',
    data: { hasChildren: true, loaded: false },
  },
];

function LazyLoadTree() {
  const [loadedNodes, setLoadedNodes] = useState<Record<string, TreeDataNode[]>>({});

  const getChildren = (node: TreeDataNode) => {
    // Если дети уже загружены, возвращаем их
    if (loadedNodes[node.id]) {
      return loadedNodes[node.id];
    }
    
    // Если у узла есть дети но они не загружены
    if (node.data?.hasChildren && !node.data?.loaded) {
      // Здесь можно запустить загрузку
      loadChildrenForNode(node.id);
      return []; // Временно пустой массив
    }
    
    return node.children;
  };

  return (
    <Tree
      data={data}
      getChildren={getChildren}
    />
  );
}
```

## 🎨 Стилизация

### Переопределение глобальных стилей

```tsx
import { Tree } from '@/components/Tree';

function CustomStyledTree() {
  return (
    <Tree
      data={data}
      sx={{
        '& .Mui-selected': {
          bgcolor: 'primary.main',
        },
        '& .MuiTreeItem-content:hover': {
          bgcolor: 'action.hover',
        },
      }}
    />
  );
}
```

### Использование экспортированных стилей

```tsx
import { Tree, treeItemContentBaseSx } from '@/components/Tree';

function TreeWithCustomStyles() {
  return (
    <Tree
      data={data}
      nodeContentSx={(node) => ({
        ...treeItemContentBaseSx,
        // Дополнительные стили
        borderRadius: '12px',
      })}
    />
  );
}
```

## 🔧 Утилиты

### hasChildren

Проверяет, есть ли у узла дочерние элементы.

```tsx
import { hasChildren } from '@/components/Tree';

const hasChild = hasChildren(node, getChildren);
```

### mergeSx

Объединяет несколько SxProps в один объект.

```tsx
import { mergeSx } from '@/components/Tree';

const combinedSx = mergeSx(baseSx, customSx, conditionalSx);
```

### getStatusColor

Получает цвет для типа статуса.

```tsx
import { getStatusColor } from '@/components/Tree';

const color = getStatusColor('active'); // '#4caf50'
```

### getAllNodeIds

Рекурсивно собирает все ID узлов.

```tsx
import { getAllNodeIds } from '@/components/Tree';

const allIds = getAllNodeIds(treeData);
```

## 📦 Зависимости

Убедитесь, что в проекте установлены следующие пакеты:

```json
{
  "dependencies": {
    "@mui/material": "^5.x",
    "@mui/x-tree-view": "^6.x",
    "@mui/icons-material": "^5.x",
    "react": "^18.x"
  }
}
```

## 🎯 Возможности

- ✅ Полная типизация TypeScript
- ✅ Контролируемый и неконтролируемый режимы
- ✅ Множественный выбор
- ✅ Кастомный рендеринг label
- ✅ Lazy loading через getChildren
- ✅ Мемоизация для оптимизации производительности
- ✅ Гибкая кастомизация стилей
- ✅ Поддержка метаданных (статусы, действия, теги)
- ✅ Анимации раскрытия/сворачивания
- ✅ Выделение узлов цветной границей
- ✅ Поддержка иконок и действий

## 🔄 Обновления и расширения

Компонент легко расширяется благодаря модульной архитектуре:

1. **types.ts** - добавьте новые типы для метаданных
2. **utils.ts** - добавьте новые утилиты
3. **styles.ts** - добавьте новые стили
4. **CustomTreeItem.tsx** - измените логику отрисовки узлов
5. **Tree.tsx** - добавьте новые пропсы на уровне дерева

## 📄 Лицензия

Этот компонент является частью проекта и может свободно использоваться и модифицироваться.
