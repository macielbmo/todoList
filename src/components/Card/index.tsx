import styles from './style.module.css'

import iconConcluded from '../../assets/img/concluded.png'
import { Trash } from 'phosphor-react';

interface CardProps {
  id: number,
  task: string,
  concluded: boolean,
  toggleConcludedTask: (id: number) => void,
  OnDeleteCard: (id: number) => void 
}

export function Card(props: CardProps) {

  function handleConcludedTask() {
    console.log('teste')
    props.toggleConcludedTask(props.id);
  }

  function handleDeleteCard() {
    props.OnDeleteCard(props.id)
  }

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.boxConcluded} onClick={handleConcludedTask}>
          {props.concluded ? (
            <span className={styles.concluded}>
              <div>
                <img src={iconConcluded}/>
              </div>
            </span>
          ): <span className={styles.noConcluded}></span>}
        </div>

        <p className={`${props.concluded ? styles.textConcluded : styles.text}`}>
          {props.task}
        </p>
      </div>

      <button onClick={handleDeleteCard}>
        <Trash />
      </button>
    </div>
  )
}