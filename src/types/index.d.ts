export interface Produto {
  id: number
  idCategoria: number
  title: string
  desc: string
  price: number
  image: string
  quant: number
}

export interface Categoria {
  id: number
  nome: string
  produtos: Produto[]
}
