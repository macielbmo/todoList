import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import styles from './App.module.css';
import './global.css';

// icons & img
import imgLogo from './assets/img/Logo.png'
import iconPlus from './assets/img/plus.png'
import iconClipboard from './assets/img/Clipboard.png'

// component
import { Card } from './components/Card';

interface Task {
  id: number,
  task: string,
  concluded: boolean
}

function App() {
  const [dataTask, setDataTask] = useState([]);

  const [textNewTask, setTextNewTask] = useState('')

  const [countTaskConcluded, setCountTaskConcluded] = useState(0);

  function toggleConcludedTask(cardId: number) {
    const taskToUpdate = dataTask.find(task => task.id === cardId);

    if (taskToUpdate) {
      taskToUpdate.concluded = !taskToUpdate.concluded;

      setDataTask([...dataTask]);
    }
  }

  useEffect(() => {
    const concludedCount = dataTask.reduce((acc, task) => {
      if (task.concluded) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    setCountTaskConcluded(concludedCount);
  }, [dataTask])

  function handleTextNewTask(event: ChangeEvent<HTMLInputElement>) {
    setTextNewTask(event?.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    
    setDataTask([...dataTask, {
      id: dataTask.length + 1,
      task: textNewTask,
      concluded: false
    }])

    setTextNewTask('')
  }

  function deleteCard(cardId: number) {
    const taskDeleteOne = dataTask.filter(task => {
      return task.id !== cardId
    })

    setDataTask(taskDeleteOne)
  }
  
  const isNewTask = textNewTask.length === 0

  return (
    <div className={styles.container}>
      <header>
        <img src={imgLogo} alt="Logo ToDo List" />
      </header>

      <form onSubmit={handleCreateTask} className={styles.boxSearch}>
        <input 
          type="text" 
          name="search" 
          placeholder='Adicione uma nova tarefa'
          value={textNewTask}
          onChange={handleTextNewTask}
          required
        />
        
        <button type='submit' disabled={isNewTask}>
          Criar
          <img src={iconPlus}/>
        </button>
      </form>

      <section className={styles.content}>
        <div className={styles.contentHeader}>
          <div>
            <p className={styles.textBlue}>Tarefas criadas</p>
            <span className={styles.counter}>{dataTask.length}</span>
          </div>

          <div>
            <p className={styles.textPurple}>Concluídas</p>
            <span className={styles.counter}>{countTaskConcluded} de {dataTask.length}</span>
          </div>
        </div>

        {dataTask.length === 0 ? (
          <div className={styles.voidBoard}>
            <img src={iconClipboard} alt="Icon clipboard" />
            <p className={`${styles.paragraph} ${styles.primary}`}>Você ainda não tem tarefas cadastradas</p>
            <p className={`${styles.paragraph} ${styles.secondary}`}>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ): (
          <div className={styles.boardCards}>
            {dataTask.map(task => {
              return (
                <Card 
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  concluded={task.concluded}
                  toggleConcludedTask={toggleConcludedTask}
                  OnDeleteCard={deleteCard}
                />
              )
            })}
          </div>
        )}        
      </section>
    </div>
  )
}

export default App
