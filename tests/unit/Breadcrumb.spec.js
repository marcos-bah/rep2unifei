import Breadcrumb from '@/components/Breadcrumb'
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

const tipos = [
    {
        titulo: "Repúblicas",
        descricao: "Lista de republicas disponíveis em nosso sistema.",
        lista: [
            locacao
        ]
    },
    {
        titulo: "Kitnets",
        descricao: "Lista de kitnets disponíveis em nosso sistema.",
        lista: [
            locacao
        ]
    },
    {
        titulo: "Apartamentos",
        descricao: "Lista de apartamentos disponíveis em nosso sistema.",
        lista: [
            locacao
        ]
    },
]

describe('Breadcrumb: Conteudo do Breadcrumb', () => {
    test('Geração de menus', () => {
        const wrapper = getMountedComponent(Breadcrumb, {tipos})
        // verificar se menus de titulos foi gerado
        expect(wrapper.findAll('.breadcrumb--item').length).toBe(tipos.length)
    })

    // geracao de id para cada menu
    test('Geração de href cada filho de menu', () => {
        const wrapper = getMountedComponent(Breadcrumb, {tipos})
        const hrefs = wrapper.findAll('.breadcrumb--item').forEach(item => {
            //verificar tag a filha de item
            expect(item.find('a').attributes().href).toBe(`#${item.text()}`)
        })
    })
})
