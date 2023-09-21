import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })


// Hooks
import { useEffect, useState } from 'react'

export default function Home() {
  const [largRipa, setLargRipa] = useState()
  const [largMaxVao, setLargMaxVao] = useState()
  const [comprimento, setComprimento] = useState()
  const [altura, setAltura] = useState('')
  const [numeroRipas, setNumeroRipas] = useState(0)
  const [largVao, setLargVao] = useState(0)

  const reset = () => {
    setAltura('')
    setComprimento('')
    setLargMaxVao('')
    setLargRipa('')
  }

  const calcular = (ripa, vaoMax, comprimento, altura) => {
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

    if(!altura || !comprimento || !largMaxVao || !largRipa) {
      console.log('nao deu')
      return
    } else {
      calcular(largRipa, largMaxVao, comprimento)
    }
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
        <div>
          <section className={styles.image}>
          </section>
          <section className={styles.cad}>
            <h2>Preencha os campos abaixo</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Comprimento:</label>
              <input type="text"
                placeholder='Tamanho em cm' 
                onChange={(e) => setComprimento(e.target.value)}
                value={comprimento}
              />
              <label>Altura:</label>
              <input type="text"
                placeholder='Tamanho em cm' 
                onChange={(e) => setAltura(e.target.value)}
                value={altura}
              />
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
              <input type="submit" value="Calcular"/>
            </form>
          </section>
        </div>
        <section className={styles.response}>
          <div>
            <h2>Número de ripas: <span>{numeroRipas}</span></h2>
            <h2>Largura do vao: <span>{largVao}</span></h2>
          </div>
          <table>
            <thead>
              <tr><td>ola</td></tr>
              <tr><td>ola</td></tr>
              <tr><td>ola</td></tr>
            </thead>
            <tbody>
              <tr><td>oi</td></tr>
              <tr><td>oi</td></tr>
              <tr><td>oi</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
