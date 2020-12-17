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
    height: '70vh'
  }
})

export const Loading = () => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <CircularProgress size="6rem" />
    </Container>
  )
}
