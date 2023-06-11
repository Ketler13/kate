import Box from '@mui/material/Box';
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({
  item,
  index,
  parent,
  cardComponent: CardComponent
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: {
      item,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <Box
      transform={style.transform}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <CardComponent item={item} />
    </Box>
  );
};

export default KanbanCard;