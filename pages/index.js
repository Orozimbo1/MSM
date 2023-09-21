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
  const [espessura, setEspessura] = useState('')
  const [numeroRipas, setNumeroRipas] = useState(0)
  const [largVao, setLargVao] = useState(0)
  const [certo, setCerto] = useState([])

  let fitas = [
    {comprimento: 20, largura: 2.2, qtd: 1},
    {comprimento: 20, largura: 3.6, qtd: 1},
    {comprimento: 20, largura: 6.4, qtd: 1},
    {comprimento: 300, largura: 2.2, qtd: 1},
    {comprimento: 300, largura: 3.6, qtd: 1},
  ]

  const reset = () => {
    setAltura('')
    setComprimento('')
    setLargMaxVao('')
    setLargRipa('')
  }

  const calcularFita = (altura, espessura, numRipa) => {
    console.log(numRipa)

    fitas = [... fitas.map((el) => {
      let qtd = 1
      let comp = el.comprimento * 100
      let altProx = (altura / Math.floor(el.largura / (Number(espessura) + 0.2))) + 1

      for(let i = 0; i <= numRipa; i++) {
        if(comp < altProx) {
          comp = el.comprimento * 100
          qtd++
        } else {
          comp = comp - altProx
        }
      }

      el.qtd = qtd
      console.log(el.qtd)
      console.log(fitas)
    })]
    setCerto(true)
  }

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

    if(!altura || !espessura || !comprimento || !largMaxVao || !largRipa) {
      return
    } else {
      calcular(largRipa, largMaxVao, comprimento)
      calcularFita(altura, espessura, numeroRipas)
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
              <label>Espessura:</label>
              <input type="text"
                placeholder='Tamanho em cm' 
                onChange={(e) => setEspessura(e.target.value)}
                value={espessura}
              />
              <label>Largura da ripa:</label>
              <input type="text"
                placeholder='Tamanho em cm' 
                onChange={(e) => setLargRipa(e.target.value)}
                value={largRipa}
              />
              <label>Largura máxima do vão:</label>
              <input type="text"
                placeholder='Tamanho em cm' 
                onChange={(e) => setLargMaxVao(e.target.value)}
                value={largMaxVao}
              />
              <input type="submit" value="Calcular"/>
            </form>
          </section>
        </div>
        {numeroRipas != 0 && (
          <>
            <section className={styles.response}>
              <div>
                <h2>Número de ripas: <span>{numeroRipas}</span></h2>
                <h2>Largura do vao: <span>{largVao}</span></h2>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Metragem do rolo</th> 
                    <th>Largura da fita</th> 
                    <th>qtd</th> 
                  </tr>
                </thead>
                <tbody>
                  {fitas.map((el, i) => (
                    <tr key={i}>
                      <td>{el.comprimento} m</td>
                      <td>{el.largura} mm</td>
                      <td>{el.qtd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </>
  )
}
