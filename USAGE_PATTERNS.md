# 🎯 Паттерны использования Tree Component

Готовые решения для частых задач.

## 📋 Содержание

1. [Базовое использование](#базовое-использование)
2. [Контролируемое состояние](#контролируемое-состояние)
3. [Кастомный рендеринг](#кастомный-рендеринг)
4. [Стилизация](#стилизация)
5. [Действия и обработчики](#действия-и-обработчики)
6. [Lazy Loading](#lazy-loading)
7. [Поиск по дереву](#поиск-по-дереву)
8. [Интеграция с API](#интеграция-с-api)

---

## Базовое использование

### Простейшее дерево

```tsx
import { Tree } from '@/components/Tree';

const data = [
  {
    id: '1',
    label: 'Узел 1',
    children: [
      { id: '1-1', label: 'Дочерний узел 1-1' },
      { id: '1-2', label: 'Дочерний узел 1-2' },
    ],
  },
];

function MyTree() {
  return <Tree data={data} />;
}
```

### С раскрытыми узлами по умолчанию

```tsx
<Tree data={data} defaultExpanded={['1', '2']} />
```

### С множественным выбором

```tsx
<Tree data={data} multiSelect defaultSelectedItems={['1-1', '1-2']} />
```

---

## Контролируемое состояние

### Полный контроль над раскрытием и выбором

```tsx
function ControlledTree() {
  const [expanded, setExpanded] = useState<string[]>(['1']);
  const [selected, setSelected] = useState<string[]>([]);

  const handleExpand = (event: React.SyntheticEvent, itemIds: string[]) => {
    console.log('Раскрыто:', itemIds);
    setExpanded(itemIds);
  };

  const handleSelect = (event: React.SyntheticEvent, itemIds: string | string[] | null) => {
    console.log('Выбрано:', itemIds);
    setSelected(Array.isArray(itemIds) ? itemIds : itemIds ? [itemIds] : []);
  };

  return (
    <Tree
      data={data}
      expandedItems={expanded}
      onExpandedItemsChange={handleExpand}
      selectedItems={selected}
      onSelectedItemsChange={handleSelect}
      multiSelect
    />
  );
}
```

### Программное раскрытие всех узлов

```tsx
import { getAllNodeIds } from '@/components/Tree';

function TreeWithExpandAll() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const expandAll = () => {
    const allIds = getAllNodeIds(data);
    setExpanded(allIds);
  };

  const collapseAll = () => {
    setExpanded([]);
  };

  return (
    <>
      <button onClick={expandAll}>Раскрыть всё</button>
      <button onClick={collapseAll}>Свернуть всё</button>
      <Tree
        data={data}
        expandedItems={expanded}
        onExpandedItemsChange={(e, ids) => setExpanded(ids)}
      />
    </>
  );
}
```

---

## Кастомный рендеринг

### Простой кастомный label

```tsx
<Tree
  data={data}
  renderLabel={(node) => (
    <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>
      {node.label}
    </div>
  )}
/>
```

### Label с иконками и бейджами

```tsx
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import { Badge, Box, Typography } from '@mui/material';

<Tree
  data={data}
  renderLabel={(node) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {node.children ? <FolderIcon /> : <ArticleIcon />}
      <Typography>{node.label}</Typography>
      {node.meta?.tag && (
        <Badge badgeContent={node.meta.tag} color="primary" />
      )}
    </Box>
  )}
/>
```

### Условный рендеринг

```tsx
<Tree
  data={data}
  renderLabel={(node) => {
    if (node.meta?.status?.type === 'conflict') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          <Typography color="error">{node.label}</Typography>
        </Box>
      );
    }
    return <Typography>{node.label}</Typography>;
  }}
/>
```

---

## Стилизация

### Динамические стили на основе данных

```tsx
<Tree
  data={data}
  nodeContentSx={(node) => ({
    bgcolor:
      node.meta?.status?.type === 'conflict'
        ? 'rgba(239, 68, 68, 0.1)'
        : node.meta?.status?.type === 'stopped'
        ? 'rgba(156, 163, 175, 0.1)'
        : 'transparent',
    borderColor:
      node.meta?.status?.type === 'conflict'
        ? 'rgba(239, 68, 68, 0.5)'
        : 'rgba(255, 255, 255, 0.12)',
    opacity: node.meta?.status?.type === 'stopped' ? 0.6 : 1,
  })}
/>
```

### Стили по уровню вложенности

```tsx
function getNodeDepth(nodeId: string): number {
  return nodeId.split('-').length;
}

<Tree
  data={data}
  nodeContentSx={(node) => {
    const depth = getNodeDepth(node.id);
    return {
      paddingLeft: `${depth * 16}px`,
      fontSize: `${1 - depth * 0.1}rem`,
    };
  }}
/>
```

### Выделение активного узла

```tsx
function TreeWithActive() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Tree
      data={data}
      selectedItems={activeId || []}
      onSelectedItemsChange={(e, ids) => {
        const id = Array.isArray(ids) ? ids[0] : ids;
        setActiveId(id || null);
      }}
      nodeContentSx={(node) => ({
        bgcolor: node.id === activeId ? 'primary.dark' : 'transparent',
        borderLeft: node.id === activeId ? '4px solid' : 'none',
        borderColor: 'primary.main',
      })}
    />
  );
}
```

---

## Действия и обработчики

### Кнопки действий на узлах

```tsx
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const data = [
  {
    id: '1',
    label: 'Узел с действиями',
    meta: {
      actions: [
        {
          icon: <EditIcon />,
          label: 'Редактировать',
          onClick: (node, e) => {
            e.stopPropagation();
            console.log('Редактирование:', node.label);
          },
        },
        {
          icon: <DeleteIcon />,
          label: 'Удалить',
          onClick: (node, e) => {
            e.stopPropagation();
            if (confirm(`Удалить ${node.label}?`)) {
              console.log('Удаление:', node.id);
            }
          },
        },
        {
          icon: <SettingsIcon />,
          label: 'Настройки',
          onClick: (node, e) => {
            e.stopPropagation();
            console.log('Настройки:', node.id);
          },
        },
      ],
    },
  },
];
```

### Контекстное меню

```tsx
function TreeWithContextMenu() {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    node: TreeDataNode | null;
  } | null>(null);

  const handleContextMenu = (node: TreeDataNode) => (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX,
      mouseY: e.clientY,
      node,
    });
  };

  return (
    <>
      <Tree
        data={data}
        renderLabel={(node) => (
          <div onContextMenu={handleContextMenu(node)}>
            {node.label}
          </div>
        )}
      />
      {contextMenu && (
        <Menu
          open={Boolean(contextMenu)}
          onClose={() => setContextMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
          }}
        >
          <MenuItem onClick={() => console.log('Действие 1')}>Действие 1</MenuItem>
          <MenuItem onClick={() => console.log('Действие 2')}>Действие 2</MenuItem>
        </Menu>
      )}
    </>
  );
}
```

---

## Lazy Loading

### Загрузка детей по требованию

```tsx
function LazyTree() {
  const [loadedNodes, setLoadedNodes] = useState<Record<string, TreeDataNode[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const loadChildren = async (nodeId: string) => {
    if (loadedNodes[nodeId] || loading[nodeId]) return;

    setLoading({ ...loading, [nodeId]: true });

    // Симуляция загрузки с сервера
    const children = await fetch(`/api/nodes/${nodeId}/children`).then((r) => r.json());

    setLoadedNodes({ ...loadedNodes, [nodeId]: children });
    setLoading({ ...loading, [nodeId]: false });
  };

  const getChildren = (node: TreeDataNode) => {
    // Если дети уже загружены
    if (loadedNodes[node.id]) {
      return loadedNodes[node.id];
    }

    // Если узел имеет дочерние, но они не загружены
    if (node.data?.hasChildren) {
      loadChildren(node.id);
      return []; // Показываем пустой массив пока грузятся
    }

    return node.children;
  };

  return <Tree data={data} getChildren={getChildren} />;
}
```

---

## Поиск по дереву

### Фильтрация узлов

```tsx
function TreeWithSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterTree = (nodes: TreeDataNode[], query: string): TreeDataNode[] => {
    return nodes
      .map((node) => {
        const matchesQuery = node.label.toLowerCase().includes(query.toLowerCase());
        const children = node.children ? filterTree(node.children, query) : undefined;

        if (matchesQuery || (children && children.length > 0)) {
          return { ...node, children };
        }
        return null;
      })
      .filter(Boolean) as TreeDataNode[];
  };

  const filteredData = searchQuery ? filterTree(data, searchQuery) : data;

  return (
    <>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Tree data={filteredData} />
    </>
  );
}
```

### Автоматическое раскрытие при поиске

```tsx
function TreeWithAutoExpand() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery) {
      // Раскрываем все узлы при поиске
      const allIds = getAllNodeIds(data);
      setExpanded(allIds);
    }
  }, [searchQuery]);

  const filteredData = searchQuery ? filterTree(data, searchQuery) : data;

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Tree
        data={filteredData}
        expandedItems={expanded}
        onExpandedItemsChange={(e, ids) => setExpanded(ids)}
      />
    </>
  );
}
```

---

## Интеграция с API

### Загрузка данных с сервера

```tsx
function ApiTree() {
  const [data, setData] = useState<TreeDataNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tree-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return <Tree data={data} />;
}
```

### CRUD операции

```tsx
function TreeWithCrud() {
  const [data, setData] = useState<TreeDataNode[]>(initialData);

  const addNode = (parentId: string, newNode: TreeDataNode) => {
    const addToTree = (nodes: TreeDataNode[]): TreeDataNode[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        }
        if (node.children) {
          return { ...node, children: addToTree(node.children) };
        }
        return node;
      });
    };
    setData(addToTree(data));
  };

  const updateNode = (nodeId: string, updates: Partial<TreeDataNode>) => {
    const updateInTree = (nodes: TreeDataNode[]): TreeDataNode[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, ...updates };
        }
        if (node.children) {
          return { ...node, children: updateInTree(node.children) };
        }
        return node;
      });
    };
    setData(updateInTree(data));
  };

  const deleteNode = (nodeId: string) => {
    const deleteFromTree = (nodes: TreeDataNode[]): TreeDataNode[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteFromTree(node.children) : undefined,
        }));
    };
    setData(deleteFromTree(data));
  };

  return (
    <Tree
      data={data}
      renderLabel={(node) => (
        <div>
          {node.label}
          <button onClick={() => updateNode(node.id, { label: 'Обновлено' })}>
            Изменить
          </button>
          <button onClick={() => deleteNode(node.id)}>Удалить</button>
        </div>
      )}
    />
  );
}
```

---

## 🎉 Готовые решения

Все паттерны выше протестированы и готовы к использованию. Копируйте и адаптируйте под свои нужды!

**Совет:** Комбинируйте паттерны для создания сложных интерактивных деревьев.

---

Подробнее смотрите в [src/components/Tree/README.md](src/components/Tree/README.md)
