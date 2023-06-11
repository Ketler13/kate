import { DndContext, rectIntersection } from "@dnd-kit/core";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState } from "react";

import OrderKanbanCard from '../OrderKanbanCard';
import KanbanLane from "./KanbanLane";
// import AddCard from "./AddCard";

export default function KanbanBoard({ lanes, itemsByLanes }) {
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [uItems, setuItems] = useState([]);
  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";
        if (container === "ToDo") {
          setTodoItems([...todoItems, { title }]);
        } else if (container === "Done") {
          setDoneItems([...doneItems, { title }]);
        } else if (container === "Unassigned") {
          setuItems([...uItems, { title }]);
        } else {
          setInProgressItems([...inProgressItems, { title }]);
        }
        if (parent === "ToDo") {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === "Done") {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === "Unassigned") {
          setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        } else {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        }
      }}
    >
      <Box flexDirection="column">
        {/* <AddCard addCard={addNewCard} /> */}
        <Box>
          <Grid container spacing={1}>
            {
              lanes.map((lane) => (
                <Grid item xs={2.4} key={lane.id}>
                  <Paper>
                    <KanbanLane title={lane.label} items={itemsByLanes[lane.id]} cardComponent={OrderKanbanCard} />
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </DndContext>
  );
}