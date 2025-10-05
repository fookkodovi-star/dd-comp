import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PlaceIcon from '@mui/icons-material/Place';
import MapIcon from '@mui/icons-material/Map';
import LinkIcon from '@mui/icons-material/Link';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { SxProps, Theme } from '@mui/material/styles';
import Tree from './Tree';
import type { NodeMeta, TreeDataNode } from './types';

interface DemoMeta extends NodeMeta {
  kind: 'field' | 'pad' | 'well';
}

function makeNode(
  id: string,
  label: string,
  meta: Partial<DemoMeta> = {},
  children?: TreeDataNode<DemoMeta>[]
): TreeDataNode<DemoMeta> {
  return { id, label, meta: meta as DemoMeta, children };
}

export default function ExampleTreeUsage() {
  const data = useMemo<TreeDataNode<DemoMeta>[]>(
    () => [
      makeNode(
        'field-1',
        'Восточно-Мессоякское месторождение',
        {
          kind: 'field',
          distance: '2850m',
          status: 'active',
          matched: 'SAP',
          chips: [{ label: 'Сопоставлено', color: 'success', variant: 'outlined' }],
          actions: [
            { id: 'refresh', icon: <ReplayIcon fontSize="small" />, tooltip: 'Обновить' },
          ],
        },
        [
          makeNode(
            'pad-1',
            'Куст BM-A',
            {
              kind: 'pad',
              distance: '2850m',
              status: 'active',
              matched: 'SAP',
            },
            [
              makeNode('well-1', 'Скважина BM-001', {
                kind: 'well',
                distance: '2850m',
                status: 'active',
                matched: 'WellDB',
                chips: [{ label: 'Сопоставлено', color: 'success' }],
              }),
              makeNode('well-2', 'Скважина BM-002', {
                kind: 'well',
                distance: '2650m',
                status: 'warning',
                chips: [{ label: 'Конфликт', color: 'warning', variant: 'outlined' }],
                matched: 'WellDB',
                highlight: { color: '#f7b500' },
              }),
              makeNode('well-3', 'Скважина BM-003', {
                kind: 'well',
                distance: '2780m',
                status: 'active',
                chips: [{ label: 'Сопоставлено', color: 'success' }],
                matched: 'WellDB',
              }),
            ]
          ),
          makeNode(
            'pad-2',
            'Куст BM-Б',
            { kind: 'pad', distance: '2650m', status: 'inactive', chips: [{ label: 'Частично', color: 'info', variant: 'outlined' }] }
          ),
        ]
      ),
      makeNode(
        'field-2',
        'Сургутское месторождение',
        {
          kind: 'field',
          distance: '3200m',
          status: 'active',
          chips: [{ label: 'Сопоставлено', color: 'success', variant: 'outlined' }],
          matched: 'SAP',
        },
        [
          makeNode(
            'pad-3',
            'Куст СГ-Северный',
            { kind: 'pad', distance: '3200m', status: 'active', chips: [{ label: 'Частично', color: 'info', variant: 'outlined' }] }
          ),
        ]
      ),
      makeNode(
        'field-3',
        'Красноленинское месторождение',
        {
          kind: 'field',
          distance: '2950m',
          status: 'active',
          chips: [{ label: 'Не сопоставлено', color: 'default', variant: 'outlined' }],
        }
      ),
      makeNode(
        'field-4',
        'Южное месторождение',
        { kind: 'field', distance: '2400m', status: 'inactive', chips: [{ label: 'Не сопоставлено', variant: 'outlined' }] }
      ),
    ],
    []
  );

  const [expanded, setExpanded] = useState<string[]>(['field-1', 'pad-1']);
  const [selected, setSelected] = useState<string | string[]>('well-1');

  const renderLabel = (node: TreeDataNode<DemoMeta>) => {
    return (
      <Stack direction="row" alignItems="center" sx={{ minWidth: 0, flex: 1 }} spacing={1}>
        {node.meta?.kind === 'field' && <MapIcon fontSize="small" />}
        {node.meta?.kind === 'pad' && <PlaceIcon fontSize="small" />}
        {node.meta?.kind === 'well' && <CheckIcon fontSize="small" />}
        <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
          {node.label}
        </Typography>
        <Box sx={{ flex: 1 }} />
        {node.meta?.distance && (
          <Typography variant="caption" color="text.secondary">{String(node.meta.distance)}</Typography>
        )}
        {node.meta?.matched && (
          <Chip size="small" label={node.meta.matched} color="success" variant="outlined" />
        )}
        {node.meta?.chips?.map((c, i) => (
          <Chip key={i} size="small" label={c.label} color={c.color} variant={c.variant} />
        ))}
        <LinkIcon fontSize="small" />
      </Stack>
    );
  };

  const nodeContentSx = (node: TreeDataNode<DemoMeta>): SxProps<Theme> => {
    if (node.meta?.highlight) {
      return (theme) => ({ boxShadow: `inset 2px 0 0 0 ${theme.palette.warning.main}` });
    }
    return {};
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Пример дерева
      </Typography>

      <Tree<DemoMeta, TreeDataNode<DemoMeta>>
        data={data}
        renderLabel={renderLabel}
        defaultExpanded={['field-1']}
        expanded={expanded}
        onExpandedItemsChange={(_, ids) => setExpanded(ids)}
        defaultSelectedItems="well-1"
        selected={selected}
        onSelectedItemsChange={(_, ids) => setSelected(ids)}
        multiSelect
        nodeContentSx={nodeContentSx}
        sx={{ maxWidth: 900 }}
      />
    </Box>
  );
}