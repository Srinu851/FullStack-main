// username: "username"
// password: "password"

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, AppBar, Toolbar, Typography, Button, TextField, Card, Grid, 
  IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, 
  MenuItem, Fab, Tooltip, Chip, Avatar, Snackbar, Alert, 
  createTheme, ThemeProvider, CssBaseline, LinearProgress, Divider, List, ListItem, ListItemText 
} from '@mui/material';

// Icons
import { 
  Search, Add, Delete, LocalHospital, Person, Assignment, 
  Bloodtype, MedicalServices, Dashboard, Logout, 
  AdminPanelSettings, ShowChart, People, TrendingUp,
  EscalatorWarning, AccessibilityNew, HistoryEdu, Lock
} from '@mui/icons-material';
n
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- PROFESSIONAL THEME ---
const theme = createTheme({
  palette: {
    primary: { main: '#004d40', contrastText: '#fff' },
    secondary: { main: '#ff5722' },
    background: { default: '#f0f4f3', paper: '#ffffff' },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 800 },
  },
  shape: { borderRadius: 16 }
});

const App = () => {
  // --- AUTH & NAVIGATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('list'); 
  const [userInputs, setUserInputs] = useState({ user: '', pass: '' });

  // --- DATA STATE ---
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('hospital_master_data');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Alice Johnson", age: 28, gender: "Female", disease: "Asthma", treatment: "Inhaler Therapy" },
      { id: 2, name: "Mark Wilson", age: 65, gender: "Male", disease: "Hypertension", treatment: "Beta Blockers" },
      { id: 3, name: "James Smith", age: 12, gender: "Male", disease: "Flu", treatment: "Rest & Hydration" }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', sev: 'success' });
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', disease: '', treatment: '' });

  useEffect(() => { localStorage.setItem('hospital_master_data', JSON.stringify(patients)); }, [patients]);

  // --- AUTH LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (userInputs.user === "username" && userInputs.pass === "password") {
      setIsLoggedIn(true);
      setSnackbar({ open: true, message: 'Welcome back, Administrator.', sev: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Invalid Username or Password!', sev: 'error' });
    }
  };

  // --- LIVE STATISTICS ---
  const stats = useMemo(() => {
    const total = patients.length || 1;
    const male = patients.filter(p => p.gender === 'Male').length;
    const female = patients.filter(p => p.gender === 'Female').length;
    const seniors = patients.filter(p => p.age >= 60).length;
    const kids = patients.filter(p => p.age < 18).length;
    
    const diseaseMap = {};
    patients.forEach(p => { diseaseMap[p.disease] = (diseaseMap[p.disease] || 0) + 1; });
    const sorted = Object.entries(diseaseMap).sort((a, b) => b[1] - a[1]).slice(0, 3);

    return { total, male, female, seniors, kids, sorted };
  }, [patients]);

  // --- PATIENT ACTIONS ---
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.disease) return;
    setPatients([{ ...formData, id: Date.now(), age: parseInt(formData.age) }, ...patients]);
    setFormData({ name: '', age: '', gender: '', disease: '', treatment: '' });
    setOpenModal(false);
    setSnackbar({ open: true, message: 'Record added to database.', sev: 'success' });
  };

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#002b24' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Paper sx={{ p: 5, width: 400, textAlign: 'center', borderRadius: 6 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                <Lock />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>SECURE ACCESS</Typography>
              <form onSubmit={handleLogin}>
                <TextField 
                   fullWidth label="Username" sx={{ mb: 2 }} variant="filled"
                   onChange={(e) => setUserInputs({...userInputs, user: e.target.value})} 
                />
                <TextField 
                   fullWidth label="Password" type="password" sx={{ mb: 4 }} variant="filled"
                   onChange={(e) => setUserInputs({...userInputs, pass: e.target.value})} 
                />
                <Button fullWidth variant="contained" size="large" type="submit" sx={{ py: 2 }}>Verify Identity</Button>
              </form>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 3, display: 'block' }}>
                For authorized medical personnel only.
              </Typography>
            </Paper>
          </motion.div>
        </Box>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({...snackbar, open:false})}>
          <Alert severity={snackbar.sev} variant="filled">{snackbar.message}</Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }

  // --- DASHBOARD INTERFACE ---
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
        
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'primary.main', borderBottom: '1px solid #ddd' }}>
          <Toolbar className="container-fluid px-md-5">
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}><LocalHospital /></Avatar>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>LIFECARE CMS</Typography>
            </Box>
            <Box className="d-flex gap-2">
              <Button startIcon={<Dashboard />} variant={view === 'dashboard' ? 'contained' : 'text'} onClick={() => setView('dashboard')}>Dashboard</Button>
              <Button startIcon={<People />} variant={view === 'list' ? 'contained' : 'text'} onClick={() => setView('list')}>Patients</Button>
              <IconButton color="error" onClick={() => setIsLoggedIn(false)}><Logout /></IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 5 } }}>
          <AnimatePresence mode="wait">
            
            {view === 'dashboard' ? (
              <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Typography variant="h4" className="mb-4">Live Insights</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}><Card sx={{ p: 3, borderLeft: '8px solid #004d40' }}><Typography variant="overline">Total Admissions</Typography><Typography variant="h3">{stats.total}</Typography></Card></Grid>
                  <Grid item xs={12} md={3}><Card sx={{ p: 3, borderLeft: '8px solid #ff5722' }}><Typography variant="overline">Critical Need</Typography><Typography variant="h3">{Math.ceil(stats.total/4)}</Typography></Card></Grid>
                  <Grid item xs={12} md={3}><Card sx={{ p: 3, borderLeft: '8px solid #2196f3' }}><Typography variant="overline">Capacity</Typography><Typography variant="h3">82%</Typography></Card></Grid>
                  <Grid item xs={12} md={3}><Card sx={{ p: 3, borderLeft: '8px solid #9c27b0' }}><Typography variant="overline">Senior Cases</Typography><Typography variant="h3">{stats.seniors}</Typography></Card></Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 4 }}>
                      <Typography variant="h6" className="mb-4">Patient Gender Ratio</Typography>
                      <Typography variant="body2">Male ({stats.male})</Typography>
                      <LinearProgress variant="determinate" value={(stats.male/stats.total)*100} sx={{ height: 10, borderRadius: 5, mb: 3 }} />
                      <Typography variant="body2">Female ({stats.female})</Typography>
                      <LinearProgress variant="determinate" value={(stats.female/stats.total)*100} color="secondary" sx={{ height: 10, borderRadius: 5 }} />
                      
                      <Divider sx={{ my: 4 }} />
                      <Typography variant="h6">Category Breakdown</Typography>
                      <Box className="d-flex justify-content-around mt-3">
                        <Box sx={{ textAlign: 'center' }}><EscalatorWarning color="primary" /><Typography variant="h6">{stats.kids}</Typography><Typography variant="caption">Pediatric</Typography></Box>
                        <Box sx={{ textAlign: 'center' }}><AccessibilityNew color="primary" /><Typography variant="h6">{stats.total - (stats.kids + stats.seniors)}</Typography><Typography variant="caption">Adult</Typography></Box>
                        <Box sx={{ textAlign: 'center' }}><HistoryEdu color="primary" /><Typography variant="h6">{stats.seniors}</Typography><Typography variant="caption">Senior</Typography></Box>
                      </Box>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 4, height: '100%' }}>
                      <Typography variant="h6" className="mb-3">Prevalent Conditions</Typography>
                      <List>
                        {stats.sorted.map(([name, count], i) => (
                          <ListItem key={name} divider={i < 2}>
                            <ListItemText primary={name} secondary={`${count} Cases`} />
                            <Chip label={`${Math.round((count/stats.total)*100)}%`} color="primary" />
                          </ListItem>
                        ))}
                      </List>
                      <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2, mt: 3 }}>
                         <Typography variant="caption"><b>System Alert:</b> High volume of {stats.sorted[0]?.[0] || 'records'} noted in last 24h.</Typography>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box className="d-flex justify-content-between align-items-center mb-4">
                  <Typography variant="h4">Clinical Records</Typography>
                  <TextField 
                    placeholder="Search patients..." size="small" variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'gray' }} /> }}
                    sx={{ width: 350, bgcolor: 'white' }}
                  />
                </Box>
                <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f1f1f1' }}>
                      <TableRow>
                        <TableCell><b>NAME</b></TableCell>
                        <TableCell><b>AGE/GENDER</b></TableCell>
                        <TableCell><b>DIAGNOSIS</b></TableCell>
                        <TableCell><b>TREATMENT</b></TableCell>
                        <TableCell align="right"><b>MANAGE</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filtered.map((p) => (
                        <TableRow key={p.id} hover>
                          <TableCell><Typography sx={{ fontWeight: 700 }}>{p.name}</Typography></TableCell>
                          <TableCell>{p.age} Y • {p.gender}</TableCell>
                          <TableCell><Chip label={p.disease} size="small" color="primary" /></TableCell>
                          <TableCell>{p.treatment}</TableCell>
                          <TableCell align="right">
                            <IconButton color="error" onClick={() => setPatients(patients.filter(x => x.id !== p.id))}><Delete /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {view === 'list' && (
          <Fab color="secondary" variant="extended" sx={{ position: 'fixed', bottom: 40, right: 40, px: 4 }} onClick={() => setOpenModal(true)}>
            <Add sx={{ mr: 1 }} /> New Record
          </Fab>
        )}

        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
          <DialogTitle className="text-center pt-4">Patient Entry</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleAdd} className="d-flex flex-column gap-3 pt-2">
              <TextField fullWidth label="Full Name" required variant="filled" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <div className="d-flex gap-2">
                <TextField fullWidth label="Age" type="number" required variant="filled" onChange={(e) => setFormData({...formData, age: e.target.value})} />
                <TextField select fullWidth label="Gender" variant="filled" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem>
                </TextField>
              </div>
              <TextField fullWidth label="Diagnosis" required variant="filled" onChange={(e) => setFormData({...formData, disease: e.target.value})} />
              <TextField fullWidth label="Treatment Plan" variant="filled" onChange={(e) => setFormData({...formData, treatment: e.target.value})} />
              <Button fullWidth variant="contained" type="submit" size="large" className="py-3">Save to Registry</Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({...snackbar, open:false})}>
          <Alert severity={snackbar.sev} variant="filled">{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;

// username: "username"
// password: "password"