import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import { createOrder } from '../../services/order';

export default function CreateOrder() {
  const [state, setState] = useState({
    customer: '',
    date: '',
    notes: '',
    items: []
  });
  const navigate = useNavigate();
  const handleChange = (ev) => {
    setState({
      ...state,
      [ev.target.name]: ev.target.value
    });
  };
  const handleItemChange = (field, value, i) => {
    const newItems = state.items.map((item, index) => {
      if (i !== index) {
        return item;
      }

      return {
        ...item,
        [field]: value
      };
    });

    setState({
      ...state,
      items: newItems,
    })
  };
  const addItem = useCallback(() => {
    setState({
      ...state,
      items: state.items.concat({
        system: '',
        width: 0,
        height: 0,
        color: ''
      })
    });
  }, [state]);
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const id = await createOrder(state);

    if (id) {
      navigate(`/orders/${id}`);
    }
  }

  console.log(state.items);

  return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Order
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="customer"
                    name="customer"
                    value={state.customer}
                    label="Customer"
                    onChange={handleChange}
                  >
                    <MenuItem value="p4m">P4M</MenuItem>
                    <MenuItem value="rolety">Rolety Do Okien</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Due Date</InputLabel>
                  <input type="date" id="date" name="date" value={state.dueDate} onChange={handleChange} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="notes"
                    name="notes"
                    label="Notes"
                    multiline
                    rows={4}
                    value={state.notes}
                    variant="filled"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            {state.items.map((item, i) => (
              <Grid key={i} container spacing={1}>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id={`system-${i}`}>Система</InputLabel>
                    <Select
                      labelId={`system-${i}`}
                      value={item.system}
                      label="Система"
                      onChange={(ev) => handleItemChange('system', ev.target.value, i)}
                    >
                      {['1', '3', '8'].map(system => (
                        <MenuItem key={system} value={system}>{system}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id={`color-${i}`}>Цвет</InputLabel>
                    <Select
                      labelId={`color-${i}`}
                      value={item.system}
                      label="Цвет"
                      onChange={(ev) => handleItemChange('color', ev.target.value, i)}
                    >
                      {['Sosna', 'Antracite', 'Bialy'].map(color => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TextField
                      margin="normal"
                      required
                      label="Ширина (см)"
                      type="number"
                      onChange={(ev) => handleItemChange('width', ev.target.value, i)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TextField
                      margin="normal"
                      required
                      label="Высота (см)"
                      type="number"
                      onChange={(ev) => handleItemChange('height', ev.target.value, i)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="secondary"
              sx={{ mt: 3, ml: 1 }}
              onClick={addItem}
            >
              Добавить
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleSubmit}
            >
              Создать
            </Button>
          </Box>
        </Paper>
      </Container>
  );
}