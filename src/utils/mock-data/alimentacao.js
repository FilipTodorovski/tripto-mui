const carouselImages = [
  '/assets/images/alimentacao/feijaoda_light.png',
  '/assets/images/alimentacao/strongonoff_de_carne.png',
  '/assets/images/alimentacao/nhoque_com_carne_de_panela.png',
  '/assets/images/alimentacao/canja_de_galinha.png',
  '/assets/images/alimentacao/risoto_de_frango.png',
]

const items = [
  {
    type: 'Kits',
    description: `Kits`,
    items: [
      {
        label: `Kit Superfoods 10 Refeições`,
        description: `Kit Superfoods 10 Refeições`,
        key: `kit_superfoods_10`,
        image: `/assets/images/alimentacao/kit_superfoods_10.png`,
        price: 245,
      },
      {
        label: `Kit Basics - 7 dias (14 refeições)`,
        description: `Kit Basics - 7 dias (14 refeições)`,
        key: `kit_basics_7_dias`,
        image: `/assets/images/alimentacao/kit_basics_7_dias.png`,
        price: 299,
      },
    ],
  },
  {
    type: 'Pratos Individuais',
    description: 'Pratos Individuais',
    items: [
      {
        label: `Feijoada light`,
        description: `Feijoada light`,
        key: `feijaoda_light`,
        image: `/assets/images/alimentacao/feijaoda_light.png`,
        price: 16,
        discount: 20,
      },
      {
        label: `Strogonoff de Carne com Purê de Aipim`,
        description: `Strogonoff de Carne com Purê de Aipim`,
        key: `strongonoff_de_carne`,
        image: `/assets/images/alimentacao/strongonoff_de_carne.png`,
        price: 16,
        discount: 20,
      },
      {
        label: `Nhoque com Carne de Panela e Moranga`,
        description: `Nhoque com Carne de Panela e Moranga`,
        key: `nhoque_com_carne_de_panela`,
        image: `/assets/images/alimentacao/nhoque_com_carne_de_panela.png`,
        price: 20,
      },
      {
        label: `Risoto de Frango`,
        description: `Risoto de Frango`,
        key: `risoto_de_frango`,
        image: `/assets/images/alimentacao/risoto_de_frango.png`,
        price: 20,
      },
      {
        label: `Risoto de Funghi`,
        description: `Risoto de Funghi`,
        key: `risto_de_funghi`,
        image: `/assets/images/alimentacao/risto_de_funghi.png`,
        price: 22,
      },
      {
        label: `Sopa de Carne, Batata Doce e Legumes`,
        description: `Sopa de Carne, Batata Doce e Legumes`,
        key: `sopa_de_carne`,
        image: `/assets/images/alimentacao/sopa_de_carne.png`,
        price: 18.5,
      },
      {
        label: `Creme de Legumes`,
        description: `Creme de Legumes`,
        key: `creme_de_legumes`,
        image: `/assets/images/alimentacao/creme_de_legumes.png`,
        price: 18.5,
      },
      {
        label: `Canja de Galinha`,
        description: `Canja de Galinha`,
        key: `canja_de_galinha`,
        image: `/assets/images/alimentacao/canja_de_galinha.png`,
        price: 18.5,
      },
    ],
  },
]

const description = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`

const faq = [
  {
    question: `Lorem ipsum dolor sit amet, consectetur adipiscing elit?`,
    answer:
      'Praesent fringilla, massa ac lacinia ultrices, lectus ante egestas felis, non vehicula nibh massa eget metus.',
  },
  {
    question: `Pellentesque dignissim risus ac dapibus sagittis?`,
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque enim, tincidunt nec massa non, tempor mattis sapien. Ut nec libero lorem. Duis eleifend molestie lectus, ac pellentesque lectus aliquam non. Ut dictum justo sit amet consectetur porttitor. Sed nec massa vel diam mattis condimentum et at nisl. Donec iaculis purus eros, nec aliquet nunc pellentesque in. Donec tincidunt semper neque, id finibus justo rutrum sed.`,
  },
  {
    question: `Curabitur finibus semper commodo?`,
    answer: `Pellentesque dignissim risus ac dapibus sagittis. Phasellus euismod tincidunt nibh, at semper ipsum efficitur vitae. Cras enim est, rhoncus eget lectus ut, suscipit vestibulum odio.`,
  },
  {
    question: `Suspendisse ac velit ac felis auctor sollicitudin?`,
    answer: `Donec nec maximus neque. Duis est dolor, mattis sed felis sit amet, viverra sollicitudin sem. Vivamus blandit ornare est, vel aliquam odio gravida sed. Suspendisse eros felis, hendrerit vitae est nec, posuere cursus velit. Nulla suscipit purus orci, vitae dictum est gravida quis. Nullam scelerisque nulla nulla, et lacinia lacus blandit tincidunt. Pellentesque ut turpis et libero iaculis porttitor eget at nisl. Quisque vel ipsum eu sem mattis tempor.`,
  },
]

export { carouselImages, items, description, faq }
