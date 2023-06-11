import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDroppable } from "@dnd-kit/core";

import KanbanCard from './KanbanCard';

export default function KanbanLane({ title, items, cardComponent }) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <Box>
      <Typography fontWeight="bold" textAlign="center">{title}</Typography>
      <Box
        ref={setNodeRef}
        minHeight={300}
        sx={{ p: 2 }}
      >
        {items.map((item, i) => (
          <KanbanCard item={item} key={item.id} index={i} parent={title} cardComponent={cardComponent} />
        ))}
      </Box>
    </Box>
  );
}