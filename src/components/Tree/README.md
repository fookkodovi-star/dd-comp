# Reusable Tree Component (MUI X)

Production-ready, typed and customizable wrapper around `@mui/x-tree-view` providing a simple API while allowing deep visual customization.

## Files

- `types.ts` — Shared TypeScript types
- `utils.ts` — Helpers: `defaultGetChildren`, `hasChildren`, `mergeSx`
- `styles.ts` — Sx constants and helpers
- `CustomTreeItem.tsx` — Memoized wrapper around `TreeItem` with recursion
- `Tree.tsx` — Wrapper around `SimpleTreeView`
- `ExampleTreeUsage.tsx` — Demo with sample data

## Installation

```bash
npm i @mui/material @mui/icons-material @mui/x-tree-view
```

## Usage

```tsx
import Tree from './Tree';
import type { TreeDataNode } from './types';

const data: TreeDataNode[] = [ /* ... */ ];

<Tree data={data} multiSelect defaultExpanded={["root"]} />
```

## Props (TreeProps)
- `data: TreeDataNode[]`
- `renderLabel?: (node) => ReactNode`
- `getChildren?: (node) => TreeDataNode[] | undefined`
- `defaultExpanded?: string[]`, `expanded?: string[]`, `onExpandedItemsChange?`
- `defaultSelectedItems?: string | string[]`, `selected?`, `onSelectedItemsChange?`
- `multiSelect?: boolean`
- `nodeContentSx?: (node) => SxProps`
- `sx?: SxProps`
- `collapseIcon?`, `expandIcon?`, `endIcon?`

## Notes
- Default label shows title, optional subtitle, status dot, distance, chips, and actions.
- `node.meta.highlight` draws a left border using `highlightLeftBorder` helper.
- You can pass your own `renderLabel` to fully control node markup.
