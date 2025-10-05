# 👨‍💻 Руководство разработчика

Для разработчиков, которые хотят расширить или модифицировать компонент Tree.

## 📁 Архитектура компонента

### Принципы разделения ответственности

Каждый файл отвечает за свою область:

```
types.ts       → Интерфейсы и типы
utils.ts       → Чистые функции без side-effects
styles.ts      → Все стили и sx-функции
CustomTreeItem → Отрисовка одного узла
Tree           → Управление всем деревом
```

### Поток данных

```
Tree.tsx
  ↓ Получает data, renderLabel, nodeContentSx
  ↓ Рендерит корневые узлы через CustomTreeItem
  ↓
CustomTreeItem.tsx
  ↓ Получает node, renderLabel, nodeContentSx
  ↓ Отрисовывает содержимое узла
  ↓ Рекурсивно рендерит children
  ↓
DefaultLabel (если нет renderLabel)
  ↓ Рендерит label с метаданными
  ↓ Отображает distance, status, actions
```

## 🔧 Как расширить функциональность

### Добавить новое поле в NodeMeta

1. Обновите интерфейс в `types.ts`:

```typescript
export interface NodeMeta {
  // ... существующие поля
  newField?: string; // Новое поле
}
```

2. Добавьте стили в `styles.ts`:

```typescript
export const newFieldSx: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.7)',
};
```

3. Обновите `DefaultLabel` в `CustomTreeItem.tsx`:

```tsx
{meta.newField && <Box sx={newFieldSx}>{meta.newField}</Box>}
```

### Добавить новый проп в Tree

1. Обновите `TreeProps` в `types.ts`:

```typescript
export interface TreeProps<T> {
  // ... существующие пропсы
  newProp?: boolean;
}
```

2. Добавьте в `Tree.tsx`:

```tsx
export function Tree({
  // ... существующие пропсы
  newProp,
}: TreeProps) {
  // Используйте newProp
}
```

3. Пробросьте в `CustomTreeItem` если нужно:

```tsx
<CustomTreeItem newProp={newProp} />
```

### Добавить новую утилиту

В `utils.ts`:

```typescript
/**
 * Описание утилиты
 */
export function newUtility(param: Type): ReturnType {
  // Реализация
  return result;
}
```

### Добавить новый стиль

В `styles.ts`:

```typescript
/**
 * Описание стиля
 */
export const newStyleSx: SxProps<Theme> = (theme: Theme) => ({
  // Стили
  padding: theme.spacing(2),
});
```

## 🎨 Кастомизация визуала

### Изменение цветовой схемы

В `styles.ts` измените:

```typescript
export const treeItemContentBaseSx: SxProps<Theme> = (theme: Theme) => ({
  // Фон карточки
  bgcolor: 'ваш-цвет',
  
  // Обводка
  border: '1px solid ваш-цвет',
  
  // Hover
  '&:hover': {
    bgcolor: 'ваш-цвет',
  },
});
```

### Изменение цветов статусов

В `utils.ts` измените `getStatusColor`:

```typescript
export function getStatusColor(status?: string): string {
  switch (status) {
    case 'active':
      return '#ваш-цвет';
    // ... другие статусы
  }
}
```

### Изменение шрифтов и размеров

В `styles.ts`:

```typescript
export const labelTextSx: SxProps<Theme> = {
  fontSize: 'ваш-размер',
  fontWeight: 'ваш-вес',
  fontFamily: 'ваш-шрифт',
};
```

## 🧪 Тестирование (рекомендации)

### Unit-тесты для утилит

```typescript
// utils.test.ts
import { hasChildren, mergeSx, getStatusColor } from './utils';

describe('hasChildren', () => {
  it('должен вернуть true для узла с детьми', () => {
    const node = { id: '1', label: 'Test', children: [{ id: '1-1', label: 'Child' }] };
    expect(hasChildren(node)).toBe(true);
  });

  it('должен вернуть false для узла без детей', () => {
    const node = { id: '1', label: 'Test' };
    expect(hasChildren(node)).toBe(false);
  });
});
```

### Интеграционные тесты для компонента

```typescript
// Tree.test.tsx
import { render, screen } from '@testing-library/react';
import { Tree } from './Tree';

const mockData = [
  { id: '1', label: 'Root', children: [{ id: '1-1', label: 'Child' }] },
];

describe('Tree', () => {
  it('должен отрисовать дерево', () => {
    render(<Tree data={mockData} />);
    expect(screen.getByText('Root')).toBeInTheDocument();
  });

  it('должен поддерживать multiSelect', () => {
    render(<Tree data={mockData} multiSelect />);
    // Тесты выбора
  });
});
```

## 🚀 Производительность

### Оптимизация мемоизации

В `CustomTreeItem.tsx` функция `areEqual` определяет, когда компонент должен ре-рендериться:

```typescript
function areEqual(prevProps, nextProps): boolean {
  // Добавьте дополнительные проверки если нужно
  if (prevProps.customProp !== nextProps.customProp) return false;
  
  return true;
}
```

### Виртуализация для больших деревьев

Для очень больших деревьев (1000+ узлов) рекомендуется:

1. Использовать виртуализацию (react-window или react-virtualized)
2. Реализовать lazy loading через `getChildren`
3. Ограничить глубину по умолчанию

Пример интеграции с react-window:

```tsx
import { FixedSizeList } from 'react-window';

// Flatten tree для виртуализации
function flattenTree(nodes: TreeDataNode[]): TreeDataNode[] {
  // Реализация
}

function VirtualizedTree({ data }: TreeProps) {
  const flatData = flattenTree(data);
  
  return (
    <FixedSizeList
      height={600}
      itemCount={flatData.length}
      itemSize={56}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <CustomTreeItem node={flatData[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

## 🐛 Отладка

### Debug-режим

Добавьте debug-проп:

```typescript
// types.ts
export interface TreeProps {
  debug?: boolean;
}

// Tree.tsx
export function Tree({ debug, ...props }: TreeProps) {
  useEffect(() => {
    if (debug) {
      console.log('Tree data:', props.data);
      console.log('Expanded:', props.expandedItems);
      console.log('Selected:', props.selectedItems);
    }
  }, [debug, props]);
}
```

### React DevTools

Используйте React DevTools для:
- Просмотра пропсов компонентов
- Проверки мемоизации
- Анализа рендеров

## 📦 Публикация как npm-пакет

### 1. Подготовка package.json

```json
{
  "name": "@your-org/tree-component",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "@mui/material": "^5.0.0",
    "@mui/x-tree-view": "^7.0.0",
    "react": "^18.0.0"
  }
}
```

### 2. Настройка сборки

Используйте rollup или tsc для сборки:

```bash
npm run build
```

### 3. Публикация

```bash
npm publish
```

## 🔄 Миграция существующих деревьев

### Адаптер для старого формата данных

```typescript
// adapter.ts
function adaptLegacyTree(oldData: OldTreeNode[]): TreeDataNode[] {
  return oldData.map((node) => ({
    id: node.nodeId,
    label: node.name,
    children: node.items ? adaptLegacyTree(node.items) : undefined,
    meta: {
      // Маппинг метаданных
    },
  }));
}
```

## 🎓 Best Practices

### 1. Всегда типизируйте данные

```typescript
interface MyData {
  customField: string;
}

const data: TreeDataNode<MyData>[] = [
  {
    id: '1',
    label: 'Node',
    data: { customField: 'value' },
  },
];
```

### 2. Используйте memo для тяжелых вычислений

```typescript
const expensiveCalculation = useMemo(() => {
  return calculateSomething(data);
}, [data]);
```

### 3. Разделяйте логику и представление

Создавайте хуки для бизнес-логики:

```typescript
function useTreeLogic(initialData: TreeDataNode[]) {
  const [data, setData] = useState(initialData);
  const [expanded, setExpanded] = useState<string[]>([]);
  
  const addNode = (parentId: string, newNode: TreeDataNode) => {
    // Логика добавления
  };
  
  return { data, expanded, addNode };
}
```

### 4. Используйте TypeScript strict mode

В `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 📚 Дополнительные ресурсы

- [MUI Tree View Docs](https://mui.com/x/react-tree-view/)
- [React Memo Docs](https://react.dev/reference/react/memo)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contribution Guidelines

1. Форкните репозиторий
2. Создайте feature-ветку (`git checkout -b feature/amazing-feature`)
3. Коммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Пушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

Есть вопросы? Создайте issue в репозитории!
