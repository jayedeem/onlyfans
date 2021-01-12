import { CircularProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#2F1A49'
    }
  }
})
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  }
})

export const Loading = ({ status }) => {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.container}>
        <CircularProgress size="4rem" />
        {status && (
          <strong style={{ color: '#fff', marginTop: '20px' }}>
            {status.toUpperCase()}
          </strong>
        )}
      </Container>
    </MuiThemeProvider>
  )
}
