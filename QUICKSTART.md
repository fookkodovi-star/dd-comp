# 🚀 Быстрый старт

## Установка и запуск

```bash
# 1. Установите зависимости
npm install

# 2. Запустите dev-сервер
npm run dev

# 3. Откройте http://localhost:5173 в браузере
```

## Минимальный пример использования

```tsx
import { Tree, TreeDataNode } from '@/components/Tree';

const data: TreeDataNode[] = [
  {
    id: '1',
    label: 'Корневой узел',
    children: [
      {
        id: '1-1',
        label: 'Дочерний узел',
        meta: {
          distance: '2850м',
          status: {
            type: 'active',
            label: 'Активно',
            source: 'SAP',
          },
        },
      },
    ],
  },
];

function MyComponent() {
  return <Tree data={data} defaultExpanded={['1']} />;
}
```

## Структура компонента

```
src/components/Tree/
├── types.ts              # 📝 Все TypeScript типы
├── utils.ts              # 🛠️ Утилиты
├── styles.ts             # 🎨 Стили
├── CustomTreeItem.tsx    # 🌿 Компонент узла
├── Tree.tsx              # 🌳 Главный компонент
├── ExampleTreeUsage.tsx  # 📚 Примеры
├── index.ts              # 📦 Экспорты
└── README.md             # 📖 Документация
```

## Основные возможности

### 1. Базовое дерево

```tsx
<Tree data={data} />
```

### 2. С раскрытыми узлами

```tsx
<Tree data={data} defaultExpanded={['1', '2']} />
```

### 3. Множественный выбор

```tsx
<Tree data={data} multiSelect />
```

### 4. Кастомный label

```tsx
<Tree
  data={data}
  renderLabel={(node) => <div>🎯 {node.label}</div>}
/>
```

### 5. Кастомные стили

```tsx
<Tree
  data={data}
  nodeContentSx={(node) => ({
    bgcolor: node.meta?.status?.type === 'conflict' ? 'error.dark' : 'transparent',
  })}
/>
```

### 6. Контролируемое состояние

```tsx
const [expanded, setExpanded] = useState<string[]>(['1']);
const [selected, setSelected] = useState<string[]>([]);

<Tree
  data={data}
  expandedItems={expanded}
  onExpandedItemsChange={(e, ids) => setExpanded(ids)}
  selectedItems={selected}
  onSelectedItemsChange={(e, ids) => setSelected(ids || [])}
/>
```

## Метаданные узла

```tsx
const node: TreeDataNode = {
  id: '1',
  label: 'Узел с метаданными',
  meta: {
    // Дистанция
    distance: '2850м',
    
    // Статус с индикатором
    status: {
      type: 'active',      // 'active' | 'stopped' | 'conflict' | 'partial'
      label: 'Активно',
      source: 'SAP',       // Источник данных
    },
    
    // Тег/бейдж
    tag: 'TO',
    
    // Выделение цветной границей
    highlight: true,
    highlightColor: '#facc15',
    
    // Действия (кнопки справа)
    actions: [
      {
        icon: <SettingsIcon />,
        label: 'Настройки',
        onClick: (node, e) => console.log('Settings clicked'),
      },
    ],
  },
};
```

## Типы статусов и цвета

| Тип | Цвет | Значение |
|-----|------|----------|
| `active` | 🟢 Зеленый | Активный статус |
| `stopped` | ⚪ Серый | Остановлено |
| `conflict` | 🔴 Красный | Конфликт |
| `partial` | 🟠 Оранжевый | Частично |

## Утилиты

```tsx
import { hasChildren, getStatusColor, getAllNodeIds } from '@/components/Tree';

// Проверка наличия детей
const hasChild = hasChildren(node);

// Получение цвета статуса
const color = getStatusColor('active'); // '#4caf50'

// Получение всех ID узлов
const allIds = getAllNodeIds(treeData);
```

## Команды npm

```bash
npm run dev         # Запуск dev-сервера
npm run build       # Сборка для продакшена
npm run preview     # Предпросмотр сборки
npm run type-check  # Проверка TypeScript типов
```

## Полная документация

📖 Смотрите [src/components/Tree/README.md](src/components/Tree/README.md) для полной документации API и расширенных примеров.

## Поддержка

- **Issues**: Создайте issue в репозитории
- **Документация**: [Tree Component README](src/components/Tree/README.md)
- **Примеры**: Запустите `npm run dev` для просмотра всех примеров

---

Сделано с ❤️
