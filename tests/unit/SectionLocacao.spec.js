import SectionLocacao from '@/components/SectionLocacao'
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

const locacoes = [
    locacao,
]

const titulo = "Locacoes"
const descricao = "Lista de locacoes disponíveis em nosso sistema."

describe('SectionLocacao: Conteudo do SectionLocacao', () => {
    test('Geração de titulo', () => {
        const wrapper = getMountedComponent(SectionLocacao, {locacoes, titulo, descricao})
        expect(wrapper.find('.title').text()).toBe(titulo)
    })

    test('Geração de descricao', () => {
        const wrapper = getMountedComponent(SectionLocacao, {locacoes, titulo, descricao})
        expect(wrapper.find('.subtitle').text()).toBe(descricao)
    })

    test('Geração de lista de locacoes', () => {
        const wrapper = getMountedComponent(SectionLocacao, {locacoes, titulo, descricao})
        expect(wrapper.findAll('#locacao').length).toBe(locacoes.length)
    })
})