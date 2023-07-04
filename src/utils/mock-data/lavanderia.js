const items = [
  {
    label: 'Roupas Diárias',
    key: 'roupas',
    items: [
      {
        label: 'Camisa',
        key: 'camisa',
        price: 4.65,
      },
      {
        label: 'Camiseta',
        key: 'camiseta',
        price: 3.1,
      },
      {
        label: 'Conjunto Moletom',
        key: 'conjunto_moletom',
        price: 7.75,
      },
      {
        label: 'Vestido',
        key: 'vestido',
        price: 3.1,
      },
      {
        label: 'Blusa Feminina',
        key: 'blusa_feminina',
        price: 2.6,
      },
      {
        label: 'Roupas Íntimas',
        key: 'roupas_intimas',
        price: 0.75,
      },
      {
        label: 'Pijamas',
        key: 'pijamas',
        price: 4.65,
      },
    ],
  },
  {
    label: 'Peças em Jeans',
    key: 'pecas',
    items: [
      {
        label: 'Calça jeans',
        key: 'calca_jeans',
        price: 10.5,
      },
      {
        label: 'Bermuda jeans',
        description: 'Bermuda jeans',
        key: 'bermuda_jeans',
        price: 6.2,
      },
      {
        label: 'Short jeans',
        key: 'short_jeans',
        price: 4.65,
      },
      {
        label: 'Jaqueta jeans',
        key: 'jaqueta_jeans',
        price: 6.2,
      },
    ],
  },
  {
    label: 'Cama, Mesa e Banho',
    key: 'cama',
    items: [
      {
        label: 'Edredon Casal',
        key: 'edredon_casal',
        price: 31,
      },
      {
        label: 'Lençol Casal',
        description: 'Lençol Casal',
        key: 'lencol_casal',
        price: 10.5,
      },
      {
        label: 'Fronha',
        key: 'fronha',
        price: 1.55,
      },
      {
        label: 'Pano de Prato',
        key: 'pano_de_prato',
        price: 0.75,
      },
      {
        label: 'Toalha de Mesa',
        key: 'toalha_de_mesa',
        price: 4.65,
      },
      {
        label: 'Toalha de Banho',
        key: 'toalha_de_banho',
        price: 7.75,
      },
    ],
  },
]

const description = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`

const faq = [
  {
    question: `Como funciona o serviço de lavanderia profissional?`,
    answer:
      'Com equipamentos altamente tecnológicos e produtos de excelente qualidade, suas peças recebem todo o cuidado de lavagem, secagem e passadoria, chegando em sua casa prontas para serem guardadas.',
  },
  {
    question: `Devo separar as roupas em tecido e cores para a coleta da lavanderia?`,
    answer: `Não! Você apenas separa as roupas que serão higienizadas e os profissionais especializados vão separar peças, tecidos e cores conforme as instruções de lavagem e secagem de cada peça.`,
  },
  {
    question: `Como vou saber o peso das roupas para saber quanto pagar?`,
    answer: `Com base em nossa ampla experiência, disponibilizamos uma tabela com pesos aproximados para cada tipo de peça e tecido, facilitando assim a sua estimativa de custo total de acordo com a sua demanda.`,
  },
  {
    question: `E se as roupas pesarem mais/menos do que imaginei?`,
    answer: `Não se preocupe, a margem de variação é muito pequena e, caso haja divergência, nossa equipe vai informar você sobre alguma possível alteração nos valores.`,
  },
]

export { items, description, faq }
