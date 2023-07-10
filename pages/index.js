import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

        </section>
        <div>
          <h2>Preencha os campos abaixo</h2>
          <form className={styles.form}>
            <label>Tamanho da ripa:</label>
            <input type="text" />
            <label>Tamanho máximo do vão:</label>
            <input type="text" />
            <label>Comprimento total:</label>
            <input type="text" />
            <input type="submit" value="Calcular" />
          </form>
        </div>
      </main>
    </>
  )
}
