import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tree } from './Tree';
import { TreeDataNode } from './types';

/**
 * Пример данных, соответствующих скриншоту
 */
const exampleTreeData: TreeDataNode[] = [
  {
    id: 'deposit-1',
    label: 'Восточно-Мессояхское месторождение',
    meta: {
      distance: '2850м',
      status: {
        type: 'active',
        label: 'Активно',
        source: 'SAP',
      },
      matched: true,
      actions: [
        {
          icon: <SyncIcon fontSize="small" />,
          label: 'Синхронизация',
          onClick: (node, e) => {
            console.log('Sync clicked for', node.label);
          },
        },
        {
          icon: <SettingsIcon fontSize="small" />,
          label: 'Настройки',
          onClick: (node, e) => {
            console.log('Settings clicked for', node.label);
          },
        },
        {
          icon: <MoreVertIcon fontSize="small" />,
          label: 'Дополнительно',
          onClick: (node, e) => {
            console.log('More clicked for', node.label);
          },
        },
      ],
    },
    children: [
      {
        id: 'cluster-1',
        label: 'Куст ВМ-А',
        meta: {
          distance: '2850м',
          status: {
            type: 'active',
            label: 'Активно',
            source: 'SAP',
          },
          highlight: true,
        },
        children: [
          {
            id: 'well-1',
            label: 'Скважина ВМ-001',
            meta: {
              distance: '2850м',
              status: {
                type: 'active',
                label: 'Сопоставлено',
                source: 'WellDB',
              },
            },
          },
          {
            id: 'well-2',
            label: 'Скважина ВМ-002',
            meta: {
              distance: '2650м',
              tag: 'ТО',
              status: {
                type: 'conflict',
                label: 'Конфликт',
                source: 'WellDB',
              },
            },
          },
          {
            id: 'well-3',
            label: 'Скважина ВМ-003',
            meta: {
              distance: '2780м',
              status: {
                type: 'active',
                label: 'Сопоставлено',
                source: 'WellDB',
              },
            },
          },
        ],
      },
      {
        id: 'cluster-2',
        label: 'Куст ВМ-Б',
        meta: {
          distance: '2650м',
          status: {
            type: 'stopped',
            label: 'Остановлено',
          },
          actions: [
            {
              icon: <SyncIcon fontSize="small" />,
              label: 'Синхронизация',
              onClick: (node) => console.log('Sync', node.label),
            },
          ],
        },
      },
    ],
  },
  {
    id: 'deposit-2',
    label: 'Сургутское месторождение',
    meta: {
      distance: '3200м',
      status: {
        type: 'active',
        label: 'Активно',
        source: 'SAP',
      },
      matched: true,
    },
    children: [
      {
        id: 'cluster-3',
        label: 'Куст СГ-Северный',
        meta: {
          distance: '3200м',
          status: {
            type: 'partial',
            label: 'Частично',
          },
        },
      },
    ],
  },
  {
    id: 'deposit-3',
    label: 'Красноленинское месторождение',
    meta: {
      distance: '2950м',
      status: {
        type: 'active',
        label: 'Не сопоставлено',
      },
    },
  },
  {
    id: 'deposit-4',
    label: 'Южное месторождение',
    meta: {
      distance: '2400м',
      status: {
        type: 'stopped',
        label: 'Не сопоставлено',
      },
    },
  },
];

/**
 * Пример 1: Базовое использование с дефолтным рендерингом
 */
export function Example1BasicUsage(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Пример 1: Базовое использование
      </Typography>
      <Tree
        data={exampleTreeData}
        defaultExpanded={['deposit-1', 'cluster-1']}
        multiSelect
      />
    </Container>
  );
}

/**
 * Пример 2: Контролируемое состояние
 */
export function Example2ControlledState(): JSX.Element {
  const [expanded, setExpanded] = useState<string[]>(['deposit-1']);
  const [selected, setSelected] = useState<string | string[]>([]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Пример 2: Контролируемое состояние
      </Typography>
      
      <Box sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
        <Typography variant="body2">
          Раскрыто узлов: {expanded.length}
        </Typography>
        <Typography variant="body2">
          Выбрано узлов: {Array.isArray(selected) ? selected.length : selected ? 1 : 0}
        </Typography>
      </Box>

      <Tree
        data={exampleTreeData}
        expandedItems={expanded}
        onExpandedItemsChange={(event, itemIds) => setExpanded(itemIds)}
        selectedItems={selected}
        onSelectedItemsChange={(event, itemIds) => setSelected(itemIds || [])}
        multiSelect
      />
    </Container>
  );
}

/**
 * Пример 3: Кастомный рендеринг label
 */
export function Example3CustomRenderLabel(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Пример 3: Кастомный рендеринг label
      </Typography>
      <Tree
        data={exampleTreeData}
        defaultExpanded={['deposit-1', 'cluster-1']}
        renderLabel={(node) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#60a5fa',
              }}
            >
              🏭 {node.label}
            </Typography>
            {node.meta?.distance && (
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#fbbf24',
                }}
              >
                📏 {node.meta.distance}
              </Typography>
            )}
          </Box>
        )}
      />
    </Container>
  );
}

/**
 * Пример 4: Кастомизация стилей узлов
 */
export function Example4CustomNodeStyles(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Пример 4: Кастомизация стилей узлов
      </Typography>
      <Tree
        data={exampleTreeData}
        defaultExpanded={['deposit-1']}
        nodeContentSx={(node) => {
          // Разные стили для разных типов узлов
          if (node.meta?.status?.type === 'conflict') {
            return {
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.5)',
            };
          }
          if (node.meta?.status?.type === 'stopped') {
            return {
              opacity: 0.6,
            };
          }
          return {};
        }}
      />
    </Container>
  );
}

/**
 * Главный компонент с примерами использования
 */
export function ExampleTreeUsage(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Примеры использования Tree компонента
        </Typography>

        {/* Пример 1 */}
        <Example1BasicUsage />

        {/* Пример 2 */}
        <Example2ControlledState />

        {/* Пример 3 */}
        <Example3CustomRenderLabel />

        {/* Пример 4 */}
        <Example4CustomNodeStyles />
      </Container>
    </Box>
  );
}

export default ExampleTreeUsage;
