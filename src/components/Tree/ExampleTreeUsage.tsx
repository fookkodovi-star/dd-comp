import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Tree from './Tree';
import type { TreeDataNode } from './types';
import { chipSx, statusDotSx } from './styles';

const data: TreeDataNode[] = [
  {
    id: 'field-bm',
    label: 'Восточно-Мессояхское месторождение',
    meta: { distanceMeters: 2850, activity: 'active', match: 'matched', matchSourceLabel: 'SAP' },
    children: [
      {
        id: 'pad-bm-a',
        label: 'Куст BM-A',
        meta: { distanceMeters: 2850, activity: 'active', match: 'matched', matchSourceLabel: 'SAP' },
        children: [
          {
            id: 'well-bm-001',
            label: 'Скважина BM-001',
            meta: {
              distanceMeters: 2850,
              activity: 'active',
              match: 'matched',
              matchSourceLabel: 'WellDB',
              subtitle: 'Активно',
              actions: [
                {
                  id: 'link',
                  icon: <LinkIcon fontSize="small" />,
                  title: 'Открыть связь',
                  onClick: (node) => console.log('link', node.id),
                },
              ],
            },
          },
          {
            id: 'well-bm-002',
            label: 'Скважина BM-002',
            meta: {
              distanceMeters: 2650,
              activity: 'unknown',
              match: 'unmatched',
              matchSourceLabel: 'WellDB',
              subtitle: 'ТО',
              highlight: 'warning',
              actions: [
                {
                  id: 'info',
                  icon: <InfoOutlinedIcon fontSize="small" />,
                  title: 'Подробнее',
                  onClick: (node) => console.log('info', node.id),
                },
              ],
            },
          },
          {
            id: 'well-bm-003',
            label: 'Скважина BM-003',
            meta: { distanceMeters: 2780, activity: 'active', match: 'matched', matchSourceLabel: 'WellDB' },
          },
        ],
      },
      {
        id: 'pad-bm-b',
        label: 'Куст BM-Б',
        meta: { distanceMeters: 2650, activity: 'stopped', match: 'partially' },
        children: [],
      },
    ],
  },
  {
    id: 'field-surgut',
    label: 'Сургутское месторождение',
    meta: { distanceMeters: 3200, activity: 'active', match: 'matched', matchSourceLabel: 'SAP' },
    children: [
      {
        id: 'pad-sg-north',
        label: 'Куст СГ-Северный',
        meta: { distanceMeters: 3200, activity: 'active', match: 'partially' },
        children: [],
      },
    ],
  },
  {
    id: 'field-krasno',
    label: 'Красноленинское месторождение',
    meta: { distanceMeters: 2950, activity: 'active', match: 'unmatched' },
  },
  {
    id: 'field-south',
    label: 'Южное месторождение',
    meta: { distanceMeters: 2400, activity: 'stopped', match: 'unmatched' },
  },
];

const ExampleTreeUsage: React.FC = () => {
  const [selected, setSelected] = React.useState<string | string[] | undefined>(undefined);
  const [expanded, setExpanded] = React.useState<string[] | undefined>(['field-bm', 'pad-bm-a']);

  const nodeContentSx = React.useCallback((node: TreeDataNode) => {
    // Example: visually mark unmatched items
    if (node.meta?.match === 'unmatched') {
      return { borderColor: (theme) => theme.palette.error.dark, backgroundColor: (theme) => theme.palette.action.hover };
    }
    return undefined;
  }, []);

  const actionsRender = (node: TreeDataNode) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); console.log('link', node.id); }}>
        <LinkIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); console.log('info', node.id); }}>
        <InfoOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  // Custom label example to demonstrate full control over markup
  const renderLabel = (node: TreeDataNode) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Box sx={statusDotSx} />
          <Typography variant="body2" noWrap title={node.label}>
            {node.label}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {node.meta?.matchSourceLabel && <Box component="span" sx={chipSx}>{node.meta.matchSourceLabel}</Box>}
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); console.log('custom info', node.id); }}>
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Demo: Reusable MUI Tree
      </Typography>
      {/* Default label & behavior */}
      <Tree
        data={data}
        multiSelect
        nodeContentSx={nodeContentSx}
        defaultExpanded={['field-bm', 'pad-bm-a']}
        selected={selected}
        onSelectedItemsChange={(e, ids) => setSelected(ids)}
        expanded={expanded}
        onExpandedItemsChange={(e, ids) => setExpanded(ids)}
        // Icons example (could be replaced with custom SVGs)
        collapseIcon={<CheckIcon fontSize="small" />}
        expandIcon={<WarningAmberIcon fontSize="small" />}
        endIcon={null}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Кастомный renderLabel пример
        </Typography>
        <Tree
          data={data}
          renderLabel={renderLabel}
          defaultExpanded={["field-bm"]}
          endIcon={null}
        />
      </Box>
    </Box>
  );
};

export default ExampleTreeUsage;
