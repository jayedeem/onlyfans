import { CircularProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh'
  }
})

export const Loading = ({ status }) => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <CircularProgress size="4rem" />
      {status && <p style={{ marginTop: '20px' }}>{status.toUpperCase()}</p>}
    </Container>
  )
}
