import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { useFild } from './hooks'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote => {
          return (
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          )
        })
      }
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see: <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const content = useFild('text')
  const author = useFild('text')
  const info = useFild('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`a new anecdote: '${content.value}' has been created.`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    navigate('/')
  }

  const reset = () => {
    content.onChange()
    author.onChange()
    info.onChange()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input
            {...content}
            name='content'
          />
        </div>
        <div>
          author
          <input
            {...author}
            name='author'
          />
        </div>
        <div>
          url for more info
          <input
            {...info}
            name='info'
          />
        </div>
        <button onClick={handleSubmit} type='submit'>create</button>
        <button onClick={reset}>Reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0))
    setAnecdotes([...anecdotes, anecdote])
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const style = {
    padding: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link style={style} to='/'>Anecdotes</Link >
      <Link style={style} to='/CreateNew'>Create New</Link >
      <Link style={style} to='/AboutUs'>About us</Link >
      {
        notification
          ? <p>{notification}</p>
          : null
      }

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/CreateNew'
          element={
            <CreateNew
              addNew={addNew}
              setNotification={setNotification}
            />}
        />
        <Route path='/AboutUs' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
