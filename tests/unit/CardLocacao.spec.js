import CardLocacao from '@/components/CardLocacao'
import { mount } from "@vue/test-utils";


// função auxiliar que monta e retorna o componente renderizado
function getMountedComponent(Component, propsData) {
    return mount(Component, {
      propsData
    })
}

const locacao = {
    tipoLocacao: "República",
    tipoVaga: "Masculina",
    contato: "35 998548484",
    endereco: "Rua da República, 123",
    informacoes: "Não tem",
    instagram: "https://www.instagram.com/republica_parking"
} 

const locacao_sem_instagram = {
  tipoLocacao: "República2",
  tipoVaga: "Masculina2",
  contato: "35 9985484842",
  endereco: "Rua da República, 1232",
  informacoes: "Não tem2",
  instagram: ""
}


describe('CardLocacao: Conteudo do Card', () => {
  test('Titulo de locação', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.title').text()).toBe(locacao.tipoLocacao)
  })

  test('Tipo de vaga', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.tipo--vaga').text()).toBe(`Tipo: ${locacao.tipoVaga}`)
  })

  test('Contato', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.tipo--contato').text()).toBe(`Contato: ${locacao.contato}`)
  })

  test('Endereço', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.tipo--endereco').text()).toBe(`Endereço: ${locacao.endereco}`)
  })

  test('Informações', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.tipo--informacoes').text()).toBe(`Informações: ${locacao.informacoes}`)
  })
})

describe('CardLocacao: Link do Card', () => {
  test('Link do Card', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao})
    expect(wrapper.find('.link--site').attributes('href')).toBe(locacao.instagram)
  })

  test('Link do Card sem instagram', () => {
    const wrapper = getMountedComponent(CardLocacao, {locacao: locacao_sem_instagram})
    expect(wrapper.find('.link--site').exists()).toBe(false)
  })
})




