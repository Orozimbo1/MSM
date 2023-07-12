import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })


// Hooks
import { useEffect, useState } from 'react'

export default function Home() {
  const [largRipa, setLargRipa] = useState('')
  const [largMaxVao, setLargMaxVao] = useState('')
  const [comprimento, setComprimento] = useState('')
  const [numeroRipas, setNumeroRipas] = useState(0)
  const [largVao, setLargVao] = useState(0)

  const calcular = (ripa, vaoMax, comprimento) => {
    let numeroRipas = 2
    let vao = (comprimento - (numeroRipas * ripa)) / (numeroRipas - 1)
  
    if(comprimento < 2 * ripa) return 'chifre'
    while(vao > vaoMax) {
      numeroRipas++
      vao = (comprimento - (numeroRipas * ripa)) / (numeroRipas - 1)
    }

    setNumeroRipas(numeroRipas)
    setLargVao(vao.toFixed(2))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    calcular(largRipa, largMaxVao, comprimento)
  }

  return (
    <>
      <Head>
        <title>MSM Interiores</title>
        <meta name="description" content="Joinery support site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.response}>
          <div>
            <h2>Número de Ripas: <span>{numeroRipas}</span></h2>
            <h2>Largura do Vão: <span>{largVao}</span></h2>
          </div>
        </section>
        <div className={styles.cad}>
          <h2>Preencha os campos abaixo</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Tamanho da ripa:</label>
            <input type="text"
              placeholder='Tamanho em cm' 
              onChange={(e) => setLargRipa(e.target.value)}
              value={largRipa}
            />
            <label>Tamanho máximo do vão:</label>
            <input type="text"
              placeholder='Tamanho em cm' 
              onChange={(e) => setLargMaxVao(e.target.value)}
              value={largMaxVao}
            />
            <label>Comprimento total:</label>
            <input type="text"
              placeholder='Tamanho em cm' 
              onChange={(e) => setComprimento(e.target.value)}
              value={comprimento}
            />
            <input type="submit" value="Calcular"/>
          </form>
        </div>
      </main>
    </>
  )
}
